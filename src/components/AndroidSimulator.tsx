import { useState, useEffect } from 'react';
import { Professional, Job, ChatMessage, ClientReview } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Smartphone, Wifi, Battery, Signal, ArrowLeft, Home, Search, Calculator, User, Sparkles, 
  Bell, CheckCircle, Clock, MapPin, Award, Play, Download, Star, Share2, Clipboard, 
  ChevronRight, ArrowUpRight, MessageSquare, Plus, Check, Building, X, Send
} from 'lucide-react';
import { formatCurrency, getCleaningTypeLabel, getCleaningTypeColor, EXTRAS_AVAILABLE, getExtraPrice } from '../utils';

interface AndroidSimulatorProps {
  professionals: Professional[];
  jobs: Job[];
  activeProfessionalId: string | null;
  onSelectActiveProfessional: (id: string | null) => void;
  onApplyToJob: (jobId: string) => void;
  onPostJob: (newJob: Job) => void;
  onRegisterCleaner: (newPro: Professional) => void;
  onApproveCandidate: (jobId: string, professionalId: string) => void;
  onSendChatMessage: (jobId: string, text: string, sender: 'client' | 'cleaner') => void;
  onCloseSimulator: () => void;
  clientReviews?: ClientReview[];
  onAddClientReview?: (clientName: string, rating: number, comment: string, reviewerName: string) => void;
  onAddProfessionalReview?: (professionalId: string, rating: number, comment: string, reviewerName: string) => void;
}

