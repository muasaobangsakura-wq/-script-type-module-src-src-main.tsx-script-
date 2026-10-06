import React, { useState } from 'react';
import { ArrowRight, ShieldAlert, Volume2, KeyRound, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Mascot } from '../common/Mascot';
import { sound, speakVietnamese } from '../../utils/audio';

interface StudentLoginProps {
  onNavigate: (route: string) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onNavigate }) => {
  const { loginStudent, classes, schools, activeSchoolId, switchSchool } = useApp();
  const defaultClass = classes.find(c => c.name.includes('1A1')) || classes[0];
  const [studentClass, setStudentClass] = useState(defaultClass?.id || classes[0]?.id || '');
  const [studentUsername, setStudentUsername] = useState('');
  const [studentPin, setStudentPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Keep studentClass in sync when school classes change
  React.useEffect(() => {
    if (classes.length > 0 && !classes.some(c => c.id === studentClass)) {
      setStudentClass(classes[0].id);
    }
  }, [classes, studentClass]);

  const handleClassChange = (newClassId: string) => {
    sound.playPop();
    setStudentClass(newClassId);
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!studentUsername.trim()) {
      setErrorMsg('Bé ơi, hãy nhập Tên đăng nhập (Mã học sinh) hoặc Họ và tên của mình nhé!');
      sound.playWrong();
      return;
    }
    if (!studentPin.trim()) {
      setErrorMsg('Bé ơi, hãy nhập Mật khẩu (Mã PIN) nhé!');
      sound.playWrong();
      return;
    }

    const result = loginStudent(studentUsername, studentPin, studentClass);
    if (result.success) {
      sound.playSuccess();
      onNavigate('/student/home');
    } else {
      setErrorMsg(result.message || 'Tên đăng nhập hoặc Mật khẩu (Mã PIN) chưa đúng. Bé kiểm tra lại nhé!');
      sound.playWrong();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-amber-100 to-emerald-200 flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Decorative Floating Clouds and Balloons */}
      <div className="absolute top-6 left-8 text-5xl opacity-80 animate-pulse pointer-events-none">☁️</div>
      <div className="absolute top-16 right-12 text-6xl opacity-75 pointer-events-none">🎈</div>
      <div className="absolute bottom-10 left-12 text-5xl pointer-events-none">🌈</div>
      <div className="absolute bottom-16 right-16 text-4xl pointer-events-none">⭐</div>

      {/* Top Banner & Switch to Teacher Portal */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-3xl sm:text-4xl">🎮</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-indigo-900 tracking-tight flex items-center gap-2">
              ENGLISH FUN LEARNING
              <span className="bg-amber-400 text-amber-950 text-xs px-2.5 py-0.5 rounded-full font-extrabold uppercase">Học Sinh</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-indigo-700">Tan Ky primary school • Ms Que</p>
          </div>
        </div>

        {/* Portal switcher */}
        <button
          onClick={() => {
            sound.playPop();
            onNavigate('/admin/login');
          }}
          className="bg-white/80 hover:bg-white text-indigo-900 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-2xl shadow-sm border border-indigo-200 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <KeyRound className="w-4 h-4 text-indigo-600" />
          <span>Dành cho Giáo Viên (Đăng Nhập Google)</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-6 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 z-10 relative">
        {/* Mascot Greeting */}
        <div className="flex flex-col items-center text-center mb-6">
          <Mascot
            mood="cheering"
            size="md"
            message="Xin chào bạn nhỏ! Bé nhập Tên đăng nhập (Mã học sinh) và Mật khẩu (Mã PIN) trên thẻ học sinh để vào học nhé! 🦖🌟"
          />
          <h2 className="text-2xl font-black text-slate-800 mt-2">BÉ ĐĂNG NHẬP Ở ĐÂY NÈ!</h2>
          <p className="text-xs text-slate-600 font-bold">
            <span className="text-indigo-950 font-black">Tên đăng nhập: Mã học sinh</span> • <span className="text-amber-800 font-black">Mật khẩu: Mã PIN</span>
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-start gap-2.5 text-rose-700 text-xs font-bold animate-shake">
            <ShieldAlert className="w-5 h-5 shrink-0 text-rose-500" />
            <div className="flex-1">{errorMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Tên Đăng Nhập (Mã Học Sinh hoặc Họ Tên) */}
          <div>
            <label className="block text-xs font-black uppercase text-indigo-950 mb-1.5 tracking-wider flex items-center justify-between">
              <span>Tên Đăng Nhập (Mã Học Sinh)</span>
              <span className="text-[10px] text-indigo-600 font-bold lowercase">hoặc Họ và tên thật</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={studentUsername}
                onChange={(e) => setStudentUsername(e.target.value)}
                placeholder="Nhập Mã học sinh hoặc Họ và tên..."
                className="w-full pl-4 pr-10 py-3.5 bg-amber-50/70 border-3 border-amber-300 rounded-2xl text-base sm:text-lg font-black text-indigo-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl">👦🏻</span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              ✨ Bé có thể điền Mã học sinh hoặc Họ tên thật đầy đủ có dấu đều được.
            </p>
          </div>

          {/* Mật Khẩu (Mã PIN) */}
          <div>
            <label className="block text-xs font-black uppercase text-indigo-950 mb-1.5 tracking-wider">
              Mật Khẩu (Mã PIN Đăng Nhập)
            </label>
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={studentPin}
                onChange={(e) => setStudentPin(e.target.value)}
                placeholder="Nhập Mã PIN của bé..."
                className="w-full pl-4 pr-12 py-3.5 bg-amber-50/70 border-3 border-amber-300 rounded-2xl text-base sm:text-lg font-black text-amber-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 p-1 cursor-pointer"
                title={showPin ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              🔑 Bé hãy nhập Mã PIN được ghi trên thẻ học sinh của mình nhé.
            </p>
          </div>

          {/* Trường Học của Bé (nếu hệ thống có nhiều trường) */}
          {schools && schools.length > 1 && (
            <div>
              <label className="block text-xs font-black uppercase text-indigo-950 mb-1.5 tracking-wider">
                Trường Học Của Bé
              </label>
              <div className="relative">
                <select
                  value={activeSchoolId}
                  onChange={(e) => {
                    sound.playPop();
                    switchSchool(e.target.value);
                  }}
                  className="w-full pl-4 pr-10 py-3 bg-amber-50/70 border-3 border-amber-300 rounded-2xl text-sm sm:text-base font-black text-indigo-950 focus:outline-hidden focus:border-indigo-500 transition-all cursor-pointer"
                >
                  {schools.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">🏫</span>
              </div>
            </div>
          )}

          {/* Lớp Học */}
          <div>
            <label className="block text-xs font-black uppercase text-indigo-950 mb-1.5 tracking-wider">
              Lớp Học Của Bé
            </label>
            <div className="relative">
              <select
                value={studentClass}
                onChange={(e) => handleClassChange(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-amber-50/70 border-3 border-amber-300 rounded-2xl text-sm sm:text-base font-black text-indigo-950 focus:outline-hidden focus:border-indigo-500 transition-all cursor-pointer"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} (Khối {c.grade})
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">🏫</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 active:scale-98 text-indigo-950 font-black text-lg rounded-2xl shadow-lg shadow-amber-300/50 flex items-center justify-center gap-2 border-b-4 border-amber-600 transition-all cursor-pointer mt-2"
          >
            <span>VÀO HỌC NGAY NÀO!</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </form>

        {/* Audio helper button */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center text-xs">
          <button
            type="button"
            onClick={() => speakVietnamese('Bé hãy điền Tên đăng nhập là Mã học sinh hoặc Họ và tên thật, và Mật khẩu là Mã PIN trên thẻ để vào học nhé!')}
            className="text-amber-600 hover:text-amber-700 font-extrabold flex items-center gap-1.5 p-1 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" /> Bấm nghe hướng dẫn đăng nhập
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs font-bold text-indigo-900/80 max-w-md mx-auto z-10">
        <p>🌟 Tan Ky primary school • Ms Que • Tiếng Anh Tiểu Học Chuẩn Bộ GD&ĐT</p>
      </div>
    </div>
  );
};
