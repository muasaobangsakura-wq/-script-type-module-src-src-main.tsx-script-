// Service kết nối Gemini API để phân tích cấu trúc Sách Giáo Khoa (SGK)
// và sinh bộ câu hỏi trắc nghiệm, bài tập từ vựng, cấu trúc game tương tác

import { Unit } from '../types';

export interface TextbookAnalysisRequest {
  grade: number; // 1, 2, 3, 4, 5
  bookSeries: string; // 'Global Success' | 'Family and Friends' | 'i-Learn Smart Start' | 'English Discovery'
  unitTitle?: string; // Optional - AI tự động nhận diện từ tài liệu
  rawText?: string; // Nội dung đoạn trích SGK, bài đọc hoặc mục tiêu bài học
  customInstructions?: string; // Ghi chú sư phạm bổ sung của giáo viên
}

export interface MultipleChoiceQuiz {
  id: string;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  skill: string;
}

export interface VocabularyFlashcard {
  word: string;
  phonetic: string;
  vietnamese: string;
  exampleSentence: string;
  emoji: string;
}

export interface MissingLetterExercise {
  prompt: string;
  maskedWord: string;
  answer: string;
}

export interface WordScrambleExercise {
  scrambled: string;
  word: string;
  hint: string;
}

export interface FillInTheBlankExercise {
  sentenceWithBlank: string;
  correctWord: string;
  wordBank: string[];
}

export interface MatchingPair {
  id: string;
  word: string;
  meaning: string;
  emoji: string;
}

export interface OddOneOutRound {
  words: string[];
  oddIndex: number;
  reason: string;
}

export interface SpeedTapConfig {
  gameTitle: string;
  targetRule: string;
  correctItems: string[];
  trapItems: string[];
  durationSeconds: number;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  vietnamese: string;
}

export interface DialogueRoleplayConfig {
  title: string;
  characterA: string;
  characterB: string;
  lines: DialogueLine[];
}