export default function AndroidSimulator({
  professionals,
  jobs,
  activeProfessionalId,
  onSelectActiveProfessional,
  onApplyToJob,
  onPostJob,
  onRegisterCleaner,
  onApproveCandidate,
  onSendChatMessage,
  onCloseSimulator,
  clientReviews = [],
  onAddClientReview,
  onAddProfessionalReview
}: AndroidSimulatorProps) {
  const { t, lang } = useLanguage();
  // Simulator State Machine
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [showSplash, setShowSplash] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'calc' | 'action' | 'chats'>('home');
  const [roleMode, setRoleMode] = useState<'client' | 'cleaner'>('client');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Inside Emulator modals
  const [mobSelectedProId, setMobSelectedProId] = useState<string | null>(null);
  const [mobSelectedJobId, setMobSelectedJobId] = useState<string | null>(null);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: '🎯 Vaga Próxima a Você', body: 'Limpeza pesada em Pinheiros - R$ 380', read: false, time: 'Agora' },
    { id: 'n2', title: '⭐ Avaliação Verified', body: 'Maria Silva recebeu 5 estrelas em seu último serviço!', read: false, time: '10m atrás' }
  ]);

  // Clock Update
  const [timeStr, setTimeStr] = useState('14:35');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  // Play Store installation simulation
  const handleInstallApp = () => {
    if (isInstalled) {
      setShowSplash(true);
      setTimeout(() => setShowSplash(false), 2200);
      return;
    }
    setIsInstalling(true);
    setInstallProgress(0);
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsInstalling(false);
          setIsInstalled(true);
          setShowSplash(true);
          setTimeout(() => setShowSplash(false), 2200);
          return 100;
        }
        return prev + 12;
      });
    }, 250);
  };

  // Chat/Forms within App simulation
  const [chatInputs, setChatInputs] = useState<{[key: string]: string}>({});
  const [newPostTitle, setNewPostTitle] = useState('');
  
  // Mobile evaluation states
  const [mobNewRating, setMobNewRating] = useState<number>(5);
  const [mobNewComment, setMobNewComment] = useState<string>('');
  const [mobNewReviewer, setMobNewReviewer] = useState<string>('');
  const [mobShowForm, setMobShowForm] = useState<boolean>(false);

  const [newPostClient, setNewPostClient] = useState('');
  const [newPostPhone, setNewPostPhone] = useState('');
  const [newPostEmail, setNewPostEmail] = useState('');
  const [newPostType, setNewPostType] = useState<'residencial' | 'comercial' | 'pesada' | 'pos-obra'>('residencial');
  const [newPostBudget, setNewPostBudget] = useState(250);
  const [newPostHours, setNewPostHours] = useState(6);
  const [newPostSqm, setNewPostSqm] = useState(80);
  const [newPostAddress, setNewPostAddress] = useState('');
  const [newPostDesc, setNewPostDesc] = useState('');

  // Auto filling pre-sets
  const handleApplyPreset = (type: string) => {
    if (type === 'basic') {
      setNewPostTitle('Limpeza Semanal de Apartamento');
      setNewPostClient('Roberta Santos');
      setNewPostPhone('(11) 98111-2222');
      setNewPostEmail('roberta@exemplo.com');
      setNewPostType('residencial');
      setNewPostBudget(180);
      setNewPostHours(4);
      setNewPostSqm(75);
      setNewPostAddress('Alameda Lorena, 880 - Jardins');
      setNewPostDesc('Apartamento pequeno de 2 quartos. Tarefas padrão de passar pano, aspirar e limpar banheiros.');
    } else {
      setNewPostTitle('Limpeza Pós-Obra Consultório');
      setNewPostClient('Clínica MedVibe');
      setNewPostPhone('(11) 3222-4444');
      setNewPostEmail('adm@medvibe.com.br');
      setNewPostType('pos-obra');
      setNewPostBudget(450);
      setNewPostHours(8);
      setNewPostSqm(110);
      setNewPostAddress('Rua Bela Cintra, 1200 - Consolação');
      setNewPostDesc('Recém reformado. Precisa de cuidados para remover poeira de gesso e pingos finos de tinta ecológica.');
    }
  };

  // Local Post action within phone
  const submitPostFromPhone = () => {
    if (!newPostTitle || !newPostClient || !newPostAddress || !newPostEmail) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const targetJob: Job = {
      id: 'job_mob_' + Date.now().toString(),
      title: newPostTitle,
      clientName: newPostClient,
      clientType: newPostType === 'comercial' || newPostType === 'pos-obra' ? 'empresa' : 'residencial',
      phone: newPostPhone,
      email: newPostEmail,
      description: newPostDesc || 'Faxina geral bem detalhada.',
      cleaningType: newPostType,
      price: newPostBudget,
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days in future
      time: '08:30',
      durationHours: newPostHours,
      address: newPostAddress,
      sizeSqm: newPostSqm,
      status: 'aberto',
      applicants: [],
      assignedTo: null,
      createdAt: new Date().toISOString(),
      chatMessages: []
    };
    onPostJob(targetJob);
    // clear form
    setNewPostTitle('');
    setNewPostClient('');
    setNewPostPhone('');
    setNewPostEmail('');
    setNewPostAddress('');
    setNewPostDesc('');
    // notification
    setNotifications(prev => [
      { id: 'post_' + Date.now(), title: '🚀 Vaga Publicada!', body: `Sua vaga "${targetJob.title}" está disponível para diaristas.`, read: false, time: 'Agora' },
      ...prev
    ]);
    setActiveTab('home');
  };

  // --- Calculator Tab Internals ---
  const [calcRooms, setCalcRooms] = useState(2);
  const [calcBaths, setCalcBaths] = useState(1);
  const [calcType, setCalcType] = useState<'residencial' | 'comercial' | 'pesada' | 'pos-obra'>('residencial');
  const [calcExtras, setCalcExtras] = useState<string[]>([]);

  const handleToggleExtra = (id: string) => {
    setCalcExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getPhoneEstimation = () => {
    let baseHours = 2;
    if (calcType === 'comercial') baseHours = 3.5;
    if (calcType === 'pesada') baseHours = 5;
    if (calcType === 'pos-obra') baseHours = 6;
    const roomHrs = Math.max(0, calcRooms - 1) * 0.5;
    const bathHrs = Math.max(0, calcBaths - 1) * 0.5;
    const extraHrs = calcExtras.length * 0.5;
    const totalHours = Math.round((baseHours + roomHrs + bathHrs + extraHrs) * 2) / 2;

    let hourlyRate = 35;
    if (calcType === 'comercial') hourlyRate = 40;
    if (calcType === 'pesada') hourlyRate = 45;
    if (calcType === 'pos-obra') hourlyRate = 50;

    const baseCost = totalHours * hourlyRate;
    const extrasCost = calcExtras.reduce((sum, extraId) => sum + getExtraPrice(extraId), 0);
    return {
      hours: totalHours,
      cost: baseCost + extrasCost,
      sqm: (calcRooms * 25) + (calcBaths * 12) + 20
    };
  };

  const phoneEst = getPhoneEstimation();

  const applyCalcToForm = () => {
    setNewPostTitle(`Faxina Inteligente (${calcRooms}Q / ${calcBaths}B)`);
    setNewPostClient('Simulador Mobile');
    setNewPostPhone('(11) 98765-4321');
    setNewPostEmail('proprietario@simulador.com');
    setNewPostType(calcType);
    setNewPostBudget(phoneEst.cost);
    setNewPostHours(Math.max(2, Math.min(12, Math.round(phoneEst.hours))));
    setNewPostSqm(phoneEst.sqm);
    setNewPostDesc(`Proposta gerada automaticamente usando o calculador Material You. Contém ${calcRooms} cômodo(s) e ${calcBaths} banheiro(s). Adicionais solicitados: ${calcExtras.join(', ') || 'nenhum'}.`);
    setActiveTab('action');
  };

  const handlePhoneChatMessageSend = (jobId: string, text: string, role: 'client' | 'cleaner') => {
    onSendChatMessage(jobId, text, role);
    // Auto Response Simulation for immersive Android Experience
    setTimeout(() => {
      const responseText = role === 'cleaner' 
        ? "Excelente, acabei de visualizar seu recado no chat do aplicativo. Vou me organizar para o horário agendado!"
        : "Olá! Obrigado por responder. Gostaria de saber se você traz seus próprios produtos ou se devo deixá-los prontos?";
      
      const responseSender = role === 'cleaner' ? ('client' as const) : ('cleaner' as const);
      onSendChatMessage(jobId, responseText, responseSender);
    }, 1500);
  };

  return (
    <div id="android-simulation-wrapper" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in py-2">
      
      {/* LEFT COLUMN: PWA Guide & Technical Details */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900 rounded-3xl border border-slate-700 p-6 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase rounded-bl-2xl">
            Android Native Shell
          </div>
          
          <h2 className="text-xl font-black font-sans text-slate-200 flex items-center gap-2">
            <Smartphone className="text-emerald-600 w-5 h-5 animate-bounce" />             {t('simulator.title')}
          </h2>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            {t('simulator.desc')}
          </p>

          <div className="border-t border-slate-700 pt-5 mt-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              {t('simulator.instructions.title')}
            </h3>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              {t('simulator.instructions.desc')}
            </p>

            <ol className="text-slate-500 text-[11px] space-y-2.5 list-decimal list-inside pl-1 bg-slate-800 p-4 rounded-xl border border-slate-700">
              <li>{t('simulator.step1')}</li>
              <li>{t('simulator.step2')}</li>
              <li>{t('simulator.step3')}</li>
              <li>{t('simulator.step4')}</li>
            </ol>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert(t('simulator.link.copied'));
              }}
              className="w-full bg-slate-800 hover:bg-slate-600 text-slate-200 font-bold text-[11px] py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
                <Clipboard className="w-3.5 h-3.5" /> {t('simulator.copy.link')}
            </button>
          </div>
        </div>

        {/* Live Simulator status board */}
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 border border-slate-800 space-y-3.5 shadow-md">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              {t('simulator.status.title')}
          </h3>

          <div className="space-y-2.5 text-[11px] font-mono text-slate-500">
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span>{t('simulator.android.ver')}</span>
              <span className="text-emerald-400 font-bold">{t('simulator.status.api')}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span>{t('simulator.sdk')}</span>
              <span className="text-emerald-400 font-bold">{t('simulator.status.sdk')}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span>{t('simulator.push')}</span>
              <span className="text-emerald-400 font-bold">{t('simulator.status.push')}</span>
            </div>
            <div className="flex justify-between pb-0.5">
              <span>{t('simulator.layout')}</span>
              <span className="text-indigo-300 font-bold">{t('simulator.status.layout')}</span>
            </div>
          </div>

          <button
            onClick={onCloseSimulator}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all cursor-pointer block text-center"
          >
            {t('simulator.back')}
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Smartphone Case */}
      <div className="lg:col-span-7 flex justify-center">
        
        {/* Device frame Container */}
        <div className="relative w-[340px] h-[670px] bg-slate-950 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-slate-800 ring-4 ring-slate-850 flex flex-col justify-between overflow-hidden">
          
          {/* Microphone earpiece bar top */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-zinc-900 rounded-full z-50" />
          
          {/* Camera notch floating bezel screen overlay */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-50 flex items-center justify-between px-3">
            <div className="w-2.5 h-2.5 bg-zinc-950 rounded-full border border-zinc-900 flex-shrink-0" />
            <div className="text-[10px] text-zinc-650 font-bold pr-2 leading-none cursor-pointer hover:text-white" onClick={() => setShowNotifications(!showNotifications)}>
              •••
            </div>
          </div>

          {/* Core Simulator Screen Frame */}
          <div className="relative w-full h-[620px] bg-slate-800 rounded-[38px] overflow-hidden flex flex-col justify-between select-none">
            
            {/* 1. Android top status bar */}
            <div className="bg-slate-900/90 text-white text-[10px] py-1.5 px-6 flex justify-between items-center z-40 select-none">
              <span className="font-bold relative z-10 font-sans">{timeStr}</span>
              
              <div className="flex items-center gap-1.5 relative z-10 text-white font-bold">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)} 
                  className="mr-1 relative cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5 text-slate-300 hover:text-white" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                  )}
                </button>
                <Signal className="w-3.5 h-3.5 text-white fill-white" />
                <Wifi className="w-3.5 h-3.5 text-white" />
                <span className="font-mono text-[9px] scale-90">98%</span>
                <Battery className="w-4 h-3 text-white fill-emerald-500" />
              </div>
            </div>

            {/* Simulated Android Notification Drawer */}
            {showNotifications && (
              <div className="absolute top-8 left-0 right-0 max-h-56 bg-slate-950/95 backdrop-blur-md text-white z-40 rounded-b-2xl border-b border-slate-800 p-3 shadow-xl flex flex-col justify-between animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1 px-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t('phone.notifications.title')}</span>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-[9px] bg-slate-800 hover:bg-slate-700 px-1.5 py-0.5 rounded text-white cursor-pointer"
                  >
                    {t('phone.notifications.close')}
                  </button>
                </div>
                
                <div className="space-y-1.5 overflow-y-auto max-h-36 py-2">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => {
                        setShowNotifications(false);
                        const updated = notifications.map(n => n.id === notif.id ? { ...n, read: true } : n);
                        setNotifications(updated);
                      }}
                      className="p-2 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-2 cursor-pointer hover:bg-slate-800 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-[10px] text-white leading-none">{notif.title}</h4>
                          <span className="text-[8px] text-slate-500">{notif.time}</span>
                        </div>
                        <p className="text-[9px] text-slate-300 leading-snug mt-1">{notif.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MAIN APP SHELL OR PLAY STORE VIEWER */}
            <div className="flex-1 bg-slate-900 relative overflow-hidden flex flex-col justify-between">
              
              {/* IF NOT INSTALLED: PLAY STORE VIEW */}
              {!isInstalled ? (
                <div className="absolute inset-0 bg-slate-800 flex flex-col justify-between z-30 font-sans">
                  
                  {/* Play store header */}
                  <div className="bg-slate-900 p-3 border-b border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-600 text-white rounded-lg p-1">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                      <span className="text-xs font-bold text-slate-200">{t('store.title')}</span>
                    </div>
                    <span className="text-[9px] text-slate-500 uppercase font-black bg-slate-150 p-1 rounded">{t('store.badge')}</span>
                  </div>

                  {/* Play store app summary */}
                  <div className="p-4 flex-1 overflow-y-auto space-y-4">
                    <div className="flex gap-4">
                      {/* App icon */}
                      <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-emerald-600/20 flex-shrink-0">
                        <Sparkles className="w-8 h-8" />
                      </div>

                      {/* App Title & dev team */}
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-200 text-sm">{t('store.app.name')}</h3>
                        <p className="text-[10px] text-emerald-600 font-bold">{t('store.app.subtitle')}</p>
                        <p className="text-[9px] text-slate-500">{t('store.app.ads')}</p>
                      </div>
                    </div>

                    {/* Stats badges */}
                    <div className="grid grid-cols-3 gap-1 text-center bg-slate-800/60 p-2 rounded-xl border border-slate-105">
                      <div className="border-r border-slate-600">
                        <span className="text-xs font-black text-slate-200 block">{t('store.stats.rating')}</span>
                        <span className="text-[8px] text-slate-500 block uppercase">{t('store.rating')}</span>
                      </div>
                      <div className="border-r border-slate-600">
                        <span className="text-xs font-black text-slate-200 block">{t('store.stats.size')}</span>
                        <span className="text-[8px] text-slate-500 block uppercase">{t('store.size')}</span>
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-200 block">{t('store.stats.downloads')}</span>
                        <span className="text-[8px] text-slate-500 block uppercase">{t('store.downloads')}</span>
                      </div>
                    </div>

                    {/* App description text */}
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-wide">{t('store.about')}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                        {t('store.about.desc')}
                      </p>
                    </div>

                    {/* Dynamic Status / Progress Bars */}
                    {isInstalling ? (
                      <div className="bg-slate-900 p-3.5 border border-slate-600 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-300">
                          <span className="animate-pulse">{t('store.downloading')}</span>
                          <span>{installProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-full rounded-full transition-all duration-200"
                            style={{ width: `${installProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={handleInstallApp}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-white" /> {t('store.install')}
                      </button>
                    )}
                  </div>

                  {/* Play store safety badge */}
                  <div className="bg-slate-900 p-3 border-t border-slate-700 text-center flex items-center justify-center gap-1 text-[9px] text-slate-500">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" /> {t('store.verified')}
                  </div>
                </div>
              ) : null}

              {/* SPLASH SCREEN ON INSTALLED RUN CARD */}
              {showSplash && (
                <div className="absolute inset-0 bg-emerald-600 flex flex-col items-center justify-center z-50 text-white font-sans transition-all">
                  <div className="bg-black/10 rounded-3xl p-6 shadow-2xl animate-spin-slow">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <h1 className="text-xl font-black mt-4 tracking-tight">LimpezaJá</h1>
                  <p className="text-[10px] text-emerald-100 tracking-widest uppercase mt-1 font-bold">Simulação Android Nativa</p>
                </div>
              )}

              {/* ------------------------------------------- */}
              {/* REAL INTERNAL NATIVE APP CONTAINER INTERFACE */}
              {/* ------------------------------------------- */}
              <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-900">
                
                {/* 1. App Header inside Smartphone */}
                <div className="bg-slate-900 text-white p-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="bg-emerald-500 rounded-lg p-1">
                      <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white tracking-tight leading-none">LimpezaJá</h4>
                          <span className="text-[8px] text-slate-500 font-bold tracking-wider leading-none">{t('phone.header.title')}</span>
                    </div>
                  </div>

                  {/* Mode switcher client vs cleaner */}
                  <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                    <button 
                      onClick={() => setRoleMode('client')}
                      className={`text-[8px] font-bold px-2 py-1 rounded transition-colors cursor-pointer ${
                        roleMode === 'client' ? 'bg-slate-900 text-slate-100' : 'text-slate-500'
                      }`}
                    >
                      {t('phone.role.client')}
                    </button>
                    <button 
                      onClick={() => setRoleMode('cleaner')}
                      className={`text-[8px] font-bold px-2 py-1 rounded transition-colors cursor-pointer ${
                        roleMode === 'cleaner' ? 'bg-emerald-600 text-white' : 'text-slate-500'
                      }`}
                    >
                      {t('phone.role.cleaner')}
                    </button>
                  </div>
                </div>

                {/* 2. Scrollable screen area */}
                <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-4">
                  
                  {/* TAB 1: HOME (DIR CONTR vs DIR CANDIDATE) */}
                  {activeTab === 'home' && (
                    <div className="space-y-4.5">
                      
                      {/* Identity selected warning inside phone view */}
                      {roleMode === 'cleaner' && (
                        <div className="p-2 bg-emerald-50 border border-emerald-150 rounded-xl space-y-1">
                          <label className="text-[8px] font-black uppercase text-emerald-800 tracking-wider">{t('phone.profile.select')}</label>
                          <select
                            value={activeProfessionalId || ''}
                            onChange={(e) => onSelectActiveProfessional(e.target.value || null)}
                            className="bg-slate-900 text-[9.5px] p-1 border border-slate-600 rounded-md w-full font-bold text-slate-200"
                          >
                            <option value="">{t('phone.profile.choose')}</option>
                            {professionals.map(p => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Header message */}
                      <div>
                        <span className="text-[8px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full uppercase">
                          {roleMode === 'client' ? t('phone.home.client.title') : t('phone.home.cleaner.title')}
                        </span>
                        <h4 className="text-xs font-black text-slate-200 mt-1 leading-none">
                          {roleMode === 'client' ? t('phone.home.client.subtitle') : t('phone.home.cleaner.subtitle')}
                        </h4>
                      </div>

                      {/* ITEM LIST RENDERS */}
                      {roleMode === 'client' ? (
                        /* Contractor mode: list professionals in card format */
                        <div className="space-y-2.5">
                          {professionals.map((pro) => (
                            <div 
                              key={pro.id} 
                              onClick={() => setMobSelectedProId(pro.id)}
                              className="p-3 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-between cursor-pointer hover:border-slate-350 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <img 
                                  src={pro.avatar} 
                                  alt={pro.name} 
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 object-cover rounded-full border border-emerald-500 bg-slate-900 flex-shrink-0"
                                />
                                <div>
                                  <h5 className="font-bold text-slate-200 text-[10.5px] line-clamp-1 flex items-center gap-1">
                                    {pro.name.split(' ')[0]} {pro.isVerified && '✔️'}
                                  </h5>
                                  <p className="text-[8.5px] text-slate-500 line-clamp-1">{pro.location.split(',')[0]}</p>
                                  <div className="flex items-center gap-1.5 text-[8.5px] font-bold text-amber-600 mt-0.5">
                                    <span>⭐ {pro.rating.toFixed(1)}</span>
                                    <span className="text-slate-500 font-normal">({pro.completedJobs} fx.)</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] font-black font-sans text-emerald-700 block">{formatCurrency(pro.hourlyRate, lang)}/h</span>
                                <span className="text-[7.5px] text-slate-500 uppercase tracking-wide">{t('phone.home.hire')}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Diarista mode: list available jobs inside app */
                        <div className="space-y-2.5">
                          {jobs.map((job) => {
                            const isApplied = activeProfessionalId ? job.applicants.includes(activeProfessionalId) : false;
                            const isAssigned = job.assignedTo !== null;
                            const matchedReviews = clientReviews.filter(r => r.clientName === job.clientName);
                            const avgClientRating = matchedReviews.length > 0
                              ? (matchedReviews.reduce((sum, r) => sum + r.rating, 0) / matchedReviews.length)
                              : 5.0;

                            return (
                              <div 
                                key={job.id}
                                onClick={() => setMobSelectedJobId(job.id)}
                                className="p-3 bg-slate-800 border border-slate-700 rounded-2xl space-y-1.5 cursor-pointer hover:border-slate-350 transition-all flex flex-col justify-between"
                              >
                                <div className="flex justify-between items-center text-[8px]">
                                  <span className="font-bold text-slate-500 uppercase tracking-wide">{getCleaningTypeLabel(job.cleaningType)}</span>
                                  <span className={`px-1.5 py-0.5 rounded font-black ${
                                    isAssigned 
                                      ? 'bg-emerald-100 text-emerald-800' 
                                      : isApplied 
                                        ? 'bg-indigo-100 text-indigo-800' 
                                        : 'bg-amber-100 text-amber-800 animate-pulse'
                                  }`}>
                                    {isAssigned ? t('phone.home.filled') : isApplied ? t('phone.home.applied') : t('phone.home.available')}
                                  </span>
                                </div>

                                <h5 className="font-bold text-slate-200 text-[10.5px] line-clamp-1 leading-tight">{job.title}</h5>
                                <div className="flex items-center gap-1.5">
                                  <p className="text-[8.5px] text-slate-500 line-clamp-1">{job.address.split('-')[0]}</p>
                                  <span className="text-[8.5px] text-amber-700 bg-amber-50 px-1 font-bold rounded flex items-center">⭐{avgClientRating.toFixed(1)}</span>
                                </div>

                                <div className="flex justify-between items-center bg-slate-900 p-1.5 border border-slate-700 rounded-lg mt-1 text-[9px]">
                                  <span className="font-mono text-emerald-700 font-black">{formatCurrency(job.price, lang)}</span>
                                  <span className="text-slate-500">{t('phone.home.duration', { h: job.durationHours })}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: ESTIMATOR CALCULATOR */}
                  {activeTab === 'calc' && (
                    <div className="space-y-4 font-sans">
                      <div>
                        <span className="text-[8px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                          {t('phone.calc.title')}
                        </span>
                        <h4 className="text-xs font-black text-slate-200 mt-1 leading-none">
                          {t('phone.calc.subtitle')}
                        </h4>
                      </div>

                      {/* Calculator controls */}
                      <div className="bg-slate-800 p-2.5 rounded-2xl border border-slate-700 space-y-3 text-[10px]">
                        
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-slate-500 uppercase">{t('phone.calc.rooms', { n: calcRooms })}</label>
                          <div className="flex items-center gap-1 bg-slate-900 border border-slate-600 rounded-lg p-0.5 justify-between">
                            <button onClick={() => setCalcRooms(Math.max(1, calcRooms - 1))} className="px-2 py-0.5 bg-slate-800 rounded cursor-pointer">-</button>
                            <span className="font-mono">{calcRooms}</span>
                            <button onClick={() => setCalcRooms(Math.min(10, calcRooms + 1))} className="px-2 py-0.5 bg-slate-800 rounded cursor-pointer">+</button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-slate-500 uppercase">{t('phone.calc.baths', { n: calcBaths })}</label>
                          <div className="flex items-center gap-1 bg-slate-900 border border-slate-600 rounded-lg p-0.5 justify-between">
                            <button onClick={() => setCalcBaths(Math.max(1, calcBaths - 1))} className="px-2 py-0.5 bg-slate-800 rounded cursor-pointer">-</button>
                            <span className="font-mono">{calcBaths}</span>
                            <button onClick={() => setCalcBaths(Math.min(5, calcBaths + 1))} className="px-2 py-0.5 bg-slate-800 rounded cursor-pointer">+</button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-slate-500 uppercase">{t('phone.calc.type')}</label>
                          <select 
                            value={calcType}
                            onChange={(e: any) => setCalcType(e.target.value)}
                            className="w-full text-[10px] p-1.5 bg-slate-900 border border-slate-600 rounded-lg outline-none"
                          >
                            <option value="residencial">{t('calc.type.residential')}</option>
                            <option value="pesada">{t('calc.type.heavy')}</option>
                            <option value="comercial">{t('calc.type.commercial')}</option>
                            <option value="pos-obra">{t('calc.type.pos')}</option>
                          </select>
                        </div>

                        {/* Extra services selectors */}
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-slate-500 uppercase">{t('phone.calc.extras')}</label>
                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            {EXTRAS_AVAILABLE.slice(0, 4).map((extra) => {
                              const checked = calcExtras.includes(extra.id);
                              return (
                                <button
                                  key={extra.id}
                                  onClick={() => handleToggleExtra(extra.id)}
                                  className={`p-1.5 rounded-lg border text-left transition-all ${
                                    checked 
                                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' 
                                      : 'bg-slate-900 border-slate-600 text-slate-500'
                                  }`}
                                >
                                  <div className="text-[8px] truncate leading-none">{extra.label.split(' ')[0]}</div>
                                  <div className="text-[7.5px] text-slate-500 font-normal mt-0.5">+{formatCurrency(extra.price, lang)}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                      </div>

                      {/* Display calculations box inside phone */}
                      <div className="bg-slate-900 text-white rounded-2xl p-3 space-y-1.5 text-center">
                        <span className="text-[7.5px] text-slate-500 uppercase tracking-widest block font-bold">{t('phone.calc.result')}</span>
                        <span className="text-lg font-black font-mono text-emerald-400 tracking-tight block mt-0.5">{formatCurrency(phoneEst.cost, lang)}</span>
                        <p className="text-[8.5px] text-slate-350 leading-tight">{t('phone.calc.duration', { h: phoneEst.hours })}</p>

                        <button
                          onClick={applyCalcToForm}
                          className="w-full mt-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] py-1.5 rounded-lg shadow-sm cursor-pointer"
                        >
                          {t('phone.calc.use')}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: ACTION - PUBLISH AIRPORT */}
                  {activeTab === 'action' && (
                    <div className="space-y-3.5 font-sans">
                      <div>
                        <span className="text-[8px] bg-slate-955 text-slate-300 font-bold px-2 py-0.5 rounded-full uppercase mr-1">
                          {t('phone.action.title')}
                        </span>
                        <h4 className="text-xs font-black text-slate-200 mt-1 leading-none">
                          {t('phone.action.subtitle')}
                        </h4>
                      </div>

                      {/* Quick fill shortcuts */}
                      <div className="flex bg-slate-800 p-1.5 rounded-xl border border-slate-600/40 gap-2 items-center justify-between">
                        <span className="text-[7.5px] text-slate-500 uppercase font-black tracking-wider block">{t('phone.action.auto')}</span>
                        <button onClick={() => handleApplyPreset('basic')} className="text-[8.5px] font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded border border-slate-600 shadow-3xs cursor-pointer">{t('phone.action.preset.home')}</button>
                        <button onClick={() => handleApplyPreset('pro')} className="text-[8.5px] font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded border border-slate-600 shadow-3xs cursor-pointer">{t('phone.action.preset.reform')}</button>
                      </div>

                      <div className="space-y-2 text-[9.5px]">
                        <div>
                          <label className="block font-bold text-slate-500 uppercase text-[7.5px] mb-0.5">{t('phone.action.title.label')}</label>
                          <input 
                            type="text" 
                            placeholder="Ex: Faxina quinzenal quarto"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            className="w-full text-xs p-1.5 bg-slate-800 border border-slate-600 rounded-lg outline-none inline-block text-slate-200"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-bold text-slate-500 uppercase text-[7.5px] mb-0.5">{t('phone.action.name.label')}</label>
                            <input 
                              type="text" 
                              placeholder="Ex: Cláudia Silva"
                              value={newPostClient}
                              onChange={(e) => setNewPostClient(e.target.value)}
                              className="w-full text-[10px] p-1.5 bg-slate-800 border border-slate-600 rounded-lg outline-none text-slate-200"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-500 uppercase text-[7.5px] mb-0.5">{t('phone.action.phone.label')}</label>
                            <input 
                              type="text" 
                              placeholder="(11) 97777-6666"
                              value={newPostPhone}
                              onChange={(e) => setNewPostPhone(e.target.value)}
                              className="w-full text-[10px] p-1.5 bg-slate-800 border border-slate-600 rounded-lg outline-none text-slate-200"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-bold text-slate-500 uppercase text-[7.5px] mb-0.5">{t('phone.action.email.label')}</label>
                            <input 
                              type="email" 
                              placeholder="sua@vaga.com"
                              value={newPostEmail}
                              onChange={(e) => setNewPostEmail(e.target.value)}
                              className="w-full text-[10px] p-1.5 bg-slate-800 border border-slate-600 rounded-lg outline-none text-slate-200"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-500 uppercase text-[7.5px] mb-0.5">{t('phone.action.budget.label')}</label>
                            <input 
                              type="number" 
                              placeholder="250"
                              value={newPostBudget}
                              onChange={(e) => setNewPostBudget(parseInt(e.target.value) || 0)}
                              className="w-full text-[10px] p-1.5 bg-slate-800 border border-slate-600 rounded-lg outline-none font-bold text-emerald-800"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-500 uppercase text-[7.5px] mb-0.5">{t('phone.action.address.label')}</label>
                          <input 
                            type="text" 
                            placeholder="Rua, Número, Bairro - Cidade, SP"
                            value={newPostAddress}
                            onChange={(e) => setNewPostAddress(e.target.value)}
                            className="w-full text-[10.5px] p-1.5 bg-slate-800 border border-slate-600 rounded-lg outline-none text-slate-200"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-500 uppercase text-[7.5px] mb-0.5">{t('phone.action.desc.label')}</label>
                          <textarea 
                            placeholder="Deixe instruções ou foque em algum cômodo..."
                            rows={2}
                            value={newPostDesc}
                            onChange={(e) => setNewPostDesc(e.target.value)}
                            className="w-full text-[9.5px] p-1.5 bg-slate-800 border border-slate-600 rounded-lg outline-none text-slate-200"
                          />
                        </div>

                        <button
                          onClick={submitPostFromPhone}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10.5px] py-2 px-3 rounded-xl transition duration-200 shadow-md cursor-pointer block text-center"
                        >
                          {t('phone.action.submit')}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: CHATS / APPLICATIONS TRACKER */}
                  {activeTab === 'chats' && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-[8px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
                          {t('phone.chats.title')}
                        </span>
                        <h4 className="text-xs font-black text-slate-200 mt-1 leading-none">
                          {t('phone.chats.subtitle')}
                        </h4>
                      </div>

                      <div className="space-y-2">
                        {jobs.filter(j => j.applicants.length > 0 || j.assignedTo !== null).length === 0 ? (
                          <div className="bg-slate-800 border border-dashed border-slate-600 p-6 rounded-2xl text-center italic text-[10px] text-slate-500">
                            {t('phone.chats.empty')}
                          </div>
                        ) : (
                          jobs.filter(j => j.applicants.length > 0 || j.assignedTo !== null).map((job) => (
                            <div 
                              key={job.id}
                              onClick={() => setMobSelectedJobId(job.id)}
                              className="p-3 bg-slate-800 border border-slate-700 hover:border-slate-300 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
                            >
                              <div className="flex items-center gap-2">
                                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl flex-shrink-0">
                                  <MessageSquare className="w-4 h-4" />
                                </div>
                                <div>
                                  <h6 className="font-bold text-slate-200 text-[10px] leading-tight line-clamp-1">{job.title}</h6>
                                  <p className="text-[8px] text-slate-500 font-medium">{t('phone.chats.client', { name: job.clientName })}</p>
                                  {job.chatMessages && job.chatMessages.length > 0 && (
                                    <p className="text-[8px] text-emerald-800 italic font-semibold line-clamp-1 mt-0.5">
                                      {t('phone.chats.last', { msg: job.chatMessages[job.chatMessages.length - 1].text })}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                </div>

                {/* 3. Bottom smartphone navigation bar (Material Design 3 style) */}
                <div className="bg-slate-900 border-t border-slate-800 px-3 py-1.5 flex justify-between items-center z-40 select-none">
                  
                  <button 
                    onClick={() => setActiveTab('home')}
                    className={`flex flex-col items-center flex-1 cursor-pointer pt-1 ${
                      activeTab === 'home' ? 'text-emerald-450 font-extrabold scale-105' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span className="text-[7.5px] mt-0.5">{t('phone.nav.home')}</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('calc')}
                    className={`flex flex-col items-center flex-1 cursor-pointer pt-1 ${
                      activeTab === 'calc' ? 'text-emerald-450 font-extrabold scale-105' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    <Calculator className="w-4 h-4" />
                    <span className="text-[7.5px] mt-0.5">{t('phone.nav.calc')}</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('action')}
                    className={`flex flex-col items-center flex-1 cursor-pointer pt-1 ${
                      activeTab === 'action' ? 'text-emerald-450 font-extrabold scale-105' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-[7.5px] mt-0.5">{t('phone.nav.post')}</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('chats')}
                    className={`flex flex-col items-center flex-1 cursor-pointer pt-1 relative ${
                      activeTab === 'chats' ? 'text-emerald-450 font-extrabold scale-105' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-[7.5px] mt-0.5">{t('phone.nav.chats')}</span>
                    <span className="absolute top-0 right-4 w-1.5 h-1.5 bg-red-500 rounded-full" />
                  </button>
                </div>

              </div>
            </div>

            {/* 4. Android system gesture pill at the bottom */}
            <div className="bg-slate-900 py-2.5 flex justify-center items-center z-40 select-none">
              <div 
                onClick={() => {
                  if (mobSelectedProId) setMobSelectedProId(null);
                  else if (mobSelectedJobId) setMobSelectedJobId(null);
                  else if (activeTab !== 'home') setActiveTab('home');
                  else setIsInstalled(false); // Simulates back to desktop menu
                }}
                className="w-24 h-1.5 bg-zinc-800 hover:bg-zinc-600 rounded-full cursor-pointer transition" 
              />
            </div>

          </div>

          {/* SIMULATED DETAILED PROFILE OVERLAY IN EMULATOR */}
          {mobSelectedProId && (
            (() => {
              const pro = professionals.find(p => p.id === mobSelectedProId);
              if (!pro) return null;
              return (
                <div className="absolute inset-x-3 bottom-12 top-8 bg-slate-900 z-40 flex flex-col justify-between rounded-t-3xl border border-slate-700 shadow-2xl animate-fade-in font-sans">
                  
                  {/* Top Header */}
                  <div className="bg-slate-905 text-slate-200 p-3.5 border-b border-slate-700 flex items-center justify-between">
                    <button onClick={() => setMobSelectedProId(null)} className="p-1 hover:bg-slate-800 rounded-full cursor-pointer text-slate-300">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Perfil Diarista</span>
                    <span className="w-4" />
                  </div>

                  {/* Body Scrollable */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[10px] text-slate-655 leading-relaxed">
                    <div className="text-center space-y-1">
                      <img 
                        src={pro.avatar} 
                        alt={pro.name} 
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-full mx-auto border-2 border-emerald-500 bg-slate-800 shadow-sm"
                      />
                      <h4 className="font-black text-slate-200 text-xs">{pro.name}</h4>
                      <div className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                        ⭐ {pro.rating.toFixed(1)} <span className="text-slate-500">({pro.completedJobs} fx.)</span>
                      </div>
                    </div>

                    <div className="bg-slate-800 p-3 border border-slate-700 rounded-xl space-y-1">
                      <h5 className="font-bold text-slate-200 flex items-center gap-1 font-sans">
                        🎯 Apresentação
                      </h5>
                      <p className="text-slate-500 leading-relaxed font-sans text-[9.5px]">
                        {pro.bio}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold block">Tarifa Recomendada</span>
                      <p className="text-sm font-extrabold text-slate-200 font-sans">{formatCurrency(pro.hourlyRate, lang)}/hora </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold block">{t('cleaner.card.specialties')}</span>
                      <div className="flex flex-wrap gap-1">
                        {pro.cleaningTypes.map(type => (
                          <span key={type} className="text-[8.5px] font-bold bg-slate-800 rounded text-slate-300 px-1.5 py-0.5">
                            {getCleaningTypeLabel(type)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Prestadores ratings block */}
                    <div className="space-y-1.5 border-t border-slate-700 pt-3">
                      <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold block">Avaliações da Rede ({pro.reviews?.length || 0})</span>
                      <div className="space-y-1.5 max-h-24 overflow-y-auto">
                        {!pro.reviews || pro.reviews.length === 0 ? (
                          <p className="text-slate-500 italic text-[9px]">Ainda sem feedbacks nesta temporada.</p>
                        ) : (
                          pro.reviews.map(rev => (
                            <div key={rev.id} className="p-1.5 bg-slate-800 border border-slate-105 rounded-lg text-[9px] space-y-0.5">
                              <div className="flex justify-between items-center text-slate-500 font-bold">
                                <span>{rev.reviewerName}</span>
                                <span className="text-amber-500">★ {rev.rating}</span>
                              </div>
                              <p className="text-slate-605 font-sans leading-tight">{rev.comment}</p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add interactive review for phone simulator on this professional */}
                      {onAddProfessionalReview && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setMobShowForm(!mobShowForm)}
                            className="bg-slate-800 text-[8.5px] font-bold text-slate-300 py-1 px-2.5 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-600"
                          >
                            {mobShowForm ? '❌ Ocultar Nova Avaliação' : '⭐ Fazer Nova Avaliação'}
                          </button>

                          {mobShowForm && (
                            <div className="mt-2 bg-slate-800 p-2.5 rounded-xl border border-slate-600/60 space-y-2 text-[9.5px]">
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-500 font-sans">Nota:</span>
                                <div className="flex gap-1 bg-slate-900 p-0.5 border border-slate-600 rounded">
                                  {[1,2,3,4,5].map(v => (
                                    <button key={v} type="button" onClick={() => setMobNewRating(v)}>
                                      <Star className={`w-3.5 h-3.5 ${v <= mobNewRating ? 'fill-amber-450 text-amber-500' : 'text-slate-200'}`} />
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <input 
                                type="text"
                                placeholder="Seu nome"
                                value={mobNewReviewer}
                                onChange={(e) => setMobNewReviewer(e.target.value)}
                                className="w-full p-1 bg-slate-900 border border-slate-600 rounded text-[9px] outline-none"
                              />
                              <textarea
                                placeholder="Comentários sobre a diarista..."
                                value={mobNewComment}
                                rows={1}
                                onChange={(e) => setMobNewComment(e.target.value)}
                                className="w-full p-1 bg-slate-900 border border-slate-600 rounded text-[9px] outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (!mobNewComment.trim() || !mobNewReviewer.trim()) {
                                    alert('Por favor complete os dados para avaliar.');
                                    return;
                                  }
                                  onAddProfessionalReview(pro.id, mobNewRating, mobNewComment, mobNewReviewer);
                                  setMobNewComment('');
                                  setMobNewReviewer('');
                                  setMobNewRating(5);
                                  setMobShowForm(false);
                                }}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold py-1.5 rounded text-white text-xs cursor-pointer"
                              >
                                Enviar Feedback
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Simulation Contact directly */}
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[9px] space-y-1">
                      <p className="font-bold text-emerald-800">Canais de Contato Direto (Verified)</p>
                      <p className="font-mono text-slate-300">📞 {pro.phone}</p>
                      <p className="text-slate-300">✉️ {pro.email}</p>
                    </div>
                  </div>

                  {/* Footers buttons */}
                  <div className="p-3 bg-slate-800 border-t border-slate-600 flex gap-2">
                    <button 
                      onClick={() => setMobSelectedProId(null)}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-[10px] py-2 rounded-xl border border-slate-600 cursor-pointer"
                    >
                      {t('register.back')}
                    </button>
                    <button 
                      onClick={() => {
                        setMobSelectedProId(null);
                        setNewPostTitle(`Serviço Direto com ${pro.name.split(' ')[0]}`);
                        setNewPostClient('Contratante Simulado');
                        setNewPostPhone('(11) 98888-7777');
                        setNewPostEmail('contratante@exemplo.com');
                        setNewPostBudget(pro.hourlyRate * 4);
                        setNewPostHours(4);
                        setNewPostAddress(pro.location);
                        setNewPostDesc(`Proposta de faxina residencial oferecida diretamente para o perfil recomendado de ${pro.name}. Valor proposto para 4hs de diária.`);
                        setActiveTab('action');
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] py-2 rounded-xl transition shadow-xs cursor-pointer"
                    >
                      Oferecer Proposta
                    </button>
                  </div>
                </div>
              );
            })()
          )}

          {/* SIMULATED DETAILED JOB/CONTRACT OVERLAY IN EMULATOR */}
          {mobSelectedJobId && (
            (() => {
              const job = jobs.find(j => j.id === mobSelectedJobId);
              if (!job) return null;
              
              const isAppliedMe = activeProfessionalId ? job.applicants.includes(activeProfessionalId) : false;
              const isAssigned = job.assignedTo !== null;
              const curMsgInput = chatInputs[job.id] || '';

              return (
                <div className="absolute inset-x-3 bottom-0 top-8 bg-slate-900 z-45 flex flex-col justify-between rounded-t-3xl border border-slate-700 shadow-2xl animate-fade-in font-sans">
                  
                  {/* Bezel handle */}
                  <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
                    <button onClick={() => setMobSelectedJobId(null)} className="p-1 hover:bg-slate-800 rounded-full cursor-pointer text-slate-305">
                      <ArrowLeft className="w-4 h-4 text-white" />
                    </button>
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Detalhamento Vaga</span>
                    <span className="w-4" />
                  </div>

                  {/* Body Scroll */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[10px] text-slate-500 leading-relaxed">
                    
                    {/* Basic specs stats */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-800 p-2.5 rounded-xl text-center">
                      <div>
                        <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Valor Oportuno</span>
                                <p className="text-xs font-black text-emerald-700 font-mono mt-0.5">{formatCurrency(job.price, lang)}</p>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold font-sans">Área Local</span>
                        <p className="text-xs font-extrabold text-slate-805 mt-0.5">{job.sizeSqm} m²</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-extrabold text-slate-200 text-[11px] leading-tight">{job.title}</h4>
                      <p className="text-[8.5px] text-slate-500">Contratado por: <strong>{job.clientName}</strong></p>
                    </div>

                    <p className="text-slate-500 text-[9.5px] leading-relaxed bg-slate-800 p-3 rounded-xl border border-slate-700 font-sans">
                      {job.description}
                    </p>

                    <p className="text-[9px] flex items-center gap-1.5 text-slate-605">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <strong>Endereço:</strong> {job.address}
                    </p>

                    {/* Contractor Ratings and feedback inside mobile job details */}
                    <div className="bg-amber-50/10 border border-amber-100/50 p-2.5 rounded-xl text-[9px] space-y-2">
                      <div className="flex justify-between items-center text-[8.5px] font-bold text-amber-900">
                        <span>⭐ Reputação de {job.clientName}</span>
                        <span className="font-extrabold text-amber-800">
                          ★ {(clientReviews.filter(r => r.clientName === job.clientName).length > 0
                            ? clientReviews.filter(r => r.clientName === job.clientName).reduce((sum, r) => sum + r.rating, 0) / clientReviews.filter(r => r.clientName === job.clientName).length
                            : 5).toFixed(1)} / 5.0
                        </span>
                      </div>

                      {clientReviews.filter(r => r.clientName === job.clientName).length === 0 ? (
                        <p className="text-slate-500 italic text-[8.5px]">Este contratante ainda não recebeu avaliações no smartphone.</p>
                      ) : (
                        <div className="space-y-1 max-h-20 overflow-y-auto">
                          {clientReviews.filter(r => r.clientName === job.clientName).map(rev => (
                            <div key={rev.id} className="p-1.5 bg-slate-900 border border-amber-50 rounded text-[8.5px] space-y-0.5">
                              <div className="flex justify-between items-center text-[7.5px] font-bold text-slate-500">
                                <span>{rev.reviewerName} (Diarista)</span>
                                <span>★ {rev.rating}</span>
                              </div>
                              <p className="text-slate-605 leading-tight">{rev.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add interactive client reviews directly on Android simulator */}
                      {activeProfessionalId && onAddClientReview && (
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setMobShowForm(!mobShowForm)}
                            className="bg-amber-50 text-[8px] font-extrabold text-amber-950 px-2 py-0.5 rounded border border-amber-200 cursor-pointer"
                          >
                            {mobShowForm ? 'Esconder' : 'Avaliar o Proprietário'}
                          </button>

                          {mobShowForm && (
                            <div className="mt-1.5 bg-slate-900 p-2 rounded border border-amber-100 space-y-2 text-[9px]">
                              <div className="flex items-center gap-1 text-[8.5px]">
                                <span className="font-bold">Avaliação de {job.clientName}:</span>
                                <div className="flex gap-1.5 bg-amber-50 p-0.5 rounded">
                                  {[1,2,3,4,5].map(v => (
                                    <button key={v} type="button" onClick={() => setMobNewRating(v)}>
                                      <Star className={`w-3 h-3 ${v <= mobNewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-205'}`} />
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <textarea
                                placeholder="Como foi o atendimento, tratamento ou suporte do contratante?"
                                value={mobNewComment}
                                rows={1}
                                onChange={(e) => setMobNewComment(e.target.value)}
                                className="w-full p-1 bg-slate-800 border border-slate-600 rounded text-[8.5px] outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (!mobNewComment.trim()) {
                                    alert('Escreva um breve comentário.');
                                    return;
                                  }
                                  const name = professionals.find(p => p.id === activeProfessionalId)?.name || 'Diarista Parceiro';
                                  onAddClientReview(job.clientName, mobNewRating, mobNewComment, name);
                                  setMobNewComment('');
                                  setMobNewRating(5);
                                  setMobShowForm(false);
                                }}
                                className="w-full bg-amber-600 hover:bg-amber-700 font-extrabold text-[8px] text-white p-1 rounded"
                              >
                                Publicar Nota Oficial
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Chat Section within Smartphone */}
                    <div className="border-t border-slate-105 pt-3 space-y-2">
                      <p className="text-[8px] uppercase tracking-widest text-slate-450 font-black flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-emerald-500" /> Chat com o Contratante
                      </p>

                      <div className="bg-slate-800 rounded-xl p-2 border border-slate-700 space-y-2 max-h-32 overflow-y-auto">
                        {(!job.chatMessages || job.chatMessages.length === 0) ? (
                          <p className="text-slate-500 italic text-center py-2 text-[8px]">Inicie as tratativas de contratação no campo abaixo.</p>
                        ) : (
                          job.chatMessages.map(msg => (
                            <div key={msg.id} className={`max-w-[85%] p-1.5 rounded-lg text-[9px] ${
                              (roleMode === 'cleaner' && msg.sender === 'cleaner') || (roleMode === 'client' && msg.sender === 'client')
                                ? 'bg-slate-900 text-white ml-auto'
                                : 'bg-slate-900 text-slate-200 border border-slate-700'
                            }`}>
                              <span className="text-[7.5px] font-bold block text-slate-500 uppercase mb-0.5">{msg.senderName.split(' ')[0]}</span>
                              <p className="font-sans leading-tight mt-0.5">{msg.text}</p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Msg Input */}
                      <div className="flex bg-slate-900 border border-slate-600 rounded-lg p-1 gap-1 items-center shadow-3xs">
                        <input 
                          type="text" 
                          placeholder="Digite seu recado..."
                          value={curMsgInput}
                          onChange={(e) => {
                            setChatInputs({
                              ...chatInputs,
                              [job.id]: e.target.value
                            });
                          }}
                          className="flex-1 bg-none border-none outline-none text-[9.5px] px-1.5 py-1 text-slate-200 focus:ring-0"
                        />
                        <button 
                          onClick={() => {
                            if (!curMsgInput.trim()) return;
                            handlePhoneChatMessageSend(job.id, curMsgInput, roleMode);
                            setChatInputs({
                              ...chatInputs,
                              [job.id]: ''
                            });
                          }}
                          className="bg-emerald-600 rounded-lg p-1.5 hover:bg-emerald-500 cursor-pointer text-white flex items-center justify-center shrink-0"
                        >
                          <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Pending candidates list inside smartphone */}
                    {roleMode === 'client' && !isAssigned && job.applicants.length > 0 && (
                      <div className="border-t border-slate-700 pt-3 space-y-2">
                        <p className="text-[8px] font-black uppercase tracking-wider text-slate-500">Selecionar Profissional Candidatado({job.applicants.length})</p>
                        {professionals.filter(p => job.applicants.includes(p.id)).map(cand => (
                          <div key={cand.id} className="p-2 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-between">
                            <span className="font-bold text-slate-200">{cand.name.split(' ')[0]} (⭐{cand.rating})</span>
                            <button
                              onClick={() => {
                                onApproveCandidate(job.id, cand.id);
                                setMobSelectedJobId(null);
                              }}
                              className="bg-emerald-600 text-white font-bold text-[8.5px] px-2 py-1 rounded cursor-pointer hover:bg-emerald-700"
                            >
                              {t('phone.home.hire')}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer buttons */}
                  <div className="p-3 bg-slate-800 border-t border-slate-600 flex gap-2">
                    <button 
                      onClick={() => setMobSelectedJobId(null)}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-[10px] py-2 rounded-xl border border-slate-600 cursor-pointer"
                    >
                      Sair
                    </button>

                    {roleMode === 'cleaner' && !isAppliedMe && !isAssigned && (
                      <button 
                        onClick={() => {
                          if (!activeProfessionalId) {
                            alert('Escolha seu perfil ativo no topo da tela para se candidatar!');
                            return;
                          }
                          onApplyToJob(job.id);
                          // create a simulator notification
                          setNotifications(prev => [
                            { id: 'app_' + Date.now(), title: '✔️ Candidatura Enviada!', body: `Você aplicou para o serviço "${job.title}". Acompanhe o chat!`, read: false, time: 'Agora' },
                            ...prev
                          ]);
                        }}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] py-2 rounded-xl transition shadow-xs cursor-pointer"
                      >
                        Enviar Candidatura
                      </button>
                    )}

                    {isAppliedMe && !isAssigned && (
                      <span className="flex-1 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-[10px] py-2 rounded-xl text-center">
                        Candidatura Ativa
                      </span>
                    )}
                  </div>
                </div>
              );
            })()
          )}

        </div>

      </div>

    </div>
  );
}
