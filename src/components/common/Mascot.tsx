import React, { useState } from 'react';
import { Volume2, Sparkles, MessageCircle, X } from 'lucide-react';
import { speakVietnamese, sound } from '../../utils/audio';

interface MascotProps {
  mood?: 'happy' | 'cheering' | 'thinking' | 'speaking' | 'comforting';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onAskAI?: () => void;
  hat?: string;
  skin?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  message,
  size = 'md',
  interactive = true,
  onAskAI,
  hat = 'star_cap',
  skin = 'emerald'
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(true);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!message) return;
    setIsSpeaking(true);
    sound.playPop();
    speakVietnamese(message).finally(() => setIsSpeaking(false));
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36'
  };

  // Dinosaur color styling
  const skinColors: Record<string, { bg: string; belly: string; spots: string }> = {
    emerald: { bg: '#10b981', belly: '#a7f3d0', spots: '#047857' },
    amber: { bg: '#f59e0b', belly: '#fef3c7', spots: '#b45309' },
    indigo: { bg: '#6366f1', belly: '#e0e7ff', spots: '#4338ca' },
    rose: { bg: '#f43f5e', belly: '#ffe4e6', spots: '#be123c' }
  };

  const selectedSkin = skinColors[skin] || skinColors.emerald;

  return (
    <div className="relative inline-flex items-center gap-3">
      {/* Mascot Graphic */}
      <div 
        onClick={() => {
          if (interactive && message) {
            handleSpeak({} as any);
          }
        }}
        className={`relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 select-none ${sizeClasses[size]} ${isSpeaking ? 'animate-bounce' : ''}`}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Dino Tail */}
          <path d="M25 80 Q10 85 5 70 Q15 65 30 75 Z" fill={selectedSkin.bg} />
          
          {/* Dino Body */}
          <ellipse cx="60" cy="75" rx="35" ry="32" fill={selectedSkin.bg} />
          
          {/* Dino Belly */}
          <ellipse cx="65" cy="78" rx="20" ry="22" fill={selectedSkin.belly} />

          {/* Dino Back Spikes */}
          <polygon points="40,40 45,30 50,40" fill="#f59e0b" />
          <polygon points="30,50 35,40 40,50" fill="#f59e0b" />
          <polygon points="22,62 26,53 30,62" fill="#f59e0b" />

          {/* Dino Head */}
          <circle cx="75" cy="45" r="26" fill={selectedSkin.bg} />
          {/* Dino Snout */}
          <ellipse cx="90" cy="50" rx="14" ry="12" fill={selectedSkin.bg} />
          <circle cx="94" cy="47" r="2" fill="#065f46" /> {/* Nostril */}

          {/* Dino Eyes */}
          {mood === 'happy' || mood === 'cheering' ? (
            <>
              {/* Joyful curved eyes */}
              <path d="M70 42 Q75 35 80 42" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="68" cy="48" r="4" fill="#fda4af" /> {/* Cheek blush */}
              <circle cx="90" cy="54" r="4" fill="#fda4af" />
            </>
          ) : mood === 'thinking' ? (
            <>
              <circle cx="75" cy="40" r="5" fill="#1e293b" />
              <circle cx="73" cy="38" r="2" fill="#ffffff" />
              <path d="M70 33 L80 34" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="75" cy="40" r="6" fill="#1e293b" />
              <circle cx="73" cy="38" r="2.5" fill="#ffffff" />
            </>
          )}

          {/* Dino Mouth */}
          {mood === 'cheering' ? (
            <path d="M82 52 Q88 62 94 52 Z" fill="#b91c1c" />
          ) : mood === 'speaking' ? (
            <ellipse cx="88" cy="54" rx="4" ry="5" fill="#b91c1c" />
          ) : (
            <path d="M84 53 Q88 58 93 53" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {/* Dino Feet */}
          <ellipse cx="48" cy="105" rx="9" ry="6" fill={selectedSkin.spots} />
          <ellipse cx="72" cy="105" rx="9" ry="6" fill={selectedSkin.spots} />

          {/* Dino Hands */}
          {mood === 'cheering' ? (
            <>
              <ellipse cx="80" cy="62" rx="5" ry="8" transform="rotate(-30 80 62)" fill={selectedSkin.bg} />
              <ellipse cx="98" cy="62" rx="5" ry="8" transform="rotate(30 98 62)" fill={selectedSkin.bg} />
            </>
          ) : (
            <ellipse cx="82" cy="72" rx="6" ry="4" fill={selectedSkin.bg} />
          )}

          {/* Optional Hat Customization */}
          {hat === 'star_cap' && (
            <g transform="translate(62, 16)">
              <polygon points="12,0 16,10 27,10 18,17 21,28 12,22 3,28 6,17 -3,10 8,10" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            </g>
          )}
          {hat === 'crown' && (
            <g transform="translate(60, 18)">
              <polygon points="0,15 5,2 14,10 23,2 28,15" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              <rect x="0" y="15" width="28" height="4" fill="#eab308" rx="2" />
            </g>
          )}
          {hat === 'explorer' && (
            <g transform="translate(56, 18)">
              <ellipse cx="18" cy="18" rx="22" ry="5" fill="#a16207" />
              <path d="M5 18 Q18 0 31 18 Z" fill="#ca8a04" />
            </g>
          )}
        </svg>

        {/* Floating sparkles when cheerful */}
        {(mood === 'cheering' || mood === 'happy') && (
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
        )}
      </div>

      {/* Speech Bubble */}
      {message && bubbleOpen && (
        <div className="relative max-w-xs sm:max-w-md bg-white border-2 border-emerald-400 rounded-2xl p-3 shadow-lg text-slate-800 text-sm font-medium animate-fadeIn">
          {/* Triangle notch pointing to mascot */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-emerald-400" />
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-7 border-t-transparent border-b-7 border-b-transparent border-r-7 border-r-white" />

          <div className="flex items-start justify-between gap-2">
            <p className="leading-snug text-slate-700">{message}</p>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleSpeak}
                title="Nghe Sparky nói"
                className="p-1 rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-amber-500' : ''}`} />
              </button>
              {onAskAI && (
                <button
                  type="button"
                  onClick={onAskAI}
                  title="Hỏi Sparky"
                  className="p-1 rounded-full text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setBubbleOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
