import { Unit } from '../../../types';
import { getEnglishRaceQuestions } from '../gameContentAdapter';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Car, Zap, Trophy, Flag } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakEnglish } from '../../../utils/audio';

interface EnglishRaceGameProps {
  onBack: () => void;
  unit?: Unit;
}

const DEFAULT_RACE_QUESTIONS = [
  { word: 'Fast', vi: 'Nhanh nhẹn', opposite: 'Slow', options: ['Slow', 'Hot', 'Tall', 'Sad'] },
  { word: 'Big', vi: 'To lớn', opposite: 'Small', options: ['Small', 'Cold', 'Red', 'Thin'] },
  { word: 'Happy', vi: 'Vui vẻ', opposite: 'Sad', options: ['Angry', 'Sad', 'Sleepy', 'Brave'] },
  { word: 'Hot', vi: 'Nóng bức', opposite: 'Cold', options: ['Cold', 'Warm', 'Dry', 'Wet'] },
  { word: 'Open', vi: 'Mở cửa', opposite: 'Close', options: ['Shut', 'Close', 'Stop', 'Run'] },
];

export const EnglishRaceGame: React.FC<EnglishRaceGameProps> = ({ onBack, unit }) => {
  const currentQuestions = unit ? getEnglishRaceQuestions(unit) : DEFAULT_RACE_QUESTIONS;
  const { gainXP } = useApp();
  const [qIdx, setQIdx] = useState(0);
  const [playerDistance, setPlayerDistance] = useState(10); // in percent
  const [rivalDistance, setRivalDistance] = useState(15);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [winner, setWinner] = useState<'player' | 'rival' | null>(null);

  const current = currentQuestions[qIdx] || DEFAULT_RACE_QUESTIONS[0];
  const targetAns = current.opposite;

  const handlePick = (ans: string) => {
    if (selectedAns) return;
    setSelectedAns(ans);

    const isCorrect = ans === targetAns;
    if (isCorrect) {
      sound.playSuccess();
      speakEnglish(targetAns);
      // Boost player speed!
      const newPlayerDist = Math.min(95, playerDistance + 20);
      setPlayerDistance(newPlayerDist);
      const newRivalDist = Math.min(85, rivalDistance + 12);
      setRivalDistance(newRivalDist);

      if (newPlayerDist >= 90) {
        finishRace('player');
        return;
      }
    } else {
      sound.playWrong();
      // Rival creeps ahead
      const newRivalDist = Math.min(95, rivalDistance + 18);
      setRivalDistance(newRivalDist);

      if (newRivalDist >= 90) {
        finishRace('rival');
        return;
      }
    }

    setTimeout(() => {
      setSelectedAns(null);
      if (qIdx < currentQuestions.length - 1) {
        setQIdx(q => q + 1);
      } else {
        finishRace(playerDistance >= rivalDistance ? 'player' : 'rival');
      }
    }, 700);
  };

  const finishRace = (win: 'player' | 'rival') => {
    setWinner(win);
    setFinished(true);
    if (win === 'player') {
      sound.playFanfare();
      confetti({ particleCount: 100, spread: 80 });
      gainXP(45, 5);
    } else {
      sound.playWrong();
    }
  };

  const restartRace = () => {
    setQIdx(0);
    setPlayerDistance(10);
    setRivalDistance(15);
    setSelectedAns(null);
    setFinished(false);
    setWinner(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
          Chặng {qIdx + 1} / {currentQuestions.length}
        </span>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🏎️ ĐUA XE TIẾNG ANH (ENGLISH RACE)</h2>
        <p className="text-xs font-bold text-slate-500">
          Tìm từ trái nghĩa đúng để kích hoạt động cơ tăng tốc vượt xe đối thủ về đích!
        </p>
      </div>

      {/* Animated Racetrack View */}
      <div className="relative bg-slate-800 rounded-3xl p-4 border-4 border-slate-700 overflow-hidden space-y-4">
        {/* Track Line 1: Player (Red Car) */}
        <div className="relative h-12 bg-slate-700/80 rounded-2xl flex items-center px-2 border-b-2 border-dashed border-amber-400">
          <div
            className="absolute transition-all duration-700 text-3xl flex items-center gap-1"
            style={{ left: `${playerDistance}%` }}
          >
            <span>🏎️</span>
            <span className="text-[10px] bg-rose-500 text-white font-black px-1.5 py-0.5 rounded-md">BẠN</span>
          </div>
          <div className="absolute right-3 text-2xl">🏁</div>
        </div>

        {/* Track Line 2: Rival (Blue Car) */}
        <div className="relative h-12 bg-slate-700/80 rounded-2xl flex items-center px-2">
          <div
            className="absolute transition-all duration-700 text-3xl flex items-center gap-1"
            style={{ left: `${rivalDistance}%` }}
          >
            <span>🚙</span>
            <span className="text-[10px] bg-sky-500 text-white font-black px-1.5 py-0.5 rounded-md">ĐỐI THỦ</span>
          </div>
          <div className="absolute right-3 text-2xl">🏁</div>
        </div>
      </div>

      {!finished ? (
        <div className="space-y-5 text-center max-w-md mx-auto">
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300">
            <span className="text-xs font-black text-amber-800 uppercase tracking-wider">Từ cần tìm từ TRÁI NGHĨA</span>
            <h3 className="text-3xl font-black text-indigo-950 my-1">{current.word}</h3>
            <p className="text-xs font-bold text-slate-500">Nghĩa: {current.vi}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {current.options.map((opt, i) => {
              const isSelected = selectedAns === opt;
              const isCorrect = opt === targetAns;
              let style = 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50';

              if (selectedAns !== null) {
                if (isSelected && isCorrect) style = 'bg-emerald-500 text-white border-emerald-600 font-black scale-105';
                else if (isSelected && !isCorrect) style = 'bg-rose-500 text-white border-rose-600 font-black';
                else if (isCorrect) style = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-black';
              }

              return (
                <button
                  key={i}
                  disabled={selectedAns !== null}
                  onClick={() => handlePick(opt)}
                  className={`p-3.5 rounded-2xl border-3 text-sm font-black transition-all cursor-pointer ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          {winner === 'player' ? (
            <>
              <h3 className="text-2xl font-black text-emerald-800">🏆 BẠN ĐÃ CÁN ĐÍCH ĐẦU TIÊN!</h3>
              <p className="text-xs font-bold text-slate-600">Tuyệt vời! Xe đua của bạn đã về đích ngoạn mục (+45 XP).</p>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-black text-rose-800">🚗 ĐỐI THỦ ĐÃ VỀ ĐÍCH TRƯỚC!</h3>
              <p className="text-xs font-bold text-slate-600">Không sao cả, hãy bấm chơi lại để phục thù nào!</p>
            </>
          )}

          <button
            onClick={restartRace}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md"
          >
            Chơi Lại Trận Đua
          </button>
        </div>
      )}
    </div>
  );
};
