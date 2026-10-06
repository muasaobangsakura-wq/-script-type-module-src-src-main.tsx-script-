import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Trophy, 
  Play, 
  Star, 
  ArrowLeft,
  Flame,
  Volume2,
  CheckCircle,
  HelpCircle,
  Car,
  Compass,
  Shuffle,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound, speakEnglish } from '../../utils/audio';
import { Unit } from '../../types';

// Import game mini engines
import { MatchingGame } from './minigames/MatchingGame';
import { MemoryCardsGame } from './minigames/MemoryCardsGame';
import { ListenChooseGame } from './minigames/ListenChooseGame';
import { PictureGuessingGame } from './minigames/PictureGuessingGame';
import { MissingLetterGame } from './minigames/MissingLetterGame';
import { WordScrambleGame } from './minigames/WordScrambleGame';
import { SentenceBuilderGame } from './minigames/SentenceBuilderGame';
import { TrueFalseGame } from './minigames/TrueFalseGame';
import { QuizBeeGame } from './minigames/QuizBeeGame';
import { EnglishRaceGame } from './minigames/EnglishRaceGame';
import { TreasureHuntGame } from './minigames/TreasureHuntGame';
import { SpinWheelGame } from './minigames/SpinWheelGame';
import { OddWordGame } from './minigames/OddWordGame';
import { ListenRepeatGame } from './minigames/ListenRepeatGame';
import { SpeakingChallengeGame } from './minigames/SpeakingChallengeGame';

export interface GameMetadata {
  id: string;
  name: string;
  vietnameseName: string;
  icon: string;
  category: 'vocab' | 'listening' | 'speaking' | 'grammar' | 'fun';
  difficulty: 'Dễ' | 'Vừa' | 'Thử Thách';
  xpReward: number;
  description: string;
}

export const GAMES_CATALOG: GameMetadata[] = [
  { id: 'memory', name: '1. Memory Cards', vietnameseName: 'Lật Thẻ Tìm Cặp', icon: '🃏', category: 'vocab', difficulty: 'Vừa', xpReward: 30, description: 'Tìm các cặp thẻ từ vựng và hình 3D giống nhau dưới 60 giây' },
  { id: 'listen_choose', name: '2. Listen & Choose', vietnameseName: 'Nghe Chọn Hình', icon: '🎧', category: 'listening', difficulty: 'Dễ', xpReward: 20, description: 'Lắng nghe phát âm và chọn nhanh hình 3D đồ vật/con vật đúng' },
  { id: 'picture_guessing', name: '3. Picture Guessing', vietnameseName: 'Đoán Hình Hé Lộ', icon: '🖼️', category: 'vocab', difficulty: 'Vừa', xpReward: 30, description: 'Mở từng mảnh ghép để đoán bí mật từ vựng 3D đằng sau' },
  { id: 'missing_letter', name: '4. Missing Letter', vietnameseName: 'Bong Bóng Chữ Cái', icon: '🎈', category: 'vocab', difficulty: 'Dễ', xpReward: 20, description: 'Điền chữ cái còn thiếu vào chỗ trống để tạo thành từ chuẩn' },
  { id: 'word_scramble', name: '5. Word Scramble', vietnameseName: 'Xếp Chữ Xáo Trộn', icon: '🔤', category: 'vocab', difficulty: 'Vừa', xpReward: 25, description: 'Kéo xếp các chữ cái lộn xộn thành từ vựng có nghĩa' },
  { id: 'sentence_builder', name: '6. Sentence Builder', vietnameseName: 'Ghép Câu Siêu Tốc', icon: '🧱', category: 'grammar', difficulty: 'Vừa', xpReward: 30, description: 'Bấm các khối từ để tạo thành câu hoàn chỉnh đúng ngữ pháp' },
  { id: 'true_false', name: '7. True / False Challenge', vietnameseName: 'Đúng Hay Sai?', icon: '⚡', category: 'fun', difficulty: 'Dễ', xpReward: 25, description: 'Phản xạ nhanh như chớp chọn Đúng hoặc Sai trước khi hết giờ' },
  { id: 'quiz_bee', name: '8. Quiz Bee', vietnameseName: 'Đấu Trường Trí Tuệ', icon: '🐝', category: 'fun', difficulty: 'Thử Thách', xpReward: 50, description: 'Vượt qua 5 câu hỏi tiếng Anh với quyền trợ giúp 50:50' },
  { id: 'english_race', name: '9. English Race', vietnameseName: 'Đua Xe Tốc Độ', icon: '🏎️', category: 'fun', difficulty: 'Vừa', xpReward: 40, description: 'Trả lời đúng từ vựng để xe của bạn tăng tốc vượt đối thủ!' },
  { id: 'treasure_hunt', name: '10. Treasure Hunt', vietnameseName: 'Săn Kho Báu Đảo Ngọc', icon: '🏴‍☠️', category: 'fun', difficulty: 'Thử Thách', xpReward: 45, description: 'Giải mã 3 rương báu câu đố để nhận ngọc quý' },
  { id: 'spin_wheel', name: '11. Spin Wheel', vietnameseName: 'Vòng Quay May Mắn', icon: '🎡', category: 'fun', difficulty: 'Dễ', xpReward: 20, description: 'Quay vòng may mắn nhận thử thách từ vựng và quà tặng bất ngờ' },
  { id: 'odd_word', name: '12. Find the Odd Word', vietnameseName: 'Tìm Từ Khác Biệt', icon: '🔍', category: 'vocab', difficulty: 'Vừa', xpReward: 25, description: 'Trong 4 từ, hãy tìm ra 1 từ không cùng nhóm chủ đề' },
  { id: 'listen_repeat', name: '13. Listen & Repeat', vietnameseName: 'Nghe & Nhắc Lại', icon: '🎤', category: 'speaking', difficulty: 'Vừa', xpReward: 35, description: 'Nghe giọng chuẩn bản xứ và đọc lại bằng micro để lấy 3 sao' },
  { id: 'speaking_challenge', name: '14. Speaking Challenge', vietnameseName: 'Đối Đáp Cùng Sparky', icon: '🦖', category: 'speaking', difficulty: 'Thử Thách', xpReward: 45, description: 'Hỏi đáp tiếng Anh tương tác trực tiếp cùng bạn khủng long AI' },
];

