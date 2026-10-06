import { Unit } from '../../../types';
import { getTrueFalseRounds } from '../gameContentAdapter';
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Check, X, Timer, Sparkles } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound } from '../../../utils/audio';
import { resolveSgkImageSource } from '../../../services/sgkImageExtractor';

interface TrueFalseGameProps {
  onBack: () => void;
  unit?: Unit;
}

const TF_DATA = [
  { statement: 'An apple is a red or green fruit.', isTrue: true, emoji: '🍎' },
  { statement: 'A dog can fly high in the sky.', isTrue: false, emoji: '🐶' },
  { statement: 'Fish swim in the water.', isTrue: true, emoji: '🐟' },
  { statement: 'We use an eraser to write letters.', isTrue: false, emoji: '🧼' },
  { statement: 'A rabbit has long ears.', isTrue: true, emoji: '🐰' },
];

export const TrueFalseGame: React.FC<TrueFalseGameProps> = ({ onBack, unit }) => {
  const currentRounds = unit ? getTrueFalseRounds(unit) : TF_DATA;
  const { gainXP, activeSchoolId } = useApp();
  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(8);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = currentRounds[idx] || TF_DATA[0];

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          handleAnswer(null); // Time out
          return 8;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [idx, finished]);

  const handleAnswer = (choice: boolean | null) => {
    if (choice === current.isTrue) {
      sound.playSuccess();
      setScore(s => s + 20);
    } else {
      sound.playWrong();
    }

    if (idx < currentRounds.length - 1) {
      setIdx(i => i + 1);
      setTimeLeft(8);
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
        <div className="flex items-center gap-3 text-xs font-black">
          <span className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
            <Timer className="w-3.5 h-3.5" /> {timeLeft}s
          </span>
          <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
            Điểm: {score}
          </span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">⚡ THỬ THÁCH ĐÚNG HAY SAI?</h2>
        <p className="text-xs font-bold text-slate-500">Đọc nhanh câu và gạt Đúng hoặc Sai trước khi hết thời gian!</p>
      </div>

      {!finished ? (
        <div className="space-y-6 text-center max-w-md mx-auto py-2">
          {(() => {
            const firstWord = current.statement.split(' ')[1] || current.statement.split(' ')[0] || 'Item';
            const tfImg = resolveSgkImageSource(
              undefined,
              unit?.grade || 3,
              unit?.title || '1',
              firstWord.replace(/[^a-zA-Z]/g, ''),
              '',
              current.emoji,
              activeSchoolId
            );

            return (
              <div className="p-6 rounded-3xl bg-indigo-50/80 border-3 border-indigo-200 space-y-3 relative overflow-hidden">
                <div className="w-28 h-28 mx-auto rounded-2xl bg-white p-2 flex items-center justify-center shadow-xs border border-indigo-100">
                  <img
                    src={tfImg.src}
                    alt="3D statement illustration"
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                  />
                </div>
                <div className="inline-block bg-amber-400 text-indigo-950 font-black text-[9px] px-2.5 py-0.5 rounded-full shadow-2xs">
                  ✨ Tranh 3D Chân Thực
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-indigo-950 leading-relaxed">
                  "{current.statement}"
                </h3>
              </div>
            );
          })()}

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 cursor-pointer"
            >
              <Check className="w-6 h-6 stroke-[3]" />
              <span>TRUE (ĐÚNG)</span>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className="py-5 rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[3]" />
              <span>FALSE (SAI)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          <h3 className="text-2xl font-black text-emerald-800">🎉 PHẢN XẠ CỦA BẠN NHANH NHƯ CHỚP!</h3>
          <p className="text-xs font-bold text-slate-600">Đạt tổng {score} điểm! Nhận ngay +30 XP.</p>
          <button
            onClick={() => {
              setIdx(0);
              setScore(0);
              setTimeLeft(8);
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
