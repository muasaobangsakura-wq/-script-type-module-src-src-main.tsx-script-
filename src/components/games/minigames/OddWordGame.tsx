import { Unit } from '../../../types';
import { getOddWordRounds } from '../gameContentAdapter';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Search, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakEnglish } from '../../../utils/audio';
import { resolveSgkImageSource } from '../../../services/sgkImageExtractor';

interface OddWordGameProps {
  onBack: () => void;
  unit?: Unit;
}

const ODD_ROUNDS = [
  { words: ['Cat', 'Pencil', 'Rabbit', 'Dog'], oddIdx: 1, explanation: 'Pencil (bút chì) là đồ dùng học tập, các từ còn lại là con vật!' },
  { words: ['Doctor', 'Blue', 'Yellow', 'Red'], oddIdx: 0, explanation: 'Doctor (bác sĩ) là nghề nghiệp, các từ còn lại là màu sắc!' },
  { words: ['Apple', 'Banana', 'Chair', 'Orange'], oddIdx: 2, explanation: 'Chair (cái ghế) là đồ đạc, các từ còn lại là trái cây!' },
  { words: ['Teacher', 'Student', 'Doctor', 'Ruler'], oddIdx: 3, explanation: 'Ruler (thước kẻ) là đồ vật, các từ còn lại là con người!' },
  { words: ['Mother', 'Book', 'Sister', 'Father'], oddIdx: 1, explanation: 'Book (quyển sách) là đồ vật, các từ còn lại là thành viên gia đình!' },
];

export const OddWordGame: React.FC<OddWordGameProps> = ({ onBack, unit }) => {
  const currentRounds = unit ? getOddWordRounds(unit) : ODD_ROUNDS;
  const { gainXP, activeSchoolId } = useApp();
  const [qIdx, setQIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = currentRounds[qIdx] || ODD_ROUNDS[0];

  const handlePick = (index: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(index);

    const targetOdd = (current as any).oddIndex ?? (current as any).oddIdx;
    if (index === targetOdd) {
      sound.playSuccess();
      speakEnglish(current.words[index]);
      setScore(s => s + 20);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playPop();
    setSelectedIdx(null);
    if (qIdx < ODD_ROUNDS.length - 1) {
      setQIdx(q => q + 1);
    } else {
      sound.playFanfare();
      confetti({ particleCount: 80, spread: 70 });
      setFinished(true);
      gainXP(35, 4);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
          Câu {qIdx + 1} / {ODD_ROUNDS.length} • Điểm: {score}
        </span>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🔍 TÌM TỪ KHÁC BIỆT (ODD ONE OUT)</h2>
        <p className="text-xs font-bold text-slate-500">Trong 4 từ dưới đây, hãy bấm chọn 1 từ không cùng nhóm chủ đề!</p>
      </div>

      {!finished ? (
        <div className="space-y-6 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-3 py-2">
            {current.words.map((word, i) => {
              const isSelected = selectedIdx === i;
              const isCorrect = i === current.oddIdx;
              let style = 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50';

              if (selectedIdx !== null) {
                if (isSelected && isCorrect) style = 'bg-emerald-500 text-white border-emerald-600 font-black scale-105';
                else if (isSelected && !isCorrect) style = 'bg-rose-500 text-white border-rose-600 font-black';
                else if (isCorrect) style = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-black';
              }

              const wImg = resolveSgkImageSource(
                undefined,
                unit?.grade || 3,
                unit?.title || '1',
                word,
                '',
                '🔍',
                activeSchoolId
              );

              return (
                <button
                  key={i}
                  disabled={selectedIdx !== null}
                  onClick={() => handlePick(i)}
                  className={`p-4 rounded-2xl border-3 text-base font-black transition-all cursor-pointer flex items-center justify-between gap-2 ${style}`}
                >
                  <span className="flex items-center gap-2">
                    <img src={wImg.src} alt={word} className="w-8 h-8 object-contain rounded-lg bg-white p-0.5 drop-shadow-xs shrink-0" />
                    <span>{word}</span>
                  </span>
                  {selectedIdx !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {selectedIdx !== null && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-center space-y-3 animate-fadeIn">
              <p className="text-xs font-bold text-slate-700">💡 {current.explanation}</p>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95"
              >
                {qIdx < ODD_ROUNDS.length - 1 ? 'Câu Tiếp Theo &rarr;' : 'Xem Kết Quả &rarr;'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          <h3 className="text-2xl font-black text-emerald-800">🎉 MẮT THÁM TỬ CỦA BẠN QUÁ TINH TƯỜNG!</h3>
          <p className="text-xs font-bold text-slate-600">Đạt tổng {score} điểm! Thưởng +35 XP.</p>
          <button
            onClick={() => {
              setQIdx(0);
              setScore(0);
              setSelectedIdx(null);
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