export const GameCenter: React.FC = () => {
  const { currentUser, units } = useApp();

  const [selectedGrade, setSelectedGrade] = useState<number>(currentUser?.grade || 1);
  const gradeUnits = units.filter(u => u.grade === selectedGrade);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(() => {
    const matched = units.find(u => u.grade === (currentUser?.grade || 1));
    return matched?.id || units[0]?.id || '';
  });

  // Keep selectedUnitId in sync if grade changes
  useEffect(() => {
    const firstOfGrade = units.find(u => u.grade === selectedGrade);
    if (firstOfGrade) {
      setSelectedUnitId(firstOfGrade.id);
    }
  }, [selectedGrade, units]);

  const activeUnit: Unit = units.find(u => u.id === selectedUnitId) || gradeUnits[0] || units[0];

  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredGames = GAMES_CATALOG.filter(g => {
    if (filterCategory === 'all') return true;
    return g.category === filterCategory;
  });

  const renderActiveGame = () => {
    switch (selectedGameId) {
      case 'memory':
        return <MemoryCardsGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'listen_choose':
        return <ListenChooseGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'picture_guessing':
        return <PictureGuessingGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'missing_letter':
        return <MissingLetterGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'word_scramble':
        return <WordScrambleGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'sentence_builder':
        return <SentenceBuilderGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'true_false':
        return <TrueFalseGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'quiz_bee':
        return <QuizBeeGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'english_race':
        return <EnglishRaceGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'treasure_hunt':
        return <TreasureHuntGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'spin_wheel':
        return <SpinWheelGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'odd_word':
        return <OddWordGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'listen_repeat':
        return <ListenRepeatGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      case 'speaking_challenge':
        return <SpeakingChallengeGame unit={activeUnit} onBack={() => setSelectedGameId(null)} />;
      default:
        return null;
    }
  };

  if (selectedGameId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Active Game Breadcrumb Header */}
        <div className="bg-amber-100/80 border-2 border-amber-300 rounded-2xl p-3 flex items-center justify-between text-xs font-black text-indigo-950">
          <div className="flex items-center gap-2">
            <span>📚 Kiến thức SGK:</span>
            <span className="bg-amber-400 px-2 py-0.5 rounded-lg text-indigo-950">Khối {selectedGrade}</span>
            <span className="text-slate-700 truncate max-w-xs">{activeUnit.title} ({activeUnit.vietnameseTitle})</span>
          </div>
          <span className="text-slate-500 font-bold hidden sm:inline">14 Trò chơi tự động cập nhật kiến thức bài học</span>
        </div>

        {renderActiveGame()}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-6 sm:p-8 text-indigo-950 shadow-xl border-4 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/30 backdrop-blur-xs text-xs font-black uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KHO TRÒ CHƠI TIẾNG ANH TIỂU HỌC CHUẨN SGK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            🎮 14 MINIGAMES TƯƠNG TÁC
          </h1>
          <p className="text-xs sm:text-sm font-bold text-indigo-900/90 max-w-lg">
            Học mà chơi, chơi mà học! Toàn bộ 14 trò chơi tự động cập nhật từ vựng, mẫu câu và câu hỏi theo từng Khối lớp và từng Unit sách giáo khoa.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/30 p-3 rounded-2xl backdrop-blur-xs font-black text-xs shrink-0">
          <span>🏆 Học sinh:</span>
          <span className="bg-amber-100 text-amber-950 px-2.5 py-1 rounded-xl">
            {currentUser?.fullName || 'Học sinh'} (Lớp {currentUser?.className || '1A1'})
          </span>
        </div>
      </div>

      {/* BỘ CHỌN KHỐI & BÀI HỌC SGK TÍCH HỢP TRÒ CHƠI */}
      <div className="bg-white rounded-3xl p-5 border-4 border-indigo-200 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <h2 className="text-sm sm:text-base font-black text-indigo-950">
                CHỌN KHỐI LỚP & BÀI HỌC SGK CHO 14 TRÒ CHƠI
              </h2>
              <p className="text-[11px] text-slate-500 font-bold">
                Chọn khối lớp và Unit để 14 trò chơi tự động nạp từ vựng, ngữ pháp của bài học đó!
              </p>
            </div>
          </div>

          {/* Chọn nhanh Khối 1 -> 5 */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-black text-slate-600 mr-1">Khối:</span>
            {[1, 2, 3, 4, 5].map(g => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  sound.playPop();
                  setSelectedGrade(g);
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                  selectedGrade === g
                    ? 'bg-indigo-600 text-white shadow-md scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Khối {g}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdown & Preview Unit đang chọn */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-500 uppercase">Chọn Unit bài học:</label>
            <select
              value={selectedUnitId}
              onChange={(e) => {
                sound.playPop();
                setSelectedUnitId(e.target.value);
              }}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border-2 border-indigo-200 text-xs sm:text-sm font-black text-indigo-950 focus:outline-hidden focus:border-indigo-600 cursor-pointer"
            >
              {gradeUnits.map(u => (
                <option key={u.id} value={u.id}>
                  {u.title} ({u.vietnameseTitle})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 bg-gradient-to-r from-amber-50 to-emerald-50 rounded-2xl p-3 border border-amber-200 flex flex-col justify-center gap-1.5">
            <div className="flex items-center justify-between text-xs font-black text-indigo-950 flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <span className="text-base">📖</span>
                <span>{activeUnit.title}</span>
                <span className="text-slate-500 font-bold">({activeUnit.vietnameseTitle})</span>
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                {activeUnit.vocabularies?.length || 0} từ vựng SGK • {activeUnit.sentences?.length || 0} mẫu câu
              </span>
            </div>

            {/* Quick Vocabulary Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-500">Từ vựng bài này:</span>
              {activeUnit.vocabularies?.slice(0, 7).map((v, i) => (
                <span key={i} className="text-[11px] font-bold bg-white text-indigo-900 border border-slate-200 px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-2xs">
                  <span>{v.emoji}</span>
                  <span>{v.word}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start">
        {[
          { id: 'all', label: 'Tất cả (15 trò chơi)' },
          { id: 'vocab', label: 'Từ vựng' },
          { id: 'listening', label: 'Luyện nghe' },
          { id: 'speaking', label: 'Luyện nói' },
          { id: 'grammar', label: 'Mẫu câu' },
          { id: 'fun', label: 'Đua xe & Đố vui' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              sound.playPop();
              setFilterCategory(cat.id);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              filterCategory === cat.id
                ? 'bg-amber-400 text-indigo-950 shadow-md border-2 border-amber-500 scale-105'
                : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 15 Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              sound.playPop();
              setSelectedGameId(game.id);
            }}
            className="bg-white rounded-3xl p-5 border-4 border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-amber-100 border-2 border-amber-200 flex items-center justify-center text-3xl shadow-xs transition-colors">
                  {game.icon}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                    +{game.xpReward} XP
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {game.difficulty}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-black text-indigo-950 group-hover:text-amber-600 transition-colors">
                {game.name}
              </h3>
              <p className="text-xs font-bold text-slate-500 mb-2">{game.vietnameseName}</p>
              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                {game.description}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playPop();
                setSelectedGameId(game.id);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:from-amber-500 group-hover:to-orange-500 text-indigo-950 font-black text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-indigo-950" />
              <span>CHƠI THEO BÀI HỌC NÀY</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
