import { Unit } from '../../../types';
import { getSpeakingChallengeTasks } from '../gameContentAdapter';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Mic, Sparkles, MessageCircle, Send, Volume2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { sound, speakVietnamese, speakEnglish, getSpeechRecognition } from '../../../utils/audio';
import { Mascot } from '../../common/Mascot';

interface SpeakingChallengeGameProps {
  onBack: () => void;
  unit?: Unit;
}

const DIALOGUE_ROUNDS = [
  { sparkySays: "Hello friend! What's your name?", promptVi: "Bé hãy trả lời: 'My name is ...'", expectedKeywords: ['my', 'name', 'is', 'i', 'am'] },
  { sparkySays: "How are you today?", promptVi: "Bé hãy trả lời: 'I am fine, thank you!' hoặc 'I am happy!'", expectedKeywords: ['fine', 'good', 'happy', 'great', 'well'] },
  { sparkySays: "Do you like apples or bananas?", promptVi: "Bé hãy trả lời: 'I like apples' hoặc 'I like bananas'", expectedKeywords: ['apple', 'apples', 'banana', 'bananas', 'like'] },
];

export const SpeakingChallengeGame: React.FC<SpeakingChallengeGameProps> = ({ onBack, unit }) => {
  const currentDialogues = unit ? getSpeakingChallengeTasks(unit) : DIALOGUE_ROUNDS;
  const { gainXP, currentUser } = useApp();
  const [roundIdx, setRoundIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = currentDialogues[roundIdx] || DIALOGUE_ROUNDS[0];

  const handleSpeakQuestion = () => {
    sound.playPop();
    speakEnglish(current.sparkySays);
  };

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const rec = getSpeechRecognition();
    if (!rec) {
      // Fallback
      sound.playPop();
      const mockReply = roundIdx === 0 ? `My name is ${currentUser?.fullName || 'Nam'}` : roundIdx === 1 ? 'I am very happy' : 'I like sweet apples';
      setUserInput(mockReply);
      evaluateAnswer(mockReply);
      return;
    }

    sound.playPop();
    setIsRecording(true);
    setUserInput('');
    setFeedback(null);

    rec.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setUserInput(text);
      setIsRecording(false);
      evaluateAnswer(text);
    };

    rec.onerror = () => setIsRecording(false);
    rec.onend = () => setIsRecording(false);
    rec.start();
  };

  const evaluateAnswer = (text: string) => {
    const lower = text.toLowerCase();
    const hasKeyword = current.expectedKeywords.some(k => lower.includes(k));

    if (hasKeyword) {
      sound.playSuccess();
      setFeedback('🌟 Great job! Sparky hiểu câu trả lời của bạn rồi nè! (+20 XP)');
      setScore(s => s + 20);
    } else {
      sound.playSuccess();
      setFeedback('👍 Sparky nghe được bạn nói rồi nè, bạn thật tự tin! Cùng tiếp tục nha!');
      setScore(s => s + 15);
    }
  };

  const handleNext = () => {
    sound.playPop();
    setUserInput('');
    setFeedback(null);
    if (roundIdx < currentDialogues.length - 1) {
      setRoundIdx(r => r + 1);
    } else {
      sound.playFanfare();
      confetti({ particleCount: 100, spread: 80 });
      setFinished(true);
      gainXP(45, 5);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-black text-indigo-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
          Vòng {roundIdx + 1} / {currentDialogues.length} • {score} Điểm
        </span>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-indigo-950">🦖 ĐỐI ĐÁP CÙNG BẠN SPARKY AI</h2>
        <p className="text-xs font-bold text-slate-500">Sparky sẽ hỏi bạn bằng tiếng Anh, hãy bấm micro trả lời lại thật tự tin nhé!</p>
      </div>

      {!finished ? (
        <div className="space-y-6 max-w-md mx-auto text-center">
          <div className="flex justify-center">
            <Mascot
              mood="speaking"
              size="md"
              message={current.sparkySays}
              skin={currentUser?.mascotCustomization?.skin || 'emerald'}
              hat={currentUser?.mascotCustomization?.hat || 'star_cap'}
            />
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-2">
            <h3 className="text-xl font-black text-indigo-950 flex items-center justify-center gap-2">
              <span>"{current.sparkySays}"</span>
              <button onClick={handleSpeakQuestion} className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-full">
                <Volume2 className="w-5 h-5" />
              </button>
            </h3>
            <p className="text-xs font-bold text-slate-500">💡 Gợi ý: {current.promptVi}</p>
          </div>

          {/* Record button */}
          <div className="space-y-3">
            <button
              onClick={handleRecord}
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-200'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30'
              }`}
            >
              <Mic className="w-9 h-9" />
            </button>
            <p className="text-xs font-bold text-slate-500">
              {isRecording ? 'Đang lắng nghe... Bạn trả lời to rõ nhé!' : 'Bấm nút xanh để trả lời Sparky'}
            </p>
          </div>

          {userInput && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <span className="text-slate-400">Bạn đã nói: </span>
              <span className="font-bold text-indigo-950">"{userInput}"</span>
            </div>
          )}

          {feedback && (
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-3 animate-scaleIn">
              <p className="text-xs font-bold text-emerald-800">{feedback}</p>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-black text-xs rounded-xl shadow-md"
              >
                {roundIdx < DIALOGUE_ROUNDS.length - 1 ? 'Câu Tiếp Theo &rarr;' : 'Xem Kết Quả &rarr;'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 animate-fadeIn">
          <h3 className="text-2xl font-black text-emerald-800">🎉 SPARKY RẤT THÍCH NÓI CHUYỆN VỚI BẠN!</h3>
          <p className="text-xs font-bold text-slate-600">Bạn giao tiếp tiếng Anh tự tin lắm! Nhận ngay +45 XP.</p>
          <button
            onClick={() => {
              setRoundIdx(0);
              setScore(0);
              setUserInput('');
              setFeedback(null);
              setFinished(false);
            }}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md"
          >
            Nói Chuyện Lại Vòng Mới
          </button>
        </div>
      )}
    </div>
  );
};
