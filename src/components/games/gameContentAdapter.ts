import { Unit, Vocabulary, SentencePattern } from '../../types';

// =========================================================================
// ADAPTER KẾT NỐI KIẾN THỨC BÀI HỌC SGK VỚI 15 TRÒ CHƠI GAME CENTER
// Tự động trích xuất Từ vựng, Mẫu câu, Nghe, Đọc, Nói theo từng Unit của từng Khối lớp
// =========================================================================

// 1. Matching Game
export interface MatchingPair {
  pairId: string;
  word: string;
  vietnamese: string;
  emoji: string;
  imageUrl?: string;
}

export function getMatchingPairs(unit: Unit): MatchingPair[] {
  if (!unit || !unit.vocabularies || unit.vocabularies.length === 0) {
    return [
      { pairId: 'p1', word: 'Book', vietnamese: 'Quyển sách', emoji: '📖' },
      { pairId: 'p2', word: 'Pencil', vietnamese: 'Bút chì', emoji: '✏️' },
      { pairId: 'p3', word: 'Puppy', vietnamese: 'Cún con', emoji: '🐶' },
      { pairId: 'p4', word: 'School bag', vietnamese: 'Cặp sách', emoji: '🎒' },
    ];
  }

  return unit.vocabularies.slice(0, 6).map((v, i) => ({
    pairId: `p-${v.id || i}`,
    word: v.word,
    vietnamese: v.vietnamese,
    emoji: v.emoji || '🌟',
    imageUrl: v.imageUrl
  }));
}

// 2. Memory Cards Game
export interface MemoryCardItem {
  id: string;
  word: string;
  vietnamese: string;
  emoji: string;
  imageUrl?: string;
}

export function getMemoryCards(unit: Unit): MemoryCardItem[] {
  if (!unit || !unit.vocabularies || unit.vocabularies.length === 0) {
    return [
      { id: 'm1', word: 'Teacher', vietnamese: 'Thầy/Cô giáo', emoji: '👩‍🏫' },
      { id: 'm2', word: 'Friend', vietnamese: 'Bạn bè', emoji: '👫' },
      { id: 'm3', word: 'Ruler', vietnamese: 'Thước kẻ', emoji: '📏' },
      { id: 'm4', word: 'Pen', vietnamese: 'Cái bút', emoji: '🖊️' },
    ];
  }

  return unit.vocabularies.slice(0, 6).map((v, i) => ({
    id: `mem-${v.id || i}`,
    word: v.word,
    vietnamese: v.vietnamese,
    emoji: v.emoji || '✨',
    imageUrl: v.imageUrl
  }));
}

// 3. Listen & Choose Game
export interface ListenChooseOption {
  text: string;
  emoji: string;
  imageUrl?: string;
}

export interface ListenChooseRound {
  word: string;
  vietnamese: string;
  imageUrl?: string;
  options: ListenChooseOption[];
  correct: number;
}

export function getListenChooseRounds(unit: Unit): ListenChooseRound[] {
  if (!unit || !unit.vocabularies || unit.vocabularies.length === 0) {
    return [
      { 
        word: 'Elephant', 
        vietnamese: 'Con voi', 
        options: [
          { text: 'Elephant', emoji: '🐘' }, 
          { text: 'Monkey', emoji: '🐒' }, 
          { text: 'Tiger', emoji: '🐅' }, 
          { text: 'Panda', emoji: '🐼' }
        ], 
        correct: 0 
      }
    ];
  }

  const vocabs = unit.vocabularies;
  return vocabs.map((v, i) => {
    // Pick 3 distractors
    const otherVocabs = vocabs.filter((_, idx) => idx !== i);
    const shuffledOthers = [...otherVocabs].sort(() => Math.random() - 0.5);
    const distractor1 = shuffledOthers[0] || { word: 'Star', emoji: '⭐', imageUrl: undefined };
    const distractor2 = shuffledOthers[1] || { word: 'Heart', emoji: '💖', imageUrl: undefined };
    const distractor3 = shuffledOthers[2] || { word: 'Smile', emoji: '😊', imageUrl: undefined };

    const opts: ListenChooseOption[] = [
      { text: v.word, emoji: v.emoji || '✨', imageUrl: v.imageUrl },
      { text: distractor1.word, emoji: distractor1.emoji || '✨', imageUrl: (distractor1 as any).imageUrl },
      { text: distractor2.word, emoji: distractor2.emoji || '✨', imageUrl: (distractor2 as any).imageUrl },
      { text: distractor3.word, emoji: distractor3.emoji || '✨', imageUrl: (distractor3 as any).imageUrl }
    ].sort(() => Math.random() - 0.5);

    const correctIdx = opts.findIndex(o => o.text === v.word);

    return {
      word: v.word,
      vietnamese: v.vietnamese,
      imageUrl: v.imageUrl,
      options: opts,
      correct: correctIdx >= 0 ? correctIdx : 0
    };
  });
}

