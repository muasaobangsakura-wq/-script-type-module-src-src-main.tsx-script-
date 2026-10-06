import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Settings, 
  History, 
  Sparkles, 
  Check, 
  Trash2, 
  Plus, 
  AlertTriangle, 
  LogOut, 
  Eye, 
  Send,
  Layers,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';
import { Unit, User, AuditLog } from '../../types';
import { TextbookAIServicePanel } from '../teacher/TextbookAIServicePanel';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigatePortal: (portal: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onNavigatePortal }) => {
  const { 
    currentUser, 
    units, 
    users, 
    classes, 
    settings, 
    auditLogs, 
    approveUnit, 
    deleteUnit, 
    deleteUserWithAudit, 
    updateSettings, 
    generateAIUnit 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'curriculum' | 'ai_generator' | 'users' | 'settings' | 'audit'>('curriculum');

  // AI SGK Generator state
  const [genGrade, setGenGrade] = useState<number>(3);
  const [genSeries, setGenSeries] = useState<string>('Global Success');
  const [genTitle, setGenTitle] = useState('Unit 5: Our Wonderful Family');
  const [genTopic, setGenTopic] = useState('Các thành viên trong gia đình và tình yêu thương');
  const [genRawText, setGenRawText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genSuccessMessage, setGenSuccessMessage] = useState('');

  // 2-Step Soft Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string; type: 'unit' | 'user' } | null>(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  // Preview Unit Modal
  const [previewUnit, setPreviewUnit] = useState<Unit | null>(null);

  // Trigger AI Generator
  const handleGenerateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genTitle.trim()) return;

    sound.playPop();
    setIsGenerating(true);
    setGenSuccessMessage('');

    try {
      const generated = await generateAIUnit({
        grade: genGrade,
        bookSeries: genSeries,
        unitTitle: genTitle,
        topic: genTopic,
        rawText: genRawText
      });
      sound.playSuccess();
      setGenSuccessMessage(`Tạo thành công ${generated.title}! Bài học đang ở trạng thái 'BẢN NHÁP' (DRAFT) chờ duyệt.`);
      setPreviewUnit(generated);
    } catch (err: any) {
      sound.playWrong();
      alert('Không thể tạo tự động: ' + (err.message || 'Lỗi server'));
    } finally {
      setIsGenerating(false);
    }
  };

  // 2-Step Confirm Delete
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    if (deleteConfirmationText !== 'XAC NHAN XOA') {
      alert('Vui lòng gõ chính xác "XAC NHAN XOA" để xác thực.');
      sound.playWrong();
      return;
    }

    sound.playSuccess();
    if (itemToDelete.type === 'unit') {
      deleteUnit(itemToDelete.id);
    } else {
      deleteUserWithAudit(itemToDelete.id, deleteReason || 'Admin xóa tài khoản');
    }

    setDeleteModalOpen(false);
    setItemToDelete(null);
    setDeleteReason('');
    setDeleteConfirmationText('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Top Navbar */}
      <header className="bg-slate-800/90 border-b border-slate-700 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                ADMIN PORTAL
                <span className="text-[10px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-md">
                  Super Admin
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-semibold">{currentUser?.fullName} • Quản Trị Toàn Hệ Thống</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playPop();
                onNavigatePortal('/teacher/dashboard');
              }}
              className="text-xs font-bold text-slate-400 hover:text-white bg-slate-700/60 px-3 py-1.5 rounded-xl hidden sm:inline"
            >
              Xem Cổng Giáo Viên
            </button>
            <button
              onClick={() => {
                sound.playPop();
                onLogout();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-rose-600 text-slate-200 text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Tab Submenu */}
        <div className="max-w-7xl mx-auto px-4 flex gap-4 border-t border-slate-700/60 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'curriculum' ? 'border-rose-500 text-rose-400 font-black' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kho SGK & Duyệt Nội Dung</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_generator')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ai_generator' ? 'border-rose-500 text-rose-400 font-black' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Pipeline Sinh Unit SGK</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'users' ? 'border-rose-500 text-rose-400 font-black' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Quản Lý Người Dùng & Phân Quyền</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'settings' ? 'border-rose-500 text-rose-400 font-black' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Cài Đặt Hệ Thống</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'audit' ? 'border-rose-500 text-rose-400 font-black' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Nhật Ký Hệ Thống (Audit Logs)</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* TAB 1: CURRICULUM & APPROVAL WORKFLOW */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">Kho Sách Giáo Khoa & Cơ Chế Kiểm Duyệt (Content Workflow)</h2>
                <p className="text-xs text-slate-400">
                  Nội dung mới sinh từ AI sẽ mang trạng thái <strong>'BẢN NHÁP' (DRAFT)</strong>. Chỉ sau khi được duyệt, học sinh mới xem được trên ứng dụng.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('ai_generator')}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-indigo-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" /> Sinh Unit Mới Bằng AI
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {units.map((unit) => {
                const isDraft = unit.status === 'draft';

                return (
                  <div
                    key={unit.id}
                    className={`bg-slate-800 rounded-3xl p-5 border flex flex-col justify-between transition-all ${
                      isDraft ? 'border-amber-500/60 shadow-lg shadow-amber-500/10' : 'border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md">
                          Lớp {unit.grade} • {unit.bookSeries}
                        </span>

                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                          isDraft ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {isDraft ? '⏳ BẢN NHÁP (DRAFT)' : '✅ ĐÃ DUYỆT (LIVE)'}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-white mt-1">{unit.title}</h3>
                      <p className="text-xs font-bold text-slate-400 mb-3">{unit.vietnameseTitle}</p>

                      <div className="text-xs text-slate-400 space-y-1 mb-4">
                        <div>Từ vựng: <strong>{unit.vocabularies?.length || 0} từ</strong></div>
                        <div>Mẫu câu: <strong>{unit.sentences?.length || 0} mẫu</strong></div>
                        <div>Câu hỏi nghe/đọc: <strong>{(unit.listeningQuestions?.length || 0) + (unit.readingPassage?.questions?.length || 0)} câu</strong></div>
                        <div className="text-[11px] text-slate-500">Cập nhật: {unit.updatedAt}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-700 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setPreviewUnit(unit)}
                        className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Xem trước
                      </button>

                      <div className="flex items-center gap-1.5">
                        {isDraft && (
                          <button
                            onClick={() => {
                              sound.playSuccess();
                              approveUnit(unit.id);
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> PHÊ DUYỆT
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setItemToDelete({ id: unit.id, name: unit.title, type: 'unit' });
                            setDeleteModalOpen(true);
                          }}
                          className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-colors"
                          title="Xóa Unit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: AI SGK PIPELINE GENERATOR */}
        {activeTab === 'ai_generator' && (
          <div className="space-y-6">
            <TextbookAIServicePanel onNavigatePortal={onNavigatePortal} />
          </div>
        )}

        {/* TAB 3: USER MANAGEMENT & RBAC */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white">Quản Lý Người Dùng Toàn Hệ Thống</h3>
                <p className="text-xs text-slate-400">Kiểm soát phân quyền theo vai trò (Role-Based Access Control)</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/60 font-black text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Người Dùng</th>
                    <th className="p-4">Vai Trò (Role)</th>
                    <th className="p-4">Email / Mã Đăng Nhập</th>
                    <th className="p-4">Mã PIN / Mật Khẩu</th>
                    <th className="p-4">Lớp Học</th>
                    <th className="p-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 font-medium text-slate-300">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-700/30">
                      <td className="p-4 flex items-center gap-2 font-bold text-white">
                        <span className="text-xl">{u.avatar}</span>
                        <span>{u.fullName}</span>
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                          u.role === 'ADMIN'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : u.role === 'TEACHER'
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 font-mono">{u.email || u.code}</td>
                      <td className="p-4 font-mono text-slate-400">{u.pin}</td>
                      <td className="p-4">{u.className || 'Toàn trường'}</td>
                      <td className="p-4 text-right">
                        {u.role !== 'ADMIN' && (
                          <button
                            onClick={() => {
                              setItemToDelete({ id: u.id, name: u.fullName, type: 'user' });
                              setDeleteModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                            title="Xóa người dùng"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SYSTEM SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-xl mx-auto bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-5">
            <h3 className="text-base font-black text-white">Cài Đặt Hệ Thống EdTech</h3>

            <div className="space-y-4 text-xs font-semibold text-slate-300">
              <div>
                <label className="block text-slate-400 mb-1">Tên Ứng Dụng</label>
                <input
                  type="text"
                  value={settings.appName}
                  onChange={(e) => updateSettings({ appName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Năm Học Hiện Tại</label>
                <input
                  type="text"
                  value={settings.currentSchoolYear}
                  onChange={(e) => updateSettings({ currentSchoolYear: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-900 rounded-xl border border-slate-700">
                <div>
                  <div className="font-bold text-white">Bảng Xếp Hạng Toàn Trường (Leaderboard)</div>
                  <div className="text-[11px] text-slate-400">Hiển thị đua top XP giữa các lớp tiểu học</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.allowLeaderboard}
                  onChange={(e) => updateSettings({ allowLeaderboard: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-rose-500"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-900 rounded-xl border border-slate-700">
                <div>
                  <div className="font-bold text-white">Chế độ bảo trì hệ thống</div>
                  <div className="text-[11px] text-slate-400">Tạm khóa truy cập của học sinh khi cập nhật đề thi</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => updateSettings({ maintenanceMode: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-rose-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-black text-white">Nhật Ký Thao Tác Hệ Thống (Audit Logs)</h3>
              <p className="text-xs text-slate-400">Lưu lại mọi hành động đăng nhập, xóa tài khoản, xuất bản nội dung.</p>
            </div>

            <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/60 font-black text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Thời Gian</th>
                    <th className="p-4">Hành Động</th>
                    <th className="p-4">Thực Hiện Bởi</th>
                    <th className="p-4">Đối Tượng</th>
                    <th className="p-4">Chi Tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 font-mono text-slate-300">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-700/30">
                      <td className="p-4 text-slate-400">{log.timestamp}</td>
                      <td className="p-4 font-bold text-rose-400">{log.action}</td>
                      <td className="p-4 font-sans text-white font-bold">{log.performedBy} ({log.role})</td>
                      <td className="p-4 font-sans text-amber-300">{log.target}</td>
                      <td className="p-4 font-sans text-slate-400">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* 2-Step Soft Delete Confirmation Modal */}
      {deleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-800 border-2 border-rose-500/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-scaleIn">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-7 h-7 shrink-0" />
              <h3 className="text-base font-black text-white">Xác Nhận Thao Tác Xóa Quan Trọng (2-Step Modal)</h3>
            </div>

            <p className="text-xs text-slate-300">
              Bạn đang yêu cầu xóa: <strong className="text-white">"{itemToDelete.name}"</strong>.
              Thao tác này sẽ áp dụng Soft Delete và ghi nhận vào Audit Log.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Lý do xóa:</label>
                <input
                  type="text"
                  required
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  placeholder="Ví dụ: Học sinh chuyển trường / Unit lỗi thời..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  Gõ chính xác <span className="text-rose-400 font-mono">XAC NHAN XOA</span> để mở khóa:
                </label>
                <input
                  type="text"
                  value={deleteConfirmationText}
                  onChange={(e) => setDeleteConfirmationText(e.target.value)}
                  placeholder="XAC NHAN XOA"
                  className="w-full px-3 py-2 bg-slate-900 border border-rose-500/50 rounded-xl text-rose-300 font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Hủy Bỏ
              </button>
              <button
                disabled={deleteConfirmationText !== 'XAC NHAN XOA'}
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs disabled:opacity-40"
              >
                Xác Nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unit Preview Modal */}
      {previewUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 max-w-2xl w-full shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <h3 className="text-base font-black text-white">{previewUnit.title}</h3>
                <p className="text-xs text-slate-400">{previewUnit.vietnameseTitle}</p>
              </div>
              <button
                onClick={() => setPreviewUnit(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-amber-300 mb-1">Từ vựng ({previewUnit.vocabularies.length}):</h4>
                <div className="grid grid-cols-2 gap-2">
                  {previewUnit.vocabularies.map(v => (
                    <div key={v.id} className="p-2 bg-slate-900 rounded-xl border border-slate-700">
                      <div className="font-bold text-white">{v.emoji} {v.word} ({v.phonetic})</div>
                      <div className="text-slate-400">{v.vietnamese}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-amber-300 mb-1">Mẫu câu ({previewUnit.sentences.length}):</h4>
                {previewUnit.sentences.map((s, idx) => (
                  <div key={idx} className="p-2 bg-slate-900 rounded-xl border border-slate-700 mb-1">
                    <div className="font-bold text-white">{s.pattern}</div>
                    <div className="text-slate-400">{s.vietnamese}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-700">
              {previewUnit.status === 'draft' && (
                <button
                  onClick={() => {
                    approveUnit(previewUnit.id);
                    setPreviewUnit(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl"
                >
                  Phê Duyệt & Xuất Bản Ngay
                </button>
              )}
              <button
                onClick={() => setPreviewUnit(null)}
                className="px-4 py-2 bg-slate-700 text-slate-200 font-bold text-xs rounded-xl"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
