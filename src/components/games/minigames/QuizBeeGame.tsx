import { Unit } from '../../../types';
import { getQuizBeeQuestions } from '../gameContentAdapter';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Sparkles, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound } from '../../../utils/audio';
import { resolveSgkImageSource } from '../../../services/sgkImageExtractor';

interface QuizBeeGameProps {
  onBack: () => void;
  unit?: Unit;
}

const DEFAULT_QUIZ_QUESTIONS = [
  { question: 'What is the color of the sun?', options: ['Yellow', 'Blue', 'Purple', 'Black'], correct: 0, emoji: '☀️' },
  { question: 'Which animal says "Meow"?', options: ['Dog', 'Cat', 'Cow', 'Duck'], correct: 1, emoji: '🐱' },
  { question: 'How many days are there in a week?', options: ['Five', 'Ten', 'Seven', 'Twelve'], correct: 2, emoji: '📅' },
  { question: 'Where do students go to study with teachers?', options: ['Hospital', 'Cinema', 'Park', 'School'], correct: 3, emoji: '🏫' },
  { question: 'Which of these is a healthy green vegetable?', options: ['Broccoli', 'Candy', 'Soda', 'Ice cream'], correct: 0, emoji: '🥦' },
];

export const QuizBeeGame: React.FC<QuizBeeGameProps> = ({ onBack, unit }) => {
  const currentQuestions = unit ? getQuizBeeQuestions(unit) : DEFAULT_QUIZ_QUESTIONS;
  const { gainXP, activeSchoolId } = useApp();
  const [qIdx, setQIdx] = useState(0);
  const [used5050, setUsed5050] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = currentQuestions[qIdx];

  const handleUse5050 = () => {
    if (used5050 || selectedOpt !== null) return;
    sound.playPop();
    setUsed5050(true);

    // Hide 2 incorrect answers
    const correctIndex = (current as any).correct ?? (current as any).correctIndex ?? 0;
    const wrongIndices = [0, 1, 2, 3].filter(i => i !== correctIndex);
    const toHide = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(toHide);
  };

  const handlePickOption = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);

    const correctIndex = (current as any).correct ?? (current as any).correctIndex ?? 0;
    if (idx === correctIndex) {
      sound.playSuccess();
      setScore(s => s + 20);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playPop();
    setSelectedOpt(null);
    setHiddenOptions([]);
    if (qIdx < currentQuestions.length - 1) {
      setQIdx(q => q + 1);
    } else {
      sound.playFanfare();
      confetti({ particleCount: 100, spread: 80 });
      setFinished(true);
      gainXP(50, 6);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <div className="flex items-center gap-2">
          <button
            disabled={used5050 || selectedOpt !== null}
            onClick={handleUse5050}
            className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all ${
              used5050 ? 'bg-slate-100 text-slate-400 opacity-60' : 'bg-indigo-600 hover:bg-indigo-700 text-amber-300 shadow-sm'
            }`}
          >
            <span>Trợ giúp 50:50</span>
          </button>
          <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
            Câu {qIdx + 1} / {currentQuestions.length} • {score} Đ
          </span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🐝 ĐẤU TRƯỜNG QUIZ BEE</h2>
        <p className="text-xs font-bold text-slate-500">Chinh phục 5 câu đố hóc búa để bước lên đỉnh vinh quang!</p>
      </div>

      {!finished ? (
        <div className="space-y-6 max-w-lg mx-auto">
          {(() => {
            const correctIndex = (current as any).correct ?? (current as any).correctIndex ?? 0;
            const targetWord = current.options[correctIndex] || (current as any).word || 'Quiz';
            const qImg = resolveSgkImageSource(
              (current as any).imageUrl,
              unit?.grade || 3,
              unit?.title || '1',
              targetWord,
              '',
              (current as any).emoji || '🐝',
              activeSchoolId
            );

            return (
              <div className="p-5 rounded-3xl bg-amber-50/80 border-3 border-amber-200 text-center space-y-3 relative overflow-hidden">
                <div className="w-28 h-28 mx-auto rounded-2xl bg-white p-2 flex items-center justify-center shadow-xs border border-amber-200">
                  <img
                    src={qImg.src}
                    alt={targetWord}
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                  />
                </div>
                <div className="inline-block bg-amber-400 text-indigo-950 font-black text-[9px] px-2.5 py-0.5 rounded-full shadow-2xs">
                  ✨ Tranh 3D Chân Thực
                </div>
                <h3 className="text-lg sm:text-xl font-black text-indigo-950 leading-relaxed">
                  {current.question}
                </h3>
              </div>
            );
          })()}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.options.map((opt, i) => {
              const isHidden = hiddenOptions.includes(i);
              const isSelected = selectedOpt === i;
              const isCorrect = i === ((current as any).correct ?? (current as any).correctIndex);

              if (isHidden) {
                return (
                  <div key={i} className="p-4 rounded-2xl border-2 border-dashed border-slate-200 opacity-30 text-center text-xs font-bold text-slate-400">
                    (Đã loại trừ)
                  </div>
                );
              }

              let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50 hover:border-amber-400';
              if (selectedOpt !== null) {
                if (isSelected && isCorrect) style = 'bg-emerald-500 text-white border-emerald-600 font-black';
                else if (isSelected && !isCorrect) style = 'bg-rose-500 text-white border-rose-600 font-black';
                else if (isCorrect) style = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-black';
              }

              return (
                <button
                  key={i}
                  disabled={selectedOpt !== null}
                  onClick={() => handlePickOption(i)}
                  className={`p-4 rounded-2xl border-3 text-sm font-black transition-all text-left flex items-center justify-between cursor-pointer ${style}`}
                >
                  <span>{opt}</span>
                  {selectedOpt !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-white shrink-0" />}
                  {selectedOpt !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <div className="text-center pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-2xl shadow-md transition-all active:scale-95"
              >
                {qIdx < currentQuestions.length - 1 ? 'Câu Tiếp Theo &rarr;' : 'Xem Kết Quả &rarr;'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          <h3 className="text-2xl font-black text-emerald-800">🎉 BẠN LÀ NHÀ VÔ ĐỊCH QUIZ BEE!</h3>
          <p className="text-xs font-bold text-slate-600">Đạt tổng {score} điểm! Nhận ngay +50 XP và danh hiệu Quiz Bee Champion.</p>
          <button
            onClick={() => {
              setQIdx(0);
              setScore(0);
              setUsed5050(false);
              setHiddenOptions([]);
              setSelectedOpt(null);
              setFinished(false);
            }}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md"
          >
            Chơi Lại Trận Mới
          </button>
        </div>
      )}
    </div>
  );
};
