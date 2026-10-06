// Web Audio API Synthesizer & Speech Recognition/Synthesis Engine

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Play a cheerful chime when selecting correct answer
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // Gentle boing when answer is wrong
  public playWrong() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.25); // slide down

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn('Audio error', e);
    }
  }

  // Victory fanfare on game completion
  public playFanfare() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      chord.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.15, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.7);
      });
    } catch (e) {
      console.warn('Audio error', e);
    }
  }

  // Click / Bubble Pop sound
  public playPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      console.warn('Audio error', e);
    }
  }

  // Wheel tick sound
  public playTick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn('Audio error', e);
    }
  }
}

export const sound = new SoundEffects();

// Web Speech API - Text to Speech
export function speakEnglish(text: string, rate: number = 0.88): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel(); // Cancel any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate; // slightly slower for elementary school children
    utterance.pitch = 1.1; // friendly warmer tone

    // Try to find natural English voice
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (enVoice) {
      utterance.voice = enVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

// Speak Vietnamese Mascot instructions
export function speakVietnamese(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    utterance.pitch = 1.1;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

// Web Speech API - Speech Recognition Helper
export function getSpeechRecognition(): any {
  if (typeof window === 'undefined') return null;
  const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRec) return null;

  const recognition = new SpeechRec();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;
  return recognition;
}

export interface SpeechEvaluation {
  score: number;
  passed: boolean;
  missingWords: string[];
  missingEndings: string[];
  feedback: string;
}

// Strictly evaluate speech: must be clear, pronounce all words, and include ending sounds (s, ed, t, k, p, etc.)
export function evaluateSpeechAccuracy(target: string, spoken: string): SpeechEvaluation {
  const cleanTarget = target.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

  if (!cleanSpoken) {
    return {
      score: 0,
      passed: false,
      missingWords: cleanTarget.split(/\s+/),
      missingEndings: [],
      feedback: 'Micro chưa nghe thấy giọng của bé! Bé hãy bấm micro và đọc to rõ ràng câu mẫu nhé! 🎙️'
    };
  }

  if (cleanTarget === cleanSpoken) {
    return {
      score: 100,
      passed: true,
      missingWords: [],
      missingEndings: [],
      feedback: '🌟 Xuất sắc! Phát âm cực kỳ chuẩn xác, ĐỦ TỪ và ĐỦ TẤT CẢ CÁC ÂM! (+25 XP) 🎉'
    };
  }

  const targetWords = cleanTarget.split(/\s+/).filter(Boolean);
  const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);

  const missingWords: string[] = [];
  const missingEndings: string[] = [];
  let fullyMatchedCount = 0;

  for (const tWord of targetWords) {
    if (spokenWords.includes(tWord)) {
      fullyMatchedCount++;
    } else {
      // Check for missing ending sounds: s, es, d, ed, t, k, p
      const endingPatterns = [
        { suffix: 's', len: 1 },
        { suffix: 'es', len: 2 },
        { suffix: 'ed', len: 2 },
        { suffix: 'd', len: 1 },
        { suffix: 't', len: 1 },
        { suffix: 'k', len: 1 },
        { suffix: 'p', len: 1 },
      ];

      let foundWithoutEnding = false;
      for (const pat of endingPatterns) {
        if (tWord.endsWith(pat.suffix) && tWord.length > pat.suffix.length + 1) {
          const stem = tWord.slice(0, tWord.length - pat.len);
          if (spokenWords.includes(stem)) {
            missingEndings.push(`"${tWord}" (thiếu âm /${pat.suffix}/)`);
            foundWithoutEnding = true;
            break;
          }
        }
      }

      if (!foundWithoutEnding) {
        missingWords.push(tWord);
      }
    }
  }

  // Strict scoring rules per user request:
  // 1. If missing words: cannot pass, max score 45%, must retry!
  if (missingWords.length > 0) {
    const score = Math.max(20, Math.min(50, Math.round((fullyMatchedCount / targetWords.length) * 50)));
    return {
      score,
      passed: false,
      missingWords,
      missingEndings,
      feedback: `⚠️ Chưa đủ từ! Bé bỏ sót từ: "${missingWords.join(', ')}". Cần đọc ĐỦ ${targetWords.length} TỪ mới được chấm điểm cao. Bé hãy bấm nút đọc lại nhé! 🎙️`
    };
  }

  // 2. If missing ending sounds: cannot pass, max score 60%, must retry!
  if (missingEndings.length > 0) {
    const score = Math.max(40, Math.min(60, 75 - missingEndings.length * 15));
    return {
      score,
      passed: false,
      missingWords: [],
      missingEndings,
      feedback: `⚠️ Thiếu âm cuối! Bé phát âm chưa rõ: ${missingEndings.join(', ')}. Cần phát âm ĐỦ ÂM CUỐI mới được điểm cao. Hãy thử lại nào! 🎙️`
    };
  }

  // 3. All words and ending sounds present: high score!
  const score = Math.min(100, Math.max(90, Math.round(92 + (fullyMatchedCount === targetWords.length ? 8 : 0))));
  return {
    score,
    passed: true,
    missingWords: [],
    missingEndings: [],
    feedback: '🌟 Tuyệt vời! Bạn phát âm to, rõ ràng, ĐỦ TỪ và ĐỦ ÂM! (+25 XP) 🎉'
  };
}

// Calculate similarity score using strict evaluation
export function calculateSpeechMatchScore(target: string, spoken: string): number {
  return evaluateSpeechAccuracy(target, spoken).score;
}

