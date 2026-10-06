import { Unit } from '../../../types';
import { getPictureGuessingRounds } from '../gameContentAdapter';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Eye, Sparkles } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakEnglish } from '../../../utils/audio';
import { resolveSgkImageSource } from '../../../services/sgkImageExtractor';

interface PictureGuessingGameProps {
  onBack: () => void;
  unit?: Unit;
}

const PICTURE_ROUNDS = [
  { word: 'SUNFLOWER', vietnamese: 'Hoa hướng dương', emoji: '🌻', hint: 'Loài hoa luôn hướng về phía mặt trời', options: ['SUNFLOWER', 'ROSE', 'TULIP', 'DAISY'] },
  { word: 'ASTRONAUT', vietnamese: 'Phi hành gia', emoji: '👨‍🚀', hint: 'Người bay vào vũ trụ thăm các vì sao', options: ['ASTRONAUT', 'PILOT', 'DOCTOR', 'FIREMAN'] },
  { word: 'BUTTERFLY', vietnamese: 'Con bướm', emoji: '🦋', hint: 'Loài côn trùng có đôi cánh rực rỡ sắc màu', options: ['BUTTERFLY', 'BEE', 'DRAGONFLY', 'BEETLE'] },
  { word: 'VOLCANO', vietnamese: 'Núi lửa', emoji: '🌋', hint: 'Ngọn núi phun trào dung nham đỏ rực', options: ['VOLCANO', 'MOUNTAIN', 'OCEAN', 'FOREST'] },
];

export const PictureGuessingGame: React.FC<PictureGuessingGameProps> = ({ onBack, unit }) => {
  const currentRounds = unit ? getPictureGuessingRounds(unit) : PICTURE_ROUNDS;
  const { gainXP, activeSchoolId } = useApp();
  const [roundIdx, setRoundIdx] = useState(0);
  const [uncoveredTiles, setUncoveredTiles] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = currentRounds[roundIdx] || PICTURE_ROUNDS[0];

  const handleRevealTile = (index: number) => {
    if (uncoveredTiles.includes(index)) return;
    sound.playPop();
    setUncoveredTiles(prev => [...prev, index]);
  };

  const handleSelectAnswer = (ans: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(ans);

    if (ans === current.word) {
      sound.playSuccess();
      speakEnglish(current.word);
      // Uncover all
      setUncoveredTiles([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      const roundScore = Math.max(10, 40 - uncoveredTiles.length * 3);
      setScore(s => s + roundScore);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playPop();
    setSelectedAnswer(null);
    setUncoveredTiles([]);
    if (roundIdx < currentRounds.length - 1) {
      setRoundIdx(r => r + 1);
    } else {
      sound.playFanfare();
      confetti({ particleCount: 90, spread: 80 });
      setFinished(true);
      gainXP(40, 5);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
          Màn {roundIdx + 1} / {currentRounds.length} • Điểm: {score}
        </span>
      </div>

      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-[10px] font-black uppercase tracking-wider mb-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>KHO TRANH TỪ VỰNG AI 3D CHÂN THỰC</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🖼️ ĐOÁN HÌNH HÉ LỘ DẦN</h2>
        <p className="text-xs font-bold text-slate-500">
          Bấm vào các ô vuông che giấu để mở mảnh ghép! Mở càng ít ô điểm càng cao!
        </p>
      </div>

      {!finished ? (
        <div className="space-y-6 max-w-md mx-auto">
          {/* 3x3 Puzzle Mosaic Card with 3D Realistic Render */}
          <div className="relative w-64 h-64 mx-auto rounded-3xl bg-gradient-to-b from-indigo-50 to-amber-50 border-4 border-amber-400 overflow-hidden flex items-center justify-center shadow-xl">
            {/* The hidden 3D picture underneath */}
            {(() => {
              const currentSgkImg = resolveSgkImageSource(
                (current as any).imageUrl,
                unit?.grade || 3,
                unit?.title || '1',
                current.word,
                current.vietnamese,
                current.emoji,
                activeSchoolId
              );
              return (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 select-none relative">
                  <img
                    src={currentSgkImg.src}
                    alt={current.word}
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                  />
                </div>
              );
            })()}

            {/* 9 Overlaid Covering Tiles */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
                const isOpened = uncoveredTiles.includes(i);
                return (
                  <button
                    key={i}
                    disabled={isOpened}
                    onClick={() => handleRevealTile(i)}
                    className={`rounded-xl transition-all duration-300 flex items-center justify-center font-black text-xs ${
                      isOpened
                        ? 'opacity-0 pointer-events-none'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-amber-300 cursor-pointer shadow-xs border border-indigo-700'
                    }`}
                  >
                    {!isOpened && <span>🔍 {i + 1}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Gợi ý: {current.hint}
            </span>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-2 gap-3">
            {current.options.map((opt, idx) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === current.word;
              let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50 hover:border-amber-300';

              if (selectedAnswer !== null) {
                if (isSelected && isCorrect) style = 'bg-emerald-500 text-white border-emerald-600 font-black';
                else if (isSelected && !isCorrect) style = 'bg-rose-500 text-white border-rose-600 font-black';
                else if (isCorrect) style = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-black';
              }

              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`p-3.5 rounded-2xl border-2 text-xs font-black transition-all ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div className="text-center pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-2xl shadow-md transition-transform active:scale-95"
              >
                {roundIdx < PICTURE_ROUNDS.length - 1 ? 'Màn Tiếp Theo &rarr;' : 'Xem Kết Quả &rarr;'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          <h3 className="text-2xl font-black text-emerald-800">🎉 BẠN LÀ BẬC THẦY THÁM TỬ TỪ VỰNG!</h3>
          <p className="text-xs font-bold text-slate-600">Đạt tổng điểm {score} và mở khóa +40 XP!</p>
          <button
            onClick={() => {
              setRoundIdx(0);
              setScore(0);
              setUncoveredTiles([]);
              setSelectedAnswer(null);
              setFinished(false);
            }}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md"
          >
            Chơi Lại Từ Đầu
          </button>
        </div>
      )}
    </div>
  );
};
