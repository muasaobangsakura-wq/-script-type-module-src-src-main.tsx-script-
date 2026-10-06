import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { StudentLogin } from './components/auth/StudentLogin';
import { AdminLogin } from './components/auth/AdminLogin';
import { StudentHeader } from './components/student/StudentHeader';
import { StudentHome } from './components/student/StudentHome';
import { LessonView } from './components/student/LessonView';
import { GameCenter } from './components/games/GameCenter';
import { SmartReview } from './components/student/SmartReview';
import { StudentProfile } from './components/student/StudentProfile';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MascotChatModal } from './components/common/MascotChatModal';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { sound } from './utils/audio';

function AppContent() {
  const { currentUser, currentRole, units, logout } = useApp();

  // Simple client routing state based on window.location or internal route
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      return window.location.pathname;
    }
    // Default route: if logged in as student -> /student/home; if teacher -> /teacher/dashboard; else -> /student/login
    if (currentUser?.role === 'STUDENT') return '/student/home';
    if (currentUser?.role === 'TEACHER') return '/teacher/dashboard';
    if (currentUser?.role === 'ADMIN') return '/admin/dashboard';
    return '/student/login';
  });

  // Student internal tab
  const [studentTab, setStudentTab] = useState<string>('home');
  // Student active lesson
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  // Initial skill tab for lesson view
  const [initialLessonSkill, setInitialLessonSkill] = useState<'vocab' | 'sentences' | 'listening' | 'speaking' | 'reading' | 'writing'>('vocab');
  // Mascot chat modal
  const [mascotChatOpen, setMascotChatOpen] = useState(false);

  // Sync route on popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({}, '', path);
    }
  };

  // ROUTE GUARD: Strict Role Based Access Control (RBAC)
  const isStudentRoute = currentPath.startsWith('/student') || currentPath === '/login';
  const isTeacherRoute = currentPath.startsWith('/teacher');
  const isAdminRoute = currentPath.startsWith('/admin');

  // Handle Unauthorized Forbidden Access
  const renderAccessForbidden = (reason: string, targetPortal: string, portalLabel: string) => (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 border-2 border-rose-500 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
          <ShieldAlert className="w-9 h-9" />
        </div>
        <h2 className="text-xl font-black text-white">403 FORBIDDEN - TRUY CẬP BỊ TỪ CHỐI</h2>
        <p className="text-xs text-slate-300 leading-relaxed font-semibold">{reason}</p>
        <button
          onClick={() => {
            sound.playPop();
            navigateTo(targetPortal);
          }}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <span>CHUYỂN VỀ {portalLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // If user is STUDENT and trying to access Teacher or Admin routes
  if (currentUser?.role === 'STUDENT' && (isTeacherRoute || (isAdminRoute && currentPath !== '/admin/login'))) {
    return renderAccessForbidden(
      'Tài khoản Học Sinh không được phép truy cập vào các phân hệ Quản lý & Giáo viên theo nguyên tắc bảo mật cách ly.',
      '/student/home',
      'CỔNG HỌC SINH'
    );
  }

  // If user is TEACHER and trying to access Admin routes
  if (currentUser?.role === 'TEACHER' && isAdminRoute && currentPath !== '/admin/login') {
    return renderAccessForbidden(
      'Tài khoản Giáo viên không có quyền Super Admin quản trị toàn hệ thống.',
      '/teacher/dashboard',
      'CỔNG GIÁO VIÊN'
    );
  }

  // 1. Student Login Route
  if (currentPath === '/student/login' || currentPath === '/login') {
    return <StudentLogin onNavigate={navigateTo} />;
  }

  // 2. Admin & Teacher Login Route
  if (currentPath === '/admin/login' || currentPath === '/portal/login') {
    return <AdminLogin onNavigate={navigateTo} />;
  }

  // 3. Unauthenticated user trying to access private routes
  if (!currentUser) {
    if (isTeacherRoute || isAdminRoute) {
      return <AdminLogin onNavigate={navigateTo} />;
    }
    return <StudentLogin onNavigate={navigateTo} />;
  }

  // 4. Admin Dashboard
  if (currentUser.role === 'ADMIN' && (isAdminRoute || currentPath === '/admin/dashboard')) {
    return (
      <AdminDashboard
        onLogout={() => {
          logout();
          navigateTo('/admin/login');
        }}
        onNavigatePortal={navigateTo}
      />
    );
  }

  // 5. Teacher Dashboard
  if (currentUser.role === 'TEACHER' && (isTeacherRoute || currentPath === '/teacher/dashboard')) {
    return (
      <TeacherDashboard
        onLogout={() => {
          logout();
          navigateTo('/admin/login');
        }}
        onNavigatePortal={navigateTo}
      />
    );
  }

  // 6. Student App (80% UX focus)
  const activeUnit = units.find(u => u.id === activeUnitId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      {/* Student Global Header */}
      <StudentHeader
        currentTab={studentTab}
        onNavigateTab={(tab) => {
          setActiveUnitId(null);
          setStudentTab(tab);
        }}
        onOpenMascotChat={() => setMascotChatOpen(true)}
      />

      {/* Student Dynamic View Body */}
      <main className="flex-1">
        {activeUnit ? (
          <LessonView
            unit={activeUnit}
            initialSkill={initialLessonSkill}
            onBack={() => setActiveUnitId(null)}
            onGoToGames={() => {
              setActiveUnitId(null);
              setStudentTab('games');
            }}
          />
        ) : (
          <>
            {studentTab === 'home' && (
              <StudentHome
                onSelectUnit={(unitId: string, skill?: 'vocab' | 'sentences' | 'listening' | 'speaking' | 'reading' | 'writing') => {
                  setActiveUnitId(unitId);
                  setInitialLessonSkill(skill || 'vocab');
                }}
                onNavigateTab={(tab) => setStudentTab(tab)}
                onOpenMascotChat={() => setMascotChatOpen(true)}
              />
            )}

            {studentTab === 'games' && (
              <GameCenter />
            )}

            {studentTab === 'review' && (
              <SmartReview />
            )}

            {studentTab === 'profile' && (
              <StudentProfile />
            )}
          </>
        )}
      </main>

      {/* Student Global Footer */}
      <footer className="border-t border-amber-200 bg-white/70 py-4 text-center text-xs font-bold text-slate-500">
        <p>🎮 English Fun Learning AI • Phát triển theo chuẩn Sách Giáo Khoa Tiếng Anh Tiểu Học (Bộ GD&ĐT)</p>
      </footer>

      {/* Mascot Companion AI Chat Modal */}
      <MascotChatModal
        isOpen={mascotChatOpen}
        onClose={() => setMascotChatOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
