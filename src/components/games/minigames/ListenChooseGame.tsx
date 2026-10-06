import { Unit } from '../../../types';
import { getListenChooseRounds } from '../gameContentAdapter';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Volume2, RotateCcw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakEnglish } from '../../../utils/audio';
import { resolveSgkImageSource } from '../../../services/sgkImageExtractor';

interface ListenChooseGameProps {
  onBack: () => void;
  unit?: Unit;
}

const DEFAULT_ROUNDS = [
  { word: 'Elephant', options: [{ text: 'Elephant', emoji: '🐘' }, { text: 'Monkey', emoji: '🐒' }, { text: 'Tiger', emoji: '🐅' }, { text: 'Panda', emoji: '🐼' }], correct: 0 },
  { word: 'Ruler', options: [{ text: 'Pencil', emoji: '✏️' }, { text: 'Ruler', emoji: '📏' }, { text: 'Book', emoji: '📖' }, { text: 'School bag', emoji: '🎒' }], correct: 1 },
  { word: 'Strawberry', options: [{ text: 'Apple', emoji: '🍎' }, { text: 'Banana', emoji: '🍌' }, { text: 'Strawberry', emoji: '🍓' }, { text: 'Watermelon', emoji: '🍉' }], correct: 2 },
  { word: 'Guitar', options: [{ text: 'Piano', emoji: '🎹' }, { text: 'Drum', emoji: '🥁' }, { text: 'Violin', emoji: '🎻' }, { text: 'Guitar', emoji: '🎸' }], correct: 3 },
  { word: 'Helicopter', options: [{ text: 'Helicopter', emoji: '🚁' }, { text: 'Airplane', emoji: '✈️' }, { text: 'Train', emoji: '🚂' }, { text: 'Bicycle', emoji: '🚲' }], correct: 0 },
];

export const ListenChooseGame: React.FC<ListenChooseGameProps> = ({ onBack, unit }) => {
  const currentRounds = unit ? getListenChooseRounds(unit) : DEFAULT_ROUNDS;
  const { gainXP, activeSchoolId } = useApp();
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentRound = currentRounds[roundIndex];

  const playAudio = () => {
    sound.playPop();
    speakEnglish(currentRound.word);
  };

  const handleSelect = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);

    if (idx === currentRound.correct) {
      sound.playSuccess();
      setScore(s => s + 20);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playPop();
    setSelectedOpt(null);
    if (roundIndex < currentRounds.length - 1) {
      setRoundIndex(r => r + 1);
    } else {
      sound.playFanfare();
      confetti({ particleCount: 80, spread: 70 });
      setFinished(true);
      gainXP(35, 4);
    }
  };

  const handleRestart = () => {
    setRoundIndex(0);
    setSelectedOpt(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
          Vòng {roundIndex + 1} / {currentRounds.length} • Điểm: {score}
        </span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🎧 NGHE VÀ CHỌN HÌNH ĐÚNG</h2>
        <p className="text-xs font-bold text-slate-500">Bấm chiếc loa to màu xanh để nghe phát âm, sau đó chọn 1 trong 4 bức tranh!</p>
      </div>

      {!finished ? (
        <div className="space-y-6 text-center">
          {/* Big Audio speaker button */}
          <button
            onClick={playAudio}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 active:scale-95 text-white flex items-center justify-center shadow-xl shadow-sky-400/30 transition-transform cursor-pointer"
          >
            <Volume2 className="w-12 h-12" />
          </button>
          <p className="text-xs font-black text-sky-700 animate-pulse">Bấm vào loa để nghe từ vựng</p>

          {/* 4 3D Picture Cards */}
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            {currentRound.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === currentRound.correct;
              let style = 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50';

              if (selectedOpt !== null) {
                if (isSelected && isCorrect) style = 'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-lg';
                else if (isSelected && !isCorrect) style = 'bg-rose-500 text-white border-rose-600 scale-95';
                else if (isCorrect) style = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-black';
              }

              const optImg = resolveSgkImageSource(
                (opt as any).imageUrl,
                unit?.grade || 3,
                unit?.title || '1',
                opt.text,
                '',
                opt.emoji,
                activeSchoolId
              );

              return (
                <button
                  key={idx}
                  disabled={selectedOpt !== null}
                  onClick={() => handleSelect(idx)}
                  className={`p-3.5 rounded-3xl border-3 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative group ${style}`}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/90 p-1.5 flex items-center justify-center shadow-xs overflow-hidden">
                    <img
                      src={optImg.src}
                      alt={opt.text}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-sm font-black tracking-wide">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <div className="pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-2xl shadow-md transition-all active:scale-95"
              >
                {roundIndex < currentRounds.length - 1 ? 'Vòng Tiếp Theo &rarr;' : 'Xem Kết Quả &rarr;'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          <h3 className="text-2xl font-black text-emerald-800">🎉 XUẤT SẮC! BẠN HOÀN THÀNH VỚI {score} ĐIỂM!</h3>
          <p className="text-xs font-bold text-slate-600">Đôi tai thính của bạn thật đáng nể! Nhận ngay +35 XP.</p>
          <button
            onClick={handleRestart}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md"
          >
            Chơi Lại Vòng Mới
          </button>
        </div>
      )}
    </div>
  );
};
