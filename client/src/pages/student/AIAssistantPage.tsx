import React, { useEffect, useState, useRef } from 'react';
import { assistantApi } from '../../services/api';
import { Logo } from '../../components/common/Logo';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Send, Bot, User, CornerDownLeft, BookOpen, Target, Zap } from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Array<{ sender: 'USER' | 'AI'; message: string; timestamp?: string }>>([
    {
      sender: 'AI',
      message: `Hello ${user?.name?.split(' ')[0] || 'Aryan'}! 👋 I am your **SmartEdu AI Career Coach**.\n\nI have analyzed your profile, skills, projects, and target role (*Backend Developer*). You currently have an **82% Profile Score** and a top **91% Match with TechNova**.\n\nAsk me anything about what to learn next, why internships were recommended, how to bridge your skill gaps, or interview preparation tips!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'What should I learn next for a backend internship?',
    'Why was the TechNova Backend Internship recommended?',
    'Am I ready for a backend developer interview?',
    'How can I improve my SmartEdu Profile Score to 90%+?',
    'What is my biggest skill gap right now?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (msgText: string) => {
    const text = msgText.trim();
    if (!text || loading) return;

    // Append user message
    setMessages((prev) => [...prev, { sender: 'USER', message: text }]);
    setInput('');
    setLoading(true);

    try {
      const res = await assistantApi.chat(text);
      setMessages((prev) => [...prev, { sender: 'AI', message: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'AI', message: 'I encountered an issue processing your query. Please try again shortly.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn max-w-4xl mx-auto">
      {/* Top Assistant Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>SmartEdu AI Career Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-[11px] text-slate-500">Grounded in your real profile, skills & application data</p>
          </div>
        </div>

        <div className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Deterministic Context Engine Active
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((m, idx) => {
          const isAI = m.sender === 'AI';
          return (
            <div key={idx} className={`flex items-start gap-3 ${isAI ? '' : 'flex-row-reverse'}`}>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 shadow-xs ${
                  isAI
                    ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white'
                    : 'bg-slate-900 text-white'
                }`}
              >
                {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  isAI
                    ? 'bg-slate-50 border border-slate-200/90 text-slate-800 shadow-xs'
                    : 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                }`}
              >
                {m.message}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 p-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>SmartEdu AI is analyzing your profile context...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto flex gap-2">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-[11px] font-semibold text-slate-700 whitespace-nowrap transition"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask SmartEdu AI about your roadmap, match scores, or career advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-95 text-white disabled:opacity-40 transition shadow-md shadow-indigo-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
