import React from 'react';
import { Flame, Gem, Trophy, Volume2, VolumeX, LogOut, Sparkles, BookOpen, Gamepad2, Brain, User as UserIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

interface StudentHeaderProps {
  currentTab: string;
  onNavigateTab: (tab: string) => void;
  onOpenMascotChat: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  currentTab,
  onNavigateTab,
  onOpenMascotChat
}) => {
  const { currentUser, soundMuted, toggleSound, logout } = useApp();

  if (!currentUser) return null;

  // Level names
  const levelNames: Record<number, string> = {
    1: 'Explorer',
    2: 'Bright Star',
    3: 'Word Champion',
    4: 'Super Hero',
    5: 'English Master'
  };

  const levelTitle = levelNames[currentUser.level] || 'English Master';
  const nextLevelXP = currentUser.level * 200;
  const currentLevelBaseXP = (currentUser.level - 1) * 200;
  const progressPercent = Math.min(100, Math.max(10, Math.round(((currentUser.xp - currentLevelBaseXP) / (nextLevelXP - currentLevelBaseXP)) * 100)));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Mascot Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              sound.playPop();
              onOpenMascotChat();
            }}
            title="Trò chuyện với Sparky the Dino"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-100 hover:bg-emerald-200 border-2 border-emerald-400 flex items-center justify-center text-2xl transition-transform hover:scale-110 active:scale-95 shadow-xs relative"
          >
            🦖
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center text-[8px] font-black animate-ping" />
          </button>
          
          <button
            onClick={() => {
              sound.playPop();
              onNavigateTab('home');
            }}
            className="text-left select-none cursor-pointer"
          >
            <div className="text-base sm:text-lg font-black text-indigo-950 tracking-tight flex items-center gap-1.5">
              <span>ENGLISH FUN</span>
              <span className="bg-amber-400 text-amber-950 text-[10px] px-1.5 py-0.5 rounded-md uppercase font-extrabold hidden sm:inline">AI Primary</span>
            </div>
            <div className="text-[11px] font-extrabold text-emerald-600 flex items-center gap-1">
              <span>Cấp {currentUser.level}: {levelTitle}</span>
            </div>
          </button>
        </div>

        {/* Gamification Stats: XP, Streak, Gems */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* XP Bar */}
          <div className="hidden md:flex flex-col w-32 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <div className="flex justify-between text-[10px] font-black text-indigo-950 px-1 mb-0.5">
              <span>{currentUser.xp} XP</span>
              <span className="text-slate-500">Lv.{currentUser.level + 1}</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center gap-1 bg-orange-50 border-2 border-orange-200 text-orange-600 px-2.5 py-1 rounded-2xl font-black text-xs shadow-xs" title="Chuỗi ngày học liên tục">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-bounce" />
            <span>{currentUser.streak}</span>
            <span className="text-[10px] hidden sm:inline">ngày</span>
          </div>

          {/* Gems */}
          <div className="flex items-center gap-1 bg-sky-50 border-2 border-sky-200 text-sky-600 px-2.5 py-1 rounded-2xl font-black text-xs shadow-xs" title="Đá quý thưởng">
            <Gem className="w-4 h-4 fill-sky-400 text-sky-500" />
            <span>{currentUser.gems}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* User Avatar & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <button
              onClick={() => {
                sound.playPop();
                onNavigateTab('profile');
              }}
              className="flex items-center gap-1.5 p-1 rounded-2xl hover:bg-amber-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-amber-200 border-2 border-amber-400 flex items-center justify-center text-lg">
                {currentUser.avatar}
              </div>
              <span className="text-xs font-black text-slate-800 hidden lg:inline truncate max-w-[100px]">
                {currentUser.fullName.split(' ').slice(-1)[0]}
              </span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                logout();
              }}
              title="Đăng xuất"
              className="p-2 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation for Students */}
      <nav className="bg-amber-100/60 border-t border-amber-200 px-4 py-1.5 flex justify-center gap-1 sm:gap-4 overflow-x-auto text-xs font-black">
        <button
          onClick={() => {
            sound.playPop();
            onNavigateTab('home');
          }}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
            currentTab === 'home'
              ? 'bg-amber-400 text-indigo-950 shadow-xs'
              : 'text-indigo-900/80 hover:bg-amber-200/60'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Bài Học SGK</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onNavigateTab('games');
          }}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
            currentTab === 'games'
              ? 'bg-amber-400 text-indigo-950 shadow-xs'
              : 'text-indigo-900/80 hover:bg-amber-200/60'
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Game Center (14 Trò Chơi)</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onNavigateTab('review');
          }}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
            currentTab === 'review'
              ? 'bg-amber-400 text-indigo-950 shadow-xs'
              : 'text-indigo-900/80 hover:bg-amber-200/60'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Sổ Tay Ôn Tập AI</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onNavigateTab('profile');
          }}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
            currentTab === 'profile'
              ? 'bg-amber-400 text-indigo-950 shadow-xs'
              : 'text-indigo-900/80 hover:bg-amber-200/60'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Huy Hiệu & Đổi Quà</span>
        </button>
      </nav>
    </header>
  );
};
