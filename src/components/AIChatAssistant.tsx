import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Sparkles, X, Send, Bot, User, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  text: string;
}

const FAQ: Record<string, { pt: string; en: string; es: string }> = {
  'como publicar': {
    pt: 'Para publicar uma diária, clique em "Anunciar Diária" no cabeçalho e preencha os detalhes do serviço (tipo de limpeza, data, endereço).',
    en: 'To post a job, click "Post Job" in the header and fill in the service details (cleaning type, date, address).',
    es: 'Para publicar un trabajo, haga clic en "Publicar Trabajo" en el encabezado y complete los detalles del servicio.'
  },
  'como encontrar': {
    pt: 'No perfil de empresa, use a busca e filtros para encontrar diaristas por tipo de limpeza, avaliação ou preço.',
    en: 'In the company dashboard, use search and filters to find cleaners by cleaning type, rating, or price.',
    es: 'En el panel de empresa, use la búsqueda y filtros para encontrar limpiadores por tipo, calificación o precio.'
  },
  'como candidatar': {
    pt: 'No perfil de diarista, navegue pelos serviços disponíveis e clique em "Candidatar-se" para enviar sua proposta.',
    en: 'In the cleaner profile, browse available jobs and click "Apply" to send your proposal.',
    es: 'En el perfil de limpiador, explore los trabajos disponibles y haga clic en "Aplicar" para enviar su propuesta.'
  },
  'preço': {
    pt: 'Os preços variam conforme o tipo de limpeza e extras selecionados. Use a calculadora no painel para estimar o valor.',
    en: 'Prices vary by cleaning type and selected extras. Use the calculator in the dashboard to estimate the cost.',
    es: 'Los precios varían según el tipo de limpieza y los extras seleccionados. Use la calculadora en el panel para estimar el costo.'
  },
  'avaliação': {
    pt: 'Clientes podem avaliar diaristas após a conclusão do serviço. As avaliações aparecem no perfil do profissional.',
    en: 'Clients can rate cleaners after service completion. Reviews appear on the professional profile.',
    es: 'Los clientes pueden calificar a los limpiadores después de completar el servicio. Las reseñas aparecen en el perfil.'
  },
  'chat': {
    pt: 'Use o chat em tempo real para negociar detalhes com a diarista ou cliente após a candidatura.',
    en: 'Use the real-time chat to negotiate details with the cleaner or client after applying.',
    es: 'Use el chat en tiempo real para negociar detalles con el limpiador o cliente después de aplicar.'
  },
  'default': {
    pt: 'Sou assistente virtual da plataforma de serviços de limpeza. Posso ajudar com: publicação de diárias, busca por profissionais, candidatura a serviços, preços, avaliações e chat. Como posso ajudar?',
    en: "I'm the virtual assistant for the cleaning services platform. I can help with: posting jobs, finding professionals, applying for jobs, prices, reviews, and chat. How can I help?",
    es: 'Soy el asistente virtual de la plataforma de servicios de limpieza. Puedo ayudar con: publicación de trabajos, búsqueda de profesionales, solicitud de servicios, precios, reseñas y chat. ¿Cómo puedo ayudar?'
  }
};

function findAnswer(text: string, lang: 'pt' | 'en' | 'es'): string {
  const lower = text.toLowerCase();
  for (const [key, msgs] of Object.entries(FAQ)) {
    if (key === 'default') continue;
    if (lower.includes(key)) {
      return msgs[lang];
    }
  }
  return FAQ['default'][lang];
}

export default function AIChatAssistant() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', text: t('ai.greeting') || FAQ['default'][lang] }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim() || typing) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const answer = findAnswer(userMsg.text, lang);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: answer };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
    }, 800 + Math.random() * 600);
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
                <p className="text-xs font-bold text-slate-100">{t('ai.title') || 'Assistente IA'}</p>
                <p className="text-[9px] text-emerald-400 font-medium">{t('ai.online') || 'Online'}</p>
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
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-slate-600 bg-slate-800">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t('ai.placeholder') || 'Digite sua pergunta...'}
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
            <p className="text-[8px] text-slate-500 text-center mt-1.5">{t('ai.disclaimer') || 'Respostas automáticas para ajudar na navegação'}</p>
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
