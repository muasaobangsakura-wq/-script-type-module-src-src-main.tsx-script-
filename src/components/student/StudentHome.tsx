import React from 'react';
import { Play, Sparkles, Star, Target, CheckCircle2, Flame, ArrowRight, Brain, Gamepad2, BookOpen, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Mascot } from '../common/Mascot';
import { sound, speakEnglish, speakVietnamese } from '../../utils/audio';

interface StudentHomeProps {
  onSelectUnit: (unitId: string, skill?: 'vocab' | 'sentences' | 'listening' | 'speaking' | 'reading' | 'writing') => void;
  onNavigateTab: (tab: string) => void;
  onOpenMascotChat: () => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({
  onSelectUnit,
  onNavigateTab,
  onOpenMascotChat
}) => {
  const { currentUser, units, mistakes, assignments, unitScores } = useApp();

  // Grade level selector for student: allows picking Grade 1 to 5 to study or review past lessons
  const [selectedGrade, setSelectedGrade] = React.useState<number>(currentUser?.grade || 3);

  // Semester filter state: all | sem1 (Unit 1-8) | sem2 (Unit 9-16) | completed
  const [semesterFilter, setSemesterFilter] = React.useState<'all' | 'sem1' | 'sem2' | 'completed'>('all');

  // Filter approved units for the selected grade level
  const gradeUnits = units.filter(u => u.grade === selectedGrade && (u.status === 'approved' || !u.status));

  // Sort in natural sequence (Unit 1, Unit 2, Unit 3, ... Unit 16)
  const getUnitNumber = (title: string): number => {
    const match = title.match(/Unit\s+(\d+)/i);
    return match ? parseInt(match[1], 10) : 999;
  };
  const sortedGradeUnits = [...gradeUnits].sort((a, b) => getUnitNumber(a.title) - getUnitNumber(b.title));

  // Filter by semester
  const filteredUnits = sortedGradeUnits.filter(u => {
    const num = getUnitNumber(u.title);
    if (semesterFilter === 'sem1') return num <= 8;
    if (semesterFilter === 'sem2') return num >= 9;
    if (semesterFilter === 'completed') return !!unitScores?.[u.id];
    return true;
  });

  const approvedUnits = units.filter(u => u.status === 'approved');
  const recentUnit = sortedGradeUnits[0] || approvedUnits[0] || units[0];

  // Dynamic Spaced Repetition mistake preview
  const priorityMistakes = mistakes.filter(m => m.studentId === currentUser?.id && m.status !== 'mastered').slice(0, 3);

  // Active homework assignments for student's class
  const classAssignments = assignments.filter(a => a.classId === currentUser?.classId && a.status === 'active');

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Welcome Hero Banner with Mascot */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 p-6 sm:p-8 text-white shadow-xl border-4 border-emerald-300">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black uppercase tracking-wider text-emerald-950">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Chào mừng trở lại!</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-xs">
              Hello, {currentUser?.fullName}! 🌟
            </h1>
            <p className="text-sm sm:text-base font-bold text-emerald-950/90 max-w-lg">
              Hôm nay chúng mình cùng học thêm thật nhiều từ mới và chinh phục các thử thách tiếng Anh nhé!
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5 justify-center md:justify-start">
              <button
                onClick={() => {
                  sound.playPop();
                  if (recentUnit) onSelectUnit(recentUnit.id);
                }}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border-b-4 border-amber-600"
              >
                <Play className="w-4 h-4 fill-indigo-950" />
                <span>TIẾP TỤC BÀI HỌC GẦN NHẤT</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  onOpenMascotChat();
                }}
                className="px-4 py-3 rounded-2xl bg-white/30 hover:bg-white/40 text-emerald-950 font-black text-sm backdrop-blur-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Hỏi bạn Sparky AI 🦖</span>
              </button>
            </div>
          </div>

          {/* Interactive Mascot widget */}
          <div className="shrink-0 flex flex-col items-center">
            <Mascot
              mood="happy"
              size="lg"
              message="Hôm nay bạn muốn chơi game gì nào? Cùng Sparky chiến thắng nhé! 🎉"
              onAskAI={onOpenMascotChat}
              skin={currentUser?.mascotCustomization?.skin || 'emerald'}
              hat={currentUser?.mascotCustomization?.hat || 'star_cap'}
            />
          </div>
        </div>
      </div>

      {/* Grid: Smart Review & Game Center Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Smart Review (Spaced Repetition Mistakes Widget) */}
        <div className="bg-white rounded-3xl p-5 border-4 border-indigo-200 shadow-md space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-black text-indigo-950 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-500" />
                <span>AI Smart Review</span>
              </h2>
              <span className="text-[11px] font-black bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                Sổ tay lỗi sai
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              AI lọc ra những từ em từng làm nhầm để ôn nhanh 3 phút:
            </p>

            <div className="mt-3 space-y-2">
              {priorityMistakes.length > 0 ? (
                priorityMistakes.map(m => (
                  <div key={m.id} className="flex items-center justify-between p-2 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{m.emoji}</span>
                      <div>
                        <div className="font-black text-indigo-950">{m.word}</div>
                        <div className="text-[10px] text-slate-500">{m.vietnamese}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-rose-100 text-rose-600 px-2 py-0.5 rounded-md">
                      Nhầm {m.errorCount} lần
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-xs text-slate-400 font-medium">
                  Tuyệt vời! Bé chưa có từ nào bị nhầm lẫn cả! 🌟
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onNavigateTab('review');
            }}
            className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <span>ÔN TẬP 3 PHÚT NGAY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Game Center Quick Promo Card */}
        <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-3xl p-5 text-indigo-950 shadow-md space-y-3 flex flex-col justify-between border-4 border-amber-300">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Gamepad2 className="w-6 h-6 text-indigo-950" />
              <h2 className="text-lg font-black">GAME CENTER</h2>
            </div>
            <p className="text-xs font-bold text-indigo-900 leading-relaxed">
              14 Trò chơi tiếng Anh tương tác: Đua xe English Race, Lật thẻ trí nhớ, Vòng quay may mắn, Đấu trường Quiz Bee!
            </p>

            <div className="mt-3 flex items-center gap-2 text-2xl">
              <span>🏎️</span>
              <span>🎡</span>
              <span>🧩</span>
              <span>🎯</span>
              <span>💎</span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onNavigateTab('games');
            }}
            className="w-full py-3 bg-indigo-950 hover:bg-indigo-900 active:scale-95 text-amber-300 font-black text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <span>KHÁM PHÁ 14 MINIGAMES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Class Homework Assignments Notice (if assigned by teacher) */}
      {classAssignments.length > 0 && (
        <div className="bg-amber-50 border-3 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-black text-indigo-950 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Bài tập Ms Que giao cho {currentUser?.className}</span>
            </h3>
            <span className="text-xs font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
              Hạn nộp: 10/10
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {classAssignments.map(asg => (
              <div key={asg.id} className="bg-white p-3.5 rounded-2xl border border-amber-200 flex items-center justify-between gap-3 shadow-xs">
                <div>
                  <h4 className="text-xs font-black text-slate-800">{asg.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{asg.instructions}</p>
                  {asg.externalPlatform && (
                    <span className="inline-block mt-1 text-[10px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">
                      🔗 Liên kết {asg.externalPlatform.name}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    sound.playPop();
                    if (asg.externalPlatform) {
                      window.open(asg.externalPlatform.url, '_blank');
                    } else {
                      onSelectUnit(asg.unitId);
                    }
                  }}
                  className="px-3 py-2 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-xl shrink-0 transition-transform active:scale-95"
                >
                  LÀM BÀI
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 1 TUẦN 4 TIẾT HỌC (4 LẦN HỌC / TUẦN CHUẨN BỘ GD&ĐT) */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-5 text-white shadow-lg border border-indigo-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 border border-amber-300/30 rounded-full text-xs font-black text-amber-300">
            <span>🏆 TIẾN ĐỘ TUẦN: 1 TUẦN 4 TIẾT</span>
            <span>•</span>
            <span>4 LẦN HỌC / TUẦN</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            Theo Dõi 4 Tiết Học Tiếng Anh Trong Tuần
          </h3>
          <p className="text-xs text-indigo-200">
            Mỗi bài học con hoàn thành sẽ thắp sáng 1 Cúp Tiết Học và tích điểm +100 XP vào tài khoản!
          </p>
        </div>

        {/* 4 Periods Cups */}
        <div className="grid grid-cols-4 gap-2 shrink-0">
          {[
            { period: 'Tiết 1', done: Object.keys(unitScores || {}).length >= 1 },
            { period: 'Tiết 2', done: Object.keys(unitScores || {}).length >= 2 },
            { period: 'Tiết 3', done: Object.keys(unitScores || {}).length >= 3 },
            { period: 'Tiết 4', done: Object.keys(unitScores || {}).length >= 4 }
          ].map((item, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-2xl border text-center transition-all ${
                item.done
                  ? 'bg-amber-400 text-indigo-950 border-amber-300 font-black shadow-md scale-102'
                  : 'bg-white/10 text-indigo-200 border-white/10'
              }`}
            >
              <div className="text-xl">{item.done ? '🏆' : '⚪'}</div>
              <div className="text-[11px] font-black mt-0.5">{item.period}</div>
              <div className="text-[9px] font-bold">
                {item.done ? '+100 XP' : 'Chưa học'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Textbook Curriculum Units (Global Success / SGK) */}
      <div className="space-y-4">
        {/* Header & Grade Level Selector (Học sinh chọn level lớp và học xuyên suốt để ôn bài) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-5 rounded-3xl border-3 border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Toàn Bộ SGK Cả Năm
              </span>
              <span className="text-xs text-slate-500 font-bold">
                Tự động chấm điểm & Luyện 4 Kỹ năng
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-indigo-950 mt-1">
              Chương Trình Sách Giáo Khoa Lớp {selectedGrade} ({sortedGradeUnits.length} Units Cả Năm)
            </h2>
            <p className="text-xs font-bold text-slate-500">
              Em có thể tự do bấm chọn bất kỳ bài học nào để học bài mới hoặc ôn tập lại kiến thức đã học.
            </p>
          </div>

          {/* Grade Level Selector Buttons (Lớp 1 đến Lớp 5) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl shrink-0 overflow-x-auto self-start md:self-center">
            {[1, 2, 3, 4, 5].map(g => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  sound.playPop();
                  setSelectedGrade(g);
                }}
                className={`px-3.5 py-2 rounded-xl font-black text-xs transition-all whitespace-nowrap cursor-pointer ${
                  selectedGrade === g
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-102'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>Lớp {g}</span>
                {currentUser?.grade === g && (
                  <span className="ml-1 text-[9px] px-1 py-0.2 rounded bg-amber-400 text-indigo-950 font-bold">Lớp em</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Semester & Completion Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-black">
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setSemesterFilter('all');
            }}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              semesterFilter === 'all'
                ? 'bg-indigo-950 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Tất cả cả năm ({sortedGradeUnits.length} Units)
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setSemesterFilter('sem1');
            }}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              semesterFilter === 'sem1'
                ? 'bg-indigo-950 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🍂 Học kỳ 1 (Unit 1 - Unit 8)
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setSemesterFilter('sem2');
            }}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              semesterFilter === 'sem2'
                ? 'bg-indigo-950 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🌸 Học kỳ 2 (Unit 9 - Unit 16)
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setSemesterFilter('completed');
            }}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              semesterFilter === 'completed'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Đã làm bài & có điểm ({sortedGradeUnits.filter(u => !!unitScores?.[u.id]).length})</span>
          </button>
        </div>

        {/* Units Roadmap */}
        {filteredUnits.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-500 text-xs">
            Chưa có bài học nào trong danh mục này cho Lớp {selectedGrade}. Hãy chọn tab "Tất cả cả năm" để xem đầy đủ các Unit nhé!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUnits.map((unit, index) => {
              const scoreRecord = unitScores?.[unit.id];
              const isDone = !!scoreRecord;

              return (
                <div
                  key={unit.id}
                  className={`rounded-3xl p-5 border-4 transition-all duration-300 flex flex-col justify-between group relative overflow-visible ${
                    isDone 
                      ? 'bg-gradient-to-br from-emerald-50 via-teal-50/70 to-amber-50/50 border-emerald-400 shadow-lg shadow-emerald-500/15 ring-2 ring-emerald-300/30' 
                      : 'bg-white border-slate-200 hover:border-indigo-400 shadow-md hover:shadow-xl'
                  }`}
                >
                  {/* CÚP VÀNG BÊN GÓC (Hiện khi hoàn thành bài) */}
                  {isDone && (
                    <div className="absolute -top-3.5 -right-3 z-10 flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-amber-400 shadow-lg text-xl animate-bounce" title="Đã hoàn thành xuất sắc bài học!">
                      🏆
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-8 h-8 rounded-2xl font-black text-sm flex items-center justify-center ${
                        isDone ? 'bg-emerald-200 text-emerald-900' : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {String(getUnitNumber(unit.title)).padStart(2, '0')}
                      </span>

                      {/* Score Badge if taken */}
                      {isDone ? (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 border border-emerald-300 shadow-xs">
                          <span className="text-xs font-black text-emerald-900">
                            ĐÃ TÍCH {scoreRecord.score}/100 đ
                          </span>
                          <div className="flex items-center text-amber-500">
                            {Array.from({ length: scoreRecord.stars || 3 }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          Chưa học
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-black text-indigo-950 group-hover:text-indigo-600 transition-colors">
                      {unit.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 mb-2">
                      {unit.vietnameseTitle}
                    </p>

                    {/* 4 Skills Badges & Skill Score Breakdown */}
                    {isDone && scoreRecord.skillScores ? (
                      <div className="p-2 mb-3 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-bold grid grid-cols-4 gap-1 text-center">
                        <span className="text-sky-700 bg-sky-50 py-0.5 rounded">🎧 {scoreRecord.skillScores.listening}/25</span>
                        <span className="text-purple-700 bg-purple-50 py-0.5 rounded">🎙️ {scoreRecord.skillScores.speaking}/25</span>
                        <span className="text-emerald-700 bg-emerald-50 py-0.5 rounded">📖 {scoreRecord.skillScores.reading}/25</span>
                        <span className="text-amber-700 bg-amber-50 py-0.5 rounded">✍️ {scoreRecord.skillScores.writing}/25</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1 mb-3 text-[10px] font-bold">
                        <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                          🎧 Nghe
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                          🎙️ Nói
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          📖 Đọc
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                          ✍️ Viết
                        </span>
                      </div>
                    )}

                    {/* Vocabulary previews */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {unit.vocabularies.slice(0, 4).map(v => (
                        <span
                          key={v.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playPop();
                            speakEnglish(v.word);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          title="Bấm để nghe phát âm"
                        >
                          <span>{v.emoji}</span>
                          <span>{v.word}</span>
                        </span>
                      ))}
                      {unit.vocabularies.length > 4 && (
                        <span className="text-[10px] text-slate-400 font-bold self-center">
                          +{unit.vocabularies.length - 4} từ nữa
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Start or Review Lesson Button */}
                  <button
                    onClick={() => {
                      sound.playPop();
                      onSelectUnit(unit.id);
                    }}
                    className={`w-full py-3 active:scale-95 text-white font-black text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                      isDone
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-emerald-600/30'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-600/30'
                    }`}
                  >
                    <span>{isDone ? 'ÔN TẬP LẠI (ĐÃ TÍCH ĐIỂM 🏆)' : 'VÀO HỌC & LÀM BÀI TỰ CHẤM ĐIỂM'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
