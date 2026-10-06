import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Users, 
  BookOpen, 
  FileSpreadsheet, 
  Plus, 
  Download, 
  Upload, 
  Calendar, 
  ExternalLink, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  KeyRound,
  LogOut,
  Search,
  School,
  GraduationCap,
  Sparkles,
  Edit3,
  Trash2,
  Layers,
  ClipboardList,
  Activity,
  Check,
  X,
  ShieldCheck,
  CheckCheck,
  Save,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';
import { ClassItem, Assignment, User } from '../../types';
import { TextbookAIServicePanel } from './TextbookAIServicePanel';

interface TeacherDashboardProps {
  onLogout: () => void;
  onNavigatePortal: (portal: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onLogout, onNavigatePortal }) => {
  const { 
    currentUser, 
    classes, 
    users, 
    units, 
    assignments, 
    createAssignment, 
    createClass, 
    updateClass,
    deleteClass,
    deleteClassesBatch,
    addStudent,
    updateStudent,
    toggleStudentAttendance,
    deleteStudent,
    deleteStudentsBatch,
    importStudentsBatch,
    getStudentScores,
    schools,
    activeSchoolId
  } = useApp();

  const currentSchoolObj = schools?.find(s => s.id === activeSchoolId);
  const schoolDisplayName = currentUser?.schoolName || currentSchoolObj?.name || 'Trường Tiểu học Tân Kỳ';

  const [activeTab, setActiveTab] = useState<'classes' | 'attendance' | 'assignments' | 'analytics' | 'ai_textbook'>('classes');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  // Confirmation modal state (100% in-app, replaces window.confirm)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    confirmColor?: 'rose' | 'indigo' | 'amber';
    onConfirm: () => void;
  } | null>(null);

  // In-app Toast message (replaces alert)
  const [toastMessage, setToastMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Last saved timestamp & save status
  const [lastSavedTime, setLastSavedTime] = useState<string>(() => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  });
  const [showSaveSuccessModal, setShowSaveSuccessModal] = useState(false);

  // Add single student modal state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [addStudentForm, setAddStudentForm] = useState<{
    fullName: string;
    code: string;
    pin: string;
    classId: string;
    grade: number;
  }>({
    fullName: '',
    code: '',
    pin: '',
    classId: '',
    grade: 3
  });

  // Edit student modal state
  const [editingStudent, setEditingStudent] = useState<User | null>(null);
  const [editStudentForm, setEditStudentForm] = useState<{
    fullName: string;
    code: string;
    pin: string;
    classId: string;
    grade: number;
  }>({
    fullName: '',
    code: '',
    pin: '',
    classId: '',
    grade: 3
  });

  // Attendance monitoring filters
  const [attendanceClassFilter, setAttendanceClassFilter] = useState<string>('all');
  const [attendanceStatusFilter, setAttendanceStatusFilter] = useState<'all' | 'attended' | 'not_attended'>('all');
  const [attendanceSearch, setAttendanceSearch] = useState('');

  // Selected student IDs for batch actions
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  // Modals for Class Management
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState(3);

  const [showEditClassModal, setShowEditClassModal] = useState(false);
  const [editClassName, setEditClassName] = useState('');
  const [editClassGrade, setEditClassGrade] = useState(3);

  const [showBatchClassModal, setShowBatchClassModal] = useState(false);
  const [selectedBatchClassIds, setSelectedBatchClassIds] = useState<string[]>([]);

  // Modal for Quick Paste Students
  const [showQuickPasteModal, setShowQuickPasteModal] = useState(false);
  const [pastedStudentNames, setPastedStudentNames] = useState('');

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignTitle, setAssignTitle] = useState('');
  const [assignUnitId, setAssignUnitId] = useState(units[0]?.id || '');
  const [assignDeadline, setAssignDeadline] = useState('2026-10-15 23:59');
  const [assignPlatform, setAssignPlatform] = useState<'none' | 'Quizizz' | 'OLM' | 'Azota'>('none');
  const [assignExternalUrl, setAssignExternalUrl] = useState('');
  const [assignInstructions, setAssignInstructions] = useState('');

  // Selected class & students
  const activeClass = classes.find(c => c.id === selectedClassId) || classes[0];
  const classStudents = users.filter(u => u.role === 'STUDENT' && (u.classId === activeClass?.id || !u.classId));
  const filteredStudents = classStudents.filter(s => s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || s.code?.toLowerCase().includes(searchQuery.toLowerCase()));

  // Class assignments
  const currentClassAssignments = assignments.filter(a => a.classId === activeClass?.id);

  // Handle Excel Export of Student Login Cards
  const handleExportRosterExcel = () => {
    sound.playPop();
    const dataToExport = classStudents.map((s, index) => ({
      'STT': index + 1,
      'Họ và Tên': s.fullName,
      'Lớp': activeClass?.name || '3A1',
      'Mã Học Sinh (Username)': s.code,
      'Mã PIN Đăng Nhập': s.pin,
      'Cấp Độ': s.level,
      'Tổng Điểm XP': s.xp,
      'Chuỗi Ngày Học': s.streak
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DanhSachHocSinh');
    XLSX.writeFile(workbook, `TheDangNhap_${activeClass?.name || 'Lop'}.xlsx`);
    sound.playSuccess();
    showToast('Đã xuất file thẻ đăng nhập học sinh Excel thành công!');
  };

  // Filtered students list for attendance monitoring
  const attendanceStudentsList = users.filter(u => {
    if (u.role !== 'STUDENT') return false;
    if (attendanceClassFilter !== 'all' && u.classId !== attendanceClassFilter) return false;
    if (attendanceStatusFilter === 'attended' && !u.attendedToday) return false;
    if (attendanceStatusFilter === 'not_attended' && u.attendedToday) return false;
    if (attendanceSearch.trim()) {
      const q = attendanceSearch.toLowerCase();
      const matchName = u.fullName.toLowerCase().includes(q);
      const matchCode = (u.code || '').toLowerCase().includes(q);
      if (!matchName && !matchCode) return false;
    }
    return true;
  });

  // Handle Export Attendance to Excel
  const handleExportAttendanceExcel = () => {
    sound.playPop();
    const studentsList = users.filter(u => u.role === 'STUDENT' && (attendanceClassFilter === 'all' || u.classId === attendanceClassFilter));
    
    const dataToExport = studentsList.map((s, idx) => ({
      'STT': idx + 1,
      'Họ và Tên': s.fullName,
      'Lớp Học': s.className || 'Chưa phân lớp',
      'Tên Đăng Nhập (Username)': s.code || '',
      'Mã PIN Đăng Nhập': s.pin || '',
      'Trạng Thái Điểm Danh': s.attendedToday ? 'ĐÃ VÀO HỌC' : 'CHƯA VÀO HỌC',
      'Thời Gian Đăng Nhập': s.lastLoginTime || 'Chưa đăng nhập hôm nay',
      'Cấp Độ': `Cấp ${s.level}`,
      'Điểm XP': s.xp,
      'Chuỗi Ngày Streak': `${s.streak} ngày`
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DiemDanhHocSinh');
    XLSX.writeFile(workbook, `DiemDanh_HocSinh_${new Date().toISOString().split('T')[0]}.xlsx`);
    sound.playSuccess();
    showToast('Đã xuất báo cáo điểm danh Excel thành công!');
  };

  // ==========================================
  // HỆ THỐNG LƯU DỮ LIỆU & QUẢN LÝ HỌC SINH THẬT
  // ==========================================

  // 1. Lưu toàn bộ dữ liệu hệ thống (Học sinh, lớp, điểm danh)
  const handleSaveAllData = () => {
    try {
      localStorage.setItem(`ef_users_${activeSchoolId}`, JSON.stringify(users));
      localStorage.setItem(`ef_classes_${activeSchoolId}`, JSON.stringify(classes));
      localStorage.setItem(`ef_assignments_${activeSchoolId}`, JSON.stringify(assignments));
      if (activeSchoolId === 'school_tanky') {
        localStorage.setItem('ef_users', JSON.stringify(users));
        localStorage.setItem('ef_classes', JSON.stringify(classes));
        localStorage.setItem('ef_assignments', JSON.stringify(assignments));
      }
      localStorage.setItem('ef_units', JSON.stringify(units));

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      setLastSavedTime(timeStr);
      sound.playSuccess();
      showToast(`💾 ĐÃ LƯU TOÀN BỘ DỮ LIỆU CỦA ${schoolDisplayName.toUpperCase()} THÀNH CÔNG! Danh sách ${users.filter(u => u.role === 'STUDENT').length} học sinh và ${classes.length} lớp học đã được lưu an toàn lúc ${timeStr}.`);
    } catch (err) {
      sound.playWrong();
      showToast('Lỗi khi lưu dữ liệu vào bộ nhớ trình duyệt!', 'error');
    }
  };

  // 2. Lưu danh sách học sinh của lớp hiện tại
  const handleSaveClassRoster = () => {
    try {
      localStorage.setItem(`ef_users_${activeSchoolId}`, JSON.stringify(users));
      localStorage.setItem(`ef_classes_${activeSchoolId}`, JSON.stringify(classes));
      if (activeSchoolId === 'school_tanky') {
        localStorage.setItem('ef_users', JSON.stringify(users));
        localStorage.setItem('ef_classes', JSON.stringify(classes));
      }

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      setLastSavedTime(timeStr);
      sound.playSuccess();
      showToast(`💾 ĐÃ LƯU DANH SÁCH LỚP ${activeClass?.name || ''}! Tổng cộng ${classStudents.length} học sinh của ${schoolDisplayName} đã được lưu an toàn lúc ${timeStr}.`);
    } catch (err) {
      sound.playWrong();
      showToast('Lỗi khi lưu danh sách lớp!', 'error');
    }
  };

  // 3. Mở modal thêm 1 học sinh mới
  const handleOpenAddStudent = () => {
    sound.playPop();
    const classShort = (activeClass?.name || '3A1').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const nextIdx = classStudents.length + 1;
    const defaultCode = `STU${classShort}_${String(nextIdx).padStart(2, '0')}`;
    const defaultPin = activeClass?.name.replace(/lớp|lop|\s/gi, '').toUpperCase() || '3A1';

    setAddStudentForm({
      fullName: '',
      code: defaultCode,
      pin: defaultPin,
      classId: activeClass?.id || classes[0]?.id || '',
      grade: activeClass?.grade || 3
    });
    setShowAddStudentModal(true);
  };

  // 4. Lưu học sinh mới vào lớp
  const handleSaveAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addStudentForm.fullName.trim()) {
      sound.playWrong();
      showToast('Vui lòng nhập Họ và tên thật đầy đủ của học sinh!', 'error');
      return;
    }

    const targetClass = classes.find(c => c.id === addStudentForm.classId) || activeClass;
    addStudent({
      fullName: addStudentForm.fullName.trim(),
      code: addStudentForm.code.trim().toUpperCase() || `STU${Math.floor(100 + Math.random() * 900)}`,
      pin: addStudentForm.pin.trim().toUpperCase() || '1234',
      classId: targetClass?.id,
      className: targetClass?.name,
      grade: targetClass?.grade || addStudentForm.grade
    });

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setLastSavedTime(timeStr);
    sound.playSuccess();
    setShowAddStudentModal(false);
    showToast(`💾 ĐÃ LƯU THÀNH CÔNG! Đã thêm học sinh "${addStudentForm.fullName.trim()}" (Mã: ${addStudentForm.code.toUpperCase()}, PIN: ${addStudentForm.pin.toUpperCase()}) vào lớp ${targetClass?.name}!`);
  };

  // 5. Tải bản sao lưu JSON toàn bộ hệ thống
  const handleExportBackupJSON = () => {
    try {
      const backupData = {
        exportDate: new Date().toISOString(),
        version: '2.0',
        school: 'Tan Ky Primary School - Ms Que',
        classes,
        students: users.filter(u => u.role === 'STUDENT'),
        assignments,
        unitsCount: units.length
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SaoLuu_DuLieu_HocSinh_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      sound.playSuccess();
      showToast('Đã tải file sao lưu dữ liệu toàn trường thành công!');
    } catch (err) {
      sound.playWrong();
      showToast('Lỗi xuất file sao lưu JSON!', 'error');
    }
  };

  // Handle Excel Import of Students (Nhập file Excel chứa danh sách học sinh thật đầy đủ)
  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playPop();
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawData: any[] = XLSX.utils.sheet_to_json(ws);

        if (!rawData || rawData.length === 0) {
          sound.playWrong();
          showToast('File Excel rỗng hoặc không có dữ liệu học sinh!', 'error');
          return;
        }

        const defaultClassPin = activeClass?.name.replace(/lớp|lop|\s/gi, '').toUpperCase() || '3A1';
        const classShort = (activeClass?.name || '3A1').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

        const parsedStudents = rawData.map((row: any, idx: number) => {
          // 1. Tìm cột Họ và tên thật đầy đủ (hỗ trợ mọi định dạng viết hoa, thường, có dấu)
          let rawFullName = 
            row['Họ và Tên'] || row['Họ và tên'] || row['Họ Tên'] || row['Họ tên'] || 
            row['HỌ VÀ TÊN'] || row['HỌ TÊN'] || row['Họ Và Tên'] ||
            row['Tên Học Sinh'] || row['Tên học sinh'] || row['TÊN HỌC SINH'] ||
            row['Họ và tên học sinh'] || row['Họ và Tên Học Sinh'] ||
            row['Ho va Ten'] || row['Ho Ten'] || 
            row['Full Name'] || row['FullName'] || row['Name'] || row['Student Name'];

          // 2. Nếu file tách riêng 2 cột "Họ đệm" và "Tên"
          if (!rawFullName) {
            const hoDem = 
              row['Họ và tên đệm'] || row['Họ và tên đệm '] || row['Họ và Tên Đệm'] || 
              row['Họ đệm'] || row['Họ Đệm'] || row['Họ lót'] || row['Họ'] || 
              row['Ho va ten dem'] || row['Ho dem'] || row['Ho'] || row['Last Name'] || row['LastName'];
            const ten = 
              row['Tên'] || row['Tên '] || row['Ten'] || row['TÊN'] || row['First Name'] || row['FirstName'];

            if (hoDem || ten) {
              rawFullName = [hoDem, ten].filter(Boolean).join(' ').trim();
            }
          }

          // 3. Nếu vẫn chưa có, quét các cột dạng chuỗi (bỏ qua STT, mã số, id)
          if (!rawFullName) {
            for (const key of Object.keys(row)) {
              if (/stt|id|mã|code|pin|lớp|class|năm sinh|ngày sinh|năm|ngay/i.test(key)) continue;
              const val = row[key];
              if (typeof val === 'string' && val.trim().length >= 2 && isNaN(Number(val.trim()))) {
                rawFullName = val.trim();
                break;
              }
            }
          }

          // Fallback nếu không thấy cột tên
          if (!rawFullName || String(rawFullName).trim() === '') {
            rawFullName = `Học sinh ${idx + 1}`;
          }

          // 4. Trích xuất Mã học sinh (Tên đăng nhập)
          let rawCode = 
            row['Mã Học Sinh'] || row['Mã học sinh'] || row['MÃ HỌC SINH'] || 
            row['Mã HS'] || row['MÃ HS'] || row['Ma HS'] || row['Mã số'] ||
            row['Tên Đăng Nhập'] || row['Tên đăng nhập'] || row['TÊN ĐĂNG NHẬP'] || 
            row['Username'] || row['Code'] || row['ID'];

          if (!rawCode) {
            rawCode = `STU${classShort}_${String(idx + 1).padStart(2, '0')}`;
          }

          // 5. Trích xuất Mã PIN (Mật khẩu)
          let rawPin = 
            row['Mã PIN'] || row['Mã Pin'] || row['MÃ PIN'] || 
            row['Mật Khẩu'] || row['Mật khẩu'] || row['MẬT KHẨU'] || 
            row['PIN'] || row['Pin'] || row['Password'] || row['Pass'];

          if (!rawPin) {
            rawPin = defaultClassPin;
          }

          return {
            fullName: String(rawFullName).trim(),
            code: String(rawCode).trim().toUpperCase(),
            pin: String(rawPin).trim().toUpperCase()
          };
        });

        if (parsedStudents.length > 0 && activeClass) {
          importStudentsBatch(activeClass.id, parsedStudents);
          sound.playSuccess();
          const now = new Date();
          const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
          setLastSavedTime(timeStr);
          showToast(`💾 ĐÃ LƯU THÀNH CÔNG! Đã nạp và lưu an toàn ${parsedStudents.length} học sinh thật (Họ tên đầy đủ, Tên đăng nhập: Mã HS, Mật khẩu: Mã PIN) vào ${activeClass.name}!`);
        }
      } catch (err) {
        sound.playWrong();
        showToast('Lỗi đọc file Excel! Vui lòng kiểm tra định dạng cột.', 'error');
      }
    };
    reader.readAsBinaryString(file);
    // Reset file input value
    e.target.value = '';
  };

  // Toggle select single student
  const toggleSelectStudent = (id: string) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Toggle select all filtered students in class
  const toggleSelectAllStudents = () => {
    if (selectedStudentIds.length === filteredStudents.length && filteredStudents.length > 0) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(filteredStudents.map(s => s.id));
    }
  };

  // Open Edit Student Modal
  const handleOpenEditStudent = (student: User) => {
    sound.playPop();
    setEditingStudent(student);
    setEditStudentForm({
      fullName: student.fullName,
      code: student.code || '',
      pin: student.pin || '',
      classId: student.classId || activeClass?.id || '',
      grade: student.grade || activeClass?.grade || 3
    });
  };

  // Save Edited Student Data
  const handleSaveEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    if (!editStudentForm.fullName.trim()) {
      showToast('Vui lòng nhập họ và tên học sinh!', 'error');
      return;
    }

    const targetClass = classes.find(c => c.id === editStudentForm.classId);
    updateStudent(editingStudent.id, {
      fullName: editStudentForm.fullName.trim(),
      code: editStudentForm.code.trim().toUpperCase() || editingStudent.code,
      pin: editStudentForm.pin.trim().toUpperCase() || editingStudent.pin,
      classId: editStudentForm.classId,
      className: targetClass?.name || editingStudent.className,
      grade: targetClass?.grade || editStudentForm.grade
    });

    sound.playSuccess();
    showToast(`Đã cập nhật thông tin và dữ liệu đăng nhập của "${editStudentForm.fullName}" thành công!`);
    setEditingStudent(null);
  };

  // Delete single student with in-app confirm dialog (NO window.confirm!)
  const handleDeleteSingleStudent = (student: User) => {
    sound.playPop();
    setConfirmDialog({
      isOpen: true,
      title: 'Xác Nhận Xóa Học Sinh',
      message: `Bạn có chắc chắn muốn xóa học sinh "${student.fullName}" (Mã: ${student.code}) khỏi ${activeClass?.name}? Thao tác này sẽ xóa hồ sơ học sinh.`,
      confirmText: 'Xóa Học Sinh',
      confirmColor: 'rose',
      onConfirm: () => {
        sound.playSuccess();
        deleteStudent(student.id);
        setSelectedStudentIds(prev => prev.filter(id => id !== student.id));
        showToast(`Đã xóa học sinh "${student.fullName}" thành công!`);
        setConfirmDialog(null);
      }
    });
  };

  // Delete batch selected students with in-app confirm dialog
  const handleDeleteBatchStudents = () => {
    if (selectedStudentIds.length === 0) return;
    sound.playPop();
    setConfirmDialog({
      isOpen: true,
      title: 'Xác Nhận Xóa Nhiều Học Sinh',
      message: `Bạn có chắc chắn muốn xóa vĩnh viễn ${selectedStudentIds.length} học sinh đã chọn khỏi ${activeClass?.name}? Thao tác này không thể hoàn tác.`,
      confirmText: `Xóa ${selectedStudentIds.length} Học Sinh`,
      confirmColor: 'rose',
      onConfirm: () => {
        sound.playSuccess();
        deleteStudentsBatch(selectedStudentIds);
        setSelectedStudentIds([]);
        showToast(`Đã xóa thành công ${selectedStudentIds.length} học sinh!`);
        setConfirmDialog(null);
      }
    });
  };

  // Delete current selected class with in-app confirm dialog
  const handleDeleteCurrentClass = () => {
    if (!activeClass) return;
    if (classes.length <= 1) {
      sound.playWrong();
      showToast('Không thể xóa lớp duy nhất còn lại của trường!', 'error');
      return;
    }

    sound.playPop();
    setConfirmDialog({
      isOpen: true,
      title: 'Xác Nhận Xóa Lớp Học',
      message: `Bạn có chắc chắn muốn xóa lớp "${activeClass.name}"? Toàn bộ học sinh và bài tập thuộc lớp này sẽ bị xóa theo.`,
      confirmText: `Xóa Lớp ${activeClass.name}`,
      confirmColor: 'rose',
      onConfirm: () => {
        sound.playSuccess();
        const nextClass = classes.find(c => c.id !== activeClass.id);
        deleteClass(activeClass.id);
        if (nextClass) setSelectedClassId(nextClass.id);
        showToast(`Đã xóa lớp "${activeClass.name}" thành công!`);
        setConfirmDialog(null);
      }
    });
  };

  // Delete batch selected classes with in-app confirm dialog
  const handleDeleteBatchClasses = () => {
    if (selectedBatchClassIds.length === 0) {
      sound.playWrong();
      showToast('Vui lòng chọn ít nhất 1 lớp để xóa!', 'error');
      return;
    }

    sound.playPop();
    setConfirmDialog({
      isOpen: true,
      title: 'Xác Nhận Xóa Nhiều Lớp Học',
      message: `Bạn có chắc muốn xóa ${selectedBatchClassIds.length} lớp học đã chọn? Toàn bộ học sinh trong các lớp này sẽ bị xóa theo.`,
      confirmText: `Xóa ${selectedBatchClassIds.length} Lớp Đã Chọn`,
      confirmColor: 'rose',
      onConfirm: () => {
        sound.playSuccess();
        deleteClassesBatch(selectedBatchClassIds);
        const remaining = classes.filter(c => !selectedBatchClassIds.includes(c.id));
        setSelectedBatchClassIds([]);
        setShowBatchClassModal(false);
        if (remaining.length > 0) {
          setSelectedClassId(remaining[0].id);
        }
        showToast(`Đã xóa thành công ${selectedBatchClassIds.length} lớp học!`);
        setConfirmDialog(null);
      }
    });
  };

  // Quick Paste Students Import (Nhập danh sách học sinh thật: Họ tên đầy đủ, mã HS và PIN)
  const handleQuickPasteImport = () => {
    if (!pastedStudentNames.trim() || !activeClass) return;
    const lines = pastedStudentNames.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;

    const defaultPin = activeClass.name.replace(/lớp|lop|\s/gi, '').toUpperCase();

    const parsed = lines.map((line, idx) => {
      // Phân tách nếu có dấu tab, phẩy, gạch nối hoặc dấu |
      const parts = line.includes('\t') 
        ? line.split('\t') 
        : line.includes(' - ') 
        ? line.split(' - ') 
        : line.includes('|')
        ? line.split('|')
        : line.includes(',') 
        ? line.split(',') 
        : [line];

      const realFullName = parts[0]?.trim() || `Học sinh ${idx + 1}`;
      const customCode = parts[1]?.trim() || `STU${Math.floor(100 + idx * 2 + Math.random() * 50)}`;
      const customPin = parts[2]?.trim() || defaultPin;

      return {
        fullName: realFullName,
        code: customCode.toUpperCase(),
        pin: customPin.toUpperCase()
      };
    });

    importStudentsBatch(activeClass.id, parsed);
    sound.playSuccess();
    setPastedStudentNames('');
    setShowQuickPasteModal(false);
    showToast(`Đã thêm thành công ${parsed.length} học sinh thật với đầy đủ Họ tên, Mã học sinh và Mã PIN vào ${activeClass.name}!`);
  };

  // Create Assignment
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTitle.trim() || !activeClass) return;

    const chosenUnit = units.find(u => u.id === assignUnitId);
    createAssignment({
      title: assignTitle,
      classId: activeClass.id,
      className: activeClass.name,
      unitId: assignUnitId,
      unitTitle: chosenUnit?.title || 'Bài học',
      deadline: assignDeadline,
      instructions: assignInstructions || 'Hoàn thành bài học và đạt trên 80 điểm',
      status: 'active',
      externalPlatform: assignPlatform !== 'none' ? {
        name: assignPlatform as any,
        url: assignExternalUrl || 'https://quizizz.com'
      } : undefined
    });

    sound.playSuccess();
    setShowAssignModal(false);
    setAssignTitle('');
    setAssignInstructions('');
    setAssignExternalUrl('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Teacher Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                TEACHER PORTAL
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  Giáo Viên
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-semibold">{currentUser?.fullName || 'Ms Que'} • {schoolDisplayName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* NÚT LƯU TOÀN BỘ DỮ LIỆU HỆ THỐNG */}
            <button
              onClick={handleSaveAllData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white text-xs font-black shadow-md border-2 border-emerald-400 cursor-pointer transition-all hover:scale-102"
              title="Lưu toàn bộ danh sách học sinh, điểm danh và các thay đổi vào hệ thống"
            >
              <Save className="w-4 h-4 text-emerald-100" />
              <span>LƯU DỮ LIỆU</span>
              <span className="hidden sm:inline-block text-[10px] bg-emerald-800/90 text-emerald-100 px-1.5 py-0.5 rounded font-mono font-bold">
                {lastSavedTime || 'Đã lưu'}
              </span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                onNavigatePortal('/admin/login');
              }}
              className="text-xs font-bold text-slate-600 hover:text-indigo-600 bg-slate-100 px-3 py-1.5 rounded-xl hidden sm:inline"
            >
              Chuyển cổng Auth
            </button>
            <button
              onClick={() => {
                sound.playPop();
                onLogout();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Tab Submenu */}
        <div className="max-w-7xl mx-auto px-4 flex gap-4 border-t border-slate-100 text-xs font-black">
          <button
            onClick={() => setActiveTab('classes')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'classes' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Quản Lý Lớp & Thẻ Học Sinh</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('attendance');
            }}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'attendance' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>📡 Giám Sát Đăng Nhập & Điểm Danh</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
              {users.filter(u => u.role === 'STUDENT' && u.attendedToday).length} online
            </span>
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'assignments' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Giao Bài & Nền Tảng Ngoài (OLM/Quizizz)</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'analytics' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Thống Kê Tiến Độ & Từ Vựng Hay Sai</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('ai_textbook');
            }}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 font-bold ${
              activeTab === 'ai_textbook' ? 'border-purple-600 text-purple-700 bg-purple-50/50' : 'border-transparent text-purple-600 hover:text-purple-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>AI Phân Tích SGK & Sinh Học Liệu</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-700 font-extrabold uppercase">Mới</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Class Selection & Quick Stats Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Đang chọn lớp:</label>
            <select
              value={selectedClassId}
              onChange={(e) => {
                setSelectedClassId(e.target.value);
                setSelectedStudentIds([]);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-50 border-2 border-slate-200 text-sm font-black text-indigo-950 focus:outline-hidden focus:border-indigo-600"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name} (Khối {c.grade}) • {c.studentCount} Học sinh</option>
              ))}
            </select>

            {/* Edit Class Button */}
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                if (activeClass) {
                  setEditClassName(activeClass.name);
                  setEditClassGrade(activeClass.grade);
                  setShowEditClassModal(true);
                }
              }}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Chỉnh sửa tên và khối của lớp đang chọn"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Chỉnh sửa lớp</span>
            </button>

            {/* Delete Current Class Button */}
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                handleDeleteCurrentClass();
              }}
              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Xóa lớp học đang chọn"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Xóa lớp này</span>
            </button>

            {/* Batch Delete Classes Button */}
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setSelectedBatchClassIds([]);
                setShowBatchClassModal(true);
              }}
              className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Xóa 1 hoặc tất cả các lớp đang chọn"
            >
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Quản lý / Xóa nhiều lớp</span>
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowCreateClassModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" /> Tạo Lớp Mới
            </button>
          </div>
        </div>

        {/* Thanh chọn nhanh lớp học */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto select-none">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <School className="w-3.5 h-3.5 text-indigo-600" />
            <span>Danh sách lớp ({classes.length} lớp):</span>
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {classes.map(c => {
              const isSelected = c.id === selectedClassId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setSelectedClassId(c.id);
                    setSelectedStudentIds([]);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{c.name}</span>
                  <span className={`text-[10px] px-1 py-0.2 rounded-full ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {c.studentCount || 4}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: CLASSES & STUDENT ROSTER */}
        {activeTab === 'classes' && (
          <div className="space-y-4">
            {/* Search and Action Buttons Toolbar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              <div className="relative max-w-sm w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm học sinh theo tên hoặc mã STU..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold focus:outline-hidden focus:border-indigo-600"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* NÚT LƯU DANH SÁCH LỚP CHUYÊN DỤNG */}
                <button
                  type="button"
                  onClick={handleSaveClassRoster}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all border-2 border-emerald-400"
                  title="Lưu danh sách học sinh của lớp đang chọn vào hệ thống"
                >
                  <Save className="w-4 h-4 text-emerald-100" />
                  <span>LƯU DANH SÁCH LỚP</span>
                </button>

                {/* Thêm 1 học sinh mới */}
                <button
                  type="button"
                  onClick={handleOpenAddStudent}
                  className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  title="Thêm thủ công 1 học sinh mới vào lớp"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Thêm 1 Học Sinh</span>
                </button>

                {/* Quick Paste Student Names */}
                <button
                  type="button"
                  onClick={() => setShowQuickPasteModal(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Dán Danh Sách (Nhập Nhanh)</span>
                </button>

                {/* Excel Import button */}
                <label className="px-3.5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-sm">
                  <Upload className="w-4 h-4" />
                  <span>Nhập Excel Danh Sách</span>
                  <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleImportExcel}
                    className="hidden"
                  />
                </label>

                {/* Excel Export student card login codes */}
                <button
                  type="button"
                  onClick={handleExportRosterExcel}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Xuất Thẻ Đăng Nhập (Excel)</span>
                </button>

                {/* Sao lưu dữ liệu JSON */}
                <button
                  type="button"
                  onClick={handleExportBackupJSON}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  title="Tải bản sao lưu JSON toàn bộ học sinh và lớp học"
                >
                  <span>💾 Sao lưu JSON</span>
                </button>
              </div>
            </div>

            {/* Banner hiển thị trạng thái lưu & hướng dẫn đăng nhập học sinh */}
            <div className="bg-gradient-to-r from-amber-50 via-emerald-50 to-indigo-50 border-2 border-emerald-300/80 rounded-2xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-start md:items-center gap-2.5 text-xs text-slate-800">
                <span className="text-2xl shrink-0">🎓</span>
                <div>
                  <div className="font-black text-slate-900 flex items-center gap-2 flex-wrap">
                    <span>Lớp {activeClass?.name}: Hiện có {classStudents.length} học sinh</span>
                    <span className="text-[11px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                      Tên đăng nhập: Mã học sinh (Username)
                    </span>
                    <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                      Mật khẩu: Mã PIN
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                    Hệ thống lưu giữ đầy đủ Họ và tên thật tiếng Việt theo danh sách tải lên. Bé có thể dùng Mã HS hoặc Họ tên thật để đăng nhập.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-emerald-800 bg-emerald-100 font-extrabold px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Đã lưu lúc: {lastSavedTime || 'Mới nhất'}</span>
                </span>
                <button
                  type="button"
                  onClick={handleSaveClassRoster}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu ngay</span>
                </button>
              </div>
            </div>

            {/* Batch Action Toolbar for Selected Students */}
            {selectedStudentIds.length > 0 && (
              <div className="bg-gradient-to-r from-rose-900 to-slate-900 text-white p-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg border-2 border-rose-500 animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs sm:text-sm font-black">
                    Đã chọn {selectedStudentIds.length} / {filteredStudents.length} học sinh trong {activeClass?.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDeleteBatchStudents}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-all border border-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>XÓA {selectedStudentIds.length} HỌC SINH ĐÃ CHỌN</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedStudentIds([])}
                    className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Bỏ chọn
                  </button>
                </div>
              </div>
            )}

            {/* Students Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-black text-slate-600 uppercase tracking-wider">
                  <tr>
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedStudentIds.length === filteredStudents.length && filteredStudents.length > 0}
                        onChange={toggleSelectAllStudents}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        title="Chọn tất cả học sinh trong danh sách"
                      />
                    </th>
                    <th className="p-4">STT</th>
                    <th className="p-4">Họ và Tên Thật Đầy Đủ</th>
                    <th className="p-4">Tên Đăng Nhập (Mã HS)</th>
                    <th className="p-4">Mật Khẩu (Mã PIN)</th>
                    <th className="p-4">Điểm Danh Hôm Nay</th>
                    <th className="p-4">Cấp Độ</th>
                    <th className="p-4">Bài Đã Làm</th>
                    <th className="p-4">Điểm XP</th>
                    <th className="p-4">Chuỗi Streak</th>
                    <th className="p-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="p-8 text-center text-slate-400">
                        Chưa có học sinh nào trong {activeClass?.name}. Thầy/Cô có thể bấm "Dán Danh Sách" hoặc "Nhập Excel Danh Sách" để thêm học sinh thật.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s, idx) => (
                      <tr key={s.id} className={`hover:bg-indigo-50/40 transition-colors ${selectedStudentIds.includes(s.id) ? 'bg-indigo-50/60' : ''}`}>
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedStudentIds.includes(s.id)}
                            onChange={() => toggleSelectStudent(s.id)}
                            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                        </td>
                        <td className="p-4 font-bold text-slate-400">{idx + 1}</td>
                        <td className="p-4 font-bold text-slate-900 flex items-center gap-2.5">
                          <span className="text-2xl shrink-0">{s.avatar}</span>
                          <div>
                            <div className="font-extrabold text-sm text-slate-900 leading-snug">{s.fullName}</div>
                            <div className="text-[10px] text-slate-400 font-semibold">{s.className || activeClass?.name}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-mono font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 inline-block text-xs shadow-2xs">
                            {s.code}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5 font-bold">Tên đăng nhập</span>
                        </td>
                        <td className="p-4">
                          <span className="font-mono font-black text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 inline-block text-xs shadow-2xs">
                            {s.pin}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5 font-bold">Mật khẩu PIN</span>
                        </td>
                        <td className="p-4">
                          {s.attendedToday ? (
                            <div className="flex flex-col">
                              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Đã vào học
                              </span>
                              <span className="text-[10px] text-slate-500 font-bold mt-0.5">
                                {s.lastLoginTime || 'Hôm nay'}
                              </span>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              Chưa vào học
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                            Cấp {s.level}
                          </span>
                        </td>
                        <td className="p-4">
                          {(() => {
                            const studentScores = getStudentScores(s.id);
                            const count = Object.keys(studentScores || {}).length;
                            return count > 0 ? (
                              <span className="inline-flex items-center gap-1 font-black text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                                <span>🏆</span>
                                <span>{count} Units</span>
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-400">Chưa làm</span>
                            );
                          })()}
                        </td>
                        <td className="p-4 font-black text-indigo-950">{s.xp} XP</td>
                        <td className="p-4 font-bold text-orange-600">🔥 {s.streak} ngày</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditStudent(s)}
                              className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 border border-amber-200"
                              title={`Chỉnh sửa thông tin & dữ liệu đăng nhập của ${s.fullName}`}
                            >
                              <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                              <span>Sửa</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                sound.playPop();
                                showToast(`Thẻ học sinh: ${s.fullName} | Mã đăng nhập: ${s.code} | PIN: ${s.pin}`, 'info');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer text-xs"
                            >
                              In Thẻ
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSingleStudent(s)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 font-bold transition-colors cursor-pointer border border-rose-200"
                              title={`Xóa học sinh ${s.fullName}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: ATTENDANCE & LOGIN MONITORING (HỆ THỐNG GIÁM SÁT ĐĂNG NHẬP & ĐIỂM DANH THEO LỚP) */}
        {activeTab === 'attendance' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header & Excel Export */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-bold text-emerald-300 mb-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Thời Gian Thực • Giám Sát Học Sinh Vào Học</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black">
                  Quản Trị Điểm Danh Học Sinh Theo Từng Lớp
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Theo dõi học sinh lớp nào đã đăng nhập vào học hôm nay, xem chính xác thời gian đăng nhập, quản lý dữ liệu tài khoản và xuất báo cáo điểm danh Excel cho giáo viên.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSaveAllData}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-102 border-2 border-emerald-400"
                  title="Lưu trạng thái điểm danh học sinh vào hệ thống"
                >
                  <Save className="w-4 h-4 text-emerald-100" />
                  <span>LƯU ĐIỂM DANH</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportAttendanceExcel}
                  className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
                >
                  <FileSpreadsheet className="w-4 h-4 text-indigo-950" />
                  <span>XUẤT BÁO CÁO EXCEL</span>
                </button>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* 1. Tổng học sinh */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-slate-500 uppercase">Tổng Học Sinh</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {users.filter(u => u.role === 'STUDENT').length}
                </div>
                <div className="text-[11px] text-slate-400 font-semibold mt-1">
                  Toàn trường ({classes.length} lớp học)
                </div>
              </div>

              {/* 2. Đã vào học hôm nay */}
              <div className="bg-emerald-50/70 p-5 rounded-3xl border-2 border-emerald-200 shadow-xs">
                <div className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Đã Vào Học Hôm Nay
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1">
                  {users.filter(u => u.role === 'STUDENT' && u.attendedToday).length}
                </div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1">
                  {users.filter(u => u.role === 'STUDENT').length > 0 
                    ? `${Math.round((users.filter(u => u.role === 'STUDENT' && u.attendedToday).length / users.filter(u => u.role === 'STUDENT').length) * 100)}% sĩ số chuyên cần` 
                    : '0%'}
                </div>
              </div>

              {/* 3. Chưa vào học */}
              <div className="bg-amber-50/70 p-5 rounded-3xl border-2 border-amber-200 shadow-xs">
                <div className="text-xs font-bold text-amber-800 uppercase">Chưa Vào Học</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-950 mt-1">
                  {users.filter(u => u.role === 'STUDENT' && !u.attendedToday).length}
                </div>
                <div className="text-[11px] text-amber-700 font-bold mt-1">
                  Cần nhắc nhở làm bài
                </div>
              </div>

              {/* 4. Lớp học */}
              <div className="bg-indigo-50/70 p-5 rounded-3xl border-2 border-indigo-200 shadow-xs">
                <div className="text-xs font-bold text-indigo-800 uppercase">Số Lớp Hoạt Động</div>
                <div className="text-2xl sm:text-3xl font-black text-indigo-950 mt-1">
                  {classes.length}
                </div>
                <div className="text-[11px] text-indigo-700 font-bold mt-1">
                  Khối 1 đến Khối 5
                </div>
              </div>
            </div>

            {/* Class-by-Class Cards Breakdown */}
            <div>
              <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                <School className="w-4 h-4 text-indigo-600" />
                <span>Thống Kê Điểm Danh Theo Từng Lớp Học:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {classes.map(c => {
                  const classStudentsList = users.filter(u => u.role === 'STUDENT' && u.classId === c.id);
                  const attendedCount = classStudentsList.filter(u => u.attendedToday).length;
                  const percent = classStudentsList.length > 0 ? Math.round((attendedCount / classStudentsList.length) * 100) : 0;
                  const isSelected = attendanceClassFilter === c.id;

                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        sound.playPop();
                        setAttendanceClassFilter(isSelected ? 'all' : c.id);
                      }}
                      className={`p-4 rounded-3xl border-2 transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-500/10 border-emerald-500 shadow-md scale-102' 
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800">{c.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          Khối {c.grade}
                        </span>
                      </div>

                      <div className="mt-3 flex items-baseline justify-between">
                        <div className="text-xl font-black text-slate-900">
                          <span className="text-emerald-600">{attendedCount}</span>
                          <span className="text-slate-400 text-sm font-bold"> / {classStudentsList.length}</span>
                        </div>
                        <div className="text-xs font-black text-emerald-700">
                          {percent}%
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="mt-2 text-[10px] text-slate-500 font-bold flex items-center justify-between">
                        <span>{attendedCount} đã vào</span>
                        <span>{classStudentsList.length - attendedCount} chưa vào</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Attendance Table & Filters */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Danh Sách Chi Tiết Học Sinh & Dữ Liệu Đăng Nhập
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Bấm "Điểm danh" để cập nhật chuyên cần thủ công hoặc bấm "Sửa" để thay đổi thông tin/mật khẩu đăng nhập.
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Class selector */}
                  <select
                    value={attendanceClassFilter}
                    onChange={(e) => setAttendanceClassFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white focus:outline-hidden focus:border-indigo-600 cursor-pointer"
                  >
                    <option value="all">Tất cả các lớp ({classes.length} lớp)</option>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name} (Khối {c.grade})</option>
                    ))}
                  </select>

                  {/* Status selector */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-black">
                    <button
                      type="button"
                      onClick={() => setAttendanceStatusFilter('all')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        attendanceStatusFilter === 'all' ? 'bg-white text-indigo-950 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendanceStatusFilter('attended')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        attendanceStatusFilter === 'attended' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      🟢 Đã vào học
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendanceStatusFilter('not_attended')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        attendanceStatusFilter === 'not_attended' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      ⚪ Chưa vào
                    </button>
                  </div>

                  {/* Search box */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Tìm theo họ tên, mã..."
                      value={attendanceSearch}
                      onChange={(e) => setAttendanceSearch(e.target.value)}
                      className="pl-8 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 w-44"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-black text-slate-600 uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">STT</th>
                      <th className="p-3.5">Họ và Tên Thật Đầy Đủ</th>
                      <th className="p-3.5">Lớp Học</th>
                      <th className="p-3.5">Tên Đăng Nhập (Mã HS)</th>
                      <th className="p-3.5">Mật Khẩu (Mã PIN)</th>
                      <th className="p-3.5">Trạng Thái Điểm Danh</th>
                      <th className="p-3.5">Thời Gian Đăng Nhập</th>
                      <th className="p-3.5 text-center">Điểm Danh Nhanh</th>
                      <th className="p-3.5 text-right">Quản Trị</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {attendanceStudentsList.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-400">
                          Không tìm thấy học sinh nào phù hợp với bộ lọc hiện tại.
                        </td>
                      </tr>
                    ) : (
                      attendanceStudentsList.map((s, idx) => (
                        <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-bold text-slate-400">{idx + 1}</td>
                          <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                            <span className="text-xl">{s.avatar}</span>
                            <span>{s.fullName}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                              {s.className || 'Chưa phân lớp'}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono font-black text-indigo-700 bg-indigo-50/30 rounded-lg">
                            {s.code}
                          </td>
                          <td className="p-3.5 font-mono font-black text-amber-700">
                            {s.pin}
                          </td>
                          <td className="p-3.5">
                            {s.attendedToday ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black border border-emerald-300">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                ĐÃ VÀO HỌC
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                Chưa vào học
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-slate-600 font-bold">
                            {s.attendedToday ? (s.lastLoginTime || 'Hôm nay') : '—'}
                          </td>
                          <td className="p-3.5 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                sound.playPop();
                                toggleStudentAttendance(s.id);
                                showToast(`Đã cập nhật trạng thái điểm danh của "${s.fullName}"!`);
                              }}
                              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                                s.attendedToday 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300' 
                                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                              }`}
                            >
                              {s.attendedToday ? 'Hủy Điểm Danh' : 'Điểm Danh Ngay'}
                            </button>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditStudent(s)}
                                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 border border-amber-200"
                                title="Chỉnh sửa thông tin học sinh & mã PIN"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                                <span>Sửa</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSingleStudent(s)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 font-bold transition-colors cursor-pointer border border-rose-200"
                                title="Xóa học sinh"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ASSIGN HOMEWORK & EXTERNAL PLATFORMS */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">Danh Sách Bài Tập Đã Giao Cho {activeClass?.name}</h3>
                <p className="text-xs text-slate-500">Tích hợp giao bài trong hệ thống hoặc gắn link OLM, Quizizz, Azota</p>
              </div>

              <button
                onClick={() => setShowAssignModal(true)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Giao Bài Tập Mới
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentClassAssignments.map(asg => (
                <div key={asg.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {asg.unitTitle}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 mt-1">{asg.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{asg.instructions}</p>
                    </div>

                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" /> Hạn: {asg.deadline}
                    </span>
                  </div>

                  {asg.externalPlatform && (
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700">
                        <ExternalLink className="w-4 h-4 text-indigo-600" />
                        <span>Nền tảng ngoài: {asg.externalPlatform.name}</span>
                      </div>
                      <a
                        href={asg.externalPlatform.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline font-extrabold truncate max-w-[140px]"
                      >
                        {asg.externalPlatform.url}
                      </a>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Đã nộp: {asg.submissions?.length || 0} / {classStudents.length} học sinh</span>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        const details = asg.submissions?.map(s => `${s.studentName}: ${s.score}đ`).join(' • ') || 'Chưa có lượt nộp bài nào';
                        showToast(`Bảng điểm ${asg.title}: ${details}`, 'info');
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-black cursor-pointer"
                    >
                      Xem bảng điểm &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROGRESS ANALYTICS & MISSED WORDS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-bold text-slate-400">Tỷ lệ hoàn thành bài tập</span>
                <div className="text-3xl font-black text-emerald-600">82%</div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-emerald-500 h-full w-[82%]" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-bold text-slate-400">Điểm kiểm tra trung bình</span>
                <div className="text-3xl font-black text-indigo-600">88.5 / 100</div>
                <p className="text-[11px] text-slate-500 font-bold">Tăng 12% so với tháng trước</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-bold text-slate-400">Số lượt luyện nói cùng AI</span>
                <div className="text-3xl font-black text-rose-500">248 lượt</div>
                <p className="text-[11px] text-slate-500 font-bold">Học sinh rất hào hứng nói với Sparky</p>
              </div>
            </div>

            {/* Most Missed Vocabulary Table */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Danh Sách Từ Vựng Học Sinh Trong Lớp Hay Nhầm Nhất</h3>
                <p className="text-xs text-slate-500">Giáo viên có thể tập trung củng cố lại các từ này trong tiết học tới</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { word: 'Eraser', vi: 'Cục tẩy', errorCount: 14, tip: 'Học sinh hay phát âm nhầm âm /ɪ/ thành /e/' },
                  { word: 'School bag', vi: 'Cặp sách', errorCount: 11, tip: 'Hay quên nối âm hoặc viết sai chữ bag' },
                  { word: 'Parrot', vi: 'Con vẹt', errorCount: 9, tip: 'Dễ nhầm với Rabbit khi nghe nhanh' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-indigo-950 text-base">{item.word}</span>
                      <span className="text-[10px] font-black bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full">
                        {item.errorCount} học sinh sai
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 font-bold">Nghĩa: {item.vi}</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed italic">{item.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI TEXTBOOK ANALYSIS & INTERACTIVE GENERATOR */}
        {activeTab === 'ai_textbook' && (
          <TextbookAIServicePanel onNavigatePortal={onNavigatePortal} />
        )}
      </main>

      {/* Modal: Giao Bài Mới */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border-4 border-indigo-200 space-y-4 animate-scaleIn">
            <h3 className="text-lg font-black text-slate-900">Giao Bài Tập Cho {activeClass?.name}</h3>
            
            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Tiêu đề bài tập</label>
                <input
                  type="text"
                  required
                  value={assignTitle}
                  onChange={(e) => setAssignTitle(e.target.value)}
                  placeholder="Ví dụ: Ôn tập 6 kỹ năng Unit 2 & Đua xe"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-hidden focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Gắn với Unit SGK</label>
                  <select
                    value={assignUnitId}
                    onChange={(e) => setAssignUnitId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-hidden focus:border-indigo-600"
                  >
                    {units.map(u => (
                      <option key={u.id} value={u.id}>{u.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">Hạn nộp (Deadline)</label>
                  <input
                    type="text"
                    value={assignDeadline}
                    onChange={(e) => setAssignDeadline(e.target.value)}
                    placeholder="2026-10-15 23:59"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-hidden focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Tích hợp nền tảng ngoài (Tùy chọn)</label>
                <select
                  value={assignPlatform}
                  onChange={(e) => setAssignPlatform(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-hidden focus:border-indigo-600"
                >
                  <option value="none">Không gắn liên kết ngoài (Học trực tiếp trên app)</option>
                  <option value="Quizizz">Quizizz</option>
                  <option value="OLM">OLM.vn</option>
                  <option value="Azota">Azota</option>
                </select>
              </div>

              {assignPlatform !== 'none' && (
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Link bài tập bên ngoài</label>
                  <input
                    type="url"
                    value={assignExternalUrl}
                    onChange={(e) => setAssignExternalUrl(e.target.value)}
                    placeholder="https://quizizz.com/join?gc=123456"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-hidden focus:border-indigo-600"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-600 mb-1">Lời nhắn của giáo viên</label>
                <textarea
                  rows={2}
                  value={assignInstructions}
                  onChange={(e) => setAssignInstructions(e.target.value)}
                  placeholder="Các con chú ý hoàn thành phần luyện nói cùng Sparky nhé!"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-hidden focus:border-indigo-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>LƯU & GIAO CHO LỚP</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Tạo Lớp Mới */}
      {showCreateClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-indigo-200 space-y-4 animate-scaleIn">
            <h3 className="text-base font-black text-slate-900">Tạo Lớp Học Mới</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Tên lớp học</label>
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="Ví dụ: Lớp 3A3"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-hidden focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Khối lớp (Grade)</label>
                <select
                  value={newClassGrade}
                  onChange={(e) => setNewClassGrade(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-hidden focus:border-indigo-600"
                >
                  <option value={1}>Lớp 1</option>
                  <option value={2}>Lớp 2</option>
                  <option value={3}>Lớp 3</option>
                  <option value={4}>Lớp 4</option>
                  <option value={5}>Lớp 5</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateClassModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (newClassName.trim()) {
                      sound.playSuccess();
                      createClass(newClassName, newClassGrade);
                      setShowCreateClassModal(false);
                      setNewClassName('');
                      showToast(`💾 Đã lưu và tạo lớp "${newClassName.trim()}" thành công!`);
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>LƯU & TẠO LỚP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Chỉnh Sửa Lớp Học */}
      {showEditClassModal && activeClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-indigo-200 space-y-4 animate-scaleIn">
            <div className="flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-black text-slate-900">Chỉnh Sửa Lớp Học</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Tên lớp học</label>
                <input
                  type="text"
                  value={editClassName}
                  onChange={(e) => setEditClassName(e.target.value)}
                  placeholder="Ví dụ: Lớp 3A1"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-hidden focus:border-indigo-600 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Khối lớp (Grade)</label>
                <select
                  value={editClassGrade}
                  onChange={(e) => setEditClassGrade(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-hidden focus:border-indigo-600 text-sm cursor-pointer"
                >
                  <option value={1}>Lớp 1</option>
                  <option value={2}>Lớp 2</option>
                  <option value={3}>Lớp 3</option>
                  <option value={4}>Lớp 4</option>
                  <option value={5}>Lớp 5</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditClassModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (editClassName.trim()) {
                      sound.playSuccess();
                      updateClass(activeClass.id, {
                        name: editClassName.trim(),
                        grade: editClassGrade
                      });
                      setShowEditClassModal(false);
                      showToast(`💾 Đã lưu thay đổi lớp "${editClassName.trim()}" thành công!`);
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>LƯU THAY ĐỔI LỚP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Quản Lý & Xóa 1 Hoặc Nhiều Lớp Đang Chọn */}
      {showBatchClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-rose-200 space-y-4 animate-scaleIn">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-rose-600" />
              <div>
                <h3 className="text-base font-black text-slate-900">Xóa Lớp Học</h3>
                <p className="text-[11px] text-slate-500 font-bold">Chọn 1 hoặc tất cả các lớp đang chọn để xóa khỏi trường</p>
              </div>
            </div>

            {/* Select all toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold">
              <span>Chọn tất cả ({classes.length} lớp):</span>
              <button
                type="button"
                onClick={() => {
                  if (selectedBatchClassIds.length === classes.length) {
                    setSelectedBatchClassIds([]);
                  } else {
                    setSelectedBatchClassIds(classes.map(c => c.id));
                  }
                }}
                className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-indigo-600 font-black cursor-pointer hover:bg-slate-100"
              >
                {selectedBatchClassIds.length === classes.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả các lớp'}
              </button>
            </div>

            {/* Class list with checkboxes */}
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {classes.map(c => (
                <label
                  key={c.id}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                    selectedBatchClassIds.includes(c.id)
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedBatchClassIds.includes(c.id)}
                      onChange={() => {
                        setSelectedBatchClassIds(prev => 
                          prev.includes(c.id) ? prev.filter(id => id !== c.id) : [...prev, c.id]
                        );
                      }}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                    />
                    <div>
                      <div className="font-black text-xs text-slate-900">{c.name}</div>
                      <div className="text-[10px] text-slate-500">Khối {c.grade} • {c.studentCount} Học sinh</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400">
                    {c.teacherName || 'Ms Que'}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() => setShowBatchClassModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold cursor-pointer"
              >
                Hủy
              </button>

              <button
                type="button"
                disabled={selectedBatchClassIds.length === 0}
                onClick={handleDeleteBatchClasses}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black cursor-pointer shadow-md disabled:opacity-40 flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>XÓA {selectedBatchClassIds.length > 0 ? `(${selectedBatchClassIds.length}) LỚP ĐÃ CHỌN` : 'CÁC LỚP ĐÃ CHỌN'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Dán Danh Sách Học Sinh (Nhập Nhanh) */}
      {showQuickPasteModal && activeClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border-4 border-indigo-200 space-y-4 animate-scaleIn">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-base font-black text-slate-900">Dán Danh Sách Học Sinh Thật Vào {activeClass.name}</h3>
                <p className="text-[11px] text-slate-500 font-bold">Mỗi dòng là một họ tên học sinh (tự động tạo mã và thêm vào lớp)</p>
              </div>
            </div>

            <div>
              <textarea
                rows={8}
                value={pastedStudentNames}
                onChange={(e) => setPastedStudentNames(e.target.value)}
                placeholder={"Ví dụ:\nNguyễn Thị Mai Anh\nTrần Quốc Bảo\nLê Ngọc Diệp\nPhạm Minh Đức\nHoàng Khánh Hà"}
                className="w-full p-3.5 rounded-2xl border border-slate-300 font-medium text-xs text-slate-800 focus:outline-hidden focus:border-indigo-600 leading-relaxed font-sans"
              />
              <p className="text-[11px] text-slate-500 font-semibold mt-1">
                💡 Hệ thống sẽ tự động gán tài khoản cho từng học sinh vào <strong>{activeClass.name}</strong>.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() => setShowQuickPasteModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold cursor-pointer"
              >
                Hủy
              </button>

              <button
                type="button"
                disabled={!pastedStudentNames.trim()}
                onClick={handleQuickPasteImport}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-black cursor-pointer shadow-md disabled:opacity-40 flex items-center gap-1.5 border border-emerald-400"
              >
                <Save className="w-4 h-4" />
                <span>LƯU & THÊM DANH SÁCH VÀO LỚP</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Thêm 1 Học Sinh Mới Vào Lớp */}
      {showAddStudentModal && activeClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-2 border-indigo-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Thêm Học Sinh Mới Vào {activeClass.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold">
                    Nhập Họ tên thật, Mã học sinh (Tên đăng nhập) và Mật khẩu (PIN)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddStudentModal(false)}
                className="p-1 rounded-xl text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddStudent} className="space-y-3.5 text-xs">
              {/* Họ và tên thật */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Họ và tên thật đầy đủ của học sinh <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addStudentForm.fullName}
                  onChange={(e) => setAddStudentForm(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Ví dụ: Nguyễn Thị Mai Anh"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 focus:outline-hidden focus:border-indigo-600 text-sm"
                />
              </div>

              {/* Tên đăng nhập (Mã HS) & Mật khẩu (PIN) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tên đăng nhập (Mã HS) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addStudentForm.code}
                    onChange={(e) => setAddStudentForm(prev => ({ ...prev, code: e.target.value }))}
                    placeholder="Ví dụ: STU3A1_05"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono font-black text-indigo-700 uppercase focus:outline-hidden focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mật khẩu (Mã PIN) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addStudentForm.pin}
                    onChange={(e) => setAddStudentForm(prev => ({ ...prev, pin: e.target.value }))}
                    placeholder="Ví dụ: 3A1"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono font-black text-amber-700 uppercase focus:outline-hidden focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* Lớp học phân công */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Lớp học phân công
                </label>
                <select
                  value={addStudentForm.classId}
                  onChange={(e) => {
                    const selClass = classes.find(c => c.id === e.target.value);
                    setAddStudentForm(prev => ({
                      ...prev,
                      classId: e.target.value,
                      grade: selClass?.grade || prev.grade
                    }));
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-white focus:outline-hidden focus:border-indigo-600 cursor-pointer"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Khối {c.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-800 font-semibold leading-relaxed">
                💡 Học sinh sẽ dùng <strong>Tên đăng nhập (Mã: {addStudentForm.code || '...'})</strong> hoặc <strong>Họ tên thật</strong> cùng <strong>Mật khẩu (Mã PIN: {addStudentForm.pin || '...'})</strong> để vào học tại Cổng Học Sinh.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-black shadow-md transition-all cursor-pointer flex items-center gap-1.5 border border-emerald-400"
                >
                  <Save className="w-4 h-4" />
                  <span>LƯU HỌC SINH VÀO LỚP</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Chỉnh Sửa Thông Tin Học Sinh & Dữ Liệu Đăng Nhập */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-2 border-indigo-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Sửa Dữ Liệu Đăng Nhập Học Sinh
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold">
                    Cập nhật tài khoản, mã PIN và chuyển lớp cho học sinh
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="p-1 rounded-xl text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditStudent} className="space-y-3.5 text-xs">
              {/* Họ và tên */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Họ và tên học sinh <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editStudentForm.fullName}
                  onChange={(e) => setEditStudentForm(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Ví dụ: Nguyễn Thị Mai Anh"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 focus:outline-hidden focus:border-indigo-600"
                />
              </div>

              {/* Tên đăng nhập / Mã học sinh */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mã (Username) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editStudentForm.code}
                    onChange={(e) => setEditStudentForm(prev => ({ ...prev, code: e.target.value }))}
                    placeholder="Ví dụ: STU101"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono font-black text-indigo-700 uppercase focus:outline-hidden focus:border-indigo-600"
                  />
                </div>

                {/* Mật khẩu PIN */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mã PIN / Mật khẩu <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editStudentForm.pin}
                    onChange={(e) => setEditStudentForm(prev => ({ ...prev, pin: e.target.value }))}
                    placeholder="Ví dụ: 3A1"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono font-black text-amber-700 uppercase focus:outline-hidden focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* Lớp học */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Lớp học phân công
                </label>
                <select
                  value={editStudentForm.classId}
                  onChange={(e) => {
                    const selClass = classes.find(c => c.id === e.target.value);
                    setEditStudentForm(prev => ({
                      ...prev,
                      classId: e.target.value,
                      grade: selClass?.grade || prev.grade
                    }));
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-white focus:outline-hidden focus:border-indigo-600 cursor-pointer"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Khối Lớp {c.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-800 font-semibold leading-relaxed">
                💡 Học sinh sẽ dùng <strong>Họ tên</strong> hoặc <strong>Mã {editStudentForm.code || '...'}</strong> cùng <strong>PIN: {editStudentForm.pin || '...'}</strong> để đăng nhập vào học tại Cổng Học Sinh.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-black shadow-md transition-all cursor-pointer flex items-center gap-1.5 border border-emerald-400"
                >
                  <Save className="w-4 h-4" />
                  <span>LƯU THAY ĐỔI HỌC SINH</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Xác Nhận Thao Tác (Confirm Dialog - 100% hoạt động trong iFrame không bị chặn) */}
      {confirmDialog && confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-2 border-rose-200 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
              <Trash2 className="w-7 h-7" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-black text-slate-900">
                {confirmDialog.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {confirmDialog.message}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => {
                  confirmDialog.onConfirm();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-black shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>{confirmDialog.confirmText || 'Xác Nhận Xóa'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-App Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-black max-w-md ${
            toastMessage.type === 'error' 
              ? 'bg-rose-900 text-rose-100 border-rose-700' 
              : toastMessage.type === 'info'
              ? 'bg-slate-900 text-slate-100 border-slate-700'
              : 'bg-emerald-900 text-emerald-100 border-emerald-700'
          }`}>
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <span className="flex-1 leading-snug">{toastMessage.text}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
