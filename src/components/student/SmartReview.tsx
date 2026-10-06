import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Brain, Sparkles, CheckCircle2, RotateCcw, Volume2, AlertCircle, ArrowRight, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound, speakEnglish } from '../../utils/audio';

export const SmartReview: React.FC = () => {
  const { mistakes, resolveMistake, currentUser, gainXP } = useApp();
  const [activeSession, setActiveSession] = useState(false);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Student mistakes
  const studentMistakes = mistakes.filter(m => m.studentId === currentUser?.id);
  const priorityList = studentMistakes.filter(m => m.status === 'priority' || m.errorCount >= 3);
  const reviewingList = studentMistakes.filter(m => m.status === 'reviewing' || (m.errorCount > 0 && m.errorCount < 3));
  const masteredList = studentMistakes.filter(m => m.status === 'mastered');

  // Review session queue: prioritized by error count
  const reviewQueue = [...priorityList, ...reviewingList];
  const currentItem = reviewQueue[sessionIndex];

  const startSession = () => {
    sound.playPop();
    setActiveSession(true);
    setSessionIndex(0);
    setSelectedAnswer(null);
    setSessionCompleted(false);
  };

  const handleAnswerReview = (word: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(word);

    if (word === currentItem.word) {
      sound.playSuccess();
      speakEnglish(currentItem.word);
      // Mark mistake as resolved / mastered
      resolveMistake(currentItem.id);
    } else {
      sound.playWrong();
    }
  };

  const handleNextReview = () => {
    sound.playPop();
    setSelectedAnswer(null);
    if (sessionIndex < reviewQueue.length - 1) {
      setSessionIndex(i => i + 1);
    } else {
      sound.playFanfare();
      confetti({ particleCount: 100, spread: 80 });
      setSessionCompleted(true);
      gainXP(50, 5);
    }
  };

  // Generate 4 multiple-choice options for review quiz
  const generateOptions = () => {
    if (!currentItem) return [];
    const distractorPool = ['Pencil', 'Monkey', 'Yellow', 'Doctor', 'Apple', 'Rabbit', 'Teacher'];
    const otherChoices = distractorPool.filter(w => w.toLowerCase() !== currentItem.word.toLowerCase()).slice(0, 3);
    return [currentItem.word, ...otherChoices].sort(() => Math.random() - 0.5);
  };

  const currentOptions = React.useMemo(() => generateOptions(), [sessionIndex, currentItem]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-4 border-indigo-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black uppercase">
            <Brain className="w-3.5 h-3.5 text-amber-300" />
            <span>THUẬT TOÁN LẶP LẠI NGẮT QUÃNG (SPACED REPETITION)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            🧠 SỔ TAY ÔN TẬP THÔNG MINH AI
          </h1>
          <p className="text-xs sm:text-sm font-bold text-indigo-100 max-w-lg">
            Hệ thống tự động ghi nhận các từ em từng làm nhầm, phân cấp ưu tiên để ôn lại đúng lúc, giúp nhớ lâu trọn đời!
          </p>
        </div>

        {reviewQueue.length > 0 && !activeSession && (
          <button
            onClick={startSession}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-sm rounded-2xl shadow-lg shrink-0 transition-transform active:scale-95 cursor-pointer"
          >
            BẮT ĐẦU ÔN 3 PHÚT ⚡
          </button>
        )}
      </div>

      {/* Active Review Session View */}
      {activeSession ? (
        <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full">
              Thẻ ôn tập {sessionIndex + 1} / {reviewQueue.length}
            </span>
            <button
              onClick={() => setActiveSession(false)}
              className="text-xs font-black text-slate-500 hover:text-slate-700"
            >
              Đóng phiên ôn tập
            </button>
          </div>

          {!sessionCompleted && currentItem ? (
            <div className="space-y-6 max-w-md mx-auto text-center py-2">
              <div className="p-6 rounded-3xl bg-amber-50 border-3 border-amber-200 space-y-2">
                <span className="text-6xl">{currentItem.emoji}</span>
                <span className="text-xs font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full inline-block">
                  Đã từng nhầm {currentItem.errorCount} lần
                </span>
                <h3 className="text-2xl font-black text-indigo-950">{currentItem.vietnamese}</h3>
                <p className="text-xs font-bold text-slate-500">Bấm chọn từ tiếng Anh tương ứng:</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {currentOptions.map((opt, i) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrect = opt === currentItem.word;
                  let style = 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50';

                  if (selectedAnswer !== null) {
                    if (isSelected && isCorrect) style = 'bg-emerald-500 text-white border-emerald-600 font-black scale-105';
                    else if (isSelected && !isCorrect) style = 'bg-rose-500 text-white border-rose-600 font-black';
                    else if (isCorrect) style = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-black';
                  }

                  return (
                    <button
                      key={i}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswerReview(opt)}
                      className={`p-4 rounded-2xl border-3 text-sm font-black transition-all cursor-pointer ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer && (
                <div className="pt-2">
                  <button
                    onClick={handleNextReview}
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-2xl shadow-md transition-all active:scale-95"
                  >
                    {sessionIndex < reviewQueue.length - 1 ? 'Từ Tiếp Theo &rarr;' : 'Xem Kết Quả &rarr;'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
              <h3 className="text-2xl font-black text-emerald-800">🎉 BẠN ĐÃ KHẮC PHỤC THÀNH CÔNG CÁC TỪ HAY NHẦM!</h3>
              <p className="text-xs font-bold text-slate-600">Tuyệt vời! Các từ này đã được nâng cấp lên mục ĐÃ THÀNH THẠO! (+50 XP)</p>
              <button
                onClick={() => setActiveSession(false)}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md"
              >
                Trở Về Sổ Tay Ôn Tập
              </button>
            </div>
          )}
        </div>
      ) : null}

      {/* 3 Categories Tier List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Tier 1: Priority (3+ mistakes) */}
        <div className="bg-white rounded-3xl p-5 border-4 border-rose-200 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b pb-2 border-rose-100">
            <h3 className="text-sm font-black text-rose-800 flex items-center gap-1.5">
              <span>🚨 Ưu tiên đặc biệt</span>
            </h3>
            <span className="text-[11px] font-black bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
              {priorityList.length} từ
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Nhầm lẫn 3 lần trở lên, cần ôn ngay hôm nay:</p>

          <div className="space-y-2">
            {priorityList.length > 0 ? (
              priorityList.map(m => (
                <div key={m.id} className="p-2.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{m.emoji}</span>
                    <div>
                      <div className="font-black text-indigo-950 flex items-center gap-1">
                        <span>{m.word}</span>
                        <button onClick={() => speakEnglish(m.word)} className="text-indigo-600 hover:text-indigo-800">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-500">{m.vietnamese}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-rose-600 bg-white px-2 py-0.5 rounded-md border border-rose-200">
                    Sai {m.errorCount} lần
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-4">Không có từ nào trong nhóm này! 🌟</p>
            )}
          </div>
        </div>

        {/* Tier 2: Reviewing (1-2 mistakes) */}
        <div className="bg-white rounded-3xl p-5 border-4 border-amber-200 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b pb-2 border-amber-100">
            <h3 className="text-sm font-black text-amber-800 flex items-center gap-1.5">
              <span>⏰ Ôn tập định kỳ</span>
            </h3>
            <span className="text-[11px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              {reviewingList.length} từ
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Nhầm 1-2 lần, ôn để củng cố phản xạ:</p>

          <div className="space-y-2">
            {reviewingList.length > 0 ? (
              reviewingList.map(m => (
                <div key={m.id} className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{m.emoji}</span>
                    <div>
                      <div className="font-black text-indigo-950 flex items-center gap-1">
                        <span>{m.word}</span>
                        <button onClick={() => speakEnglish(m.word)} className="text-indigo-600 hover:text-indigo-800">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-500">{m.vietnamese}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-amber-700 bg-white px-2 py-0.5 rounded-md border border-amber-200">
                    Sai {m.errorCount} lần
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-4">Chưa có từ nào cần ôn sớm!</p>
            )}
          </div>
        </div>

        {/* Tier 3: Mastered */}
        <div className="bg-white rounded-3xl p-5 border-4 border-emerald-200 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b pb-2 border-emerald-100">
            <h3 className="text-sm font-black text-emerald-800 flex items-center gap-1.5">
              <span>✅ Đã thành thạo</span>
            </h3>
            <span className="text-[11px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              {masteredList.length} từ
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Đã vượt qua bài kiểm tra ôn tập thông minh:</p>

          <div className="space-y-2">
            {masteredList.length > 0 ? (
              masteredList.map(m => (
                <div key={m.id} className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{m.emoji}</span>
                    <div>
                      <div className="font-black text-indigo-950">{m.word}</div>
                      <div className="text-[10px] text-slate-500">{m.vietnamese}</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-4">Hãy hoàn thành 1 phiên ôn 3 phút để tốt nghiệp từ vựng!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