// 4. Picture Guessing Game
export interface PictureGuessingRound {
  word: string;
  vietnamese: string;
  vi: string;
  emoji: string;
  hint: string;
  options: string[];
  imageUrl?: string;
}

export function getPictureGuessingRounds(unit: Unit): PictureGuessingRound[] {
  if (!unit || !unit.vocabularies || unit.vocabularies.length === 0) {
    return [
      { word: 'SUNFLOWER', vietnamese: 'Hoa hướng dương', vi: 'Hoa hướng dương', emoji: '🌻', hint: 'Loài hoa luôn hướng về phía mặt trời', options: ['SUNFLOWER', 'ROSE', 'TULIP', 'DAISY'] }
    ];
  }

  const allWords = unit.vocabularies.map(v => v.word.toUpperCase());
  return unit.vocabularies.map((v) => {
    const distractors = allWords.filter(w => w !== v.word.toUpperCase()).slice(0, 3);
    while (distractors.length < 3) {
      distractors.push(['APPLE', 'BOOK', 'TEACHER', 'PUPPY'][distractors.length]);
    }
    const options = [v.word.toUpperCase(), ...distractors].sort(() => Math.random() - 0.5);
    return {
      word: v.word.toUpperCase(),
      vietnamese: v.vietnamese,
      vi: v.vietnamese,
      emoji: v.emoji || '🖼️',
      hint: v.exampleSentence || `Từ vựng chủ đề ${unit.title}`,
      options,
      imageUrl: v.imageUrl
    };
  });
}

// 5. Missing Letter Game
export interface MissingLetterRound {
  word: string;
  masked: string;
  missing: string;
  options: string[];
  emoji: string;
  vi: string;
}

export function getMissingLetterRounds(unit: Unit): MissingLetterRound[] {
  if (!unit || !unit.vocabularies || unit.vocabularies.length === 0) {
    return [
      { word: 'CAT', masked: 'C _ T', missing: 'A', options: ['A', 'E', 'O', 'U'], emoji: '🐱', vi: 'Con mèo' }
    ];
  }

  return unit.vocabularies.map(v => {
    const rawWord = v.word.toUpperCase().replace(/[^A-Z]/g, '');
    const midIndex = Math.max(1, Math.min(rawWord.length - 2, Math.floor(rawWord.length / 2)));
    const missingChar = rawWord[midIndex] || rawWord[0] || 'A';
    
    // Masked word with spaces
    const letters = rawWord.split('');
    letters[midIndex] = '_';
    const masked = letters.join(' ');

    // Options including the correct missing letter
    const allAlphabet = ['A', 'E', 'I', 'O', 'U', 'B', 'C', 'D', 'L', 'M', 'N', 'P', 'R', 'S', 'T'];
    const distractors = allAlphabet.filter(c => c !== missingChar).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [missingChar, ...distractors].sort(() => Math.random() - 0.5);

    return {
      word: v.word.toUpperCase(),
      masked,
      missing: missingChar,
      options,
      emoji: v.emoji || '🎈',
      vi: v.vietnamese
    };
  });
}

// 6. Word Scramble Game
export interface WordScrambleRound {
  target: string;
  emoji: string;
  vietnamese: string;
  vi: string;
}

export function getWordScrambleRounds(unit: Unit): WordScrambleRound[] {
  if (!unit || !unit.vocabularies || unit.vocabularies.length === 0) {
    return [
      { target: 'BOOK', emoji: '📖', vietnamese: 'Quyển sách', vi: 'Quyển sách' }
    ];
  }

  return unit.vocabularies.map(v => ({
    target: v.word.toUpperCase().replace(/[^A-Z]/g, ''),
    emoji: v.emoji || '🔤',
    vietnamese: v.vietnamese,
    vi: v.vietnamese
  }));
}

// 7. Sentence Builder Game
export interface SentenceBuilderRound {
  target: string;
  vietnamese: string;
  vi?: string;
  tokens?: string[];
  scrambled: string[];
}

export function getSentenceBuilderRounds(unit: Unit): SentenceBuilderRound[] {
  if (!unit || !unit.sentences || unit.sentences.length === 0) {
    return [
      { target: 'Hello, Bill.', vietnamese: 'Xin chào bạn Bill.', vi: 'Xin chào bạn Bill.', tokens: ['Bill.', 'Hello,'], scrambled: ['Bill.', 'Hello,'] }
    ];
  }

  return unit.sentences.map(s => {
    const rawTokens = s.pattern.split(' ').filter(Boolean);
    const scrambled = [...rawTokens].sort(() => Math.random() - 0.5);
    return {
      target: s.pattern,
      vietnamese: s.vietnamese,
      vi: s.vietnamese,
      tokens: scrambled,
      scrambled
    };
  });
}