// 4 Kỹ Năng Nghe - Nói - Đọc - Viết Chuyên Sâu
export interface ListeningExerciseItem {
  id: string;
  audioScript: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SpeakingExerciseItem {
  phrase: string;
  phonetic: string;
  vietnamese: string;
  tip: string;
}

export interface ReadingExerciseItem {
  title: string;
  passage: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}

export interface WritingExerciseItem {
  type: string;
  prompt: string;
  maskedWord?: string;
  answer: string;
  scrambledTokens?: string[];
}

export interface FourSkillsData {
  listening: ListeningExerciseItem[];
  speaking: SpeakingExerciseItem[];
  reading: ReadingExerciseItem;
  writing: WritingExerciseItem[];
}

export interface TextbookAnalysisResult {
  analysis: {
    theme: string;
    detectedUnitTitle?: string;
    pedagogicalGoal: string;
    cefrLevel: string;
    phonicsFocus: string;
    grammarPatterns: string[];
  };
  multipleChoiceQuizzes: MultipleChoiceQuiz[];
  vocabularyExercises: {
    flashcards: VocabularyFlashcard[];
    missingLetters: MissingLetterExercise[];
    wordScrambles: WordScrambleExercise[];
    fillInTheBlanks: FillInTheBlankExercise[];
  };
  interactiveGameStructures: {
    matchingPairs: MatchingPair[];
    oddOneOut: OddOneOutRound[];
    speedTapGame: SpeedTapConfig;
    dialogueRoleplay: DialogueRoleplayConfig;
  };
  fourSkillsData?: FourSkillsData;
}

export interface TextbookApiResponse {
  success: boolean;
  data: TextbookAnalysisResult;
  meta?: {
    sourceBook?: string;
    grade?: number;
    generatedAt?: string;
    note?: string;
  };
  error?: string;
}

/**
 * Gọi Gemini API Backend để phân tích Sách Giáo Khoa và sinh học liệu
 */
export async function analyzeTextbookAndGenerate(
  req: TextbookAnalysisRequest
): Promise<TextbookAnalysisResult> {
  const response = await fetch('/api/ai/textbook/analyze-and-generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    throw new Error(`Lỗi kết nối Gemini API (HTTP ${response.status})`);
  }

  const result: TextbookApiResponse = await response.json();
  if (!result.success || !result.data) {
    throw new Error(result.error || 'Không nhận được dữ liệu phân tích từ Gemini.');
  }

  return result.data;
}

/**
 * Chuyển đổi kết quả phân tích AI thành Unit học tập hoàn chỉnh
 * để lưu trực tiếp vào cơ sở dữ liệu chương trình học của ứng dụng.
 * @param publishDirectlyToStudents Nếu true, bài học sẽ có trạng thái 'approved' để xuất hiện ngay lập tức trên Cổng Học Sinh!
 */
export function convertAnalysisToCurriculumUnit(
  analysisResult: TextbookAnalysisResult,
  metadata: { 
    grade: number; 
    bookSeries: string; 
    unitTitle?: string; 
    teacherName: string;
    publishDirectlyToStudents?: boolean;
  }
): Unit {
  const unitId = `unit-ai-${Date.now()}`;
  const resolvedTitle = metadata.unitTitle || analysisResult.analysis.detectedUnitTitle || 'Unit Tiếng Anh Mới';

  // 1. Kỹ năng Nghe (Listening)
  const listeningQuestions = analysisResult.fourSkillsData?.listening?.map((l, i) => ({
    id: `lq-${unitId}-${i}`,
    audioScript: l.audioScript,
    question: l.question,
    options: l.options,
    correctIndex: l.correctIndex
  })) || analysisResult.multipleChoiceQuizzes.slice(0, 4).map((q, i) => ({
    id: `lq-${unitId}-${i}`,
    audioScript: q.context || q.question,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex
  }));

  // 2. Kỹ năng Nói (Speaking)
  const speechPrompts = analysisResult.fourSkillsData?.speaking?.map(s => ({
    phrase: s.phrase,
    vietnamese: s.vietnamese,
    phoneticTip: `${s.tip} (${s.phonetic})`
  })) || analysisResult.analysis.grammarPatterns.map(g => ({
    phrase: g.split('-')[0].trim(),
    vietnamese: 'Luyện nói câu trọng tâm',
    phoneticTip: analysisResult.analysis.phonicsFocus
  }));

  // 3. Kỹ năng Đọc (Reading)
  const readingPassage = analysisResult.fourSkillsData?.reading ? {
    title: analysisResult.fourSkillsData.reading.title,
    text: analysisResult.fourSkillsData.reading.passage,
    questions: analysisResult.fourSkillsData.reading.questions
  } : {
    title: analysisResult.interactiveGameStructures.dialogueRoleplay.title,
    text: analysisResult.interactiveGameStructures.dialogueRoleplay.lines
      .map(l => `${l.speaker}: ${l.text} (${l.vietnamese})`)
      .join(' '),
    questions: analysisResult.multipleChoiceQuizzes.slice(0, 3).map(q => ({
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex
    }))
  };

  // 4. Kỹ năng Viết (Writing)
  const writingChallenges = analysisResult.fourSkillsData?.writing?.map(w => ({
    type: (w.type === 'sentence_builder' ? 'sentence_builder' : 'missing_letter') as 'missing_letter' | 'sentence_builder',
    prompt: w.prompt,
    answer: w.answer,
    maskedWord: w.maskedWord || w.scrambledTokens?.join(' ')
  })) || [
    ...analysisResult.vocabularyExercises.missingLetters.map(m => ({
      type: 'missing_letter' as const,
      prompt: m.prompt,
      answer: m.answer,
      maskedWord: m.maskedWord
    })),
    ...analysisResult.vocabularyExercises.wordScrambles.map(s => ({
      type: 'missing_letter' as const,
      prompt: `Sắp xếp chữ cái thành từ đúng: ${s.scrambled}`,
      answer: s.word,
      maskedWord: s.scrambled
    }))
  ];

  return {
    id: unitId,
    title: resolvedTitle,
    vietnameseTitle: analysisResult.analysis.theme,
    grade: metadata.grade,
    bookSeries: (metadata.bookSeries === 'Family and Friends' || metadata.bookSeries === 'i-Learn Smart Start') ? metadata.bookSeries : 'Global Success',
    theme: analysisResult.analysis.theme,
    status: metadata.publishDirectlyToStudents ? 'approved' : 'draft', // Chuyển trực tiếp sang cổng học sinh
    updatedAt: new Date().toISOString().split('T')[0],
    createdBy: metadata.teacherName,
    vocabularies: analysisResult.vocabularyExercises.flashcards.map((f, i) => ({
      id: `v-${unitId}-${i}`,
      word: f.word,
      phonetic: f.phonetic,
      vietnamese: f.vietnamese,
      exampleSentence: f.exampleSentence,
      emoji: f.emoji,
      category: analysisResult.analysis.theme
    })),
    sentences: analysisResult.analysis.grammarPatterns.map(pattern => ({
      pattern,
      vietnamese: 'Mẫu câu thực hành giao tiếp chuẩn',
      dialogue: analysisResult.interactiveGameStructures.dialogueRoleplay.lines
        .map(l => `${l.speaker}: ${l.text}`)
        .slice(0, 2)
        .join('\n')
    })),
    listeningQuestions,
    readingPassage,
    writingChallenges,
    speechPrompts,
    oddWords: analysisResult.interactiveGameStructures.oddOneOut.map(o => ({
      words: o.words,
      oddIndex: o.oddIndex,
      explanation: o.reason
    }))
  };
}

/**
 * Các trang sách giáo khoa PDF phân tách theo từng trang bài học chuẩn Bộ GD&ĐT
 * Mỗi trang PDF là 1 đơn vị bài học độc lập cho từng khối lớp
 */
export const PDF_PAGES_CURRICULUM = [
  {
    grade: 3,
    pageNumber: 1,
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    lessonName: 'Unit 4: My Classroom and Toys - Lesson 1',
    theme: 'Đồ dùng học tập trong lớp',
    pageText: `TRANG 24 - TIẾNG ANH 3 GLOBAL SUCCESS
Unit 4: My Classroom and Toys
Activity 1: Look, listen and repeat.
a) Nam: Look at my classroom!
   Mai: Wow, it is big! What is that?
   Nam: It is my school bag.
b) Mai: And what is this?
   Nam: It is my new pencil case.
Activity 2: Listen, point and say.
Vocabulary: book /bʊk/, pen /pen/, pencil /ˈpensəl/, ruler /ˈruːlər/, school bag /skuːl bæɡ/, eraser /ɪˈreɪsər/.
Sentence structure: What is this? - It is a / an [item].
Phonics sound: /p/ (pen, pencil) vs /b/ (book, bag).`
  },
  {
    grade: 3,
    pageNumber: 2,
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    lessonName: 'Unit 4: My Classroom and Toys - Lesson 2',
    theme: 'Hỏi màu sắc và số lượng đồ vật',
    pageText: `TRANG 25 - TIẾNG ANH 3 GLOBAL SUCCESS
Unit 4: My Classroom and Toys - Lesson 2
Activity 1: Look, listen and repeat.
a) Lucy: Do you have a ruler?
   Bill: Yes, I do. It is a blue ruler.
b) Lucy: How many pencils do you have?
   Bill: I have three yellow pencils.
Vocabulary: blue, red, yellow, green, pencil case, notebook.
Sentence: Do you have a [item]? - Yes, I do. / No, I do not.
Grammar: Plural nouns (pencils, rulers, books).`
  },
  {
    grade: 3,
    pageNumber: 3,
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    lessonName: 'Unit 4: My Classroom and Toys - Lesson 3',
    theme: 'Luyện đọc, ngữ âm và viết câu',
    pageText: `TRANG 26 - TIẾNG ANH 3 GLOBAL SUCCESS
Unit 4: My Classroom and Toys - Lesson 3
Reading passage:
In our classroom, Nam and Mai sit at the first desk. Nam has a blue pen and a long ruler.
Mai has an eraser and two notebooks. They are very happy to share their school things with friends.
Phonics practice: Chanting with /p/ and /b/.
Writing exercise: Unscramble the letters: E-P-N -> PEN, U-R-L-E-R -> RULER.
Complete the sentence: This is my ______ bag.`
  },
  {
    grade: 4,
    pageNumber: 1,
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    lessonName: 'Unit 2: Time and Daily Routines - Lesson 1',
    theme: 'Hỏi giờ và các hoạt động trong ngày',
    pageText: `TRANG 16 - TIẾNG ANH 4 GLOBAL SUCCESS
Unit 2: Time and Daily Routines
Activity 1: Look, listen and repeat.
a) Tom: What time is it, Mai?
   Mai: It is seven o'clock. It is time for school.
b) Tom: What time do you get up?
   Mai: I get up at six o'clock in the morning.
Vocabulary: o'clock, get up, have breakfast, go to school, in the morning.
Structure: What time is it? - It is [number] o'clock.`
  },
  {
    grade: 5,
    pageNumber: 1,
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    lessonName: 'Unit 1: Summer Holidays and Trips - Lesson 1',
    theme: 'Kỳ nghỉ hè và các địa điểm du lịch Việt Nam',
    pageText: `TRANG 10 - TIẾNG ANH 5 GLOBAL SUCCESS
Unit 1: Summer Holidays
Activity 1: Look, listen and repeat.
a) Peter: Where did you go on holiday, Phong?
   Phong: I went to Ha Long Bay with my family.
b) Peter: What did you do there?
   Phong: We took a boat trip and ate delicious seafood.
Vocabulary: Ha Long Bay, Phu Quoc Island, Da Nang, took a boat trip, ate seafood.
Grammar: Simple past tense (go -> went, take -> took, eat -> ate).`
  }
];
