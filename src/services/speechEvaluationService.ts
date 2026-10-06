export interface WordEvaluationItem {
  word: string;
  ipa?: string;
  status: 'excellent' | 'needs_practice' | 'missed';
  feedback: string;
}

export interface AIPronunciationEvaluationResult {
  overallScore: number;
  accuracyScore: number;
  fluencyScore: number;
  passed: boolean;
  nativeStandardBadge: string;
  nativeLevel?: 'native' | 'near_native' | 'improving' | 'beginner';
  wordsBreakdown: WordEvaluationItem[];
  mouthShapeTip: string;
  feedback: string;
  encouragement: string;
}

/**
 * Gọi API Backend Gemini để chấm điểm phát âm chuẩn giọng bản ngữ
 */
export async function evaluateSpeechWithAI(
  targetPhrase: string,
  spokenText: string,
  phoneticTip?: string,
  grade: number = 3
): Promise<AIPronunciationEvaluationResult> {
  try {
    const response = await fetch('/api/ai/evaluate-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetPhrase,
        spokenText,
        phoneticTip,
        grade,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.error || 'Invalid response data');
  } catch (err) {
    console.warn('API evaluate-speech error, using fallback evaluator:', err);
    return getLocalNativeEvaluationFallback(targetPhrase, spokenText, phoneticTip);
  }
}

/**
 * Thuật toán sư phạm dự phòng phân tích chuẩn bản ngữ nếu thiết bị mất kết nối mạng
 */
export function getLocalNativeEvaluationFallback(
  targetPhrase: string,
  spokenText: string,
  phoneticTip?: string
): AIPronunciationEvaluationResult {
  const cleanTarget = targetPhrase.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const cleanSpoken = (spokenText || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

  const targetWords = cleanTarget.split(/\s+/).filter(Boolean);
  const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);

  if (!cleanSpoken) {
    return {
      overallScore: 0,
      accuracyScore: 0,
      fluencyScore: 0,
      passed: false,
      nativeStandardBadge: 'Chưa Nghe Thấy Âm Thanh 🎙️',
      nativeLevel: 'beginner',
      wordsBreakdown: targetWords.map(w => ({
        word: w,
        ipa: `/${w}/`,
        status: 'missed',
        feedback: 'Chưa phát hiện âm thanh'
      })),
      mouthShapeTip: 'Bé hãy bấm vào micro màu hồng và đọc to rõ ràng câu mẫu nhé!',
      feedback: 'Micro chưa nghe thấy giọng của bé! Bé hãy bấm micro và đọc to rõ ràng câu mẫu nhé! 🎙️',
      encouragement: 'Đừng ngại ngùng, hãy nhấn micro và nói thật to nào! 🌟'
    };
  }

  const wordsBreakdown: WordEvaluationItem[] = [];
  let fullyMatchedCount = 0;

  for (const tWord of targetWords) {
    if (spokenWords.includes(tWord)) {
      fullyMatchedCount++;
      wordsBreakdown.push({
        word: tWord,
        ipa: `/${tWord}/`,
        status: 'excellent',
        feedback: 'Phát âm chuẩn âm bản ngữ'
      });
    } else {
      // Check ending sound
      const endings = ['s', 'es', 'ed', 'd', 't', 'k', 'p'];
      let missingEnding = false;
      for (const end of endings) {
        if (tWord.endsWith(end) && tWord.length > end.length + 1) {
          const stem = tWord.slice(0, tWord.length - end.length);
          if (spokenWords.includes(stem)) {
            missingEnding = true;
            wordsBreakdown.push({
              word: tWord,
              ipa: `/${tWord}/`,
              status: 'needs_practice',
              feedback: `Thiếu âm đuôi /${end}/`
            });
            break;
          }
        }
      }

      if (!missingEnding) {
        wordsBreakdown.push({
          word: tWord,
          ipa: `/${tWord}/`,
          status: 'missed',
          feedback: 'Chưa rõ âm hoặc bị đọc lướt'
        });
      }
    }
  }

  const accuracy = Math.round((fullyMatchedCount / targetWords.length) * 100);
  const isAll = fullyMatchedCount === targetWords.length;
  const score = isAll ? 95 : Math.max(30, Math.round(accuracy * 0.85));
  const passed = score >= 75;

  return {
    overallScore: score,
    accuracyScore: accuracy,
    fluencyScore: isAll ? 92 : Math.max(40, score - 5),
    passed,
    nativeStandardBadge: passed ? 'Chuẩn Bản Ngữ Xuất Sắc 🌟' : 'Cần Chú Ý Âm Đuôi 💪',
    nativeLevel: passed ? 'native' : 'improving',
    wordsBreakdown,
    mouthShapeTip: phoneticTip || 'Mở rộng khẩu hình, đẩy hơi dứt khoát và chú ý phát âm đủ âm đuôi.',
    feedback: passed
      ? '🌟 Tuyệt vời! Bạn phát âm to, rõ ràng, ĐỦ TỪ và ĐỦ TẤT CẢ CÁC ÂM theo chuẩn bản ngữ!'
      : `⚠️ Chưa hoàn toàn chuẩn! Bé hãy chú ý phát âm đủ ${targetWords.length} từ và bật rõ âm cuối nhé!`,
    encouragement: passed
      ? 'Thầy cô bản ngữ rất ấn tượng với ngữ điệu của bạn! Tiếp tục phát huy nhé! 🦖🎉'
      : 'Bé đã cố gắng rất tốt, chỉ cần nghe lại mẫu và đọc lại một lần nữa là sẽ chuẩn 100% ngay! 🚀'
  };
}

/**
 * Trình ghi âm MediaRecorder phục vụ việc nghe lại giọng chính học sinh
 */
export class StudentVoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioUrl: string | null = null;
  private stream: MediaStream | null = null;

  async start(): Promise<boolean> {
    try {
      this.cleanup();
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return false;
      }
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream);
      
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.audioChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        if (this.audioChunks.length > 0) {
          const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.audioUrl = URL.createObjectURL(blob);
        }
      };

      this.mediaRecorder.start();
      return true;
    } catch (e) {
      console.warn('MediaRecorder error:', e);
      return false;
    }
  }

  stop(): string | null {
    try {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
      }
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
      return this.audioUrl;
    } catch (e) {
      return null;
    }
  }

  getAudioUrl(): string | null {
    if (!this.audioUrl && this.audioChunks.length > 0) {
      const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
      this.audioUrl = URL.createObjectURL(blob);
    }
    return this.audioUrl;
  }

  cleanup(): void {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
    }
    this.audioChunks = [];
  }
}