// 8. True / False Game
export interface TrueFalseRound {
  question: string;
  statement: string;
  isTrue: boolean;
  emoji: string;
  explanation: string;
}

export function getTrueFalseRounds(unit: Unit): TrueFalseRound[] {
  if (!unit || !unit.vocabularies || unit.vocabularies.length === 0) {
    return [
      { question: 'Từ này có nghĩa là "Quyển sách"?', statement: 'Book', isTrue: true, emoji: '📖', explanation: 'Chính xác! Book là quyển sách.' }
    ];
  }

  const rounds: TrueFalseRound[] = [];
  const vocabs = unit.vocabularies;

  vocabs.forEach((v, idx) => {
    // True case
    rounds.push({
      question: `Từ "${v.word}" có nghĩa là "${v.vietnamese}"?`,
      statement: `${v.word} = ${v.vietnamese}`,
      isTrue: true,
      emoji: v.emoji || '✅',
      explanation: `Chính xác! "${v.word}" trong SGK ${unit.title} có nghĩa là "${v.vietnamese}".`
    });

    // False case (pick other meaning)
    const other = vocabs[(idx + 1) % vocabs.length];
    if (other && other.id !== v.id) {
      rounds.push({
        question: `Từ "${v.word}" có nghĩa là "${other.vietnamese}"?`,
        statement: `${v.word} = ${other.vietnamese}`,
        isTrue: false,
        emoji: other.emoji || '❌',
        explanation: `Sai rồi! "${v.word}" là "${v.vietnamese}", còn "${other.word}" mới là "${other.vietnamese}".`
      });
    }
  });

  return rounds.sort(() => Math.random() - 0.5).slice(0, 8);
}

// 9. Quiz Bee Game
export interface QuizBeeRound {
  question: string;
  options: string[];
  correctIndex: number;
  correct: number;
  explanation: string;
  emoji: string;
}

export function getQuizBeeQuestions(unit: Unit): QuizBeeRound[] {
  if (unit.listeningQuestions && unit.listeningQuestions.length > 0) {
    return unit.listeningQuestions.map(lq => ({
      question: lq.question,
      options: lq.options,
      correctIndex: lq.correctIndex,
      correct: lq.correctIndex,
      emoji: '🐝',
      explanation: `Dẫn chứng SGK: ${lq.audioScript}`
    }));
  }

  // Fallback from vocabulary
  return unit.vocabularies.slice(0, 5).map((v, i) => {
    const opts = [v.vietnamese, 'Cái bàn', 'Màu xanh', 'Quả táo'].sort(() => Math.random() - 0.5);
    const correctIdx = opts.indexOf(v.vietnamese);
    return {
      question: `Trong tiếng Anh, từ "${v.word}" có nghĩa là gì?`,
      options: opts,
      correctIndex: correctIdx >= 0 ? correctIdx : 0,
      correct: correctIdx >= 0 ? correctIdx : 0,
      emoji: v.emoji || '🐝',
      explanation: `${v.word} nghĩa là ${v.vietnamese}.`
    };
  });
}

// 10. English Race Game
export interface RaceRound {
  word: string;
  vi: string;
  opposite: string;
  options: string[];
}

export function getEnglishRaceQuestions(unit: Unit): RaceRound[] {
  if (!unit || !unit.vocabularies || unit.vocabularies.length === 0) {
    return [
      { word: 'Fast', vi: 'Nhanh nhẹn', opposite: 'Slow', options: ['Slow', 'Hot', 'Tall', 'Sad'] },
      { word: 'Big', vi: 'To lớn', opposite: 'Small', options: ['Small', 'Cold', 'Red', 'Thin'] }
    ];
  }

  return unit.vocabularies.map((v, idx) => {
    const vocabs = unit.vocabularies;
    const distractors = vocabs.filter((_, i) => i !== idx).map(x => x.word).slice(0, 3);
    while (distractors.length < 3) {
      distractors.push(['Apple', 'School', 'Teacher', 'Star'][distractors.length]);
    }

    const allOpts = [v.word, ...distractors].sort(() => Math.random() - 0.5);
    return {
      word: v.vietnamese,
      vi: `Từ tiếng Anh tương ứng`,
      opposite: v.word,
      options: allOpts
    };
  });
}

// 11. Treasure Hunt Game
export interface TreasureRiddle {
  id: number;
  title: string;
  riddle: string;
  answer: string;
  vietnamese: string;
  options: string[];
  correct: number;
  emoji: string;
}

