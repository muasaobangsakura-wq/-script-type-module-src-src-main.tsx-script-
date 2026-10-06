// Core data types for English Fun Learning AI

export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface SchoolItem {
  id: string;
  name: string;
  adminEmail: string;
  password?: string;
  createdAt: string;
  isPrivileged?: boolean;
}

export interface User {
  id: string;
  code?: string; // Student code: STU101
  pin?: string;  // 4-digit PIN: 1234
  email?: string; // For Teacher/Admin
  fullName: string;
  role: UserRole;
  avatar: string;
  schoolId?: string;
  schoolName?: string;
  classId?: string;
  className?: string;
  grade: number; // 1 to 5
  xp: number;
  gems: number;
  streak: number; // in days
  level: number;
  lastActive: string;
  lastLoginTime?: string; // Formatted timestamp e.g. "08:15 04/10/2026"
  attendedToday?: boolean; // Whether student logged in today
  isOnline?: boolean;
  badges: string[]; // e.g., ['first_step', 'streak_3', 'vocab_master', 'speed_runner']
  mascotCustomization?: {
    skin: string;
    hat: string;
    accessory: string;
  };
}

export interface ClassItem {
  id: string;
  name: string;
  grade: number;
  schoolId?: string;
  schoolName?: string;
  teacherId: string;
  teacherName: string;
  schoolYear: string;
  studentCount: number;
  createdAt: string;
}

export interface Vocabulary {
  id: string;
  word: string;
  phonetic: string;
  vietnamese: string;
  exampleSentence: string;
  emoji: string;
  category?: string;
  imageUrl?: string; // Tên file chuẩn hóa [grade]_[unit]_[word].png hoặc Data URL
  imageSource?: string; // Nguồn SGK (ví dụ: "SGK Tiếng Anh 3 Global Success - Unit 4")
}

export interface SentencePattern {
  pattern: string;
  vietnamese: string;
  dialogue?: string;
  imageUrl?: string;
}

export interface ListeningQuestion {
  id: string;
  audioScript: string;
  question: string;
  options: string[];
  correctIndex: number;
  imageUrl?: string; // Tranh minh họa Look & Listen / Look & Choose
  imageSource?: string;
}

export interface ReadingQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ReadingPassage {
  title: string;
  text: string;
  questions: ReadingQuestion[];
}

export interface WritingChallenge {
  type: 'missing_letter' | 'unscramble' | 'sentence_builder';
  prompt: string;
  answer: string;
  scrambledTokens?: string[];
  maskedWord?: string;
}

export interface SpeechPrompt {
  phrase: string;
  vietnamese: string;
  phoneticTip?: string;
}

export interface OddWordChallenge {
  words: string[];
  oddIndex: number;
  explanation: string;
}

export interface SkillScoreBreakdown {
  listening: number;
  speaking: number;
  reading: number;
  writing: number;
}

export interface StudentUnitProgress {
  studentId: string;
  unitId: string;
  score: number;
  stars: number;
  completedAt: string;
  skillScores: SkillScoreBreakdown;
}

export interface Unit {
  id: string;
  title: string;
  vietnameseTitle: string;
  grade: number;
  bookSeries: 'Global Success' | 'i-Learn Smart Start' | 'Family and Friends';
  theme: string;
  status: 'draft' | 'approved';
  vocabularies: Vocabulary[];
  sentences: SentencePattern[];
  listeningQuestions: ListeningQuestion[];
  readingPassage: ReadingPassage;
  writingChallenges: WritingChallenge[];
  speechPrompts: SpeechPrompt[];
  oddWords: OddWordChallenge[];
  updatedAt: string;
  createdBy?: string;
}

export interface MistakeItem {
  id: string;
  studentId: string;
  word: string;
  vietnamese: string;
  phonetic: string;
  emoji: string;
  errorCount: number;
  lastPracticed: string;
  status: 'priority' | 'reviewing' | 'mastered'; // priority = 3+ errors
}

export interface Assignment {
  id: string;
  title: string;
  classId: string;
  className: string;
  unitId: string;
  unitTitle: string;
  deadline: string;
  instructions: string;
  status: 'active' | 'completed' | 'expired';
  externalPlatform?: {
    name: 'OLM' | 'Quizizz' | 'Azota' | 'Kahoot';
    url: string;
  };
  submissions: {
    studentId: string;
    studentName: string;
    completedAt: string;
    score: number;
  }[];
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  role: UserRole;
  target: string;
  timestamp: string;
  details: string;
}

export interface SystemSettings {
  appName: string;
  schoolName?: string;
  teacherName?: string;
  allowLeaderboard: boolean;
  xpPerLesson: number;
  xpPerGame: number;
  mascotName: string;
  currentSchoolYear: string;
  maintenanceMode: boolean;
}
