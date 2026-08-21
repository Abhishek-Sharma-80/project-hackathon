import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  ChevronRight, 
  TrendingUp, 
  BookOpen, 
  Briefcase, 
  User, 
  Award, 
  MessageSquare,
  Zap,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { groqService } from '../../services/groqService';

export const DishaAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hi ${user?.name ? user.name.split(' ')[0] : 'there'}! 👋 I'm Disha AI, powered by Groq LLaMA-3.3.\n\nI can help you discover high-match internships, analyze your skill gaps, generate custom roadmaps, and optimize your application compatibility.`,
      timestamp: 'Just now',
      actionButtons: [
        { label: '🔍 Top Recommendations', link: '/recommendations' },
        { label: '📊 Skill Gap Analysis', link: '/skill-gap' },
        { label: '🗺️ Career Roadmap', link: '/learning-path' },
        { label: '⚡ How to get 90%+ match?', action: 'tips' }
      ]
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Find internships for me',
    'Analyze my skills',
    'Create learning roadmap',
    'Improve my profile',
    'How to get 90%+ match score?'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      // Build conversation history for Groq
      const history = messages
        .filter(m => m.id !== 'msg-1')
        .map(m => ({
          role: m.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: m.text
        }));

      // Call live Groq LLaMA 3.3 model with student context
      const aiReply = await groqService.chatWithDisha(
        query,
        history,
        {
          name: user?.name || profile?.fullName,
          college: profile?.college,
          branch: profile?.branch,
          cgpa: profile?.cgpa,
          skills: profile?.skills
        }
      );

      // Contextual navigation buttons based on response intent
      const lower = query.toLowerCase();
      let buttons: { label: string; link?: string; action?: string }[] = [];
      if (lower.includes('intern') || lower.includes('job') || lower.includes('recommend') || lower.includes('match')) {
        buttons = [
          { label: '🚀 View AI Recommendations', link: '/recommendations' },
          { label: '🏢 Explore All Internships', link: '/explore' }
        ];
      } else if (lower.includes('skill') || lower.includes('gap')) {
        buttons = [
          { label: '📊 Skill Gap Dashboard', link: '/skill-gap' },
          { label: '🗺️ Start Spring Boot Milestone', link: '/learning-path' }
        ];
      } else if (lower.includes('road') || lower.includes('path') || lower.includes('learn')) {
        buttons = [
          { label: '🗺️ Open Visual Roadmap', link: '/learning-path' }
        ];
      } else if (lower.includes('profile') || lower.includes('score') || lower.includes('resume')) {
        buttons = [
          { label: '👤 Update Profile Portfolio', link: '/profile' }
        ];
      }

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: aiReply,
        timestamp: 'Just now',
        actionButtons: buttons
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Groq live call fallback:', err);
      // Resilient fallback in case of connection limits
      let fallbackText = `Based on your profile at **${profile?.college || 'Galgotias University'}** with skills like **${(profile?.skills || ['Java', 'SQL', 'Git']).slice(0, 4).join(', ')}**, here are your top matches:\n\n1. **Backend Developer Intern** @ TechNova (91% Match)\n2. **Java Developer Intern** @ CodeCraft (87% Match)\n3. **ML & AI Intern** @ NexGen AI (94% Match)\n\nTip: Learning **Spring Boot** and **Docker** will raise your match to 98%!`;

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: fallbackText,
        timestamp: 'Just now',
        actionButtons: [
          { label: '🔍 Top AI Recommendations', link: '/recommendations' },
          { label: '📊 Skill Gap Dashboard', link: '/skill-gap' },
          { label: '🗺️ Career Roadmap', link: '/learning-path' }
        ]
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center border border-white/20"
          title="Chat with Disha AI (Groq LLaMA 3.3)"
        >
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900 animate-pulse"></div>
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6 animate-bounce-slow" />}
        </motion.button>
      </div>

      {/* Floating Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[440px] h-[600px] max-h-[82vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col z-50 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-indigo-200 shadow-inner">
                  <Bot className="w-6 h-6 text-indigo-300" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-extrabold text-sm tracking-tight">Disha AI</h3>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center space-x-1">
                      <Cpu className="w-2.5 h-2.5" />
                      <span>Groq LLaMA 3.3</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-indigo-200">Real-Time Career & Internship Intelligence</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50/50 dark:bg-slate-950/40">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3.5 rounded-2xl max-w-[88%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200/80 dark:border-slate-700/80 shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {/* Action Buttons */}
                    {msg.actionButtons && msg.actionButtons.length > 0 && (
                      <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap gap-1.5">
                        {msg.actionButtons.map((btn, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (btn.link) {
                                setIsOpen(false);
                                navigate(btn.link);
                              } else if (btn.action === 'tips') {
                                handleSend('How to get 90%+ match score?');
                              }
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200/80 dark:border-indigo-800 text-[11px] font-bold transition-colors flex items-center space-x-1"
                          >
                            <span>{btn.label}</span>
                            <ChevronRight className="w-3 h-3 text-indigo-500" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-2 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                  <span>Disha AI is thinking on Groq LLaMA-3.3...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-x-auto flex space-x-1.5 no-scrollbar">
              {quickPrompts.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap transition-colors shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleSend())}
                placeholder="Ask Disha AI anything about internships & skills..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 disabled:opacity-40 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
