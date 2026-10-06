import { Unit } from '../../../types';
import { getSpinWheelTasks } from '../gameContentAdapter';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Sparkles, Gift } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakEnglish } from '../../../utils/audio';

interface SpinWheelGameProps {
  onBack: () => void;
  unit?: Unit;
}

const WHEEL_SLICES = [
  { label: '+25 XP Thưởng', rewardXP: 25, color: '#f59e0b', textColor: '#fff' },
  { label: 'Thử thách: Đọc từ "PUPPY"', word: 'Puppy', color: '#10b981', textColor: '#fff' },
  { label: '+3 Đá Quý 💎', rewardGems: 3, rewardXP: 10, color: '#06b6d4', textColor: '#fff' },
  { label: 'Thử thách: Đọc từ "RAINBOW"', word: 'Rainbow', color: '#8b5cf6', textColor: '#fff' },
  { label: '+50 XP Siêu Cấp', rewardXP: 50, color: '#ef4444', textColor: '#fff' },
  { label: 'Thử thách: Đọc từ "FRIEND"', word: 'Friend', color: '#3b82f6', textColor: '#fff' },
];

export const SpinWheelGame: React.FC<SpinWheelGameProps> = ({ onBack, unit }) => {
  const currentItems = unit ? getSpinWheelTasks(unit) : WHEEL_SLICES;
  const activeSlices = currentItems.length > 0 ? currentItems : WHEEL_SLICES;
  const { gainXP } = useApp();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<any | null>(null);

  const handleSpin = () => {
    if (spinning) return;
    sound.playPop();
    setSpinning(true);
    setResult(null);

    // Pick a random slice
    const randomIndex = Math.floor(Math.random() * activeSlices.length);
    const sliceAngle = 360 / activeSlices.length;
    // 5 to 7 full rotations + target angle
    const targetAngle = 360 * 5 + (360 - (randomIndex * sliceAngle + sliceAngle / 2));
    const newRotation = rotation + targetAngle;

    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const chosen = activeSlices[randomIndex];
      setResult(chosen);
      sound.playFanfare();
      confetti({ particleCount: 70, spread: 60 });

      if (chosen.rewardXP) {
        gainXP(chosen.rewardXP, chosen.rewardGems || 0);
      }
      if (chosen.word) {
        speakEnglish(chosen.word);
      }
    }, 3500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🎡 VÒNG QUAY MAY MẮN TIẾNG ANH</h2>
        <p className="text-xs font-bold text-slate-500">Quay để nhận thử thách từ vựng hoặc phần thưởng XP bất ngờ!</p>
      </div>

      <div className="relative max-w-xs mx-auto py-4 flex flex-col items-center">
        {/* Wheel Needle pointer */}
        <div className="absolute top-2 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-rose-600 drop-shadow-md" />

        {/* The SVG Wheel */}
        <div
          className="w-64 h-64 rounded-full border-4 border-amber-400 shadow-2xl relative overflow-hidden transition-transform duration-[3500ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {WHEEL_SLICES.map((slice, i) => {
              const startAngle = i * 60;
              const endAngle = (i + 1) * 60;
              const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
              const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
              const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
              const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);
              const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

              return (
                <path
                  key={i}
                  d={pathData}
                  fill={slice.color}
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />
              );
            })}
          </svg>
          {/* Wheel Hub */}
          <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full border-4 border-amber-400 flex items-center justify-center font-black text-xs shadow-inner">
            🌟
          </div>
        </div>

        {/* Spin Action Button */}
        <button
          disabled={spinning}
          onClick={handleSpin}
          className="mt-6 px-8 py-3.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 active:scale-95 disabled:opacity-50 text-indigo-950 font-black text-sm rounded-2xl shadow-lg cursor-pointer"
        >
          {spinning ? 'ĐANG QUAY TÍT...' : 'BẤM ĐỂ QUAY NGAY!'}
        </button>

        {result && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-center space-y-1 animate-scaleIn w-full">
            <span className="text-xs font-bold text-slate-500">KẾT QUẢ VÒNG QUAY</span>
            <h4 className="text-base font-black text-indigo-950">{result.label}</h4>
            {result.word && (
              <p className="text-xs font-extrabold text-emerald-700">
                Hãy đọc to: "{result.word}" 🎤 (+20 XP)
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