export function getTreasureHuntRiddles(unit: Unit): TreasureRiddle[] {
  return unit.vocabularies.slice(0, 5).map((v, idx) => {
    const otherWords = unit.vocabularies.filter((_, i) => i !== idx).map(x => x.word).slice(0, 3);
    const opts = [v.word, ...otherWords].sort(() => Math.random() - 0.5);
    return {
      id: idx + 1,
      title: `Rương ${idx + 1}: ${v.word}`,
      riddle: `Rương cổ bí mật chứa món "${v.vietnamese}". Đó là gì?`,
      answer: v.word,
      vietnamese: v.vietnamese,
      options: opts,
      correct: opts.indexOf(v.word),
      emoji: v.emoji || '🏴‍☠️'
    };
  });
}

// 12. Spin Wheel Game
export interface SpinWheelItem {
  label: string;
  word?: string;
  vietnamese?: string;
  emoji?: string;
  points?: number;
  rewardXP?: number;
  rewardGems?: number;
  color?: string;
  textColor?: string;
}

export function getSpinWheelTasks(unit: Unit): SpinWheelItem[] {
  const colors = ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#3b82f6', '#8b5cf6'];
  return unit.vocabularies.slice(0, 6).map((v, i) => ({
    label: v.word,
    word: v.word,
    vietnamese: v.vietnamese,
    emoji: v.emoji || '🎡',
    points: 20 + i * 5,
    rewardXP: 20 + i * 5,
    color: colors[i % colors.length],
    textColor: '#ffffff'
  }));
}

// 13. Find the Odd Word Game
export interface OddWordRound {
  words: string[];
  oddIndex: number;
  oddIdx: number;
  explanation: string;
}

export function getOddWordRounds(unit: Unit): OddWordRound[] {
  if (unit.oddWords && unit.oddWords.length > 0) {
    return unit.oddWords.map(ow => ({
      words: ow.words,
      oddIndex: ow.oddIndex,
      oddIdx: ow.oddIndex,
      explanation: ow.explanation
    }));
  }

  // Dynamic generate from unit
  const words = unit.vocabularies.slice(0, 3).map(v => v.word);
  words.push('Computer');
  return [
    {
      words,
      oddIndex: 3,
      oddIdx: 3,
      explanation: `Computer không thuộc nhóm bài học "${unit.title}".`
    }
  ];
}

// 14. Listen & Repeat Game
export interface ListenRepeatPrompt {
  phrase: string;
  vietnamese: string;
  vi: string;
  phoneticTip: string;
}

export function getListenRepeatPrompts(unit: Unit): ListenRepeatPrompt[] {
  if (unit.speechPrompts && unit.speechPrompts.length > 0) {
    return unit.speechPrompts.map(sp => ({
      phrase: sp.phrase,
      vietnamese: sp.vietnamese,
      vi: sp.vietnamese,
      phoneticTip: sp.phoneticTip || 'Phát âm rõ ràng, đủ âm đuôi'
    }));
  }

  // Use sentences as fallback
  return unit.sentences.map(s => ({
    phrase: s.pattern,
    vietnamese: s.vietnamese,
    vi: s.vietnamese,
    phoneticTip: 'Đọc to rõ ràng từng từ trong câu'
  }));
}

// 15. Speaking Challenge Game (Sparky Dialogue)
export interface SpeakingDialogue {
  sparkySays: string;
  suggestedAnswer: string;
  vietnamese: string;
  promptVi: string;
  expectedKeywords: string[];
}

export function getSpeakingChallengeTasks(unit: Unit): SpeakingDialogue[] {
  if (unit.sentences && unit.sentences.length > 0) {
    return unit.sentences.map(s => {
      // Split pattern if has " - "
      if (s.pattern.includes(' - ')) {
        const parts = s.pattern.split(' - ');
        const sparkyPart = parts[0].trim();
        const answerPart = parts[1].trim();
        return {
          sparkySays: sparkyPart,
          suggestedAnswer: answerPart,
          vietnamese: s.vietnamese,
          promptVi: `Bé hãy nói: "${answerPart}"`,
          expectedKeywords: answerPart.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ')
        };
      }
      return {
        sparkySays: `Can you say: "${s.pattern}"?`,
        suggestedAnswer: s.pattern,
        vietnamese: s.vietnamese,
        promptVi: `Bé hãy đọc câu: "${s.pattern}"`,
        expectedKeywords: s.pattern.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ')
      };
    });
  }

  return [
    { 
      sparkySays: 'Hello! What is your name?', 
      suggestedAnswer: 'My name is Mai.', 
      vietnamese: 'Tên mình là Mai.',
      promptVi: 'Bé hãy nói: "My name is Mai."',
      expectedKeywords: ['my', 'name', 'is', 'mai']
    }
  ];
}
