import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Volume2, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  Trophy, 
  BookOpen, 
  Headphones, 
  MessageSquare, 
  PenTool, 
  HelpCircle,
  Star,
  Eye,
  Image as ImageIcon,
  Play,
  Square,
  Award,
  Loader2,
  AlertCircle,
  Radio
} from 'lucide-react';
import { Unit, Vocabulary } from '../../types';
import { useApp } from '../../context/AppContext';
import { sound, speakEnglish, speakVietnamese, getSpeechRecognition, calculateSpeechMatchScore, evaluateSpeechAccuracy } from '../../utils/audio';
import { Mascot } from '../common/Mascot';
import { resolveSgkImageSource } from '../../services/sgkImageExtractor';
import { evaluateSpeechWithAI, AIPronunciationEvaluationResult, StudentVoiceRecorder } from '../../services/speechEvaluationService';

interface LessonViewProps {
  unit: Unit;
  onBack: () => void;
  onGoToGames: () => void;
  initialSkill?: 'vocab' | 'sentences' | 'listening' | 'speaking' | 'reading' | 'writing';
}

type SkillTab = 'vocab' | 'sentences' | 'listening' | 'speaking' | 'reading' | 'writing';

export const LessonView: React.FC<LessonViewProps> = ({ unit, onBack, onGoToGames, initialSkill }) => {
  const { gainXP, recordMistake, currentUser, saveUnitScore, activeSchoolId } = useApp();
  const [activeSkill, setActiveSkill] = useState<SkillTab>(initialSkill || 'vocab');

  useEffect(() => {
    if (initialSkill) {
      setActiveSkill(initialSkill);
    }
  }, [initialSkill, unit.id]);

  // Real-time 4-Skills Auto-grading points (Thang điểm 100: 25đ mỗi kỹ năng)
  const [skillPoints, setSkillPoints] = useState<{
    listening: number;
    speaking: number;
    reading: number;
    writing: number;
  }>({
    listening: 0,
    speaking: 0,
    reading: 0,
    writing: 0
  });

  // Final Auto-Grading result
  const [finalGrading, setFinalGrading] = useState<{
    totalScore: number;
    stars: number;
    listening: number;
    speaking: number;
    reading: number;
    writing: number;
  } | null>(null);

  // Skill 1: Vocabulary State
  const [vocabIndex, setVocabIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Skill 2: Sentences State
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [scrambledTokens, setScrambledTokens] = useState<string[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [sentenceSuccess, setSentenceSuccess] = useState<boolean | null>(null);

  // Skill 3: Listening State
  const [listenIndex, setListenIndex] = useState(0);
  const [selectedListenOption, setSelectedListenOption] = useState<number | null>(null);
  const [listenResult, setListenResult] = useState<boolean | null>(null);

  // Skill 4: Speaking State (Speech-to-Text & AI Native Grading)
  const [speechIndex, setSpeechIndex] = useState(0);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [spokenText, setSpokenText] = useState('');
  const [speechScore, setSpeechScore] = useState<number | null>(null);
  const [speechFeedback, setSpeechFeedback] = useState<string>('');
  const [isEvaluatingSpeech, setIsEvaluatingSpeech] = useState(false);
  const [aiSpeechResult, setAiSpeechResult] = useState<AIPronunciationEvaluationResult | null>(null);
  const [studentAudioUrl, setStudentAudioUrl] = useState<string | null>(null);
  const [isPlayingStudentAudio, setIsPlayingStudentAudio] = useState(false);
  const [micErrorMessage, setMicErrorMessage] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.88);

  const voiceRecorderRef = useRef<StudentVoiceRecorder | null>(null);
  const activeRecognizerRef = useRef<any>(null);
  const studentAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Skill 5: Reading State
  const [readingQuestionIndex, setReadingQuestionIndex] = useState(0);
  const [selectedReadingOption, setSelectedReadingOption] = useState<number | null>(null);
  const [readingResult, setReadingResult] = useState<boolean | null>(null);

  // Skill 6: Writing State
  const [writingIndex, setWritingIndex] = useState(0);
  const [writingInput, setWritingInput] = useState('');
  const [writingResult, setWritingResult] = useState<boolean | null>(null);

  // Completion
  const [lessonFinished, setLessonFinished] = useState(false);
  const [saveSuccessFeedback, setSaveSuccessFeedback] = useState(false);

  const unitNumMatch = unit.title.match(/\d+/);
  const currentUnitNum = unitNumMatch ? unitNumMatch[0] : '1';

  const currentVocab = unit.vocabularies[vocabIndex] || unit.vocabularies[0];
  const currentVocabImg = resolveSgkImageSource(
    currentVocab?.imageUrl,
    unit.grade,
    currentUnitNum,
    currentVocab?.word || 'Word',
    currentVocab?.vietnamese || 'Nghĩa',
    currentVocab?.emoji || '📘',
    activeSchoolId
  );

  const currentSentence = unit.sentences[sentenceIndex] || unit.sentences[0];
  const currentListening = unit.listeningQuestions[listenIndex] || unit.listeningQuestions[0];
  const currentListeningImg = resolveSgkImageSource(
    currentListening?.imageUrl,
    unit.grade,
    currentUnitNum,
    currentListening?.options?.[currentListening.correctIndex] || currentVocab?.word || 'Listen',
    'Trắc nghiệm trực quan SGK',
    '🎧',
    activeSchoolId
  );

  const currentSpeech = unit.speechPrompts[speechIndex] || unit.speechPrompts[0];
  const currentReadingQ = unit.readingPassage?.questions[readingQuestionIndex];
  const currentWriting = unit.writingChallenges[writingIndex] || unit.writingChallenges[0];

  // Explicitly isolated score saving function: strictly binds to currentUser.id
  const handleSaveScore = (
    total: number,
    skills: { listening: number; speaking: number; reading: number; writing: number }
  ) => {
    if (!currentUser || currentUser.role !== 'STUDENT' || !currentUser.id) {
      console.warn('Cannot save score: student is not authenticated');
      return;
    }
    saveUnitScore(unit.id, total, skills, currentUser.id);
  };

  // Initialize Sentence tokens
  useEffect(() => {
    if (currentSentence) {
      const cleanWords = currentSentence.pattern.replace(/[.,?!]/g, '').split(' ').filter(Boolean);
      // Shuffle tokens
      const shuffled = [...cleanWords].sort(() => Math.random() - 0.5);
      setScrambledTokens(shuffled);
      setSelectedTokens([]);
      setSentenceSuccess(null);
    }
  }, [sentenceIndex, currentSentence]);

  // Read current vocabulary automatically when navigating cards
  const playVocabWord = (word: string) => {
    sound.playPop();
    speakEnglish(word);
  };

  // Check sentence token assembly
  const handleSelectToken = (token: string, index: number) => {
    sound.playPop();
    const newSelected = [...selectedTokens, token];
    setSelectedTokens(newSelected);
    const newScrambled = [...scrambledTokens];
    newScrambled.splice(index, 1);
    setScrambledTokens(newScrambled);

    const targetWords = currentSentence.pattern.replace(/[.,?!]/g, '').split(' ').filter(Boolean);
    if (newSelected.length === targetWords.length) {
      const userJoined = newSelected.join(' ').toLowerCase();
      const targetJoined = targetWords.join(' ').toLowerCase();
      if (userJoined === targetJoined) {
        sound.playSuccess();
        setSentenceSuccess(true);
        gainXP(15, 1);
      } else {
        sound.playWrong();
        setSentenceSuccess(false);
      }
    }
  };

  const handleResetTokens = () => {
    sound.playPop();
    const cleanWords = currentSentence.pattern.replace(/[.,?!]/g, '').split(' ').filter(Boolean);
    setScrambledTokens([...cleanWords].sort(() => Math.random() - 0.5));
    setSelectedTokens([]);
    setSentenceSuccess(null);
  };

  // Check Listening Question
  const handleAnswerListening = (optionIndex: number) => {
    setSelectedListenOption(optionIndex);
    if (optionIndex === currentListening.correctIndex) {
      sound.playSuccess();
      setListenResult(true);
      setSkillPoints(prev => ({ ...prev, listening: 25 }));
      gainXP(20, 1);
    } else {
      sound.playWrong();
      setListenResult(false);
      setSkillPoints(prev => ({ ...prev, listening: Math.max(prev.listening, 12) }));
      recordMistake(
        currentListening.question,
        'Luyện nghe chọn đáp án đúng',
        '/audio/',
        '🎧'
      );
    }
  };

  // Playback student's own voice recording
  const handlePlayStudentAudio = () => {
    if (!studentAudioUrl) return;
    if (isPlayingStudentAudio) {
      if (studentAudioPlayerRef.current) {
        studentAudioPlayerRef.current.pause();
        studentAudioPlayerRef.current.currentTime = 0;
      }
      setIsPlayingStudentAudio(false);
    } else {
      if (!studentAudioPlayerRef.current) {
        studentAudioPlayerRef.current = new Audio(studentAudioUrl);
        studentAudioPlayerRef.current.onended = () => setIsPlayingStudentAudio(false);
      } else {
        studentAudioPlayerRef.current.src = studentAudioUrl;
        studentAudioPlayerRef.current.onended = () => setIsPlayingStudentAudio(false);
      }
      studentAudioPlayerRef.current.play();
      setIsPlayingStudentAudio(true);
    }
  };

  // Process AI Evaluation via Gemini API
  const handleProcessSpeechEvaluation = async (transcript: string) => {
    if (!transcript || !transcript.trim()) return;
    setIsEvaluatingSpeech(true);
    sound.playPop();

    try {
      const result = await evaluateSpeechWithAI(
        currentSpeech.phrase,
        transcript,
        currentSpeech.phoneticTip,
        unit.grade
      );

      setAiSpeechResult(result);
      setSpeechScore(result.overallScore);
      setSpeechFeedback(result.feedback);

      if (result.passed) {
        sound.playSuccess();
        confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
        gainXP(25, 2);
        setSkillPoints(prev => ({ ...prev, speaking: 25 }));
      } else {
        sound.playWrong();
        const pts = Math.min(16, Math.round((result.overallScore / 100) * 20));
        setSkillPoints(prev => ({ ...prev, speaking: Math.max(prev.speaking, pts) }));
      }
    } catch (err) {
      console.error('Speech evaluation failed:', err);
    } finally {
      setIsEvaluatingSpeech(false);
    }
  };

  // Web Speech API Microphone Handler with Speech-to-Text & Realtime Feedback
  const handleToggleMic = async () => {
    if (isListeningMic) {
      if (activeRecognizerRef.current) {
        try {
          activeRecognizerRef.current.stop();
        } catch (e) {}
      }
      if (voiceRecorderRef.current) {
        const url = voiceRecorderRef.current.stop();
        if (url) setStudentAudioUrl(url);
      }
      setIsListeningMic(false);
      return;
    }

    setMicErrorMessage(null);
    setInterimTranscript('');
    setSpokenText('');
    setSpeechScore(null);
    setSpeechFeedback('');
    setAiSpeechResult(null);

    // Start local audio recorder
    if (!voiceRecorderRef.current) {
      voiceRecorderRef.current = new StudentVoiceRecorder();
    }
    await voiceRecorderRef.current.start();

    // Initialize SpeechRecognition
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      // Browser does not support Web Speech API
      setMicErrorMessage('Trình duyệt chưa hỗ trợ Web Speech API nhận diện trực tiếp. Bé có thể dùng chức năng kiểm tra phát âm mẫu bên dưới để AI chấm điểm!');
      return;
    }

    try {
      sound.playPop();
      const recognizer = new SpeechRec();
      activeRecognizerRef.current = recognizer;
      recognizer.lang = 'en-US';
      recognizer.continuous = false;
      recognizer.interimResults = true;
      recognizer.maxAlternatives = 1;

      recognizer.onstart = () => {
        setIsListeningMic(true);
      };

      recognizer.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += trans;
          } else {
            interim += trans;
          }
        }
        if (interim) {
          setInterimTranscript(interim);
        }
        if (final) {
          setSpokenText(final);
          setInterimTranscript('');
          handleProcessSpeechEvaluation(final);
        }
      };

      recognizer.onerror = (event: any) => {
        setIsListeningMic(false);
        if (event.error === 'not-allowed') {
          setMicErrorMessage('Vui lòng cho phép quyền truy cập Micro trên trình duyệt để luyện nói cùng AI nhé!');
        } else if (event.error === 'no-speech') {
          setMicErrorMessage('Micro chưa nhận diện được tiếng nói. Bé hãy nói to và rõ ràng hơn nhé!');
        } else {
          setMicErrorMessage(`Nhận diện âm thanh chưa thành công (${event.error}). Bé hãy thử bấm lại nhé!`);
        }
      };

      recognizer.onend = () => {
        setIsListeningMic(false);
        if (voiceRecorderRef.current) {
          const url = voiceRecorderRef.current.stop();
          if (url) setStudentAudioUrl(url);
        }
      };

      recognizer.start();
    } catch (e: any) {
      setIsListeningMic(false);
      setMicErrorMessage('Không thể khởi động micro. Vui lòng kiểm tra quyền thiết bị.');
    }
  };

  // Check Reading Comprehension
  const handleAnswerReading = (optionIndex: number) => {
    if (!currentReadingQ) return;
    setSelectedReadingOption(optionIndex);
    if (optionIndex === currentReadingQ.correctIndex) {
      sound.playSuccess();
      setReadingResult(true);
      setSkillPoints(prev => ({ ...prev, reading: 25 }));
      gainXP(20, 1);
    } else {
      sound.playWrong();
      setReadingResult(false);
      setSkillPoints(prev => ({ ...prev, reading: Math.max(prev.reading, 12) }));
    }
  };

  // Check Writing Question: Chấp nhận cả chữ hoa và chữ thường, điền chữ còn thiếu hoặc từ hoàn chỉnh
  const handleCheckWriting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!writingInput.trim()) return;

    const cleanUser = writingInput.trim().toLowerCase();
    const cleanUserLetters = cleanUser.replace(/[^a-z0-9]/g, '');

    const cleanTarget = currentWriting.answer.trim().toLowerCase();
    const cleanTargetLetters = cleanTarget.replace(/[^a-z0-9]/g, '');

    let wordFromMask = '';
    if (currentWriting.maskedWord) {
      wordFromMask = currentWriting.maskedWord.replace(/[^a-zA-Z]/g, '').toLowerCase();
    }

    const isMatch = 
      cleanUser === cleanTarget ||
      cleanUserLetters === cleanTargetLetters ||
      (cleanTargetLetters.length > 0 && cleanUserLetters === cleanTargetLetters) ||
      (wordFromMask.length >= 3 && cleanUserLetters === wordFromMask);

    if (isMatch) {
      sound.playSuccess();
      setWritingResult(true);
      setSkillPoints(prev => ({ ...prev, writing: 25 }));
      gainXP(20, 2);
    } else {
      sound.playWrong();
      setWritingResult(false);
      setSkillPoints(prev => ({ ...prev, writing: Math.max(prev.writing, 12) }));
      recordMistake(currentWriting.answer, currentWriting.prompt, '/writing/', '✍️');
    }
  };

  // Finish Lesson & Compute AI Auto-Grading Report
  const handleFinishLesson = () => {
    sound.playFanfare();
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 }
    });

    const lPoints = skillPoints.listening > 0 ? skillPoints.listening : (listenResult === true ? 25 : 20);
    const sPoints = skillPoints.speaking > 0 ? skillPoints.speaking : (speechScore ? Math.round((speechScore / 100) * 25) : 22);
    const rPoints = skillPoints.reading > 0 ? skillPoints.reading : (readingResult === true ? 25 : 20);
    const wPoints = skillPoints.writing > 0 ? skillPoints.writing : (writingResult === true ? 25 : 20);

    const total = lPoints + sPoints + rPoints + wPoints;
    const starCount = total >= 90 ? 3 : total >= 70 ? 2 : 1;

    const grading = {
      totalScore: total,
      stars: starCount,
      listening: lPoints,
      speaking: sPoints,
      reading: rPoints,
      writing: wPoints
    };

    setFinalGrading(grading);
    handleSaveScore(total, {
      listening: lPoints,
      speaking: sPoints,
      reading: rPoints,
      writing: wPoints
    });

    setLessonFinished(true);
    gainXP(100, 10);
  };

  const skillsList: { id: SkillTab; name: string; icon: React.ReactNode; color: string }[] = [
    { id: 'vocab', name: '1. Sổ tay từ vựng', icon: <BookOpen className="w-4 h-4" />, color: 'emerald' },
    { id: 'sentences', name: '2. Mẫu câu', icon: <MessageSquare className="w-4 h-4" />, color: 'amber' },
    { id: 'listening', name: '3. Luyện nghe', icon: <Headphones className="w-4 h-4" />, color: 'sky' },
    { id: 'speaking', name: '4. Luyện nói AI', icon: <Mic className="w-4 h-4" />, color: 'rose' },
    { id: 'reading', name: '5. Đọc hiểu', icon: <BookOpen className="w-4 h-4" />, color: 'indigo' },
    { id: 'writing', name: '6. Luyện viết', icon: <PenTool className="w-4 h-4" />, color: 'purple' },
  ];

  if (lessonFinished) {
    const score = finalGrading?.totalScore || 95;
    const stars = finalGrading?.stars || 3;
    const lScore = finalGrading?.listening || 25;
    const sScore = finalGrading?.speaking || 23;
    const rScore = finalGrading?.reading || 25;
    const wScore = finalGrading?.writing || 22;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
        {/* Top Trophy Banner */}
        <div className="text-center space-y-3">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-amber-500 flex items-center justify-center text-5xl shadow-xl animate-bounce">
            🏆
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI TỰ PHÂN TÍCH & TỰ CHẤM ĐIỂM HOÀN TẤT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-indigo-950">
            CHÚC MỪNG {currentUser?.fullName}!
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600">
            Em đã hoàn thành bài học <strong>{unit.title}</strong> ({unit.vietnameseTitle})
          </p>
        </div>

        {/* AI AUTO-GRADING REPORT CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-4 border-amber-200 shadow-xl space-y-5 relative overflow-visible">
          {/* CÚP VÀNG BÊN GÓC (Corner Trophy Cup) */}
          <div className="absolute -top-5 -right-3 sm:-right-4 z-20 flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-4 border-amber-300 shadow-2xl flex items-center justify-center text-3xl sm:text-4xl animate-bounce">
              🏆
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-indigo-950 shadow-md mt-1 whitespace-nowrap">
              Cúp Vinh Danh 🏆
            </span>
          </div>

          {/* Total Score & Stars */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-indigo-50 to-emerald-50 border-2 border-amber-300">
            <div className="text-center sm:text-left">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                TỔNG ĐIỂM ĐÁNH GIÁ (THANG 100)
              </span>
              <div className="text-4xl sm:text-5xl font-black text-indigo-950 mt-0.5">
                {score} <span className="text-2xl font-bold text-amber-500">/ 100</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 mt-1 justify-center sm:justify-start">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < stars ? 'fill-amber-400 text-amber-500' : 'fill-slate-200 text-slate-300'}`} 
                  />
                ))}
                <span className="ml-1 text-xs font-black text-indigo-950">
                  {score >= 90 ? 'XUẤT SẮC 🌟' : score >= 70 ? 'RẤT TỐT 👍' : 'CẦN CỐ GẮNG 💪'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100/80 rounded-2xl border border-amber-300 text-center min-w-24">
                <div className="text-xl font-black text-amber-800">+100</div>
                <div className="text-[10px] font-bold text-slate-600">Kinh nghiệm (XP)</div>
              </div>
              <div className="p-3 bg-sky-100/80 rounded-2xl border border-sky-300 text-center min-w-24">
                <div className="text-xl font-black text-sky-800">+10 💎</div>
                <div className="text-[10px] font-bold text-slate-600">Đá quý tích lũy</div>
              </div>
            </div>
          </div>

          {/* LỜI KHEN NGỢI TỪ CÔ MS QUE */}
          <div className="p-4 bg-gradient-to-r from-amber-100/90 via-orange-50 to-pink-50 rounded-2xl border-2 border-amber-300 shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900">
              <span className="text-base">👩‍🏫</span>
              <span>LỜI KHEN TỪ CÔ MS QUE (TRƯỜNG TIỂU HỌC TÂN KỲ):</span>
            </div>
            <p className="text-xs text-amber-950 font-bold leading-relaxed">
              {score >= 90 
                ? `🎉 "Cô Quế khen ngợi ${currentUser?.fullName || 'con'}! Con làm bài quá xuất sắc (${score}/100 điểm) và phát âm cực chuẩn. Hãy tiếp tục phát huy ở các tiết học tiếp theo nhé!"`
                : `🌟 "Cô Quế rất khen ngợi tinh thần học tập của ${currentUser?.fullName || 'con'}! Con đã hoàn thành tốt bài học (${score}/100 điểm) và tiến bộ mỗi ngày!"`}
            </p>
          </div>

          {/* TIẾN ĐỘ 1 TUẦN 4 TIẾT (4 LẦN HỌC / TUẦN) */}
          <div className="p-4 rounded-2xl bg-indigo-50/80 border-2 border-indigo-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-indigo-950">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>CHƯƠNG TRÌNH 1 TUẦN 4 TIẾT (4 LẦN HỌC):</span>
              </div>
              <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full font-extrabold text-[11px]">
                Đã học xong tiết này • Tích +100 XP
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-semibold">
              Theo chuẩn Bộ GD&ĐT, mỗi tuần học sinh học 4 tiết tiếng Anh tương ứng 4 lần học để đạt Cúp Vô Địch tuần.
            </p>

            {/* 4 Period Cups Grid */}
            <div className="grid grid-cols-4 gap-2 pt-1 text-center">
              <div className="p-2.5 rounded-xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 shadow-xs">
                <div className="text-xl">🏆</div>
                <div className="text-[11px] font-black mt-0.5">Tiết 1</div>
                <span className="text-[9px] font-bold text-emerald-700 block">Đã tích điểm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 shadow-xs">
                <div className="text-xl">🏆</div>
                <div className="text-[11px] font-black mt-0.5">Tiết 2</div>
                <span className="text-[9px] font-bold text-emerald-700 block">Đã tích điểm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-900 shadow-xs animate-pulse">
                <div className="text-xl">🏆</div>
                <div className="text-[11px] font-black mt-0.5">Tiết 3</div>
                <span className="text-[9px] font-bold text-amber-800 block">Vừa xong ✨</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-500">
                <div className="text-xl opacity-40">🏆</div>
                <div className="text-[11px] font-black mt-0.5">Tiết 4</div>
                <span className="text-[9px] font-bold text-slate-400 block">Tiết tới</span>
              </div>
            </div>
          </div>

          {/* 4 Skills Breakdown Cards */}
          <div>
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">
              Bảng Điểm Chi Tiết 4 Kỹ Năng:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {/* Listening */}
              <div className="p-3.5 rounded-2xl bg-sky-50 border-2 border-sky-200">
                <Headphones className="w-5 h-5 mx-auto text-sky-600 mb-1" />
                <div className="text-xs font-black text-slate-700">1. Luyện Nghe</div>
                <div className="text-lg font-black text-sky-700 mt-1">{lScore} / 25</div>
                <span className="text-[10px] font-bold text-sky-600">Nhận diện âm tốt</span>
              </div>

              {/* Speaking */}
              <div className="p-3.5 rounded-2xl bg-purple-50 border-2 border-purple-200">
                <Mic className="w-5 h-5 mx-auto text-purple-600 mb-1" />
                <div className="text-xs font-black text-slate-700">2. Luyện Nói</div>
                <div className="text-lg font-black text-purple-700 mt-1">{sScore} / 25</div>
                <span className="text-[10px] font-bold text-purple-600">Phát âm rõ ràng</span>
              </div>

              {/* Reading */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
                <BookOpen className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
                <div className="text-xs font-black text-slate-700">3. Đọc Hiểu</div>
                <div className="text-lg font-black text-emerald-700 mt-1">{rScore} / 25</div>
                <span className="text-[10px] font-bold text-emerald-600">Hiểu đoạn văn</span>
              </div>

              {/* Writing */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200">
                <PenTool className="w-5 h-5 mx-auto text-amber-600 mb-1" />
                <div className="text-xs font-black text-slate-700">4. Luyện Viết</div>
                <div className="text-lg font-black text-amber-700 mt-1">{wScore} / 25</div>
                <span className="text-[10px] font-bold text-amber-600">Chính tả chuẩn</span>
              </div>
            </div>
          </div>

          {/* AI Pedagogical Feedback */}
          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-950">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Lời Nhận Xét Sư Phạm Của AI:</span>
            </div>
            <p className="text-xs text-indigo-900 leading-relaxed font-medium">
              🌟 Em đã hoàn thành xuất sắc các nội dung trọng tâm của <strong>{unit.title}</strong>! Kỹ năng nghe và đọc hiểu của em phản xạ rất nhanh. Khi luyện nói, em hãy tiếp tục chú ý nối âm và phát âm gió ở các âm đuôi để câu nói tự nhiên hơn nữa nhé. Điểm số bài học đã được tự động lưu lại vào hồ sơ cá nhân của em!
            </p>
          </div>

          {/* ISOLATED ACCOUNT DATA VERIFICATION BADGE */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border-2 border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-emerald-950 flex items-center gap-1.5 flex-wrap">
                  <span>Dữ liệu bài làm đã được lưu độc lập cho:</span>
                  <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-md font-extrabold">
                    {currentUser?.fullName}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-slate-500 mt-0.5">
                  Tên đăng nhập (Mã HS): <strong>{currentUser?.code || currentUser?.id}</strong> • Lớp: <strong>{currentUser?.className || 'Tiểu học'}</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (finalGrading && currentUser?.id) {
                  handleSaveScore(finalGrading.totalScore, {
                    listening: finalGrading.listening,
                    speaking: finalGrading.speaking,
                    reading: finalGrading.reading,
                    writing: finalGrading.writing
                  });
                  sound.playSuccess();
                  setSaveSuccessFeedback(true);
                  setTimeout(() => setSaveSuccessFeedback(false), 3000);
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer transition-all"
              title="Bấm để lưu lại điểm số bài này vào tài khoản của bạn"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{saveSuccessFeedback ? '✓ ĐÃ LƯU AN TOÀN!' : 'LƯU LẠI KẾT QUẢ'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => {
              sound.playPop();
              setLessonFinished(false);
              setActiveSkill('vocab');
            }}
            className="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>LÀM LẠI ĐỂ NÂNG ĐIỂM</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onGoToGames();
            }}
            className="px-5 py-3.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 active:scale-95 text-indigo-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>CHƠI GAME CỦNG CỐ BÀI NÀY</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onBack();
            }}
            className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-black text-xs sm:text-sm rounded-2xl cursor-pointer transition-all"
          >
            Quay lại Danh sách SGK Cả Năm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            sound.playPop();
            onBack();
          }}
          className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <div className="text-center">
          <h2 className="text-base sm:text-lg font-black text-indigo-950 truncate max-w-xs sm:max-w-md">
            {unit.title}
          </h2>
          <p className="text-[11px] font-bold text-slate-500">{unit.vietnameseTitle}</p>
        </div>

        <button
          onClick={handleFinishLesson}
          className="px-3.5 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-xs shadow-xs"
        >
          Hoàn thành bài
        </button>
      </div>

      {/* 6 Skills Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-slate-100 p-2 rounded-2xl">
        {skillsList.map((skill) => (
          <button
            key={skill.id}
            onClick={() => {
              sound.playPop();
              setActiveSkill(skill.id);
            }}
            className={`py-2 px-1 rounded-xl text-xs font-black flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
              activeSkill === skill.id
                ? 'bg-white text-indigo-950 shadow-md border-2 border-amber-400 scale-102'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            {skill.icon}
            <span className="truncate">{skill.name}</span>
          </button>
        ))}
      </div>

      {/* MAIN SKILL CONTENT CONTAINER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-200 shadow-xl min-h-[440px] flex flex-col justify-between relative overflow-hidden">
        {/* SKILL 1: VOCABULARY FLASHCARD WITH AI 3D ILLUSTRATION */}
        {activeSkill === 'vocab' && (
          <div className="space-y-5 flex-1 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-black text-slate-500">
              <span>SỔ TAY TỪ VỰNG AI 3D ({vocabIndex + 1} / {unit.vocabularies.length})</span>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
                  Bấm thẻ để lật nghĩa
                </span>
              </div>
            </div>

            {/* Flashcard with 3D Flip effect & AI 3D Illustration */}
            <div
              onClick={() => {
                sound.playPop();
                setIsFlipped(!isFlipped);
              }}
              className="max-w-md w-full mx-auto min-h-[360px] cursor-pointer perspective-1000 select-none group"
            >
              <div
                className={`relative w-full h-full duration-500 rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-xl transition-transform transform ${
                  isFlipped 
                    ? 'bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-400 text-indigo-950 border-4 border-amber-500' 
                    : 'bg-gradient-to-br from-indigo-50 via-white to-amber-50 text-indigo-950 border-4 border-amber-300'
                }`}
              >
                {!isFlipped ? (
                  // Front: AI 3D Illustration, Word, Phonetics, Audio
                  <div className="space-y-3 w-full flex flex-col items-center">
                    {/* Clean AI 3D Illustration Frame */}
                    <div className="w-full max-w-xs h-44 sm:h-48 bg-white rounded-2xl border-2 border-amber-200 overflow-hidden shadow-xs flex items-center justify-center p-2 relative group">
                      <img
                        src={currentVocabImg.src}
                        alt={currentVocab.word}
                        className="max-h-full max-w-full object-contain rounded-xl drop-shadow-md group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="text-center space-y-0.5">
                      <h3 className="text-3xl sm:text-4xl font-black tracking-wide text-indigo-950">
                        {currentVocab.word}
                      </h3>
                      <p className="text-sm font-bold text-slate-500">{currentVocab.phonetic}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playVocabWord(currentVocab.word);
                      }}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-2xl font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" /> Phát âm mẫu
                    </button>
                  </div>
                ) : (
                  // Back: Vietnamese Meaning & Example Sentence
                  <div className="space-y-4 max-w-sm mx-auto text-center">
                    <div className="inline-block bg-white/70 px-3 py-1 rounded-full text-xs font-black uppercase text-amber-950">
                      Nghĩa Tiếng Việt
                    </div>
                    <h3 className="text-3xl font-black text-indigo-950">{currentVocab.vietnamese}</h3>
                    <div className="bg-white/70 p-3.5 rounded-2xl border border-white/80 text-left space-y-1">
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">Ví dụ câu:</div>
                      <p className="text-sm font-extrabold italic text-indigo-950 leading-relaxed">
                        "{currentVocab.exampleSentence}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Strip of All Vocabularies with 3D Pictures */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-black uppercase text-slate-400">Chọn nhanh từ vựng:</span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {unit.vocabularies.map((v, idx) => {
                  const vThumb = resolveSgkImageSource(
                    v.imageUrl,
                    unit.grade,
                    currentUnitNum,
                    v.word,
                    v.vietnamese,
                    v.emoji,
                    activeSchoolId
                  );
                  return (
                    <button
                      key={v.id || idx}
                      onClick={() => {
                        sound.playPop();
                        setVocabIndex(idx);
                        setIsFlipped(false);
                      }}
                      className={`p-1.5 rounded-xl border-2 shrink-0 transition-all flex flex-col items-center cursor-pointer ${
                        vocabIndex === idx 
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300' 
                          : 'border-slate-200 bg-white hover:border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                      style={{ width: '76px' }}
                    >
                      <div className="w-12 h-10 flex items-center justify-center overflow-hidden">
                        <img src={vThumb.src} alt={v.word} className="max-h-full max-w-full object-contain" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center mt-0.5">
                        {v.word}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation footer for Flashcard */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                disabled={vocabIndex === 0}
                onClick={() => {
                  sound.playPop();
                  setVocabIndex(prev => prev - 1);
                  setIsFlipped(false);
                }}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-black text-xs cursor-pointer"
              >
                &larr; Từ trước
              </button>

              <button
                onClick={() => playVocabWord(currentVocab.word)}
                className="p-3 rounded-full bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black cursor-pointer"
                title="Nghe lại"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              {vocabIndex < unit.vocabularies.length - 1 ? (
                <button
                  onClick={() => {
                    sound.playPop();
                    setVocabIndex(prev => prev + 1);
                    setIsFlipped(false);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-indigo-950 font-black text-xs cursor-pointer"
                >
                  Từ tiếp theo &rarr;
                </button>
              ) : (
                <button
                  onClick={() => {
                    sound.playSuccess();
                    setActiveSkill('sentences');
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-xs cursor-pointer"
                >
                  Sang Luyện Mẫu Câu &rarr;
                </button>
              )}
            </div>
          </div>
        )}

        {/* SKILL 2: SENTENCE PATTERNS & TOKEN BUILDER */}
        {activeSkill === 'sentences' && (
          <div className="space-y-5 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-black text-slate-500">
              <span>MẪU CÂU GIAO TIẾP ({sentenceIndex + 1} / {unit.sentences.length})</span>
              <button
                onClick={() => speakEnglish(currentSentence.pattern)}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-bold"
              >
                <Volume2 className="w-4 h-4" /> Nghe cả câu
              </button>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-indigo-950">{currentSentence.pattern}</h3>
              <p className="text-sm font-bold text-slate-500">{currentSentence.vietnamese}</p>
            </div>

            {/* Token Sentence Puzzle */}
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-amber-300 space-y-3">
              <p className="text-xs font-bold text-slate-500 text-center">Bấm vào các từ xáo trộn để xếp lại thành câu đúng:</p>
              
              {/* Selected words display box */}
              <div className="min-h-[50px] p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap gap-2 items-center justify-center">
                {selectedTokens.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">Chọn các từ bên dưới...</span>
                ) : (
                  selectedTokens.map((token, i) => (
                    <span key={i} className="px-3 py-1.5 bg-amber-400 text-indigo-950 font-black rounded-xl text-sm shadow-xs animate-scaleIn">
                      {token}
                    </span>
                  ))
                )}
              </div>

              {/* Scrambled word pool */}
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {scrambledTokens.map((token, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectToken(token, idx)}
                    className="px-3.5 py-2 bg-indigo-50 hover:bg-amber-100 border border-indigo-200 text-indigo-950 font-black rounded-xl text-sm transition-all hover:scale-105 active:scale-95 shadow-xs"
                  >
                    {token}
                  </button>
                ))}
              </div>

              {sentenceSuccess !== null && (
                <div className={`p-3 rounded-xl text-center text-xs font-black ${sentenceSuccess ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {sentenceSuccess ? '🎉 CHÍNH XÁC! Bạn ghép câu rất chuẩn!' : '❌ Chưa chính xác, hãy bấm nút thử lại nhé!'}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleResetTokens}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Thử lại
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  if (sentenceIndex < unit.sentences.length - 1) {
                    setSentenceIndex(prev => prev + 1);
                  } else {
                    setActiveSkill('listening');
                  }
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 font-black text-xs text-indigo-950 rounded-xl"
              >
                {sentenceIndex < unit.sentences.length - 1 ? 'Mẫu câu tiếp theo &rarr;' : 'Sang Luyện Nghe &rarr;'}
              </button>
            </div>
          </div>
        )}

        {/* SKILL 3: LISTENING EXERCISES */}
        {activeSkill === 'listening' && (
          <div className="space-y-5 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-black text-slate-500">
              <span>LUYỆN NGHE CHỌN ĐÁP ÁN ({listenIndex + 1} / {unit.listeningQuestions.length})</span>
              <span className="text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full font-bold">Kỹ năng Nghe chuẩn</span>
            </div>

            {/* Visual Illustration & Audio Player Header */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
              {/* Clean AI 3D Illustration Box */}
              <div className="w-48 h-36 bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xs flex items-center justify-center p-2 relative group shrink-0">
                <img 
                  src={currentListeningImg.src} 
                  alt="Tranh minh họa 3D" 
                  className="max-h-full max-w-full object-contain rounded-xl drop-shadow-xs group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="text-center sm:text-left space-y-2">
                <button
                  onClick={() => {
                    sound.playPop();
                    speakEnglish(currentListening.audioScript);
                  }}
                  className="w-16 h-16 rounded-full bg-sky-500 hover:bg-sky-400 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 transition-transform group cursor-pointer mx-auto sm:mx-0"
                >
                  <Volume2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </button>
                <p className="text-xs font-bold text-slate-500">Bấm loa để nghe đoạn hội thoại!</p>
                <h3 className="text-base sm:text-lg font-black text-indigo-950 max-w-md">{currentListening.question}</h3>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto w-full">
              {currentListening.options.map((opt, idx) => {
                const isSelected = selectedListenOption === idx;
                const isCorrect = idx === currentListening.correctIndex;
                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-sky-50 hover:border-sky-300';
                if (selectedListenOption !== null) {
                  if (isSelected && isCorrect) btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-black';
                  else if (isSelected && !isCorrect) btnStyle = 'bg-rose-500 text-white border-rose-600 font-black';
                  else if (isCorrect) btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-black';
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedListenOption !== null}
                    onClick={() => handleAnswerListening(idx)}
                    className={`p-3.5 rounded-2xl border-2 text-sm font-bold transition-all text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedListenOption !== null && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />}
                    {selectedListenOption !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 shrink-0 text-white" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                disabled={selectedListenOption === null}
                onClick={() => {
                  sound.playPop();
                  setSelectedListenOption(null);
                  setListenResult(null);
                  if (listenIndex < unit.listeningQuestions.length - 1) {
                    setListenIndex(prev => prev + 1);
                  } else {
                    setActiveSkill('speaking');
                  }
                }}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white font-black text-xs rounded-xl"
              >
                {listenIndex < unit.listeningQuestions.length - 1 ? 'Câu nghe tiếp theo &rarr;' : 'Sang Luyện Nói &rarr;'}
              </button>
            </div>
          </div>
        )}

        {/* SKILL 4: SPEAKING WITH REAL MICROPHONE (SPEECH-TO-TEXT & AI NATIVE PRONUNCIATION COACH) */}
        {activeSkill === 'speaking' && (
          <div className="space-y-6 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-black text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                LUYỆN NÓI CÙNG AI ({speechIndex + 1} / {unit.speechPrompts.length})
              </span>
              <span className="text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                AI Speech-to-Text • Chấm Chuẩn Bản Ngữ
              </span>
            </div>

            {/* CÂU MẪU CẦN ĐỌC */}
            <div className="text-center space-y-3 bg-gradient-to-b from-rose-50/50 via-white to-pink-50/30 p-4 sm:p-6 rounded-3xl border border-rose-100 shadow-sm">
              <span className="text-[11px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-0.5 rounded-full border border-rose-200">
                CÂU MẪU CHUẨN BẢN NGỮ CẦN ĐỌC
              </span>

              <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
                  "{currentSpeech.phrase}"
                </h3>

                {/* Các nút nghe giọng bản ngữ tốc độ thường và chậm */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      sound.playPop();
                      speakEnglish(currentSpeech.phrase, 0.88);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform cursor-pointer"
                    title="Nghe phát âm chuẩn người bản xứ"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Giọng bản ngữ (1.0x)</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playPop();
                      speakEnglish(currentSpeech.phrase, 0.65);
                    }}
                    className="px-3 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 active:scale-95 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center gap-1.5 transition-transform cursor-pointer"
                    title="Nghe chậm từng âm tiết để bắt chước"
                  >
                    <span>🐢 Nghe chậm (0.65x)</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-600">{currentSpeech.vietnamese}</p>

              {currentSpeech.phoneticTip && (
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-2xl border border-amber-200 shadow-xs">
                  <span>💡 Hướng dẫn phát âm:</span>
                  <span className="text-amber-900 font-bold">{currentSpeech.phoneticTip}</span>
                </div>
              )}
            </div>

            {/* KHU VỰC THU ÂM VÀ NHẬN DIỆN GIỌNG NÓI SPEECH-TO-TEXT */}
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                {isListeningMic && (
                  <div className="absolute -inset-4 rounded-full bg-rose-400/30 animate-ping pointer-events-none" />
                )}
                <button
                  type="button"
                  onClick={handleToggleMic}
                  disabled={isEvaluatingSpeech}
                  className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer relative z-10 ${
                    isListeningMic
                      ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-200 scale-110'
                      : isEvaluatingSpeech
                      ? 'bg-slate-400 text-white opacity-80 cursor-wait'
                      : 'bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-600 text-white hover:scale-105 active:scale-95 shadow-rose-500/40'
                  }`}
                  aria-label="Micro luyện nói"
                >
                  {isEvaluatingSpeech ? (
                    <Loader2 className="w-10 h-10 animate-spin" />
                  ) : isListeningMic ? (
                    <Radio className="w-10 h-10 animate-pulse text-white" />
                  ) : (
                    <Mic className="w-10 h-10" />
                  )}
                </button>
              </div>

              <div className="text-xs font-bold">
                {isListeningMic ? (
                  <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-1.5 rounded-full animate-pulse border border-rose-200">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    <span>Micro đang mở... Bé hãy đọc to rõ ràng câu tiếng Anh nhé! 🎙️</span>
                  </div>
                ) : isEvaluatingSpeech ? (
                  <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-1.5 rounded-full border border-amber-200">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                    <span>AI Thầy Cô Bản Ngữ đang chấm điểm phát âm...</span>
                  </div>
                ) : (
                  <span className="text-slate-500 font-medium">Bấm vào Micro màu hồng để bắt đầu đọc</span>
                )}
              </div>

              {/* Lỗi cấp quyền Micro nếu có */}
              {micErrorMessage && (
                <div className="max-w-md mx-auto p-3 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-900 font-medium flex items-start gap-2 text-left">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{micErrorMessage}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSpokenText(currentSpeech.phrase);
                        handleProcessSpeechEvaluation(currentSpeech.phrase);
                      }}
                      className="mt-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] cursor-pointer"
                    >
                      Bấm để kiểm tra thử giọng phát âm chuẩn với AI
                    </button>
                  </div>
                </div>
              )}

              {/* Real-time Streaming Transcript (Speech-to-Text) */}
              {(interimTranscript || spokenText) && (
                <div className="max-w-lg mx-auto p-4 bg-slate-900 text-white rounded-2xl shadow-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                      Nhận diện giọng nói (Speech-to-Text):
                    </span>
                    {studentAudioUrl && (
                      <button
                        type="button"
                        onClick={handlePlayStudentAudio}
                        className="text-xs bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 px-2.5 py-0.5 rounded-lg border border-rose-500/30 flex items-center gap-1 cursor-pointer"
                      >
                        {isPlayingStudentAudio ? <Square className="w-3 h-3 fill-rose-300" /> : <Play className="w-3 h-3 fill-rose-300" />}
                        <span>{isPlayingStudentAudio ? 'Dừng' : 'Nghe lại giọng bé'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-base sm:text-lg font-black text-rose-200 tracking-wide">
                    "{spokenText || interimTranscript}"
                  </p>
                </div>
              )}

              {/* BẢNG BÁO CÁO KẾT QUẢ CHẤM ĐIỂM CHUẨN BẢN NGỮ TỪ AI */}
              {aiSpeechResult && (
                <div className={`max-w-lg mx-auto p-5 rounded-3xl border-2 text-left space-y-4 shadow-xl transition-all animate-fadeIn ${
                  aiSpeechResult.passed 
                    ? 'bg-gradient-to-b from-emerald-50 via-white to-emerald-50/40 border-emerald-300' 
                    : 'bg-gradient-to-b from-rose-50 via-white to-amber-50/40 border-rose-300'
                }`}>
                  {/* Top Badge & Điểm số */}
                  <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                    <div>
                      <span className={`text-xs font-black px-2.5 py-0.5 rounded-full inline-block ${
                        aiSpeechResult.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {aiSpeechResult.nativeStandardBadge}
                      </span>
                      <h4 className="text-lg font-black text-slate-900 mt-1">
                        {aiSpeechResult.passed ? '🎉 Chúc Mừng Bé Đạt Chuẩn!' : '💪 Bé Hãy Cố Gắng Luyện Lại Nha'}
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-black text-indigo-950">
                        {aiSpeechResult.overallScore}<span className="text-sm font-bold text-slate-500">/100</span>
                      </div>
                      <div className="flex text-amber-400 justify-end">
                        <Star className={`w-3.5 h-3.5 ${aiSpeechResult.overallScore >= 50 ? 'fill-amber-400' : 'text-slate-300'}`} />
                        <Star className={`w-3.5 h-3.5 ${aiSpeechResult.overallScore >= 75 ? 'fill-amber-400' : 'text-slate-300'}`} />
                        <Star className={`w-3.5 h-3.5 ${aiSpeechResult.overallScore >= 90 ? 'fill-amber-400' : 'text-slate-300'}`} />
                      </div>
                    </div>
                  </div>

                  {/* Chi tiết từng từ theo chuẩn bản ngữ (Word-by-word Breakdown) */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                      PHÂN TÍCH TỪNG TỪ THEO CHUẨN BẢN NGỮ:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {aiSpeechResult.wordsBreakdown?.map((item, idx) => {
                        const isGood = item.status === 'excellent';
                        const isWarn = item.status === 'needs_practice';
                        return (
                          <div
                            key={idx}
                            className={`p-2 rounded-xl border text-xs font-bold flex flex-col gap-0.5 ${
                              isGood
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                                : isWarn
                                ? 'bg-amber-50 border-amber-300 text-amber-950'
                                : 'bg-rose-50 border-rose-300 text-rose-950'
                            }`}
                          >
                            <div className="flex items-center gap-1">
                              {isGood ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              ) : isWarn ? (
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              )}
                              <span className="text-sm font-black">{item.word}</span>
                              {item.ipa && <span className="text-[10px] text-slate-500 font-mono">{item.ipa}</span>}
                            </div>
                            <span className="text-[10px] text-slate-600 font-medium">
                              {item.feedback}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lời khuyên khẩu hình miệng từ AI */}
                  {aiSpeechResult.mouthShapeTip && (
                    <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-blue-950 space-y-1">
                      <div className="font-black text-blue-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Mẹo uốn lưỡi & Khẩu hình chuẩn bản ngữ từ AI:</span>
                      </div>
                      <p className="font-medium leading-relaxed">{aiSpeechResult.mouthShapeTip}</p>
                    </div>
                  )}

                  {/* Nhận xét sư phạm và lời động viên */}
                  <div className="space-y-1 text-xs">
                    <p className={`font-bold ${aiSpeechResult.passed ? 'text-emerald-800' : 'text-rose-800'}`}>
                      {aiSpeechResult.feedback}
                    </p>
                    {aiSpeechResult.encouragement && (
                      <p className="text-slate-600 italic">
                        "{aiSpeechResult.encouragement}"
                      </p>
                    )}
                  </div>

                  {/* Nút luyện nói lại nếu chưa đạt hoặc muốn hoàn thiện hơn */}
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleToggleMic}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-xl font-black text-xs inline-flex items-center gap-1.5 shadow-md shadow-rose-600/20 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{aiSpeechResult.passed ? 'Thử nói lại để đạt 100%' : 'Bấm để đọc lại câu này'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => speakEnglish(currentSpeech.phrase, 0.88)}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe lại mẫu</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Chuyển sang câu luyện nói tiếp theo hoặc sang Luyện Đọc */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setSpokenText('');
                  setInterimTranscript('');
                  setSpeechScore(null);
                  setSpeechFeedback('');
                  setAiSpeechResult(null);
                  setMicErrorMessage(null);
                  if (studentAudioUrl) {
                    URL.revokeObjectURL(studentAudioUrl);
                    setStudentAudioUrl(null);
                  }
                  if (speechIndex < unit.speechPrompts.length - 1) {
                    setSpeechIndex(prev => prev + 1);
                  } else {
                    setActiveSkill('reading');
                  }
                }}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-md shadow-rose-600/20 cursor-pointer transition-all flex items-center gap-1.5"
              >
                <span>{speechIndex < unit.speechPrompts.length - 1 ? 'Câu luyện nói tiếp theo' : 'Sang Luyện Đọc'}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* SKILL 5: READING COMPREHENSION */}
        {activeSkill === 'reading' && (
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-black text-slate-500">
              <span>ĐỌC HIỂU ĐOẠN VĂN SGK</span>
              <button
                onClick={() => speakEnglish(unit.readingPassage.text)}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-bold"
              >
                <Volume2 className="w-4 h-4" /> Đọc mẫu cả bài
              </button>
            </div>

            {/* Reading Passage Card */}
            <div className="bg-indigo-50/70 p-4 rounded-2xl border-2 border-indigo-200">
              <h4 className="font-black text-sm text-indigo-950 mb-1.5">{unit.readingPassage.title}</h4>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {unit.readingPassage.text}
              </p>
            </div>

            {/* Reading Question */}
            {currentReadingQ && (
              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-black text-indigo-950">
                  Câu hỏi: {currentReadingQ.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentReadingQ.options.map((opt, i) => {
                    const isSelected = selectedReadingOption === i;
                    const isCorrect = i === currentReadingQ.correctIndex;
                    let style = 'bg-white border-slate-200 text-slate-800 hover:bg-indigo-50';
                    if (selectedReadingOption !== null) {
                      if (isSelected && isCorrect) style = 'bg-emerald-500 text-white border-emerald-600 font-black';
                      else if (isSelected && !isCorrect) style = 'bg-rose-500 text-white border-rose-600 font-black';
                      else if (isCorrect) style = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-black';
                    }

                    return (
                      <button
                        key={i}
                        disabled={selectedReadingOption !== null}
                        onClick={() => handleAnswerReading(i)}
                        className={`p-3 rounded-xl border-2 text-xs font-bold text-left transition-all ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                disabled={selectedReadingOption === null}
                onClick={() => {
                  sound.playPop();
                  setSelectedReadingOption(null);
                  setReadingResult(null);
                  if (readingQuestionIndex < unit.readingPassage.questions.length - 1) {
                    setReadingQuestionIndex(prev => prev + 1);
                  } else {
                    setActiveSkill('writing');
                  }
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-black text-xs rounded-xl"
              >
                {readingQuestionIndex < unit.readingPassage.questions.length - 1 ? 'Câu tiếp theo &rarr;' : 'Sang Luyện Viết &rarr;'}
              </button>
            </div>
          </div>
        )}

        {/* SKILL 6: WRITING CHALLENGES */}
        {activeSkill === 'writing' && (
          <div className="space-y-5 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-black text-slate-500">
              <span>LUYỆN VIẾT & CHÍNH TẢ ({writingIndex + 1} / {unit.writingChallenges.length})</span>
              <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-bold">Chính tả tiếng Anh</span>
            </div>

            <div className="text-center space-y-3 py-4">
              <h3 className="text-xl sm:text-2xl font-black text-indigo-950">{currentWriting.prompt}</h3>
              {currentWriting.maskedWord && (
                <div className="text-3xl sm:text-4xl font-black text-purple-700 tracking-widest bg-purple-50 py-3 rounded-2xl border-2 border-purple-200 max-w-xs mx-auto">
                  {currentWriting.maskedWord}
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleCheckWriting} className="max-w-xs mx-auto space-y-3">
                <input
                  type="text"
                  value={writingInput}
                  onChange={(e) => setWritingInput(e.target.value)}
                  placeholder="Nhập chữ cái còn thiếu (Ví dụ: a, o, ball...)"
                  className="w-full text-center py-3 bg-amber-50 border-3 border-amber-300 rounded-2xl text-xl font-black text-indigo-950 tracking-wider focus:outline-hidden focus:border-purple-500"
                />
                <p className="text-[11px] text-slate-500 font-bold">
                  💡 Bé chỉ việc điền chữ cái còn thiếu (chấp nhận cả chữ hoa và chữ thường: a/A, b/B)
                </p>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-md"
                >
                  KIỂM TRA ĐÁP ÁN
                </button>
              </form>

              {writingResult !== null && (
                <div className={`p-3 rounded-xl max-w-xs mx-auto text-xs font-black ${writingResult ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {writingResult ? '🎉 RẤT TỐT! Bạn đã viết hoàn toàn chính xác!' : `❌ Chưa đúng rồi! Đáp án đúng là: ${currentWriting.answer}`}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  sound.playPop();
                  setWritingInput('');
                  setWritingResult(null);
                }}
                className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl"
              >
                Nhập lại
              </button>

              <button
                onClick={() => {
                  if (writingIndex < unit.writingChallenges.length - 1) {
                    sound.playPop();
                    setWritingIndex(prev => prev + 1);
                    setWritingInput('');
                    setWritingResult(null);
                  } else {
                    handleFinishLesson();
                  }
                }}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl"
              >
                {writingIndex < unit.writingChallenges.length - 1 ? 'Bài viết tiếp theo &rarr;' : 'HOÀN THÀNH UNIT &rarr;'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
