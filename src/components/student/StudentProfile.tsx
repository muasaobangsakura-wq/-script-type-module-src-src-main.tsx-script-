import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Gem, 
  Flame, 
  Star, 
  Palette, 
  Check, 
  Save,
  Gift,
  School,
  Medal,
  Users,
  CheckCircle2,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';
import { Mascot } from '../common/Mascot';

interface GiftItem {
  id: string;
  name: string;
  costGems: number;
  icon: string;
  desc: string;
  category: 'stationery' | 'badges' | 'real_gift';
}

const GIFTS_CATALOG: GiftItem[] = [
  { id: 'g1', name: 'Hộp Bút Chì Màu Sparky Dino', costGems: 100, icon: '✏️', desc: 'Bộ 12 bút chì màu học tập sinh động', category: 'stationery' },
  { id: 'g2', name: 'Thước Kẻ Thông Thái Dino', costGems: 150, icon: '📏', desc: 'Thước kẻ dẻo in bảng chữ cái tiếng Anh', category: 'stationery' },
  { id: 'g3', name: 'Vở Ô Ly Tiếng Anh Tân Kỳ', costGems: 120, icon: '📓', desc: 'Vở tập viết 4 ô ly có hình mascot Sparky', category: 'stationery' },
  { id: 'g4', name: 'Thẻ Sao Khen Thưởng Ms Que', costGems: 200, icon: '⭐', desc: 'Thẻ sao tích điểm cô Quế tặng trên lớp', category: 'badges' },
  { id: 'g5', name: 'Huy Hiệu Vàng Danh Dự Tân Kỳ', costGems: 250, icon: '🏅', desc: 'Huy hiệu cài áo học sinh xuất sắc', category: 'badges' },
  { id: 'g6', name: 'Sticker Phát Sáng Khủng Long', costGems: 80, icon: '🌟', desc: 'Bộ 30 nhãn dán Sparky dạ quang phát sáng', category: 'stationery' },
  { id: 'g7', name: 'Mô Hình Khủng Long Sparky 3D', costGems: 350, icon: '🦕', desc: 'Mô hình để bàn bạn nhỏ cực mê', category: 'real_gift' },
  { id: 'g8', name: 'Cặp Sách Phi Hành Gia Dino', costGems: 450, icon: '🎒', desc: 'Balo chống gù lưng cao cấp tặng cuối kỳ', category: 'real_gift' },
];

