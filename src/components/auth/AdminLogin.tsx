import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertTriangle, KeyRound, CheckCircle2, X, School, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

interface AdminLoginProps {
  onNavigate: (route: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate }) => {
  const { loginStaff, loginWithGoogle, registerSchool } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Register school form state
  const [schoolName, setSchoolName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regErrorMsg, setRegErrorMsg] = useState('');
  const [regSuccessMsg, setRegSuccessMsg] = useState('');

  // Google Login Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ Email giáo viên và Mật khẩu.');
      sound.playWrong();
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = loginStaff(email, password);
      setLoading(false);

      if (res.success) {
        sound.playSuccess();
        if (res.role === 'ADMIN') {
          onNavigate('/admin/dashboard');
        } else if (res.role === 'TEACHER') {
          onNavigate('/teacher/dashboard');
        }
      } else {
        setErrorMsg(res.message || 'Email hoặc mật khẩu không chính xác.');
        sound.playWrong();
      }
    }, 300);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegErrorMsg('');
    setRegSuccessMsg('');

    if (!schoolName.trim()) {
      setRegErrorMsg('Vui lòng nhập Tên trường học (ví dụ: Trường Tiểu học Lê Lợi)');
      sound.playWrong();
      return;
    }
    if (!regEmail.trim()) {
      setRegErrorMsg('Vui lòng nhập Email Google quản trị của trường');
      sound.playWrong();
      return;
    }
    if (!regPassword.trim() || regPassword.trim().length < 4) {
      setRegErrorMsg('Vui lòng nhập Mật khẩu xác thực (tối thiểu 4 ký tự)');
      sound.playWrong();
      return;
    }

    setRegLoading(true);
    setTimeout(() => {
      const res = registerSchool({
        schoolName: schoolName.trim(),
        googleEmail: regEmail.trim(),
        password: regPassword.trim()
      });
      setRegLoading(false);

      if (res.success) {
        sound.playSuccess();
        setRegSuccessMsg(`🎉 Chúc mừng! Tài khoản ${schoolName.trim()} đã được tạo thành công.`);
        setTimeout(() => {
          onNavigate('/teacher/dashboard');
        }, 600);
      } else {
        setRegErrorMsg(res.message || 'Không thể đăng ký trường học này.');
        sound.playWrong();
      }
    }, 350);
  };

  const handleSelectGoogleAccount = (googleEmail: string, name?: string) => {
    sound.playPop();
    setGoogleLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const res = loginWithGoogle(googleEmail, name);
      setGoogleLoading(false);

      if (res.success) {
        sound.playSuccess();
        setShowGoogleModal(false);
        if (res.role === 'ADMIN') {
          onNavigate('/admin/dashboard');
        } else {
          onNavigate('/teacher/dashboard');
        }
      } else {
        setErrorMsg(res.message || 'Không thể đăng nhập bằng tài khoản Google này.');
        sound.playWrong();
      }
    }, 400);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail.trim()) return;
    handleSelectGoogleAccount(customGoogleEmail.trim());
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              PORTAL QUẢN TRỊ & GIÁO VIÊN
              <span className="text-[10px] uppercase font-bold bg-slate-800 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-md">
                Bảo Mật
              </span>
            </h1>
            <p className="text-xs text-slate-400">Hệ thống SGK Tiếng Anh Tiểu Học Lớp 1 - 5</p>
          </div>
        </div>

        {/* Back to student portal */}
        <button
          onClick={() => {
            sound.playPop();
            onNavigate('/student/login');
          }}
          className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Chuyển sang Cổng Học Sinh</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-6 bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md z-10">
        {/* Tab Switcher: Đăng Nhập vs Đăng Ký Trường Mới */}
        <div className="flex bg-slate-900/90 p-1 rounded-2xl border border-slate-700/80 mb-6">
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setAuthMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Đăng Nhập</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setAuthMode('register');
              setRegErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'register'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <School className="w-4 h-4" />
            <span>Đăng Ký Trường Mới</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* MODE 1: FORM ĐĂNG NHẬP */}
        {/* ======================================================== */}
        {authMode === 'login' && (
          <div>
            <div className="mb-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white">ĐĂNG NHẬP GIÁO VIÊN</h2>
              <p className="text-xs text-slate-400 mt-1">Cổng Quản Trị Dành Cho Giáo Viên & Cán Bộ Nhà Trường</p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-2.5 text-rose-300 text-xs font-semibold animate-shake">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <div className="flex-1">
                  <div>{errorMsg}</div>
                  {errorMsg.includes('chưa được liên kết') && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setAuthMode('register');
                        setRegEmail(customGoogleEmail || email);
                        setErrorMsg('');
                        setShowGoogleModal(false);
                      }}
                      className="mt-2 text-[11px] underline font-bold text-amber-300 hover:text-amber-200 cursor-pointer block"
                    >
                      👉 Bấm vào đây để Đăng Ký Trường Mới ngay
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* NÚT ĐĂNG NHẬP BẰNG GOOGLE CHÍNH THỨC */}
            <div className="mb-5">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setShowGoogleModal(true);
                }}
                className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 active:scale-98 text-slate-900 font-black text-xs sm:text-sm rounded-2xl shadow-xl border-2 border-slate-200 flex items-center justify-center gap-3 transition-all cursor-pointer group"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="text-slate-800 group-hover:text-indigo-900 transition-colors">
                  ĐĂNG NHẬP BẰNG TÀI KHOẢN GOOGLE
                </span>
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700" />
                </div>
                <span className="relative px-3 bg-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Hoặc nhập Email & Mật khẩu
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email công vụ giáo viên / Quản trị
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email giáo viên..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mật khẩu bảo mật
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span>Đang kiểm tra quyền hạn...</span>
                ) : (
                  <>
                    <span>XÁC THỰC VÀ ĐĂNG NHẬP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Nút Đăng Ký Trường Mới bên dưới Form */}
            <div className="mt-5 pt-4 border-t border-slate-700/60">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setAuthMode('register');
                  setRegErrorMsg('');
                }}
                className="w-full py-3 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 active:scale-98 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <School className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Trường bạn chưa có tài khoản? <strong>Đăng ký trường mới</strong></span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODE 2: FORM ĐĂNG KÝ TRƯỜNG HỌC MỚI */}
        {/* ======================================================== */}
        {authMode === 'register' && (
          <div>
            <div className="mb-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-md">
                <School className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white">ĐĂNG KÝ TRƯỜNG MỚI</h2>
              <p className="text-xs text-slate-400 mt-1">
                Khởi tạo hệ thống quản lý học liệu và danh sách lớp độc lập cho trường của bạn
              </p>
            </div>

            {regErrorMsg && (
              <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-2.5 text-rose-300 text-xs font-semibold animate-shake">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <div className="flex-1">{regErrorMsg}</div>
              </div>
            )}

            {regSuccessMsg && (
              <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-2.5 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                <div className="flex-1">{regSuccessMsg}</div>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* 1. Tên trường học */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tên trường học</span>
                  <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Ví dụ: Trường Tiểu học Lê Lợi..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                  <School className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* 2. Email Google */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Email Google / Gmail Quản Trị</span>
                  <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="Nhập email Google (ví dụ: thleloi@gmail.com)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  ✨ Dùng để đăng nhập trực tiếp bằng Google hoặc xác thực tài khoản trường.
                </p>
              </div>

              {/* 3. Mật khẩu xác thực */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mật khẩu xác thực</span>
                  <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showRegPassword ? "text" : "password"}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Nhập mật khẩu (tối thiểu 4 ký tự)..."
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                  >
                    {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  🔒 Dùng để giáo viên đăng nhập quản lý lớp học và bài tập của trường.
                </p>
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-98 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {regLoading ? (
                  <span>Đang khởi tạo tài khoản trường...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>HOÀN TẤT ĐĂNG KÝ & VÀO HỆ THỐNG</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-700/60 text-center">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setAuthMode('login');
                  setErrorMsg('');
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors cursor-pointer"
              >
                &larr; Đã có tài khoản trường? Quay lại Đăng Nhập
              </button>
            </div>
          </div>
        )}
      </div>

      {/* POPUP / MODAL ĐĂNG NHẬP GOOGLE */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="max-w-md w-full bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl relative text-white space-y-5">
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header with Google G */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto shadow-md">
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>
              <h3 className="text-xl font-black text-white">Đăng nhập bằng Google</h3>
              <p className="text-xs text-slate-400">
                Nhập tài khoản Google (Gmail) của bạn để vào Cổng Giáo Viên:
              </p>
            </div>

            {/* Google Email Form */}
            <div className="pt-1">
              <form onSubmit={handleCustomGoogleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Địa chỉ Gmail / Google Workspace
                  </label>
                  <input
                    type="email"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="Nhập địa chỉ Gmail..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-indigo-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={googleLoading || !customGoogleEmail.trim()}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-black text-sm rounded-xl transition-all cursor-pointer"
                >
                  {googleLoading ? 'Đang xác thực Google...' : 'ĐĂNG NHẬP VỚI GOOGLE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500">
        <p>Hệ thống học liệu & bài tập SGK Tiếng Anh Tiểu Học Lớp 1 - 5 Chuẩn Bộ GD&ĐT</p>
      </div>
    </div>
  );
};
