import { Unit } from '../../../types';
import { getSentenceBuilderRounds } from '../gameContentAdapter';
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Volume2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakEnglish } from '../../../utils/audio';

interface SentenceBuilderGameProps {
  onBack: () => void;
  unit?: Unit;
}

const SENTENCES_DATA = [
  { target: 'I have a red ball', vi: 'Tôi có một quả bóng màu đỏ', tokens: ['a', 'I', 'ball', 'red', 'have'], emoji: '⚽' },
  { target: 'She is my teacher', vi: 'Cô ấy là giáo viên của tôi', tokens: ['my', 'teacher', 'is', 'She'], emoji: '👩‍🏫' },
  { target: 'The cat sleeps on the chair', vi: 'Con mèo ngủ trên chiếc ghế', tokens: ['the', 'The', 'on', 'cat', 'chair', 'sleeps'], emoji: '🐱' },
  { target: 'Do you like apples', vi: 'Bạn có thích ăn táo không', tokens: ['apples', 'like', 'Do', 'you'], emoji: '🍎' },
];

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({ onBack, unit }) => {
  const currentRounds = unit ? getSentenceBuilderRounds(unit) : SENTENCES_DATA;
  const { gainXP } = useApp();
  const [idx, setIdx] = useState(0);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);
  const [builtTokens, setBuiltTokens] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = currentRounds[idx] || SENTENCES_DATA[0];

  const initRound = (rIdx: number) => {
    const roundData = currentRounds[rIdx] || SENTENCES_DATA[0];
    const rawList = roundData.tokens || (roundData as any).scrambled || roundData.target.split(' ');
    const shuffled = [...rawList].sort(() => Math.random() - 0.5);
    setAvailableTokens(shuffled);
    setBuiltTokens([]);
    setIsSuccess(null);
  };

  useEffect(() => {
    initRound(idx);
  }, [idx, unit]);

  const handlePickToken = (token: string, tokenIndex: number) => {
    sound.playPop();
    const newBuilt = [...builtTokens, token];
    setBuiltTokens(newBuilt);

    const newAvail = [...availableTokens];
    newAvail.splice(tokenIndex, 1);
    setAvailableTokens(newAvail);

    const targetTotalTokens = current.tokens?.length || (current as any).scrambled?.length || current.target.split(' ').length;
    if (newBuilt.length === targetTotalTokens) {
      if (newBuilt.join(' ').toLowerCase() === current.target.toLowerCase()) {
        sound.playSuccess();
        speakEnglish(current.target);
        setIsSuccess(true);
        setScore(s => s + 25);
      } else {
        sound.playWrong();
        setIsSuccess(false);
      }
    }
  };

  const handleReset = () => {
    sound.playPop();
    initRound(idx);
  };

  const handleNext = () => {
    sound.playPop();
    if (idx < SENTENCES_DATA.length - 1) {
      setIdx(i => i + 1);
    } else {
      sound.playFanfare();
      confetti({ particleCount: 80, spread: 70 });
      setFinished(true);
      gainXP(40, 5);
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
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🧱 GHÉP CÂU SIÊU TỐC</h2>
        <p className="text-xs font-bold text-slate-500">Bấm các khối từ ngữ pháp để ghép thành câu hoàn chỉnh!</p>
      </div>

      {!finished ? (
        <div className="space-y-6 text-center max-w-lg mx-auto">
          <div className="p-4 rounded-3xl bg-indigo-50 border-2 border-indigo-200">
            <span className="text-5xl">{(current as any).emoji || '🧱'}</span>
            <p className="text-sm font-black text-indigo-950 mt-2">"{(current as any).vi || (current as any).vietnamese || ''}"</p>
          </div>

          {/* Built Sentence Slot */}
          <div className="min-h-[64px] p-3 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex flex-wrap items-center justify-center gap-2">
            {builtTokens.length === 0 ? (
              <span className="text-xs text-slate-400 italic">Chọn các khối từ bên dưới...</span>
            ) : (
              builtTokens.map((t, i) => (
                <span key={i} className="px-3.5 py-2 bg-amber-400 text-indigo-950 font-black rounded-xl text-sm shadow-md animate-scaleIn">
                  {t}
                </span>
              ))
            )}
          </div>

          {/* Word Pool */}
          <div className="flex flex-wrap justify-center gap-2">
            {availableTokens.map((token, tIdx) => (
              <button
                key={tIdx}
                onClick={() => handlePickToken(token, tIdx)}
                className="px-4 py-2.5 bg-indigo-50 hover:bg-amber-100 border-2 border-indigo-200 text-indigo-950 font-black text-sm rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-xs"
              >
                {token}
              </button>
            ))}
          </div>

          {isSuccess !== null && (
            <div className={`p-3 rounded-xl text-xs font-black ${isSuccess ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {isSuccess ? '🎉 CHUẨN XÁC! Bạn xây câu rất đúng ngữ pháp!' : '❌ Chưa chính xác, hãy bấm nút thử lại nhé!'}
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Thử lại
            </button>

            {isSuccess && (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95"
              >
                {idx < SENTENCES_DATA.length - 1 ? 'Câu Tiếp Theo &rarr;' : 'Xem Kết Quả &rarr;'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          <h3 className="text-2xl font-black text-emerald-800">🎉 BẠN LÀ BẬC THẦY GHÉP CÂU!</h3>
          <p className="text-xs font-bold text-slate-600">Đạt {score} điểm! Nhận ngay +40 XP.</p>
          <button
            onClick={() => {
              setIdx(0);
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
