import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  text: string;
}

export default function AIChatAssistant() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', text: t('ai.greeting') }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = async () => {
    if (!input.trim() || typing) return;
    const text = input.trim();
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setError(false);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages.slice(-6), userMsg].map(m => ({
            role: m.role,
            content: m.text,
          })),
          lang,
        }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: data.text };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setError(true);
      const fallback: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: lang === 'pt'
          ? 'Desculpe, não consegui me conectar ao servidor. Tente novamente em alguns instantes.'
          : lang === 'es'
          ? 'Lo siento, no pude conectarme al servidor. Intente de nuevo en unos momentos.'
          : 'Sorry, I couldn\'t connect to the server. Please try again in a moment.',
      };
      setMessages(prev => [...prev, fallback]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 w-[340px] md:w-[380px] h-[480px] md:h-[520px] bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl flex flex-col animate-slide-up overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-600 bg-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="bg-emerald-500 rounded-lg p-1.5">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-100">{t('ai.title')}</p>
                <p className="text-[9px] text-emerald-400 font-medium">{t('ai.online')}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-200 transition cursor-pointer p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-900">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                )}
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-[11px] md:text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-500 text-black rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-600/50'
                }`}>
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="bg-slate-800 border border-slate-600/50 rounded-xl rounded-tl-none px-3 py-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <p className="text-[10px] text-red-400 text-center">
                {lang === 'pt' ? 'Erro de conexão. Usando respostas offline.' : lang === 'es' ? 'Error de conexión. Usando respuestas offline.' : 'Connection error. Using offline responses.'}
              </p>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-slate-600 bg-slate-800">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t('ai.placeholder')}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500 transition"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || typing}
                className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black rounded-xl px-3 py-2 transition cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[8px] text-slate-500 text-center mt-1.5">{t('ai.disclaimer')}</p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full p-3 md:p-3.5 shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95 animate-pulse-glow"
      >
        {open ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Sparkles className="w-5 h-5 md:w-6 md:h-6" />}
      </button>
    </>
  );
}