export const StudentProfile: React.FC = () => {
  const { currentUser, updateMascot, users } = useApp();

  const [activeTab, setActiveTab] = useState<'ranking' | 'gifts' | 'badges' | 'mascot'>('ranking');
  const [rankingScope, setRankingScope] = useState<'class' | 'grade'>('class');

  // Mascot customization
  const [selectedSkin, setSelectedSkin] = useState(currentUser?.mascotCustomization?.skin || 'emerald');
  const [selectedHat, setSelectedHat] = useState(currentUser?.mascotCustomization?.hat || 'star_cap');
  const [selectedAccessory, setSelectedAccessory] = useState(currentUser?.mascotCustomization?.accessory || 'none');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Redeemed gifts state
  const [redeemedGiftIds, setRedeemedGiftIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`ef_redeemed_${currentUser?.id}`);
    return saved ? JSON.parse(saved) : ['g6']; // Default sticker gift
  });

  const [redeemToast, setRedeemToast] = useState<string | null>(null);

  // Compute Class Ranking & Grade Ranking
  const allStudents = users.filter(u => u.role === 'STUDENT');

  // 1. Class Students (cùng lớp)
  const classStudents = allStudents
    .filter(u => u.classId === currentUser?.classId)
    .sort((a, b) => b.xp - a.xp);
  const classRankIndex = classStudents.findIndex(u => u.id === currentUser?.id);
  const classRank = classRankIndex >= 0 ? classRankIndex + 1 : 1;

  // 2. Grade Students (cùng khối toàn trường Tân Kỳ)
  const gradeStudents = allStudents
    .filter(u => u.grade === (currentUser?.grade || 1))
    .sort((a, b) => b.xp - a.xp);
  const gradeRankIndex = gradeStudents.findIndex(u => u.id === currentUser?.id);
  const gradeRank = gradeRankIndex >= 0 ? gradeRankIndex + 1 : 1;

  const badgesList = [
    { id: 'first_step', title: 'Bước Chân Đầu Tiên', desc: 'Hoàn thành bài học tiếng Anh đầu tiên', icon: '🌱' },
    { id: 'streak_3', title: 'Ngọn Lửa Chăm Chỉ', desc: 'Học liên tục 3 ngày không nghỉ', icon: '🔥' },
    { id: 'vocab_master', title: 'Chiến Binh Từ Vựng', desc: 'Ghi nhớ 20 từ vựng SGK', icon: '📚' },
    { id: 'speed_runner', title: 'Tay Đua Siêu Tốc', desc: 'Chiến thắng màn đua xe English Race', icon: '🏎️' },
    { id: 'quiz_bee_champion', title: 'Quán Quân Quiz Bee', desc: 'Đạt điểm tối đa tại đấu trường đố vui', icon: '🐝' },
    { id: 'treasure_master', title: 'Thợ Săn Kho Báu', desc: 'Mở khóa toàn bộ rương báu đảo ngọc', icon: '🏴‍☠️' },
    { id: 'pronunciation_star', title: 'Ngôi Sao Phát Âm', desc: 'Đạt 100 điểm phát âm micro cùng Sparky', icon: '🎤' },
    { id: 'leaderboard_hero', title: 'Thủ Lĩnh Bảng Vàng', desc: 'Vào Top 3 xếp hạng thi đua của lớp', icon: '👑' }
  ];

  const handleSaveMascot = () => {
    sound.playSuccess();
    confetti({ particleCount: 70, spread: 60 });
    updateMascot({
      skin: selectedSkin,
      hat: selectedHat,
      accessory: selectedAccessory
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleRedeemGift = (gift: GiftItem) => {
    if (redeemedGiftIds.includes(gift.id)) {
      sound.playPop();
      setRedeemToast(`Bé đã sở hữu "${gift.name}" rồi nha! Hãy đổi món quà khác nhé!`);
      setTimeout(() => setRedeemToast(null), 3000);
      return;
    }

    if ((currentUser?.gems || 0) < gift.costGems) {
      sound.playWrong();
      setRedeemToast(`Bé cần thêm ${gift.costGems - (currentUser?.gems || 0)} 💎 nữa để đổi món quà này. Cố gắng chơi game và học thêm nhé!`);
      setTimeout(() => setRedeemToast(null), 3500);
      return;
    }

    sound.playFanfare();
    confetti({ particleCount: 100, spread: 70 });
    const updated = [...redeemedGiftIds, gift.id];
    setRedeemedGiftIds(updated);
    localStorage.setItem(`ef_redeemed_${currentUser?.id}`, JSON.stringify(updated));

    // Deduct gems
    if (currentUser) {
      currentUser.gems = Math.max(0, (currentUser.gems || 0) - gift.costGems);
      localStorage.setItem('ef_current_user', JSON.stringify(currentUser));
    }

    setRedeemToast(`🎉 CHÚC MỪNG! Bé đã đổi thành công "${gift.name}"! Hãy báo cô Quế để nhận quà nhé!`);
    setTimeout(() => setRedeemToast(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Profile Card Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left text-indigo-950">
        <div className="w-24 h-24 rounded-full bg-white border-4 border-amber-200 flex items-center justify-center text-5xl shadow-md shrink-0">
          {currentUser?.avatar || '👦🏻'}
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-black text-indigo-950">{currentUser?.fullName}</h2>
            <span className="text-xs font-black bg-indigo-950 text-white px-3 py-1 rounded-full shadow-xs">
              {currentUser?.className || 'Lớp 1A1'} (Khối {currentUser?.grade || 1})
            </span>
          </div>
          <p className="text-xs font-bold text-indigo-900/90">
            Tên đăng nhập (Mã HS): <strong>{currentUser?.code}</strong> • PIN: <strong>{currentUser?.pin}</strong> • Trường TH Tân Kỳ
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-black">
            <div className="flex items-center gap-1.5 bg-white/40 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/40">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Cấp độ: {currentUser?.level}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/40 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/40">
              <Flame className="w-4 h-4 fill-orange-600 text-orange-600" />
              <span>Chuỗi: {currentUser?.streak} ngày</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/40 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/40">
              <Gem className="w-4 h-4 fill-sky-600 text-sky-600" />
              <span>Đá quý: {currentUser?.gems || 0} 💎</span>
            </div>
            <div className="flex items-center gap-1.5 bg-indigo-950 text-amber-300 px-3 py-1.5 rounded-xl shadow-xs">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Tổng XP: {currentUser?.xp || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* HAI KHỐI XẾP HẠNG VỊ TRÍ NỔI BẬT THEO YÊU CẦU */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* VỊ TRÍ XẾP HẠNG TRONG LỚP */}
        <div className="bg-white rounded-3xl p-5 border-4 border-amber-300 shadow-md flex items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 text-7xl opacity-10 pointer-events-none">🏅</div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-700">
              <Medal className="w-4 h-4 text-amber-500" />
              <span>VỊ TRÍ XẾP HẠNG TRONG LỚP</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-indigo-950 flex items-baseline gap-2">
              <span className="text-amber-500">Hạng #{classRank}</span>
              <span className="text-xs font-bold text-slate-500">/ {classStudents.length} bạn {currentUser?.className}</span>
            </div>
            <p className="text-xs text-slate-600 font-semibold">
              {classRank === 1 ? '🌟 Tuyệt đỉnh! Bạn đang dẫn đầu lớp!' : classRank <= 3 ? '🎉 Bạn đang nằm trong Top 3 xuất sắc nhất lớp!' : '💪 Tích cực hoàn thành bài tập để vươn lên Top 3 nhé!'}
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex flex-col items-center justify-center text-amber-900 font-black shrink-0">
            <span className="text-2xl">{classRank === 1 ? '🥇' : classRank === 2 ? '🥈' : classRank === 3 ? '🥉' : '🎖️'}</span>
            <span className="text-[10px]">Top {classRank}</span>
          </div>
        </div>

        {/* VỊ TRÍ XẾP HẠNG CÙNG KHỐI TRONG TOÀN TRƯỜNG */}
        <div className="bg-white rounded-3xl p-5 border-4 border-indigo-300 shadow-md flex items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 text-7xl opacity-10 pointer-events-none">🏫</div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-indigo-700">
              <School className="w-4 h-4 text-indigo-500" />
              <span>VỊ TRÍ CÙNG KHỐI TOÀN TRƯỜNG</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-indigo-950 flex items-baseline gap-2">
              <span className="text-indigo-600">Hạng #{gradeRank}</span>
              <span className="text-xs font-bold text-slate-500">/ {gradeStudents.length} học sinh Khối {currentUser?.grade || 1}</span>
            </div>
            <p className="text-xs text-slate-600 font-semibold">
              Toàn trường Tiểu học Tân Kỳ • Khối {currentUser?.grade || 1} (16 lớp thi đua)
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex flex-col items-center justify-center text-indigo-900 font-black shrink-0">
            <span className="text-2xl">{gradeRank === 1 ? '👑' : gradeRank <= 3 ? '🏆' : '⭐'}</span>
            <span className="text-[10px]">Khối {currentUser?.grade}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Profile Subsections */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'ranking', label: '🏆 Bảng Xếp Hạng Vị Trí', icon: Trophy },
          { id: 'gifts', label: '🎁 Đổi Quà & Thưởng Đá Quý', icon: Gift },
          { id: 'badges', label: '🎖️ Bộ Sưu Tập Huy Hiệu', icon: Award },
          { id: 'mascot', label: '🎨 Thay Đồ Cho Sparky', icon: Palette },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-SECTION 1: BẢNG XẾP HẠNG THI ĐUA TRONG LỚP & CÙNG KHỐI */}
      {activeTab === 'ranking' && (
        <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-lg font-black text-indigo-950 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>BẢNG XẾP HẠNG VỊ TRÍ HỌC TẬP</span>
              </h3>
              <p className="text-xs font-bold text-slate-500">
                Xếp hạng dựa trên tổng điểm XP, chuỗi ngày học chăm chỉ và số sao đạt được.
              </p>
            </div>

            {/* Scope Toggle: Trong Lớp vs Toàn Khối */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl shrink-0">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setRankingScope('class');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  rankingScope === 'class' ? 'bg-amber-400 text-indigo-950 shadow-xs' : 'text-slate-600 hover:text-indigo-950'
                }`}
              >
                Trong Lớp {currentUser?.className}
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setRankingScope('grade');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  rankingScope === 'grade' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-indigo-950'
                }`}
              >
                Cùng Khối {currentUser?.grade} Toàn Trường
              </button>
            </div>
          </div>

          {/* Ranking Table List */}
          <div className="space-y-2">
            {(rankingScope === 'class' ? classStudents : gradeStudents).map((stu, index) => {
              const rank = index + 1;
              const isCurrent = stu.id === currentUser?.id;

              return (
                <div
                  key={stu.id}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all ${
                    isCurrent
                      ? 'bg-amber-50 border-amber-400 shadow-md ring-2 ring-amber-300 scale-[1.01]'
                      : rank === 1
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                      rank === 1
                        ? 'bg-amber-400 text-indigo-950 shadow-xs text-sm'
                        : rank === 2
                        ? 'bg-slate-300 text-slate-800'
                        : rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}>
                      {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                    </span>

                    {/* Student Avatar & Name */}
                    <span className="text-2xl shrink-0">{stu.avatar}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs sm:text-sm text-indigo-950">{stu.fullName}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-black bg-amber-400 text-indigo-950 px-2 py-0.2 rounded-full">
                            BẠN
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-bold text-slate-500 flex items-center gap-2">
                        <span>{stu.className}</span>
                        <span>•</span>
                        <span>Cấp độ {stu.level}</span>
                        <span>•</span>
                        <span>Chuỗi {stu.streak} ngày</span>
                      </div>
                    </div>
                  </div>

                  {/* Student XP */}
                  <div className="text-right shrink-0">
                    <span className="font-mono font-black text-sm text-indigo-600 block">
                      {stu.xp} XP
                    </span>
                    <span className="text-[10px] font-bold text-amber-700">
                      {stu.gems || 0} 💎
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: CỬA HÀNG ĐỔI QUÀ VỚI ĐÁ QUÝ 💎 */}
      {activeTab === 'gifts' && (
        <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-indigo-950 flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                <span>CỬA HÀNG ĐỔI QUÀ THƯỞNG HỌC TẬP</span>
              </h3>
              <p className="text-xs font-bold text-slate-500">
                Dùng số Đá Quý 💎 tích lũy được từ các bài học và minigames để đổi quà tặng học tập thực tế!
              </p>
            </div>

            <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-300 px-4 py-2 rounded-2xl font-black text-xs text-amber-900 shrink-0">
              <Gem className="w-4 h-4 fill-sky-400 text-sky-500" />
              <span>Số dư của bạn: <strong>{currentUser?.gems || 0} 💎</strong></span>
            </div>
          </div>

          {redeemToast && (
            <div className="p-3.5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-xs font-black text-emerald-800 animate-fadeIn flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{redeemToast}</span>
            </div>
          )}

          {/* Gifts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GIFTS_CATALOG.map(g => {
              const isOwned = redeemedGiftIds.includes(g.id);
              const canAfford = (currentUser?.gems || 0) >= g.costGems;

              return (
                <div
                  key={g.id}
                  className={`p-4 rounded-3xl border-3 flex flex-col justify-between space-y-3 transition-all duration-300 ${
                    isOwned
                      ? 'bg-emerald-50/70 border-emerald-300 text-indigo-950'
                      : canAfford
                      ? 'bg-white border-amber-300 hover:border-amber-400 hover:shadow-lg'
                      : 'bg-slate-50 border-slate-200 opacity-80'
                  }`}
                >
                  <div className="text-center space-y-1.5">
                    <span className="text-5xl block my-1">{g.icon}</span>
                    <h4 className="text-xs font-black text-indigo-950 leading-snug">{g.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{g.desc}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-black">
                      <span className="text-slate-500">Giá đổi:</span>
                      <span className="text-amber-600 flex items-center gap-1">
                        <Gem className="w-3.5 h-3.5 fill-sky-400 text-sky-500" />
                        <span>{g.costGems} 💎</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isOwned}
                      onClick={() => handleRedeemGift(g)}
                      className={`w-full py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs ${
                        isOwned
                          ? 'bg-emerald-600 text-white cursor-default'
                          : canAfford
                          ? 'bg-amber-400 hover:bg-amber-500 text-indigo-950 active:scale-95 shadow-amber-300/50'
                          : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                      }`}
                    >
                      {isOwned ? '✓ ĐÃ ĐỔI THÀNH CÔNG' : canAfford ? 'ĐỔI QUÀ NGAY' : 'CHƯA ĐỦ ĐÁ QUÝ'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: BỘ SƯU TẬP HUY HIỆU */}
      {activeTab === 'badges' && (
        <div className="bg-white rounded-3xl p-6 border-4 border-amber-200 shadow-md space-y-4">
          <div className="border-b border-amber-100 pb-3">
            <h3 className="text-lg font-black text-indigo-950 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>BỘ SƯU TẬP HUY HIỆU THÀNH TÍCH TIỂU HỌC</span>
            </h3>
            <p className="text-xs font-bold text-slate-500">
              Hoàn thành các thử thách học tập để mở khóa huy hiệu vinh danh!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badgesList.map(b => {
              const hasBadge = currentUser?.badges?.includes(b.id) || b.id === 'first_step' || b.id === 'streak_3';

              return (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center space-y-1.5 transition-all ${
                    hasBadge
                      ? 'bg-amber-50/70 border-amber-300 text-indigo-950 shadow-xs scale-100'
                      : 'bg-slate-50 border-slate-200 opacity-40 grayscale'
                  }`}
                >
                  <span className="text-4xl mb-1">{b.icon}</span>
                  <h4 className="text-xs font-black">{b.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{b.desc}</p>
                  {hasBadge ? (
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full mt-1">
                      ✓ ĐÃ ĐẠT
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 mt-1">
                      Chưa mở khóa
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-SECTION 4: PHÒNG THAY ĐỒ LINH VẬT SPARKY */}
      {activeTab === 'mascot' && (
        <div className="bg-white rounded-3xl p-6 border-4 border-emerald-300 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-3 border-emerald-100">
            <div>
              <h3 className="text-lg font-black text-indigo-950 flex items-center gap-2">
                <Palette className="w-5 h-5 text-emerald-500" />
                <span>PHÒNG THAY ĐỒ LINH VẬT SPARKY</span>
              </h3>
              <p className="text-xs font-bold text-slate-500">Tùy biến trang phục và màu sắc cho bạn khủng long AI đồng hành!</p>
            </div>

            <button
              onClick={handleSaveMascot}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>LƯU TRANG PHỤC</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Mascot Live Preview */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-50 to-teal-100 border-2 border-emerald-200 flex flex-col items-center justify-center text-center">
              <Mascot
                mood="cheering"
                size="lg"
                skin={selectedSkin}
                hat={selectedHat}
                message="Oa! Bộ đồ mới này trông mình ngầu quá bạn ơi! 🦖✨"
              />
              {savedSuccess && (
                <span className="mt-3 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full animate-bounce">
                  Đã lưu ngoại hình mới cho Sparky!
                </span>
              )}
            </div>

            {/* Outfit Selectors */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-indigo-950 mb-2 uppercase">Màu da khủng long:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'emerald', label: 'Xanh Lá', bg: 'bg-emerald-500' },
                    { id: 'amber', label: 'Vàng Kim', bg: 'bg-amber-500' },
                    { id: 'indigo', label: 'Lam Ngọc', bg: 'bg-indigo-500' },
                    { id: 'rose', label: 'Hồng Đào', bg: 'bg-rose-500' },
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => {
                        sound.playPop();
                        setSelectedSkin(s.id);
                      }}
                      className={`p-2.5 rounded-xl border-3 flex flex-col items-center gap-1 text-xs font-black transition-all cursor-pointer ${
                        selectedSkin === s.id ? 'border-indigo-950 scale-105 shadow-md bg-white' : 'border-slate-200 opacity-80'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full ${s.bg}`} />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-indigo-950 mb-2 uppercase">Mũ thời trang:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'star_cap', label: 'Mũ Ngôi Sao', icon: '⭐' },
                    { id: 'crown', label: 'Vương Miện Vàng', icon: '👑' },
                    { id: 'explorer', label: 'Mũ Thám Hiểm', icon: '🤠' },
                  ].map(h => (
                    <button
                      key={h.id}
                      onClick={() => {
                        sound.playPop();
                        setSelectedHat(h.id);
                      }}
                      className={`p-3 rounded-2xl border-3 flex flex-col items-center gap-1 text-xs font-black transition-all cursor-pointer ${
                        selectedHat === h.id ? 'bg-amber-100 border-amber-500 text-indigo-950 scale-105 shadow-md' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className="text-2xl">{h.icon}</span>
                      <span className="truncate">{h.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
