import { Unit } from '../../../types';
import { getMissingLetterRounds } from '../gameContentAdapter';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakEnglish } from '../../../utils/audio';

interface MissingLetterGameProps {
  onBack: () => void;
  unit?: Unit;
}

const DEFAULT_MISSING_ROUNDS = [
  { word: 'MONKEY', masked: 'M _ N K E Y', missing: 'O', options: ['A', 'E', 'O', 'U'], emoji: '🐒', vi: 'Con khỉ' },
  { word: 'PENCIL', masked: 'P E N C _ L', missing: 'I', options: ['E', 'I', 'O', 'Y'], emoji: '✏️', vi: 'Bút chì' },
  { word: 'RABBIT', masked: 'R A B B _ T', missing: 'I', options: ['A', 'E', 'I', 'O'], emoji: '🐰', vi: 'Con thỏ' },
  { word: 'DOCTOR', masked: 'D _ C T O R', missing: 'O', options: ['A', 'E', 'O', 'U'], emoji: '👨‍⚕️', vi: 'Bác sĩ' },
  { word: 'YELLOW', masked: 'Y E L L _ W', missing: 'O', options: ['A', 'I', 'O', 'U'], emoji: '💛', vi: 'Màu vàng' },
];

export const MissingLetterGame: React.FC<MissingLetterGameProps> = ({ onBack, unit }) => {
  const currentRounds = unit ? getMissingLetterRounds(unit) : DEFAULT_MISSING_ROUNDS;
  const { gainXP } = useApp();
  const [idx, setIdx] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = currentRounds[idx];

  const handlePick = (letter: string) => {
    if (selectedLetter) return;
    setSelectedLetter(letter);

    if (letter === current.missing) {
      sound.playSuccess();
      speakEnglish(current.word);
      setScore(s => s + 20);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playPop();
    setSelectedLetter(null);
    if (idx < currentRounds.length - 1) {
      setIdx(i => i + 1);
    } else {
      sound.playFanfare();
      confetti({ particleCount: 80, spread: 70 });
      setFinished(true);
      gainXP(30, 3);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
          Câu {idx + 1} / {currentRounds.length} • Điểm: {score}
        </span>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🎈 BONG BÓNG CHỮ CÁI</h2>
        <p className="text-xs font-bold text-slate-500">Bấm vào bong bóng chữ cái đúng để hoàn thiện từ vựng!</p>
      </div>

      {!finished ? (
        <div className="space-y-6 text-center max-w-md mx-auto">
          <div className="p-6 rounded-3xl bg-indigo-50 border-3 border-indigo-200 space-y-2">
            <span className="text-6xl">{current.emoji}</span>
            <div className="text-3xl sm:text-4xl font-black tracking-widest text-indigo-950">
              {selectedLetter
                ? current.masked.replace('_', selectedLetter)
                : current.masked}
            </div>
            <p className="text-xs font-bold text-slate-500">Nghĩa: {current.vi}</p>
          </div>

          {/* Letter Bubbles */}
          <div className="flex justify-center gap-3">
            {current.options.map((opt, i) => {
              const isSelected = selectedLetter === opt;
              const isCorrect = opt === current.missing;
              let style = 'bg-amber-100 border-amber-300 text-amber-950 hover:bg-amber-200 hover:scale-110';

              if (selectedLetter !== null) {
                if (isSelected && isCorrect) style = 'bg-emerald-500 text-white border-emerald-600 scale-110';
                else if (isSelected && !isCorrect) style = 'bg-rose-500 text-white border-rose-600 scale-95';
                else if (isCorrect) style = 'bg-emerald-200 text-emerald-950 border-emerald-400 font-black';
              }

              return (
                <button
                  key={i}
                  disabled={selectedLetter !== null}
                  onClick={() => handlePick(opt)}
                  className={`w-14 h-14 rounded-full border-3 text-2xl font-black transition-all shadow-md flex items-center justify-center cursor-pointer ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedLetter !== null && (
            <div className="pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-2xl shadow-md transition-all active:scale-95"
              >
                {idx < currentRounds.length - 1 ? 'Câu Tiếp Theo &rarr;' : 'Xem Kết Quả &rarr;'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          <h3 className="text-2xl font-black text-emerald-800">🎉 BẠN LÀ CHUYÊN GIA CHÍNH TẢ!</h3>
          <p className="text-xs font-bold text-slate-600">Hoàn thành với {score} điểm! Thưởng +30 XP.</p>
          <button
            onClick={() => {
              setIdx(0);
              setScore(0);
              setSelectedLetter(null);
              setFinished(false);
            }}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md"
          >
            Chơi Lại Vòng Mới
          </button>
        </div>
      )}
    </div>
  );
};
