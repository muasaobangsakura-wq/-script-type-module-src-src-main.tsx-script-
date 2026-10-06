import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, Volume2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { speakVietnamese, sound } from '../../utils/audio';

interface MascotChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MascotChatModal: React.FC<MascotChatModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, sendMascotMessage } = useApp();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'sparky'; text: string }>>([
    {
      sender: 'sparky',
      text: `Hello ${currentUser?.fullName || 'bạn nhỏ'}! 🦖 Mình là Sparky the Dino. Hôm nay bạn muốn hỏi Sparky từ vựng nào hay muốn nghe mình kể chuyện vui? 🌟`
    }
  ]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    sound.playPop();

    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const reply = await sendMascotMessage(userText);
      setMessages(prev => [...prev, { sender: 'sparky', text: reply }]);
      sound.playSuccess();
      speakVietnamese(reply);
    } catch {
      setMessages(prev => [...prev, { sender: 'sparky', text: 'Sparky luôn bên cạnh bạn, cùng cố gắng học thật giỏi nhé! 🦖🎉' }]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    'Sparky ơi, con chó tiếng Anh là gì?',
    'Làm sao để nhớ từ vựng lâu hơn?',
    'Khen tớ một câu đi Sparky!',
    'Hôm nay tớ học được bài gì mới?'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border-4 border-emerald-400 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-xs">
              🦖
            </div>
            <div>
              <h3 className="font-extrabold text-lg flex items-center gap-1.5">
                Sparky the Dino
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              </h3>
              <p className="text-xs text-emerald-100 font-medium">Bạn đồng hành AI thông minh & đáng yêu</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${m.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                {m.sender === 'user' ? (currentUser?.avatar || '👦🏻') : '🦖'}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                    : 'bg-white border border-emerald-200 text-slate-800 rounded-tl-none font-medium'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                {m.sender === 'sparky' && (
                  <button
                    onClick={() => speakVietnamese(m.text)}
                    className="mt-2 text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe Sparky đọc
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-slate-500 text-xs italic p-2">
              <Bot className="w-4 h-4 text-emerald-500 animate-spin" />
              <span>Sparky đang suy nghĩ câu trả lời cho bạn nè... 🦖💭</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-slate-100 flex gap-2 overflow-x-auto text-xs">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(q);
                sound.playPop();
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 shrink-0 font-medium transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi Sparky điều gì đó..."
            className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:outline-hidden focus:border-emerald-500 text-sm font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 disabled:opacity-50 text-white rounded-2xl font-bold flex items-center gap-1.5 transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
