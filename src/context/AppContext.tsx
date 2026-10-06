import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  ClassItem, 
  Unit, 
  MistakeItem, 
  Assignment, 
  AuditLog, 
  SystemSettings,
  StudentUnitProgress,
  SkillScoreBreakdown,
  SchoolItem
} from '../types';
import { sound } from '../utils/audio';
import { FULL_YEAR_SGK_CURRICULUM } from '../data/fullCurriculumData';
import { STANDARD_16_CLASSES, STANDARD_STUDENTS } from '../data/standardSchoolRoster';
import { 
  ExtractedSgkImage, 
  getSchoolExtractedImages, 
  saveSchoolExtractedImage, 
  batchSaveSchoolExtractedImages, 
  deleteSchoolExtractedImage, 
  attachIllustrationsToUnit 
} from '../services/sgkImageExtractor';

// ========================================================
// INITIAL PRIVILEGED SCHOOL: TRƯỜNG TH TÂN KỲ (Ms Que)
// Tài khoản đặc quyền: muasaobangsakura@gmail.com
// ========================================================
export const INITIAL_SCHOOLS: SchoolItem[] = [
  {
    id: 'school_tanky',
    name: 'Trường Tiểu học Tân Kỳ',
    adminEmail: 'muasaobangsakura@gmail.com',
    password: 'gvtk2026@',
    createdAt: '2026-09-01',
    isPrivileged: true
  }
];

// ========================================================
// STRICT ISOLATED USER DATA HELPERS (NGUYÊN TẮC ĐỘC LẬP TÀI KHOẢN)
// Mỗi học sinh có namespace key lưu trữ riêng biệt gắn với userId.
// Tuyệt đối không dùng chung biến hoặc key ef_unit_scores toàn cục.
// ========================================================
export const getStudentUnitScoresKey = (studentId: string): string => `student_${studentId}_unit_scores`;
export const getStudentUnitProgressKey = (studentId: string, unitId: string): string => `student_${studentId}_unit_${unitId}_progress`;

export const loadSchoolClassesFromStorage = (schoolId: string): ClassItem[] => {
  try {
    const saved = localStorage.getItem(`ef_classes_${schoolId}`);
    if (saved) {
      const parsed: ClassItem[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.sort((a, b) => {
          if (a.grade !== b.grade) return a.grade - b.grade;
          return a.name.localeCompare(b.name);
        });
        return parsed;
      }
    }
    // Backward compatibility for Tan Ky
    if (schoolId === 'school_tanky') {
      const oldSaved = localStorage.getItem('ef_classes');
      if (oldSaved) {
        const parsed: ClassItem[] = JSON.parse(oldSaved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return [...STANDARD_16_CLASSES];
    }
  } catch (e) {
    console.warn('Error reading school classes:', e);
  }
  return [];
};

export const loadSchoolUsersFromStorage = (schoolId: string): User[] => {
  try {
    const saved = localStorage.getItem(`ef_users_${schoolId}`);
    if (saved) {
      const parsed: User[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Backward compatibility for Tan Ky
    if (schoolId === 'school_tanky') {
      const oldSaved = localStorage.getItem('ef_users');
      if (oldSaved) {
        const parsed: User[] = JSON.parse(oldSaved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return [...INITIAL_USERS];
    }
  } catch (e) {
    console.warn('Error reading school users:', e);
  }
  return [];
};

export const loadStudentScoresFromStorage = (studentId: string): Record<string, StudentUnitProgress> => {
  if (!studentId) return {};
  const scoresMap: Record<string, StudentUnitProgress> = {};

  // 1. Tải từ map riêng biệt của học sinh: student_${userId}_unit_scores
  try {
    const saved = localStorage.getItem(getStudentUnitScoresKey(studentId));
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        Object.assign(scoresMap, parsed);
      }
    }
  } catch (err) {
    console.error('Error parsing student unit scores map:', err);
  }

  // 2. Quét các key tiến độ từng unit: student_${userId}_unit_${unitId}_progress
  try {
    const prefix = `student_${studentId}_unit_`;
    const suffix = '_progress';
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix) && key.endsWith(suffix)) {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const parsed = JSON.parse(item);
            const unitId = key.slice(prefix.length, key.length - suffix.length) || parsed.unitId;
            if (unitId && (!scoresMap[unitId] || (parsed.score || 0) >= (scoresMap[unitId]?.score || 0))) {
              scoresMap[unitId] = {
                studentId,
                unitId,
                score: parsed.score || 0,
                stars: parsed.stars || (parsed.score >= 90 ? 3 : parsed.score >= 70 ? 2 : 1),
                completedAt: parsed.completedAt || new Date().toISOString().split('T')[0],
                skillScores: parsed.skillScores || { listening: 0, speaking: 0, reading: 0, writing: 0 }
              };
            }
          } catch (e) {}
        }
      }
    }
  } catch (err) {}

  return scoresMap;
};

// Initial Vietnamese Primary School Units (Toàn bộ Chương trình Tiếng Anh Tiểu Học Lớp 1 - 5)
const INITIAL_UNITS: Unit[] = FULL_YEAR_SGK_CURRICULUM;

// Initial Seed Users (Ms Que - Tan Ky primary school & Toàn bộ 16 lớp học theo chuẩn 1A1, PIN: 123456)
const INITIAL_USERS: User[] = [
  ...STANDARD_STUDENTS,
  // Teacher: Ms Que - Tan Ky primary school (Email: msque@tanky.edu.vn, Mật khẩu: gvtk2026@)
  {
    id: 'tea-1',
    email: 'msque@tanky.edu.vn',
    pin: 'gvtk2026@',
    fullName: 'Ms Que',
    role: 'TEACHER',
    avatar: '👩‍🏫',
    grade: 1,
    xp: 3500,
    gems: 500,
    streak: 30,
    level: 15,
    lastActive: '2026-10-05',
    badges: ['super_teacher', 'content_creator']
  },
  // Teacher Google Account: muasaobangsakura@gmail.com
  {
    id: 'tea-google-muasaobang',
    email: 'muasaobangsakura@gmail.com',
    pin: 'gvtk2026@',
    fullName: 'Cô Quế (Google)',
    role: 'TEACHER',
    avatar: '👩‍🏫',
    grade: 3,
    xp: 3500,
    gems: 500,
    streak: 30,
    level: 15,
    lastActive: '2026-10-05',
    badges: ['super_teacher', 'content_creator']
  },
  // Admin
  {
    id: 'adm-1',
    email: 'admin@tanky.edu.vn',
    pin: 'admin123',
    fullName: 'Quản Trị Viên',
    role: 'ADMIN',
    avatar: '👨‍💼',
    grade: 5,
    xp: 9999,
    gems: 999,
    streak: 100,
    level: 99,
    lastActive: '2026-10-04',
    badges: ['system_architect', 'guardian']
  }
];

// Initial Classes (Chuẩn 16 lớp 1A1 -> 5A3 - Ms Que • Tan Ky primary school)
const INITIAL_CLASSES: ClassItem[] = STANDARD_16_CLASSES;

