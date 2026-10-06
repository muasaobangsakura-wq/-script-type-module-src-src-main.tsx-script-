import { Unit } from '../../../types';
import { getTreasureHuntRiddles } from '../gameContentAdapter';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Key, Gem, Lock, Unlock } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound } from '../../../utils/audio';

interface TreasureHuntGameProps {
  onBack: () => void;
  unit?: Unit;
}

const CHESTS = [
  { id: 1, title: 'Rương Đồng Cổ', riddle: 'I have hands, but cannot clap. I have a face, but cannot smile. What am I?', answer: 'CLOCK', options: ['CLOCK', 'MIRROR', 'BOOK', 'DOLL'] },
  { id: 2, title: 'Rương Bạc Huyền Bí', riddle: 'What gets wetter and wetter the more it dries?', answer: 'TOWEL', options: ['SPONGE', 'TOWEL', 'WATER', 'CLOUD'] },
  { id: 3, title: 'Rương Vàng Đảo Ngọc', riddle: 'I speak without a mouth and hear without ears. What am I?', answer: 'ECHO', options: ['SHADOW', 'WIND', 'ECHO', 'RAIN'] },
];

export const TreasureHuntGame: React.FC<TreasureHuntGameProps> = ({ onBack, unit }) => {
  const currentRiddles = unit ? getTreasureHuntRiddles(unit) : CHESTS;
  const { gainXP } = useApp();
  const [chestIdx, setChestIdx] = useState(0);
  const [unlockedChests, setUnlockedChests] = useState<number[]>([]);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const current = currentRiddles[chestIdx] || CHESTS[0];

  const handlePick = (ans: string) => {
    if (selectedAns) return;
    setSelectedAns(ans);

    const targetAnswer = (current as any).answer || current.options[(current as any).correct ?? 0];
    if (ans === targetAnswer) {
      sound.playSuccess();
      const currentId = (current as any).id ?? chestIdx + 1;
      const newUnlocked = [...unlockedChests, currentId];
      setUnlockedChests(newUnlocked);

      if (newUnlocked.length >= currentRiddles.length) {
        sound.playFanfare();
        confetti({ particleCount: 120, spread: 80 });
        setFinished(true);
        gainXP(50, 10);
      }
    } else {
      sound.playWrong();
    }
  };

  const handleNextChest = () => {
    sound.playPop();
    setSelectedAns(null);
    if (chestIdx < currentRiddles.length - 1) {
      setChestIdx(c => c + 1);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <div className="flex items-center gap-2 text-xs font-black">
          <span className="text-amber-800 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1">
            <Key className="w-3.5 h-3.5" /> {unlockedChests.length} / 3 Rương Mở
          </span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🏴‍☠️ SĂN KHO BÁU ĐẢO NGỌC</h2>
        <p className="text-xs font-bold text-slate-500">Giải mã 3 câu đố tiếng Anh bí ẩn để mở khóa rương châu báu!</p>
      </div>

      {/* 3 Chests Status Display */}
      <div className="flex justify-center gap-4 py-2">
        {CHESTS.map((c, i) => {
          const isOpen = unlockedChests.includes(c.id);
          const isCurrent = i === chestIdx;

          return (
            <div
              key={c.id}
              className={`p-3 rounded-2xl border-3 flex flex-col items-center gap-1 w-24 text-center transition-all ${
                isOpen
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                  : isCurrent
                  ? 'bg-amber-100 border-amber-400 text-amber-950 scale-105 shadow-md'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <span className="text-3xl">{isOpen ? '💎' : isCurrent ? '🎁' : '🔒'}</span>
              <span className="text-[10px] font-black">{c.title.split(' ')[1]}</span>
            </div>
          );
        })}
      </div>

      {!finished ? (
        <div className="space-y-6 max-w-md mx-auto">
          <div className="p-6 rounded-3xl bg-amber-50/80 border-3 border-amber-200 text-center space-y-2">
            <span className="text-xs font-black text-amber-800 uppercase tracking-widest">{current.title}</span>
            <p className="text-base font-black text-indigo-950 italic leading-relaxed">
              "{current.riddle}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {current.options.map((opt, i) => {
              const isSelected = selectedAns === opt;
              const isCorrect = opt === current.answer;
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

          {selectedAns && selectedAns === current.answer && chestIdx < CHESTS.length - 1 && (
            <div className="text-center pt-2">
              <button
                onClick={handleNextChest}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-2xl shadow-md transition-all active:scale-95"
              >
                Mở Rương Tiếp Theo &rarr;
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          <h3 className="text-2xl font-black text-emerald-800">🎉 BẠN ĐÃ MỞ TOÀN BỘ KHO BÁU!</h3>
          <p className="text-xs font-bold text-slate-600">Thu hoạch +50 XP và 10 Viên Đá Quý Lấp Lánh!</p>
          <button
            onClick={() => {
              setChestIdx(0);
              setUnlockedChests([]);
              setSelectedAns(null);
              setFinished(false);
            }}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md"
          >
            Săn Lại Kho Báu
          </button>
        </div>
      )}
    </div>
  );
};
