import { Unit } from '../../../types';
import { getListenRepeatPrompts } from '../gameContentAdapter';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Mic, Volume2, Star, RotateCcw } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakEnglish, getSpeechRecognition, calculateSpeechMatchScore } from '../../../utils/audio';

interface ListenRepeatGameProps {
  onBack: () => void;
  unit?: Unit;
}

const REPEAT_PROMPTS = [
  { phrase: 'Good morning, teacher', vi: 'Chào buổi sáng cô giáo' },
  { phrase: 'I love playing football', vi: 'Mình thích chơi bóng đá' },
  { phrase: 'This is my cute puppy', vi: 'Đây là chú cún con đáng yêu của mình' },
  { phrase: 'The weather is sunny today', vi: 'Hôm nay trời nắng đẹp' },
];

export const ListenRepeatGame: React.FC<ListenRepeatGameProps> = ({ onBack, unit }) => {
  const currentPrompts = unit ? getListenRepeatPrompts(unit) : REPEAT_PROMPTS;
  const { gainXP } = useApp();
  const [idx, setIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = currentPrompts[idx] || REPEAT_PROMPTS[0];

  const handlePlaySample = () => {
    sound.playPop();
    speakEnglish(current.phrase);
  };

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const rec = getSpeechRecognition();
    if (!rec) {
      // Browser fallback simulation
      sound.playPop();
      setSpokenText(current.phrase);
      setScore(95);
      sound.playSuccess();
      setTotalScore(s => s + 30);
      return;
    }

    sound.playPop();
    setIsRecording(true);
    setSpokenText('');
    setScore(null);

    rec.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setSpokenText(text);
      setIsRecording(false);

      const matchScore = calculateSpeechMatchScore(current.phrase, text);
      setScore(matchScore);

      if (matchScore >= 70) {
        sound.playSuccess();
        setTotalScore(s => s + 30);
      } else {
        sound.playWrong();
      }
    };

    rec.onerror = () => setIsRecording(false);
    rec.onend = () => setIsRecording(false);
    rec.start();
  };

  const handleNext = () => {
    sound.playPop();
    setScore(null);
    setSpokenText('');
    if (idx < REPEAT_PROMPTS.length - 1) {
      setIdx(i => i + 1);
    } else {
      sound.playFanfare();
      confetti({ particleCount: 90, spread: 80 });
      setFinished(true);
      gainXP(45, 5);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
          Câu {idx + 1} / {REPEAT_PROMPTS.length} • {totalScore} Điểm
        </span>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🎤 NGHE VÀ NHẮC LẠI (LISTEN & REPEAT)</h2>
        <p className="text-xs font-bold text-slate-500">Nghe giọng đọc bản xứ rồi nhấn nút micro đọc lại để nhận 3 sao!</p>
      </div>

      {!finished ? (
        <div className="space-y-6 text-center max-w-md mx-auto">
          {/* Sample Phrase Box */}
          <div className="p-6 rounded-3xl bg-indigo-50 border-3 border-indigo-200 space-y-2">
            <h3 className="text-2xl font-black text-indigo-950">"{current.phrase}"</h3>
            <p className="text-xs font-bold text-slate-500">Nghĩa: {current.vi}</p>

            <button
              onClick={handlePlaySample}
              className="mt-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs font-black inline-flex items-center gap-1.5 shadow-md"
            >
              <Volume2 className="w-4 h-4" /> Nghe mẫu
            </button>
          </div>

          {/* Record Button */}
          <div className="space-y-3">
            <button
              onClick={handleRecord}
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-200'
                  : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30'
              }`}
            >
              <Mic className="w-9 h-9" />
            </button>
            <p className="text-xs font-bold text-slate-500">
              {isRecording ? 'Đang ghi âm... Hãy đọc to câu mẫu!' : 'Bấm nút đỏ để đọc lại'}
            </p>
          </div>

          {spokenText && (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-400">Bạn đã nói: </span>
              <span className="font-bold text-indigo-950">"{spokenText}"</span>
            </div>
          )}

          {score !== null && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2 animate-scaleIn">
              <div className="flex justify-center gap-1 text-amber-400 text-2xl">
                <Star className={`w-6 h-6 ${score >= 40 ? 'fill-amber-400' : 'text-slate-300'}`} />
                <Star className={`w-6 h-6 ${score >= 70 ? 'fill-amber-400' : 'text-slate-300'}`} />
                <Star className={`w-6 h-6 ${score >= 85 ? 'fill-amber-400' : 'text-slate-300'}`} />
              </div>
              <p className="text-xs font-bold text-slate-700">Độ chuẩn xác: {score}%</p>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-xl shadow-md"
              >
                {idx < REPEAT_PROMPTS.length - 1 ? 'Câu Tiếp Theo &rarr;' : 'Xem Kết Quả &rarr;'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          <h3 className="text-2xl font-black text-emerald-800">🎉 GIỌNG ĐỌC CỦA BẠN THẬT ẤN TƯỢNG!</h3>
          <p className="text-xs font-bold text-slate-600">Đạt tổng {totalScore} điểm! Nhận ngay +45 XP.</p>
          <button
            onClick={() => {
              setIdx(0);
              setTotalScore(0);
              setScore(null);
              setSpokenText('');
              setFinished(false);
            }}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md"
          >
            Luyện Lại Vòng Mới
          </button>
        </div>
      )}
    </div>
  );
};