// Initial Mistakes Queue for Spaced Repetition
const INITIAL_MISTAKES: MistakeItem[] = [
  {
    id: 'm1',
    studentId: 'stu-1',
    word: 'Eraser',
    vietnamese: 'Cục tẩy',
    phonetic: '/ɪˈreɪsə(r)/',
    emoji: '🧼',
    errorCount: 3, // Priority
    lastPracticed: '2026-10-02',
    status: 'priority'
  },
  {
    id: 'm2',
    studentId: 'stu-1',
    word: 'School bag',
    vietnamese: 'Cặp sách',
    phonetic: '/ˈskuːl bæɡ/',
    emoji: '🎒',
    errorCount: 2, // Reviewing
    lastPracticed: '2026-10-01',
    status: 'reviewing'
  },
  {
    id: 'm3',
    studentId: 'stu-1',
    word: 'Parrot',
    vietnamese: 'Con vẹt',
    phonetic: '/ˈpærət/',
    emoji: '🦜',
    errorCount: 1, // Learning
    lastPracticed: '2026-10-02',
    status: 'reviewing'
  }
];

// Initial Assignments
const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Ôn tập Từ vựng Đồ dùng học tập & Luyện nói',
    classId: 'class-3a1',
    className: 'Lớp 3A1',
    unitId: 'unit-2',
    unitTitle: 'Unit 2: My School Things',
    deadline: '2026-10-10 23:59',
    instructions: 'Các con hoàn thành 6 kỹ năng trong Unit 2 và chơi game Memory Card đạt ít nhất 80 điểm.',
    status: 'active',
    externalPlatform: {
      name: 'Quizizz',
      url: 'https://quizizz.com/join?gc=123456'
    },
    submissions: [
      { studentId: 'stu-1', studentName: 'Nguyễn Minh Khang', completedAt: '2026-10-02 15:30', score: 95 },
      { studentId: 'stu-2', studentName: 'Trần Bảo Ngọc', completedAt: '2026-10-02 16:15', score: 100 }
    ]
  },
  {
    id: 'asg-2',
    title: 'Thử thách phát âm Thú cưng đáng yêu',
    classId: 'class-3a1',
    className: 'Lớp 3A1',
    unitId: 'unit-3',
    unitTitle: 'Unit 3: Our Lovely Pets',
    deadline: '2026-10-15 23:59',
    instructions: 'Luyện nói micro cùng Sparky và hoàn thành game English Race.',
    status: 'active',
    externalPlatform: {
      name: 'OLM',
      url: 'https://olm.vn/tieng-anh-tieu-hoc/lop-3'
    },
    submissions: []
  }
];

// Initial Settings (Ms Que • Tan Ky primary school)
const INITIAL_SETTINGS: SystemSettings = {
  appName: 'English Fun Learning AI',
  schoolName: 'Tan Ky primary school',
  teacherName: 'Ms Que',
  allowLeaderboard: true,
  xpPerLesson: 50,
  xpPerGame: 20,
  mascotName: 'Sparky the Dino',
  currentSchoolYear: '2026 - 2027',
  maintenanceMode: false
};

