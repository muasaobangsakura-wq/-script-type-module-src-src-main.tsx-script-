import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakEnglish } from '../../../utils/audio';
import { Unit } from '../../../types';
import { getMatchingPairs } from '../gameContentAdapter';
import { resolveSgkImageSource } from '../../../services/sgkImageExtractor';

interface MatchingGameProps {
  onBack: () => void;
  unit?: Unit;
}

interface MatchCard {
  id: string;
  type: 'word' | 'meaning';
  text: string;
  emoji?: string;
  imageUrl?: string;
  pairId: string;
}

const DEFAULT_PAIRS = [
  { pairId: 'p1', word: 'Puppy', vietnamese: 'Chó con', emoji: '🐶' },
  { pairId: 'p2', word: 'Kitten', vietnamese: 'Mèo con', emoji: '🐱' },
  { pairId: 'p3', word: 'School bag', vietnamese: 'Cặp sách', emoji: '🎒' },
  { pairId: 'p4', word: 'Pencil', vietnamese: 'Bút chì', emoji: '✏️' },
  { pairId: 'p5', word: 'Rainbow', vietnamese: 'Cầu vồng', emoji: '🌈' },
  { pairId: 'p6', word: 'Teacher', vietnamese: 'Thầy/Cô giáo', emoji: '👩‍🏫' },
];

export const MatchingGame: React.FC<MatchingGameProps> = ({ onBack, unit }) => {
  const { gainXP, activeSchoolId } = useApp();
  const currentPairs = unit ? getMatchingPairs(unit) : DEFAULT_PAIRS;
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedWord, setSelectedWord] = useState<MatchCard | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<MatchCard | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const initGame = () => {
    sound.playPop();
    const wordCards: MatchCard[] = currentPairs.map(p => ({
      id: `w-${p.pairId}`,
      type: 'word' as const,
      text: p.word,
      emoji: p.emoji,
      imageUrl: (p as any).imageUrl,
      pairId: p.pairId
    })).sort(() => Math.random() - 0.5);

    const meaningCards: MatchCard[] = currentPairs.map(p => ({
      id: `m-${p.pairId}`,
      type: 'meaning' as const,
      text: p.vietnamese,
      pairId: p.pairId
    })).sort(() => Math.random() - 0.5);

    setCards([...wordCards, ...meaningCards]);
    setSelectedWord(null);
    setSelectedMeaning(null);
    setMatchedPairIds([]);
    setScore(0);
  };

  useEffect(() => {
    initGame();
  }, [unit]);

  const handleCardClick = (card: MatchCard) => {
    if (matchedPairIds.includes(card.pairId)) return;
    sound.playPop();

    if (card.type === 'word') {
      speakEnglish(card.text);
      setSelectedWord(card);
      if (selectedMeaning) {
        checkMatch(card, selectedMeaning);
      }
    } else {
      setSelectedMeaning(card);
      if (selectedWord) {
        checkMatch(selectedWord, card);
      }
    }
  };

  const checkMatch = (wordCard: MatchCard, meaningCard: MatchCard) => {
    if (wordCard.pairId === meaningCard.pairId) {
      sound.playSuccess();
      const updated = [...matchedPairIds, wordCard.pairId];
      setMatchedPairIds(updated);
      setSelectedWord(null);
      setSelectedMeaning(null);
      setScore(prev => prev + 20);

      if (updated.length === currentPairs.length) {
        sound.playFanfare();
        confetti({ particleCount: 80, spread: 70 });
        gainXP(40, 5);
      }
    } else {
      sound.playWrong();
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedMeaning(null);
      }, 500);
    }
  };

  const wordCards = cards.filter(c => c.type === 'word');
  const meaningCards = cards.filter(c => c.type === 'meaning');

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại Game Center
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
            Điểm: {score}
          </span>
          <button
            onClick={initGame}
            className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100"
            title="Chơi lại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950 flex items-center justify-center gap-2">
          <span>🔗 NỐI HÌNH VÀ TỪ VỰNG</span>
        </h2>
        <p className="text-xs font-bold text-slate-500">
          Bấm 1 từ Tiếng Anh ở cột trái, rồi bấm đúng Nghĩa Tiếng Việt tương ứng ở cột phải!
        </p>
      </div>

      {/* Matching Columns */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-2xl mx-auto py-2">
        {/* Left Column: English Words */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-indigo-900 uppercase text-center tracking-wider">
            Từ Tiếng Anh
          </h4>
          {wordCards.map(card => {
            const isMatched = matchedPairIds.includes(card.pairId);
            const isSelected = selectedWord?.id === card.id;
            const cardImg = resolveSgkImageSource(
              card.imageUrl,
              unit?.grade || 3,
              unit?.title || '1',
              card.text,
              '',
              card.emoji,
              activeSchoolId
            );

            return (
              <button
                key={card.id}
                disabled={isMatched}
                onClick={() => handleCardClick(card)}
                className={`w-full p-3 sm:p-4 rounded-2xl border-3 text-sm font-black transition-all flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-60'
                    : isSelected
                    ? 'bg-amber-300 border-amber-500 text-indigo-950 scale-105 shadow-md'
                    : 'bg-indigo-50/70 border-indigo-200 hover:border-amber-400 text-indigo-950 hover:scale-102'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <img src={cardImg.src} alt={card.text} className="w-8 h-8 object-contain rounded-lg drop-shadow-xs shrink-0 bg-white p-0.5" />
                  <span>{card.text}</span>
                </span>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Right Column: Vietnamese Meanings */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-indigo-900 uppercase text-center tracking-wider">
            Nghĩa Tiếng Việt
          </h4>
          {meaningCards.map(card => {
            const isMatched = matchedPairIds.includes(card.pairId);
            const isSelected = selectedMeaning?.id === card.id;

            return (
              <button
                key={card.id}
                disabled={isMatched}
                onClick={() => handleCardClick(card)}
                className={`w-full p-3 sm:p-4 rounded-2xl border-3 text-sm font-black transition-all flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-60'
                    : isSelected
                    ? 'bg-amber-300 border-amber-500 text-indigo-950 scale-105 shadow-md'
                    : 'bg-amber-50/70 border-amber-200 hover:border-amber-400 text-amber-950 hover:scale-102'
                }`}
              >
                <span>{card.text}</span>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {matchedPairIds.length === currentPairs.length && (
        <div className="text-center p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2 animate-fadeIn">
          <h3 className="text-lg font-black text-emerald-800">🎉 XUẤT SẮC! BẠN ĐÃ NỐI ĐÚNG TẤT CẢ!</h3>
          <p className="text-xs font-bold text-slate-600">Thưởng +40 XP và +5 Đá quý!</p>
          <button
            onClick={initGame}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md"
          >
            Chơi Ván Mới
          </button>
        </div>
      )}
    </div>
  );
};
