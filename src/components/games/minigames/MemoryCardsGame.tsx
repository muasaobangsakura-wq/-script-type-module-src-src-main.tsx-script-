import { Unit } from '../../../types';
import { getMemoryCards } from '../gameContentAdapter';
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Timer, Award, Sparkles } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakEnglish } from '../../../utils/audio';
import { resolveSgkImageSource } from '../../../services/sgkImageExtractor';

interface MemoryCardsGameProps {
  onBack: () => void;
  unit?: Unit;
}

interface CardItem {
  id: number;
  word: string;
  emoji: string;
  imageUrl?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const DEFAULT_MEMORY_ITEMS = [
  { word: 'Cat', emoji: '🐱' },
  { word: 'Dog', emoji: '🐶' },
  { word: 'Bird', emoji: '🐦' },
  { word: 'Fish', emoji: '🐟' },
  { word: 'Rabbit', emoji: '🐰' },
  { word: 'Parrot', emoji: '🦜' },
];

export const MemoryCardsGame: React.FC<MemoryCardsGameProps> = ({ onBack, unit }) => {
  const currentItems = unit ? getMemoryCards(unit) : DEFAULT_MEMORY_ITEMS;
  const { gainXP, activeSchoolId } = useApp();
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);

  const initGame = () => {
    sound.playPop();
    const paired = [...currentItems, ...currentItems]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        word: item.word,
        emoji: item.emoji,
        imageUrl: (item as any).imageUrl,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(paired);
    setFlippedIndices([]);
    setMatchedCount(0);
    setMoves(0);
    setSeconds(60);
    setIsGameOver(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isGameOver || matchedCount === currentItems.length) return;
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(interval);
          setIsGameOver(true);
          sound.playWrong();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver, matchedCount]);

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length === 2) return;

    sound.playPop();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [idx1, idx2] = newFlipped;
      if (cards[idx1].word === cards[idx2].word) {
        // Match!
        sound.playSuccess();
        speakEnglish(cards[idx1].word);
        setTimeout(() => {
          setCards(prev => {
            const updated = [...prev];
            updated[idx1].isMatched = true;
            updated[idx2].isMatched = true;
            return updated;
          });
          setFlippedIndices([]);
          setMatchedCount(c => {
            const nextC = c + 1;
            if (nextC === currentItems.length) {
              sound.playFanfare();
              confetti({ particleCount: 100, spread: 80 });
              gainXP(45, 5);
            }
            return nextC;
          });
        }, 400);
      } else {
        // Not match
        setTimeout(() => {
          sound.playWrong();
          setCards(prev => {
            const updated = [...prev];
            updated[idx1].isFlipped = false;
            updated[idx2].isFlipped = false;
            return updated;
          });
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        <div className="flex items-center gap-4 text-xs font-black">
          <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Timer className="w-4 h-4" />
            <span>{seconds}s</span>
          </div>
          <span className="text-slate-600">Lượt lật: {moves}</span>
          <button onClick={initGame} className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🃏 LẬT THẺ TÌM CẶP TỪ VỰNG</h2>
        <p className="text-xs font-bold text-slate-500">Lật 2 thẻ giống nhau để hoàn thành cặp từ trước khi hết giờ!</p>
      </div>

      {/* 4x3 Card Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
        {cards.map((card, idx) => {
          const isRevealed = card.isFlipped || card.isMatched;
          const cardImg = isRevealed ? resolveSgkImageSource(
            card.imageUrl,
            unit?.grade || 3,
            unit?.title || '1',
            card.word,
            '',
            card.emoji,
            activeSchoolId
          ) : null;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`h-28 sm:h-32 rounded-2xl flex flex-col items-center justify-center p-1.5 cursor-pointer select-none transition-all duration-300 transform border-3 relative overflow-hidden ${
                card.isMatched
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-800 scale-95 opacity-80'
                  : isRevealed
                  ? 'bg-amber-300 border-amber-500 text-indigo-950 scale-102 shadow-md'
                  : 'bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-500 hover:scale-102 shadow-sm'
              }`}
            >
              {isRevealed && cardImg ? (
                <>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/90 p-1 flex items-center justify-center shadow-xs overflow-hidden">
                    <img
                      src={cardImg.src}
                      alt={card.word}
                      className="max-h-full max-w-full object-contain drop-shadow-xs"
                    />
                  </div>
                  <span className="text-[11px] font-black mt-1 text-center truncate max-w-full px-1">{card.word}</span>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl opacity-60">❓</span>
                  <span className="text-[9px] font-bold opacity-40 uppercase">Thẻ 3D</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {matchedCount === currentItems.length && (
        <div className="text-center p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2 animate-fadeIn">
          <h3 className="text-lg font-black text-emerald-800">🎉 CHIẾN THẮNG! TRÍ NHỚ CỦA BẠN THẬT TUYỆT VỜI!</h3>
          <p className="text-xs font-bold text-slate-600">Hoàn thành trong {moves} lượt với thời gian còn lại {seconds}s! (+45 XP)</p>
          <button
            onClick={initGame}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md"
          >
            Chơi Ván Tiếp Theo
          </button>
        </div>
      )}

      {isGameOver && matchedCount < currentItems.length && (
        <div className="text-center p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl space-y-2 animate-fadeIn">
          <h3 className="text-lg font-black text-rose-800">⏰ HẾT GIỜ RỒI!</h3>
          <p className="text-xs font-bold text-slate-600">Đừng nản lòng nhé bạn nhỏ, cùng bấm chơi lại để chinh phục nha!</p>
          <button
            onClick={initGame}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-xl shadow-md"
          >
            Thử Lại Ngay
          </button>
        </div>
      )}
    </div>
  );
};