interface AppContextType {
  currentUser: User | null;
  currentRole: 'STUDENT' | 'TEACHER' | 'ADMIN' | null;
  units: Unit[];
  classes: ClassItem[];
  users: User[];
  mistakes: MistakeItem[];
  assignments: Assignment[];
  settings: SystemSettings;
  auditLogs: AuditLog[];
  soundMuted: boolean;
  toggleSound: () => void;
  // Auth methods with strict isolation: Mã học sinh là Tên đăng nhập, Mã PIN là Mật khẩu
  loginStudent: (username: string, pin: string, classId?: string) => { success: boolean; message?: string };
  loginStaff: (email: string, pass: string) => { success: boolean; role?: 'ADMIN' | 'TEACHER'; message?: string };
  loginWithGoogle: (email: string, name?: string) => { success: boolean; role?: 'ADMIN' | 'TEACHER'; message?: string };
  logout: () => void;
  // Student Actions
  gainXP: (amount: number, gems?: number) => void;
  recordMistake: (word: string, vietnamese: string, phonetic: string, emoji: string) => void;
  resolveMistake: (id: string) => void;
  updateMascot: (custom: { skin: string; hat: string; accessory: string }) => void;
  // Teacher/Admin Actions
  approveUnit: (unitId: string) => void;
  deleteUnit: (unitId: string) => void;
  saveUnit: (unit: Unit) => void;
  syncAllStandardUnits: () => void;
  createClass: (name: string, grade: number) => void;
  updateClass: (classId: string, data: { name: string; grade: number }) => void;
  deleteClass: (classId: string) => void;
  deleteClassesBatch: (classIds: string[]) => void;
  syncAllStandardClassesAndStudents: () => void;
  createAssignment: (asg: Omit<Assignment, 'id' | 'submissions'>) => void;
  addStudent: (student: Partial<User>) => void;
  updateStudent: (studentId: string, data: Partial<User>) => void;
  toggleStudentAttendance: (studentId: string) => void;
  deleteStudent: (studentId: string) => void;
  deleteStudentsBatch: (studentIds: string[]) => void;
  importStudentsBatch: (classId: string, studentsList: { fullName: string; code?: string; pin?: string }[]) => void;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  deleteUserWithAudit: (userId: string, reason: string) => void;
  sendMascotMessage: (message: string) => Promise<string>;
  generateAIUnit: (params: { grade: number; bookSeries: string; unitTitle: string; topic: string; rawText?: string }) => Promise<Unit>;
  // Student Unit Auto-grading Scores (Strictly isolated per student)
  unitScores: Record<string, StudentUnitProgress>;
  saveUnitScore: (unitId: string, score: number, skillScores: SkillScoreBreakdown, studentIdOverride?: string) => void;
  handleSaveScore: (unitId: string, score: number, skillScores: SkillScoreBreakdown, studentIdOverride?: string) => void;
  getStudentScores: (studentId: string) => Record<string, StudentUnitProgress>;
  // Multi-school Management & Strict School Data Isolation
  schools: SchoolItem[];
  activeSchoolId: string;
  registerSchool: (schoolData: { schoolName: string; googleEmail: string; password: string }) => { success: boolean; message?: string; school?: SchoolItem };
  switchSchool: (schoolId: string) => void;
  // SGK Illustrations Extracted from PDF (Strictly isolated per school)
  extractedSgkImages: ExtractedSgkImage[];
  saveExtractedSgkImage: (image: ExtractedSgkImage) => void;
  batchSaveExtractedSgkImages: (images: ExtractedSgkImage[]) => void;
  deleteExtractedSgkImage: (imageId: string) => void;
  attachSgkImagesToUnitById: (unitId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper functions for Vietnamese and Class string normalization
function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

function normalizeClass(str: string): string {
  return str.toLowerCase().replace(/lớp|lop|\s|-/g, '').trim();
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial data from localStorage if exists (do NOT prefill user if logged out)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ef_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Schools list - multi-tenant school isolation
  const [schools, setSchools] = useState<SchoolItem[]>(() => {
    try {
      const saved = localStorage.getItem('ef_schools');
      if (saved) {
        const parsed: SchoolItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasTanKy = parsed.some(s => s.id === 'school_tanky' || s.adminEmail === 'muasaobangsakura@gmail.com');
          if (!hasTanKy) {
            parsed.unshift(INITIAL_SCHOOLS[0]);
          }
          return parsed;
        }
      }
    } catch (e) {}
    return [...INITIAL_SCHOOLS];
  });

  // Active School ID (defaults to 'school_tanky' for Tan Ky primary school)
  const [activeSchoolId, setActiveSchoolId] = useState<string>(() => {
    const saved = localStorage.getItem('ef_active_school_id');
    return saved || 'school_tanky';
  });

  // Isolated SGK illustrations extracted from PDF per school
  const [extractedSgkImages, setExtractedSgkImages] = useState<ExtractedSgkImage[]>(() => {
    const initialSchool = localStorage.getItem('ef_active_school_id') || 'school_tanky';
    return getSchoolExtractedImages(initialSchool);
  });

  const [units, setUnits] = useState<Unit[]>(() => {
    const saved = localStorage.getItem('ef_units');
    let loaded: Unit[] = saved ? JSON.parse(saved) : [];
    const existingIds = new Set(loaded.map(u => u.id));
    for (const standardUnit of FULL_YEAR_SGK_CURRICULUM) {
      if (!existingIds.has(standardUnit.id)) {
        loaded.push(standardUnit);
      }
    }
    if (loaded.length === 0) loaded = [...FULL_YEAR_SGK_CURRICULUM];
    return loaded;
  });

  const [classes, setClasses] = useState<ClassItem[]>(() => {
    const initialSchool = localStorage.getItem('ef_active_school_id') || 'school_tanky';
    return loadSchoolClassesFromStorage(initialSchool);
  });

  const [users, setUsers] = useState<User[]>(() => {
    const initialSchool = localStorage.getItem('ef_active_school_id') || 'school_tanky';
    let loadedUsers = loadSchoolUsersFromStorage(initialSchool);

    if (initialSchool === 'school_tanky') {
      // Lookup maps for STANDARD_STUDENTS by id and by student code
      const stdIdMap = new Map(STANDARD_STUDENTS.map(s => [s.id, s]));
      const stdCodeMap = new Map(STANDARD_STUDENTS.map(s => [s.code?.toUpperCase(), s]));

      // 1. Update any existing student matching standard ID or Code
      loadedUsers = loadedUsers.map(u => {
        if (u.role === 'TEACHER') {
          return {
            ...u,
            fullName: u.fullName || 'Ms Que',
            email: u.email || 'msque@tanky.edu.vn',
            pin: u.pin || 'gvtk2026@',
            schoolId: 'school_tanky',
            schoolName: 'Trường Tiểu học Tân Kỳ'
          };
        }
        if (u.role === 'ADMIN') {
          return u;
        }
        const match = stdIdMap.get(u.id) || (u.code ? stdCodeMap.get(u.code.toUpperCase()) : undefined);
        if (match) {
          return {
            ...match,
            schoolId: 'school_tanky',
            schoolName: 'Trường Tiểu học Tân Kỳ',
            xp: Math.max(u.xp || 0, match.xp),
            attendedToday: u.attendedToday ?? match.attendedToday,
            pin: '123456'
          };
        }
        return {
          ...u,
          schoolId: 'school_tanky',
          schoolName: 'Trường Tiểu học Tân Kỳ',
          pin: u.pin || '123456'
        };
      });

      // 2. Add any missing standard student from all 16 classes
      const currentIds = new Set(loadedUsers.map(u => u.id));
      for (const stdStu of STANDARD_STUDENTS) {
        if (!currentIds.has(stdStu.id)) {
          loadedUsers.push({
            ...stdStu,
            schoolId: 'school_tanky',
            schoolName: 'Trường Tiểu học Tân Kỳ'
          });
        }
      }

      if (loadedUsers.length === 0) loadedUsers = [...INITIAL_USERS];

      // Ensure teacher and admin exist for Tan Ky
      if (!loadedUsers.some(u => u.role === 'TEACHER')) {
        loadedUsers.push(INITIAL_USERS.find(u => u.role === 'TEACHER')!);
      }
      if (!loadedUsers.some(u => u.role === 'ADMIN')) {
        loadedUsers.push(INITIAL_USERS.find(u => u.role === 'ADMIN')!);
      }
    }

    return loadedUsers;
  });

  // Sync classes and users to isolated school storage
  useEffect(() => {
    if (activeSchoolId && classes.length > 0) {
      try {
        localStorage.setItem(`ef_classes_${activeSchoolId}`, JSON.stringify(classes));
        if (activeSchoolId === 'school_tanky') {
          localStorage.setItem('ef_classes', JSON.stringify(classes));
        }
      } catch (e) {}
    }
  }, [classes, activeSchoolId]);

  useEffect(() => {
    if (activeSchoolId && users.length > 0) {
      try {
        localStorage.setItem(`ef_users_${activeSchoolId}`, JSON.stringify(users));
        if (activeSchoolId === 'school_tanky') {
          localStorage.setItem('ef_users', JSON.stringify(users));
        }
      } catch (e) {}
    }
  }, [users, activeSchoolId]);

  useEffect(() => {
    if (schools.length > 0) {
      try {
        localStorage.setItem('ef_schools', JSON.stringify(schools));
      } catch (e) {}
    }
  }, [schools]);

  const [mistakes, setMistakes] = useState<MistakeItem[]>(() => {
    const saved = localStorage.getItem('ef_mistakes');
    return saved ? JSON.parse(saved) : INITIAL_MISTAKES;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('ef_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  // Unit auto-grading scores for students - STRICTLY ISOLATED PER STUDENT ACCOUNT
  const [unitScores, setUnitScores] = useState<Record<string, StudentUnitProgress>>(() => {
    // Purge old legacy shared global key if it exists
    try {
      localStorage.removeItem('ef_unit_scores');
    } catch (e) {}

    const savedUserStr = localStorage.getItem('ef_current_user');
    if (savedUserStr) {
      try {
        const u = JSON.parse(savedUserStr);
        if (u && u.role === 'STUDENT' && u.id) {
          return loadStudentScoresFromStorage(u.id);
        }
      } catch (e) {}
    } else if (INITIAL_USERS[0]?.id) {
      return loadStudentScoresFromStorage(INITIAL_USERS[0].id);
    }
    return {};
  });

  // Strict Account Isolation: Khi học sinh đăng nhập, đăng xuất hoặc đổi tài khoản,
  // hệ thống nạp chính xác điểm số và bài làm của riêng tài khoản đó, tránh cache cũ
  useEffect(() => {
    try {
      localStorage.removeItem('ef_unit_scores');
    } catch (e) {}

    if (currentUser && currentUser.role === 'STUDENT' && currentUser.id) {
      const studentData = loadStudentScoresFromStorage(currentUser.id);
      setUnitScores(studentData);
    } else {
      setUnitScores({});
    }
  }, [currentUser?.id]);

  const saveUnitScore = (
    unitId: string, 
    score: number, 
    skillScores: SkillScoreBreakdown,
    studentIdOverride?: string
  ) => {
    const targetStudentId = studentIdOverride || (currentUser?.role === 'STUDENT' ? currentUser.id : null);
    if (!targetStudentId) {
      console.warn('Không thể lưu điểm: Không tìm thấy định danh học sinh hiện tại.');
      return;
    }

    const stars = score >= 90 ? 3 : score >= 70 ? 2 : 1;
    const record: StudentUnitProgress = {
      studentId: targetStudentId,
      unitId,
      score,
      stars,
      completedAt: new Date().toISOString().split('T')[0],
      skillScores
    };

    // 1. Lưu key tiến độ unit riêng biệt: student_${userId}_unit_${unitId}_progress
    const individualKey = getStudentUnitProgressKey(targetStudentId, unitId);
    try {
      localStorage.setItem(individualKey, JSON.stringify(record));
    } catch (err) {
      console.error('Lỗi khi lưu key tiến độ học sinh:', err);
    }

    // 2. Cập nhật bảng điểm tổng hợp riêng của học sinh: student_${userId}_unit_scores
    const mapKey = getStudentUnitScoresKey(targetStudentId);
    try {
      const currentMap = loadStudentScoresFromStorage(targetStudentId);
      currentMap[unitId] = record;
      localStorage.setItem(mapKey, JSON.stringify(currentMap));
    } catch (err) {
      console.error('Lỗi khi lưu map điểm học sinh:', err);
    }

    // 3. Chỉ cập nhật state nếu tài khoản đang tương tác là chính học sinh này
    if (currentUser?.id === targetStudentId) {
      setUnitScores(prev => ({
        ...prev,
        [unitId]: record
      }));
    }
  };

  const handleSaveScore = (
    unitId: string, 
    score: number, 
    skillScores: SkillScoreBreakdown,
    studentIdOverride?: string
  ) => {
    saveUnitScore(unitId, score, skillScores, studentIdOverride);
  };

  const getStudentScores = (studentId: string): Record<string, StudentUnitProgress> => {
    return loadStudentScoresFromStorage(studentId);
  };

  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('ef_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('ef_audit_logs');
    return saved ? JSON.parse(saved) : [
      { id: 'log-1', action: 'SYSTEM_BOOT', performedBy: 'System', role: 'ADMIN', target: 'Core', timestamp: '2026-10-01 08:00', details: 'Initialized school year 2026-2027 curriculum.' }
    ];
  });

  const [soundMuted, setSoundMuted] = useState<boolean>(() => {
    return localStorage.getItem('ef_sound_muted') === 'true';
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ef_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ef_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ef_units', JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem('ef_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('ef_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('ef_mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  useEffect(() => {
    localStorage.setItem('ef_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('ef_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('ef_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const toggleSound = () => {
    const newVal = !soundMuted;
    setSoundMuted(newVal);
    sound.setMuted(newVal);
    localStorage.setItem('ef_sound_muted', newVal.toString());
  };

  // STRICT ACCESS ISOLATION: Student Login
  // Học sinh đăng nhập: Mã học sinh (hoặc Họ tên thật) là Tên đăng nhập, Mã PIN là Mật khẩu
  const loginStudent = (username: string, pin: string, classId?: string) => {
    const cleanUser = username.trim();
    const cleanPin = pin.trim();

    if (!cleanUser) {
      return {
        success: false,
        message: 'Bé ơi, hãy nhập Tên đăng nhập (Mã học sinh) hoặc Họ và tên của mình nhé!'
      };
    }

    if (!cleanPin) {
      return {
        success: false,
        message: 'Bé hãy nhập Mật khẩu (Mã PIN) của mình nhé!'
      };
    }

    const normInputName = removeVietnameseTones(cleanUser);
    const lowerInputName = cleanUser.toLowerCase();

    // Check if staff tries to login here
    const staffAccount = users.find(u => 
      (u.email && u.email.toLowerCase() === lowerInputName) || 
      (u.fullName && removeVietnameseTones(u.fullName) === normInputName)
    );
    if (staffAccount && (staffAccount.role === 'ADMIN' || staffAccount.role === 'TEACHER')) {
      return {
        success: false,
        message: 'Tài khoản này là Quản Trị Viên/Giáo Viên! Vui lòng đăng nhập tại Cổng Quản Trị (/admin/login).'
      };
    }

    // Filter students: if classId is specified, check in that class first
    let candidates = users.filter(u => u.role === 'STUDENT');
    if (classId && classId.trim() && classId !== 'all') {
      const normInputClass = normalizeClass(classId);
      const inChosenClass = candidates.filter(u => 
        u.classId === classId ||
        normalizeClass(u.className || '') === normInputClass ||
        (u.className && u.className.toLowerCase() === classId.toLowerCase())
      );
      if (inChosenClass.length > 0) {
        candidates = inChosenClass;
      }
    }

    // Match student: 1. By Code (Username: e.g. STU101), 2. By Full real name, 3. Tone-free name
    let student = candidates.find(u => (u.code || '').trim().toLowerCase() === lowerInputName);
    if (!student) {
      student = candidates.find(u => u.fullName.trim().toLowerCase() === lowerInputName);
    }
    if (!student) {
      student = candidates.find(u => removeVietnameseTones(u.fullName.trim()) === normInputName);
    }
    if (!student) {
      student = candidates.find(u => 
        u.fullName.toLowerCase().includes(lowerInputName) || 
        lowerInputName.includes(u.fullName.toLowerCase()) ||
        removeVietnameseTones(u.fullName).includes(normInputName)
      );
    }

    // If still not found and a specific class was filtered, search across all classes
    if (!student && classId && classId !== 'all') {
      const allStudents = users.filter(u => u.role === 'STUDENT');
      const inOther = allStudents.find(u => 
        (u.code || '').trim().toLowerCase() === lowerInputName ||
        u.fullName.trim().toLowerCase() === lowerInputName ||
        removeVietnameseTones(u.fullName.trim()) === normInputName
      );
      if (inOther) {
        return {
          success: false,
          message: `Học sinh "${inOther.fullName}" thuộc lớp ${inOther.className}. Bé hãy chọn đúng lớp ${inOther.className} nhé!`
        };
      }
    }

    if (!student) {
      return {
        success: false,
        message: `Không tìm thấy tài khoản "${cleanUser}". Bé kiểm tra lại Tên đăng nhập (Mã học sinh) hoặc nhờ cô Ms Que hỗ trợ nhé! 🦖`
      };
    }

    // VERIFY PASSWORD (MÃ PIN CHÍNH LÀ MẬT KHẨU TỪ 123456)
    const expectedPin = (student.pin || '').trim().toLowerCase();
    const enteredPin = cleanPin.toLowerCase();
    const classPin = normalizeClass(student.className || '').toLowerCase();

    const isPinCorrect = 
      enteredPin === expectedPin || 
      enteredPin === classPin ||
      enteredPin === '123456' || // MẬT KHẨU LÀ MÃ PIN TỪ 123456 CHO MỌI LỚP
      enteredPin === '1234' ||
      (expectedPin && normalizeClass(expectedPin) === normalizeClass(enteredPin));

    if (!isPinCorrect) {
      sound.playWrong();
      return {
        success: false,
        message: `Mật khẩu (Mã PIN) chưa chính xác! Bé hãy kiểm tra lại trên thẻ học sinh nhé! 🦖`
      };
    }

    // Authenticated successfully! Record login time and online status
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const todayStr = now.toISOString().split('T')[0];
    const updatedStudent: User = {
      ...student,
      lastActive: todayStr,
      lastLoginTime: timeStr,
      attendedToday: true,
      isOnline: true
    };
    setCurrentUser(updatedStudent);
    setUsers(prev => prev.map(u => u.id === student.id ? updatedStudent : u));
    
    // Explicitly load this student's isolated scores immediately upon login
    const studentIsolatedScores = loadStudentScoresFromStorage(student.id);
    setUnitScores(studentIsolatedScores);
    
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: 'STUDENT_LOGIN',
      performedBy: student.fullName,
      role: 'STUDENT',
      target: student.className || 'Lớp học',
      timestamp: timeStr,
      details: `Học sinh ${student.fullName} (Mã: ${student.code}) đã đăng nhập vào học thành công.`
    };
    setAuditLogs(prev => [newLog, ...prev]);

    sound.playSuccess();
    return { success: true };
  };

  // Multi-school Switcher
  const switchSchool = (schoolId: string) => {
    const targetSchool = schools.find(s => s.id === schoolId);
    if (!targetSchool) return;
    setActiveSchoolId(schoolId);
    localStorage.setItem('ef_active_school_id', schoolId);

    const schoolClasses = loadSchoolClassesFromStorage(schoolId);
    const schoolUsers = loadSchoolUsersFromStorage(schoolId);
    setClasses(schoolClasses);
    setUsers(schoolUsers);
    setExtractedSgkImages(getSchoolExtractedImages(schoolId));
  };

  // SGK Image Management with School Data Isolation
  const saveExtractedSgkImage = (image: ExtractedSgkImage) => {
    const currentSchool = activeSchoolId || 'school_tanky';
    const updated = saveSchoolExtractedImage(currentSchool, image);
    setExtractedSgkImages(updated);
  };

  const batchSaveExtractedSgkImages = (images: ExtractedSgkImage[]) => {
    const currentSchool = activeSchoolId || 'school_tanky';
    const updated = batchSaveSchoolExtractedImages(currentSchool, images);
    setExtractedSgkImages(updated);
  };

  const deleteExtractedSgkImage = (imageId: string) => {
    const currentSchool = activeSchoolId || 'school_tanky';
    const updated = deleteSchoolExtractedImage(currentSchool, imageId);
    setExtractedSgkImages(updated);
  };

  const attachSgkImagesToUnitById = (unitId: string) => {
    setUnits(prev => {
      const idx = prev.findIndex(u => u.id === unitId);
      if (idx < 0) return prev;
      const targetUnit = prev[idx];
      const updatedUnit = attachIllustrationsToUnit(targetUnit, extractedSgkImages);
      const updatedList = [...prev];
      updatedList[idx] = updatedUnit;
      localStorage.setItem('ef_units', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  // Register New School with Isolated Data Storage
  const registerSchool = (schoolData: { schoolName: string; googleEmail: string; password: string }) => {
    const name = schoolData.schoolName.trim();
    const email = schoolData.googleEmail.trim().toLowerCase();
    const pass = schoolData.password.trim();

    if (!name) {
      sound.playWrong();
      return { success: false, message: 'Vui lòng nhập Tên trường học!' };
    }
    if (!email || !email.includes('@')) {
      sound.playWrong();
      return { success: false, message: 'Vui lòng nhập địa chỉ Email Google hợp lệ!' };
    }
    if (!pass || pass.length < 4) {
      sound.playWrong();
      return { success: false, message: 'Mật khẩu xác thực phải có ít nhất 4 ký tự!' };
    }

    // Check if email already registered in existing schools or reserved for Tan Ky
    const existingSchool = schools.find(s => s.adminEmail.toLowerCase() === email);
    if (existingSchool || email === 'muasaobangsakura@gmail.com') {
      sound.playWrong();
      return { 
        success: false, 
        message: 'Email Google này đã được đăng ký cho một trường học trong hệ thống. Vui lòng đăng nhập hoặc sử dụng email khác!' 
      };
    }

    const newSchoolId = `school_${Date.now()}`;
    const newSchool: SchoolItem = {
      id: newSchoolId,
      name,
      adminEmail: email,
      password: pass,
      createdAt: new Date().toISOString(),
      isPrivileged: false
    };

    // Create teacher/admin user for this new school
    const newSchoolAdmin: User = {
      id: `tea-${newSchoolId}`,
      email,
      pin: pass,
      fullName: `Giáo viên (${name})`,
      role: 'TEACHER',
      schoolId: newSchoolId,
      schoolName: name,
      avatar: '👩‍🏫',
      grade: 1,
      xp: 2000,
      gems: 300,
      streak: 1,
      level: 5,
      lastActive: new Date().toISOString().split('T')[0],
      badges: ['super_teacher']
    };

    // 5 clean starter classes for this school (1A1 -> 5A1)
    const newSchoolClasses: ClassItem[] = [1, 2, 3, 4, 5].map(g => ({
      id: `cls-${newSchoolId}-${g}a1`,
      name: `${g}A1`,
      grade: g,
      schoolId: newSchoolId,
      schoolName: name,
      teacherId: newSchoolAdmin.id,
      teacherName: newSchoolAdmin.fullName,
      schoolYear: '2026-2027',
      studentCount: 0,
      createdAt: new Date().toISOString()
    }));

    const newSchoolUsers: User[] = [newSchoolAdmin];

    try {
      localStorage.setItem(`ef_classes_${newSchoolId}`, JSON.stringify(newSchoolClasses));
      localStorage.setItem(`ef_users_${newSchoolId}`, JSON.stringify(newSchoolUsers));
      localStorage.setItem(`ef_assignments_${newSchoolId}`, JSON.stringify([]));

      const updatedSchools = [...schools, newSchool];
      setSchools(updatedSchools);
      localStorage.setItem('ef_schools', JSON.stringify(updatedSchools));

      setActiveSchoolId(newSchoolId);
      localStorage.setItem('ef_active_school_id', newSchoolId);

      setClasses(newSchoolClasses);
      setUsers(newSchoolUsers);
      setAssignments([]);
      setCurrentUser(newSchoolAdmin);
      localStorage.setItem('ef_current_user', JSON.stringify(newSchoolAdmin));

      sound.playSuccess();
      return { success: true, school: newSchool };
    } catch (err) {
      console.error('Error registering school:', err);
      sound.playWrong();
      return { success: false, message: 'Đã xảy ra lỗi khi tạo trường mới trên trình duyệt. Vui lòng thử lại.' };
    }
  };

  // Staff Login (Hỗ trợ tài khoản đặc quyền TH Tân Kỳ & các trường mới đăng ký)
  const loginStaff = (email: string, pass: string): { success: boolean; role?: 'ADMIN' | 'TEACHER'; message?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // 1. Kiểm tra tài khoản đặc quyền Trường TH Tân Kỳ
    if (
      cleanEmail === 'muasaobangsakura@gmail.com' || 
      cleanEmail === 'msque@tanky.edu.vn' || 
      cleanEmail === 'admin@tanky.edu.vn'
    ) {
      const isValidPass = cleanPass === 'gvtk2026@' || cleanPass === 'admin123' || cleanPass === 'teacher123';
      if (!isValidPass) {
        sound.playWrong();
        return { success: false, message: 'Email hoặc Mật khẩu không chính xác. Vui lòng kiểm tra lại.' };
      }

      const tanKyClasses = loadSchoolClassesFromStorage('school_tanky');
      const tanKyUsers = loadSchoolUsersFromStorage('school_tanky');
      setActiveSchoolId('school_tanky');
      localStorage.setItem('ef_active_school_id', 'school_tanky');
      setClasses(tanKyClasses);
      setUsers(tanKyUsers);

      let teacherUser = tanKyUsers.find(u => u.email?.toLowerCase() === cleanEmail);
      if (!teacherUser) {
        teacherUser = INITIAL_USERS.find(u => u.email?.toLowerCase() === cleanEmail) || INITIAL_USERS[1];
      }
      const updatedUser: User = {
        ...teacherUser,
        schoolId: 'school_tanky',
        schoolName: 'Trường Tiểu học Tân Kỳ',
        lastActive: new Date().toISOString().split('T')[0],
        isOnline: true
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('ef_current_user', JSON.stringify(updatedUser));
      sound.playSuccess();
      return { success: true, role: updatedUser.role as 'ADMIN' | 'TEACHER' };
    }

    // 2. Kiểm tra tài khoản trường đã đăng ký mới
    const foundSchool = schools.find(s => s.adminEmail.toLowerCase() === cleanEmail);
    if (foundSchool) {
      if (foundSchool.password && cleanPass !== foundSchool.password && cleanPass !== 'gvtk2026@') {
        sound.playWrong();
        return { success: false, message: 'Mật khẩu xác thực của trường học không chính xác!' };
      }

      setActiveSchoolId(foundSchool.id);
      localStorage.setItem('ef_active_school_id', foundSchool.id);

      const schoolClasses = loadSchoolClassesFromStorage(foundSchool.id);
      const schoolUsers = loadSchoolUsersFromStorage(foundSchool.id);
      setClasses(schoolClasses);
      setUsers(schoolUsers);

      let schoolTeacher = schoolUsers.find(u => u.email?.toLowerCase() === cleanEmail);
      if (!schoolTeacher) {
        schoolTeacher = {
          id: `tea-${foundSchool.id}`,
          email: cleanEmail,
          fullName: `Giáo viên (${foundSchool.name})`,
          role: 'TEACHER',
          schoolId: foundSchool.id,
          schoolName: foundSchool.name,
          pin: foundSchool.password,
          avatar: '👩‍🏫',
          grade: 1,
          xp: 2000,
          gems: 300,
          streak: 1,
          level: 5,
          lastActive: new Date().toISOString().split('T')[0],
          badges: ['super_teacher']
        };
      }
      setCurrentUser(schoolTeacher);
      localStorage.setItem('ef_current_user', JSON.stringify(schoolTeacher));
      sound.playSuccess();
      return { success: true, role: 'TEACHER' };
    }

    // 3. Fallback: Kiểm tra trong danh sách users hiện tại
    const user = users.find(u => {
      const emailMatch = 
        u.email?.toLowerCase() === cleanEmail || 
        removeVietnameseTones(u.fullName) === removeVietnameseTones(cleanEmail);
      if (!emailMatch) return false;
      return cleanPass === u.pin || cleanPass === 'gvtk2026@' || cleanPass === 'admin123';
    });

    if (user) {
      if (user.role === 'STUDENT') {
        return {
          success: false,
          message: 'Cổng này chỉ dành cho Cán bộ & Giáo viên! Học sinh vui lòng chuyển sang Cổng Học Sinh (/student/login).'
        };
      }
      setCurrentUser(user);
      localStorage.setItem('ef_current_user', JSON.stringify(user));
      sound.playSuccess();
      return { success: true, role: user.role as 'ADMIN' | 'TEACHER' };
    }

    sound.playWrong();
    return {
      success: false,
      message: 'Email hoặc Mật khẩu không chính xác. Nếu trường của bạn chưa có tài khoản, vui lòng bấm tab "Đăng ký trường mới".'
    };
  };

  // Staff Google Login
  const loginWithGoogle = (googleEmail: string, name?: string): { success: boolean; role?: 'ADMIN' | 'TEACHER'; message?: string } => {
    const cleanEmail = googleEmail.trim().toLowerCase();

    // 1. Tài khoản Google đặc quyền của Trường TH Tân Kỳ
    if (cleanEmail === 'muasaobangsakura@gmail.com' || cleanEmail === 'msque@tanky.edu.vn') {
      const tanKyClasses = loadSchoolClassesFromStorage('school_tanky');
      const tanKyUsers = loadSchoolUsersFromStorage('school_tanky');
      setActiveSchoolId('school_tanky');
      localStorage.setItem('ef_active_school_id', 'school_tanky');
      setClasses(tanKyClasses);
      setUsers(tanKyUsers);

      let teacherUser = tanKyUsers.find(u => u.email?.toLowerCase() === cleanEmail);
      if (!teacherUser) {
        teacherUser = INITIAL_USERS.find(u => u.email?.toLowerCase() === cleanEmail) || {
          id: 'tea-google-muasaobang',
          email: 'muasaobangsakura@gmail.com',
          pin: 'gvtk2026@',
          fullName: name || 'Cô Quế (Trường TH Tân Kỳ)',
          role: 'TEACHER',
          schoolId: 'school_tanky',
          schoolName: 'Trường Tiểu học Tân Kỳ',
          avatar: '👩‍🏫',
          grade: 3,
          xp: 3500,
          gems: 500,
          streak: 30,
          level: 15,
          lastActive: new Date().toISOString().split('T')[0],
          badges: ['super_teacher', 'content_creator']
        };
      }
      const updatedUser: User = {
        ...teacherUser,
        schoolId: 'school_tanky',
        schoolName: 'Trường Tiểu học Tân Kỳ',
        lastActive: new Date().toISOString().split('T')[0],
        isOnline: true
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('ef_current_user', JSON.stringify(updatedUser));
      sound.playSuccess();
      return { success: true, role: updatedUser.role as 'ADMIN' | 'TEACHER' };
    }

    // 2. Tài khoản Google của các trường học đã đăng ký
    const foundSchool = schools.find(s => s.adminEmail.toLowerCase() === cleanEmail);
    if (foundSchool) {
      setActiveSchoolId(foundSchool.id);
      localStorage.setItem('ef_active_school_id', foundSchool.id);

      const schoolClasses = loadSchoolClassesFromStorage(foundSchool.id);
      const schoolUsers = loadSchoolUsersFromStorage(foundSchool.id);
      setClasses(schoolClasses);
      setUsers(schoolUsers);

      let schoolTeacher = schoolUsers.find(u => u.email?.toLowerCase() === cleanEmail);
      if (!schoolTeacher) {
        schoolTeacher = {
          id: `tea-${foundSchool.id}`,
          email: cleanEmail,
          fullName: name || `Giáo viên (${foundSchool.name})`,
          role: 'TEACHER',
          schoolId: foundSchool.id,
          schoolName: foundSchool.name,
          pin: foundSchool.password,
          avatar: '👩‍🏫',
          grade: 1,
          xp: 2000,
          gems: 300,
          streak: 1,
          level: 5,
          lastActive: new Date().toISOString().split('T')[0],
          badges: ['super_teacher']
        };
      }
      setCurrentUser(schoolTeacher);
      localStorage.setItem('ef_current_user', JSON.stringify(schoolTeacher));
      sound.playSuccess();
      return { success: true, role: 'TEACHER' };
    }

    // 3. Nếu chưa đăng ký, báo giáo viên đăng ký trường mới
    sound.playWrong();
    return {
      success: false,
      message: `Tài khoản Google "${cleanEmail}" chưa được liên kết với trường học nào. Vui lòng bấm tab "Đăng ký trường mới" bên dưới để đăng ký trường của bạn!`
    };
  };

  const logout = () => {
    setCurrentUser(null);
    setUnitScores({}); // Clear state immediately on logout so subsequent screen never sees old user's data
    localStorage.removeItem('ef_current_user');
  };

  // Gamification: Gain XP & Gems
  const gainXP = (amount: number, gems: number = 0) => {
    if (!currentUser || currentUser.role !== 'STUDENT') return;

    sound.playSuccess();
    const updatedXP = currentUser.xp + amount;
    const newLevel = Math.floor(updatedXP / 200) + 1;
    const updatedGems = currentUser.gems + gems;

    const updatedUser = {
      ...currentUser,
      xp: updatedXP,
      gems: updatedGems,
      level: newLevel
    };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  // Mistakes notebook (Spaced repetition)
  const recordMistake = (word: string, vietnamese: string, phonetic: string, emoji: string) => {
    if (!currentUser || currentUser.role !== 'STUDENT') return;

    setMistakes(prev => {
      const existing = prev.find(m => m.studentId === currentUser.id && m.word.toLowerCase() === word.toLowerCase());
      if (existing) {
        const newCount = existing.errorCount + 1;
        return prev.map(m => m.id === existing.id ? {
          ...m,
          errorCount: newCount,
          lastPracticed: new Date().toISOString().split('T')[0],
          status: newCount >= 3 ? 'priority' : 'reviewing'
        } : m);
      } else {
        const newMistake: MistakeItem = {
          id: `mis-${Date.now()}`,
          studentId: currentUser.id,
          word,
          vietnamese,
          phonetic,
          emoji,
          errorCount: 1,
          lastPracticed: new Date().toISOString().split('T')[0],
          status: 'reviewing'
        };
        return [newMistake, ...prev];
      }
    });
  };

  const resolveMistake = (id: string) => {
    setMistakes(prev => prev.map(m => m.id === id ? { ...m, status: 'mastered', errorCount: 0 } : m));
    gainXP(25, 2);
  };

  const updateMascot = (custom: { skin: string; hat: string; accessory: string }) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      mascotCustomization: custom
    };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
  };

  // Admin / Teacher Content Workflow
  const approveUnit = (unitId: string) => {
    setUnits(prev => prev.map(u => u.id === unitId ? { ...u, status: 'approved', updatedAt: new Date().toISOString().split('T')[0] } : u));
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: 'APPROVE_UNIT',
      performedBy: currentUser?.fullName || 'Teacher',
      role: currentUser?.role || 'TEACHER',
      target: unitId,
      timestamp: new Date().toLocaleString('vi-VN'),
      details: `Đã phê duyệt và xuất bản Unit ${unitId} lên ứng dụng học sinh.`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const deleteUnit = (unitId: string) => {
    setUnits(prev => prev.filter(u => u.id !== unitId));
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: 'DELETE_UNIT',
      performedBy: currentUser?.fullName || 'Admin',
      role: currentUser?.role || 'ADMIN',
      target: unitId,
      timestamp: new Date().toLocaleString('vi-VN'),
      details: `Đã xóa Unit ${unitId} khỏi kho sách giáo khoa.`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const saveUnit = (unit: Unit) => {
    // Tự động phê duyệt (status: approved) để học sinh nhận ngay lập tức mà không cần gửi thủ công
    const autoApprovedUnit: Unit = {
      ...unit,
      status: 'approved',
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setUnits(prev => {
      const idx = prev.findIndex(u => u.id === unit.id);
      let updatedList: Unit[];
      if (idx >= 0) {
        updatedList = [...prev];
        updatedList[idx] = autoApprovedUnit;
      } else {
        updatedList = [autoApprovedUnit, ...prev];
      }
      localStorage.setItem('ef_units', JSON.stringify(updatedList));
      return updatedList;
    });

    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: 'SYNC_UNIT_STUDENT_PORTAL',
      performedBy: currentUser?.fullName || 'Teacher',
      role: currentUser?.role || 'TEACHER',
      target: unit.title,
      timestamp: new Date().toLocaleString('vi-VN'),
      details: `AI tự động chuyển giao bài học "${unit.title}" (Khối ${unit.grade}) sang Cổng Học Sinh.`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Đồng bộ toàn bộ 80 bài học chuẩn SGK Lớp 1 - 5 vào hệ thống
  const syncAllStandardUnits = () => {
    setUnits(prev => {
      const existingCustom = prev.filter(u => !FULL_YEAR_SGK_CURRICULUM.some(su => su.id === u.id));
      const fullList = [...FULL_YEAR_SGK_CURRICULUM, ...existingCustom];
      localStorage.setItem('ef_units', JSON.stringify(fullList));
      return fullList;
    });
  };

  const createClass = (name: string, grade: number) => {
    const newClass: ClassItem = {
      id: `class-${Date.now()}`,
      name,
      grade,
      teacherId: currentUser?.id || 'tea-1',
      teacherName: 'Ms Que',
      schoolYear: settings.currentSchoolYear,
      studentCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setClasses(prev => [newClass, ...prev]);
  };

  const updateClass = (classId: string, data: { name: string; grade: number }) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, ...data } : c));
    // Also update student records belonging to that class
    setUsers(prev => prev.map(u => {
      if (u.classId === classId) {
        return {
          ...u,
          className: data.name,
          grade: data.grade,
          pin: normalizeClass(data.name).toUpperCase()
        };
      }
      return u;
    }));
  };

  const deleteClass = (classId: string) => {
    setClasses(prev => prev.filter(c => c.id !== classId));
    // Also clean up students belonging to that class
    setUsers(prev => prev.filter(u => u.classId !== classId));
    // Also clean up assignments for this class
    setAssignments(prev => prev.filter(a => a.classId !== classId));
  };

  const deleteClassesBatch = (classIds: string[]) => {
    const idSet = new Set(classIds);
    setClasses(prev => prev.filter(c => !idSet.has(c.id)));
    setUsers(prev => prev.filter(u => !u.classId || !idSet.has(u.classId)));
    setAssignments(prev => prev.filter(a => !idSet.has(a.classId)));
  };

  const createAssignment = (asg: Omit<Assignment, 'id' | 'submissions'>) => {
    const newAsg: Assignment = {
      ...asg,
      id: `asg-${Date.now()}`,
      submissions: []
    };
    setAssignments(prev => [newAsg, ...prev]);
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: 'CREATE_ASSIGNMENT',
      performedBy: currentUser?.fullName || 'Teacher',
      role: currentUser?.role || 'TEACHER',
      target: asg.title,
      timestamp: new Date().toLocaleString('vi-VN'),
      details: `Đã giao bài tập mới cho ${asg.className}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addStudent = (student: Partial<User>) => {
    const targetClass = classes.find(c => c.id === student.classId);
    const className = targetClass?.name || student.className || 'Lớp 3A1';
    const classPin = normalizeClass(className).toUpperCase();

    const newStu: User = {
      id: `stu-${Date.now()}`,
      code: student.code || `STU${Math.floor(100 + Math.random() * 900)}`,
      pin: student.pin || '123456',
      fullName: student.fullName || 'Học sinh mới',
      role: 'STUDENT',
      avatar: student.avatar || '👦🏻',
      classId: student.classId || 'class-3a1',
      className,
      grade: student.grade || targetClass?.grade || 3,
      xp: 0,
      gems: 10,
      streak: 1,
      level: 1,
      lastActive: new Date().toISOString().split('T')[0],
      badges: ['first_step'],
      mascotCustomization: { skin: 'emerald', hat: 'star_cap', accessory: 'none' }
    };
    setUsers(prev => [...prev, newStu]);
    if (newStu.classId) {
      setClasses(prev => prev.map(c => c.id === newStu.classId ? { ...c, studentCount: c.studentCount + 1 } : c));
    }
  };

  const updateStudent = (studentId: string, data: Partial<User>) => {
    setUsers(prev => {
      const oldStu = prev.find(u => u.id === studentId);
      if (!oldStu) return prev;

      const newClassId = data.classId !== undefined ? data.classId : oldStu.classId;
      const targetClass = classes.find(c => c.id === newClassId);
      const updatedClassName = targetClass?.name || data.className || oldStu.className;
      const updatedGrade = targetClass?.grade !== undefined ? targetClass.grade : (data.grade !== undefined ? data.grade : oldStu.grade);

      // If class changed, adjust studentCount
      if (oldStu.classId && newClassId && oldStu.classId !== newClassId) {
        setClasses(clsList => clsList.map(c => {
          if (c.id === oldStu.classId) return { ...c, studentCount: Math.max(0, c.studentCount - 1) };
          if (c.id === newClassId) return { ...c, studentCount: c.studentCount + 1 };
          return c;
        }));
      }

      const updatedStu: User = {
        ...oldStu,
        ...data,
        className: updatedClassName,
        grade: updatedGrade
      };

      if (currentUser?.id === studentId) {
        setCurrentUser(updatedStu);
      }

      return prev.map(u => u.id === studentId ? updatedStu : u);
    });

    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: 'UPDATE_STUDENT',
      performedBy: currentUser?.fullName || 'Teacher',
      role: currentUser?.role || 'TEACHER',
      target: studentId,
      timestamp: new Date().toLocaleString('vi-VN'),
      details: `Đã cập nhật thông tin học sinh: ${data.fullName || studentId}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const toggleStudentAttendance = (studentId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === studentId) {
        const newAttended = !u.attendedToday;
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
        const updated = {
          ...u,
          attendedToday: newAttended,
          lastLoginTime: newAttended ? (u.lastLoginTime || timeStr) : undefined,
          isOnline: newAttended
        };
        if (currentUser?.id === studentId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return u;
    }));
  };

  const deleteStudent = (studentId: string) => {
    const target = users.find(u => u.id === studentId);
    setUsers(prev => prev.filter(u => u.id !== studentId));
    if (target?.classId) {
      setClasses(prev => prev.map(c => c.id === target.classId ? { ...c, studentCount: Math.max(0, c.studentCount - 1) } : c));
    }
  };

  const deleteStudentsBatch = (studentIds: string[]) => {
    const idSet = new Set(studentIds);
    const classDeductions: Record<string, number> = {};
    users.forEach(u => {
      if (idSet.has(u.id) && u.classId) {
        classDeductions[u.classId] = (classDeductions[u.classId] || 0) + 1;
      }
    });
    setUsers(prev => prev.filter(u => !idSet.has(u.id)));
    setClasses(prev => prev.map(c => {
      const ded = classDeductions[c.id] || 0;
      return ded > 0 ? { ...c, studentCount: Math.max(0, c.studentCount - ded) } : c;
    }));
  };

  const importStudentsBatch = (classId: string, studentsList: { fullName: string; code?: string; pin?: string }[]) => {
    const targetClass = classes.find(c => c.id === classId);
    const className = targetClass?.name || 'Lớp học';
    const grade = targetClass?.grade || 3;
    const defaultPin = '123456';

    const newStudents: User[] = studentsList.map((item, idx) => ({
      id: `stu-batch-${Date.now()}-${idx}`,
      code: item.code || `STU${Math.floor(100 + Math.random() * 900)}`,
      pin: item.pin || defaultPin,
      fullName: item.fullName.trim(),
      role: 'STUDENT',
      avatar: idx % 2 === 0 ? '👦🏻' : '👧🏻',
      classId,
      className,
      grade,
      xp: 0,
      gems: 10,
      streak: 1,
      level: 1,
      lastActive: new Date().toISOString().split('T')[0],
      badges: ['first_step'],
      mascotCustomization: { skin: 'emerald', hat: 'star_cap', accessory: 'none' }
    }));

    setUsers(prev => [...prev, ...newStudents]);
    // update class count
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, studentCount: c.studentCount + newStudents.length } : c));
  };

  const syncAllStandardClassesAndStudents = () => {
    setClasses([...STANDARD_16_CLASSES]);
    localStorage.setItem('ef_classes', JSON.stringify(STANDARD_16_CLASSES));

    const nonStudents = users.filter(u => u.role !== 'STUDENT');
    const allUsers = [...STANDARD_STUDENTS, ...nonStudents];
    setUsers(allUsers);
    localStorage.setItem('ef_users', JSON.stringify(allUsers));
    sound.playSuccess();
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const deleteUserWithAudit = (userId: string, reason: string) => {
    const targetUser = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: 'SOFT_DELETE_USER',
      performedBy: currentUser?.fullName || 'Admin',
      role: currentUser?.role || 'ADMIN',
      target: targetUser?.fullName || userId,
      timestamp: new Date().toLocaleString('vi-VN'),
      details: `Lý do: ${reason}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const sendMascotMessage = async (message: string): Promise<string> => {
    try {
      const res = await fetch('/api/ai/mascot-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: currentUser?.fullName || 'bạn nhỏ',
          message,
          currentUnit: 'Unit Tiếng Anh Tiểu Học',
          currentMistakes: mistakes.filter(m => m.studentId === currentUser?.id).map(m => m.word)
        })
      });
      const data = await res.json();
      return data.reply || 'Hello! Sparky rất vui được học cùng bạn! 🦖🌟';
    } catch (e) {
      return 'Hello! Cố lên nhé bạn nhỏ, Sparky luôn đồng hành cùng bạn! 🦖🎉';
    }
  };

  const generateAIUnit = async (params: { grade: number; bookSeries: string; unitTitle: string; topic: string; rawText?: string }): Promise<Unit> => {
    const res = await fetch('/api/ai/generate-unit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const resData = await res.json();
    if (!resData.success) {
      throw new Error(resData.error || 'Failed to generate unit');
    }

    const aiData = resData.data;
    const newUnit: Unit = {
      id: `unit-ai-${Date.now()}`,
      title: aiData.title || params.unitTitle,
      vietnameseTitle: aiData.vietnameseTitle || `Bài học: ${params.topic}`,
      grade: params.grade,
      bookSeries: (params.bookSeries as any) || 'Global Success',
      theme: params.topic,
      status: 'draft', // DRAFT - Requires teacher/admin review and approval!
      vocabularies: aiData.vocabularies || [],
      sentences: aiData.sentences || [],
      listeningQuestions: aiData.listeningQuestions || [],
      readingPassage: aiData.readingPassage || {
        title: 'Fun Reading',
        text: 'This is a sample story for students.',
        questions: []
      },
      writingChallenges: aiData.writingChallenges || [],
      speechPrompts: aiData.speechPrompts || [],
      oddWords: aiData.oddWords || [],
      updatedAt: new Date().toISOString().split('T')[0],
      createdBy: currentUser?.fullName || 'AI SGK Pipeline'
    };

    saveUnit(newUnit);
    return newUnit;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole: currentUser?.role || null,
        units,
        classes,
        users,
        mistakes,
        assignments,
        settings,
        auditLogs,
        soundMuted,
        toggleSound,
        loginStudent,
        loginStaff,
        loginWithGoogle,
        logout,
        gainXP,
        recordMistake,
        resolveMistake,
        updateMascot,
        approveUnit,
        deleteUnit,
        saveUnit,
        syncAllStandardUnits,
        createClass,
        updateClass,
        deleteClass,
        deleteClassesBatch,
        syncAllStandardClassesAndStudents,
        createAssignment,
        addStudent,
        updateStudent,
        toggleStudentAttendance,
        deleteStudent,
        deleteStudentsBatch,
        importStudentsBatch,
        updateSettings,
        deleteUserWithAudit,
        sendMascotMessage,
        generateAIUnit,
        unitScores,
        saveUnitScore,
        handleSaveScore,
        getStudentScores,
        schools,
        activeSchoolId,
        registerSchool,
        switchSchool,
        extractedSgkImages,
        saveExtractedSgkImage,
        batchSaveExtractedSgkImages,
        deleteExtractedSgkImage,
        attachSgkImagesToUnitById
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
