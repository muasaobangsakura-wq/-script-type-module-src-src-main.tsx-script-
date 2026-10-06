import { Unit } from '../../../types';
import { getWordScrambleRounds } from '../gameContentAdapter';
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Volume2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakEnglish } from '../../../utils/audio';

interface WordScrambleGameProps {
  onBack: () => void;
  unit?: Unit;
}

const DEFAULT_SCRAMBLE_WORDS = [
  { target: 'TIGER', vi: 'Con hổ dũng mãnh', emoji: '🐅' },
  { target: 'APPLE', vi: 'Quả táo đỏ giòn', emoji: '🍎' },
  { target: 'ERASER', vi: 'Cục tẩy học sinh', emoji: '🧼' },
  { target: 'PARROT', vi: 'Con vẹt biết nói', emoji: '🦜' },
];

export const WordScrambleGame: React.FC<WordScrambleGameProps> = ({ onBack, unit }) => {
  const currentWords = unit ? getWordScrambleRounds(unit) : DEFAULT_SCRAMBLE_WORDS;
  const { gainXP } = useApp();
  const [roundIdx, setRoundIdx] = useState(0);
  const [lettersPool, setLettersPool] = useState<string[]>([]);
  const [pickedLetters, setPickedLetters] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = currentWords[roundIdx];

  const initRound = (rIdx: number) => {
    const letters = currentWords[rIdx].target.split('');
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setLettersPool(shuffled);
    setPickedLetters([]);
    setIsCorrect(null);
  };

  useEffect(() => {
    initRound(roundIdx);
  }, [roundIdx]);

  const handlePickLetter = (letter: string, poolIndex: number) => {
    sound.playPop();
    const newPicked = [...pickedLetters, letter];
    setPickedLetters(newPicked);

    const newPool = [...lettersPool];
    newPool.splice(poolIndex, 1);
    setLettersPool(newPool);

    if (newPicked.length === current.target.length) {
      if (newPicked.join('') === current.target) {
        sound.playSuccess();
        speakEnglish(current.target);
        setIsCorrect(true);
        setScore(s => s + 25);
      } else {
        sound.playWrong();
        setIsCorrect(false);
      }
    }
  };

  const handleResetLetters = () => {
    sound.playPop();
    initRound(roundIdx);
  };

  const handleNext = () => {
    sound.playPop();
    if (roundIdx < currentWords.length - 1) {
      setRoundIdx(r => r + 1);
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
          Từ {roundIdx + 1} / {currentWords.length} • Điểm: {score}
        </span>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🔤 XẾP CHỮ CÁI XÁO TRỘN</h2>
        <p className="text-xs font-bold text-slate-500">Bấm các chữ cái lộn xộn theo thứ tự đúng để ghép thành từ vựng!</p>
      </div>

      {!finished ? (
        <div className="space-y-6 text-center max-w-md mx-auto">
          <div className="p-4 rounded-3xl bg-amber-50 border-2 border-amber-200">
            <span className="text-6xl">{current.emoji}</span>
            <p className="text-xs font-bold text-slate-500 mt-2">Gợi ý: {(current as any).vi || (current as any).vietnamese || ''}</p>
          </div>

          {/* Assembled Output Slot */}
          <div className="min-h-[64px] p-3 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center gap-2">
            {pickedLetters.length === 0 ? (
              <span className="text-xs text-slate-400 italic">Chọn các chữ cái bên dưới...</span>
            ) : (
              pickedLetters.map((char, i) => (
                <span key={i} className="w-12 h-12 rounded-xl bg-amber-400 text-indigo-950 font-black text-xl flex items-center justify-center shadow-md animate-scaleIn">
                  {char}
                </span>
              ))
            )}
          </div>

          {/* Scrambled Pool */}
          <div className="flex flex-wrap justify-center gap-2">
            {lettersPool.map((char, idx) => (
              <button
                key={idx}
                onClick={() => handlePickLetter(char, idx)}
                className="w-12 h-12 rounded-xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 text-indigo-950 font-black text-xl flex items-center justify-center shadow-xs transition-transform hover:scale-110 active:scale-95"
              >
                {char}
              </button>
            ))}
          </div>

          {isCorrect !== null && (
            <div className={`p-3 rounded-xl text-xs font-black ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {isCorrect ? '🎉 RẤT CHÍNH XÁC! Bạn ghép chữ quá giỏi!' : '❌ Chưa đúng rồi, hãy bấm nút thử lại nhé!'}
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handleResetLetters}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Xếp lại
            </button>

            {isCorrect && (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95"
              >
                {roundIdx < currentWords.length - 1 ? 'Từ Tiếp Theo &rarr;' : 'Xem Kết Quả &rarr;'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          <h3 className="text-2xl font-black text-emerald-800">🎉 XUẤT SẮC! BẠN ĐÃ MỞ KHÓA TẤT CẢ TỪ!</h3>
          <p className="text-xs font-bold text-slate-600">Đạt tổng {score} điểm! Nhận ngay +35 XP.</p>
          <button
            onClick={() => {
              setRoundIdx(0);
              setScore(0);
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
