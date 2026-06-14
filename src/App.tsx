import { useState, useEffect, useRef } from 'react';
import { Professional, Job, ChatMessage, ClientReview } from './types';
import { INITIAL_PROFESSIONALS, INITIAL_JOBS, INITIAL_CLIENT_REVIEWS } from './data';
import {
  fetchProfessionals,
  fetchJobs,
  fetchClientReviews,
  insertProfessional,
  updateProfessional,
  insertProfessionalReview,
  insertJob,
  updateJob,
  insertChatMessage,
  insertClientReview,
  seedInitialData,
} from './lib/api';
import DashboardEmpresa from './components/DashboardEmpresa';
import DashboardProfissional from './components/DashboardProfissional';
import CleanerRegisterForm from './components/CleanerRegisterForm';
import JobPostForm from './components/JobPostForm';
import { CleanerDetailsModal, JobDetailsModal } from './components/DetailModals';
import AIChatAssistant from './components/AIChatAssistant';
import { useLanguage } from './i18n/LanguageContext';
import { Sparkles, Check } from 'lucide-react';

import CleaningSplash from './components/CleaningSplash';

export default function App() {
  const { t, lang, setLang } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [clientReviews, setClientReviews] = useState<ClientReview[]>([]);

  const [activeRole, setActiveRole] = useState<'client' | 'cleaner'>('client');
  const [viewingForm, setViewingForm] = useState<'post-job' | 'register-cleaner' | 'none'>('none');
  const [selectedCleanerId, setSelectedCleanerId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeProfessionalId, setActiveProfessionalId] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [prefilledJobData, setPrefilledJobData] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');

  const seededRef = useRef(false);

  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;

    const loadData = async () => {
      try {
        const [fetchedPros, fetchedJobs, fetchedReviews] = await Promise.all([
          fetchProfessionals(),
          fetchJobs(),
          fetchClientReviews(),
        ]);

        if (fetchedPros.length === 0 && fetchedJobs.length === 0) {
          await seedInitialData(INITIAL_PROFESSIONALS, INITIAL_JOBS, INITIAL_CLIENT_REVIEWS);
          const [seededPros, seededJobs, seededReviews] = await Promise.all([
            fetchProfessionals(),
            fetchJobs(),
            fetchClientReviews(),
          ]);
          setProfessionals(seededPros);
          setJobs(seededJobs);
          setClientReviews(seededReviews);
          if (seededPros.length > 0) setActiveProfessionalId(seededPros[0].id);
        } else {
          setProfessionals(fetchedPros);
          setJobs(fetchedJobs);
          setClientReviews(fetchedReviews);
          if (fetchedPros.length > 0) setActiveProfessionalId(fetchedPros[0].id);
        }
      } catch (e) {
        console.error('Supabase unavailable, falling back to localStorage:', e);
        const savedPros = localStorage.getItem('limpeza_professionals');
        const savedJobs = localStorage.getItem('limpeza_jobs');
        const savedReviews = localStorage.getItem('limpeza_client_reviews');
        setProfessionals(savedPros ? JSON.parse(savedPros) : INITIAL_PROFESSIONALS);
        setJobs(savedJobs ? JSON.parse(savedJobs) : INITIAL_JOBS);
        setClientReviews(savedReviews ? JSON.parse(savedReviews) : INITIAL_CLIENT_REVIEWS);
        if (INITIAL_PROFESSIONALS.length > 0) setActiveProfessionalId(INITIAL_PROFESSIONALS[0].id);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateProfessionalsState = (newPros: Professional[]) => {
    setProfessionals(newPros);
  };

  const updateJobsState = (newJobs: Job[]) => {
    setJobs(newJobs);
  };

  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleRegisterCleaner = async (newPro: Professional) => {
    try {
      await insertProfessional(newPro);
    } catch (e) {
      console.error('Failed to insert professional to Supabase:', e);
    }
    const updatedPros = [newPro, ...professionals];
    updateProfessionalsState(updatedPros);
    setActiveProfessionalId(newPro.id);
    setViewingForm('none');
    setActiveRole('cleaner');
    showToast(t('toast.registered', { name: newPro.name }), 'success');
  };

  const handlePostJob = async (newJob: Job) => {
    try {
      await insertJob(newJob);
    } catch (e) {
      console.error('Failed to insert job to Supabase:', e);
    }
    const updatedJobs = [newJob, ...jobs];
    updateJobsState(updatedJobs);
    setViewingForm('none');
    setPrefilledJobData(null);
    setActiveRole('client');
    showToast(t('toast.job.posted', { title: newJob.title }), 'success');
  };

  const handleApplyToJob = async (jobId: string) => {
    if (!activeProfessionalId) {
      showToast(t('toast.select.profile'), 'info');
      setActiveRole('cleaner');
      return;
    }
    const applicantPro = professionals.find(p => p.id === activeProfessionalId);
    if (!applicantPro) return;
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return;
    if (targetJob.applicants.includes(activeProfessionalId)) {
      showToast(t('toast.already.applied'), 'info');
      return;
    }
    const autoChatMessage: ChatMessage = {
      id: 'chat_msg_auto_' + Date.now(),
      sender: 'cleaner',
      senderName: applicantPro.name,
      text: lang === 'pt' ? `Olá! Tenho interesse na diária proposta de ${targetJob.title}. Garanto pontualidade e dedicação total!` :
           lang === 'es' ? `¡Hola! Estoy interesado en la tarifa de ${targetJob.title}. ¡Garantizo puntualidad y dedicación total!` :
           `Hello! I'm interested in the proposed rate for ${targetJob.title}. I guarantee punctuality and total dedication!`,
      timestamp: new Date().toISOString()
    };
    const updatedApplicants = [...targetJob.applicants, activeProfessionalId];
    const updatedChatMessages = [...(targetJob.chatMessages || []), autoChatMessage];
    try {
      await Promise.all([
        updateJob(jobId, { applicants: updatedApplicants }),
        insertChatMessage(jobId, autoChatMessage),
      ]);
    } catch (e) {
      console.error('Failed to update job on Supabase:', e);
    }
    const updatedJobs = jobs.map(job => job.id === jobId ? { ...job, applicants: updatedApplicants, chatMessages: updatedChatMessages } : job);
    updateJobsState(updatedJobs);
    showToast(t('toast.applied', { name: applicantPro.name }), 'success');
  };

  const handleApproveCandidate = async (jobId: string, professionalId: string) => {
    const targetPro = professionals.find(p => p.id === professionalId);
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetPro || !targetJob) return;
    try {
      await Promise.all([
        updateJob(jobId, { status: 'em_andamento', assignedTo: professionalId }),
        updateProfessional(professionalId, { completedJobs: targetPro.completedJobs + 1 }),
      ]);
    } catch (e) {
      console.error('Failed to approve candidate on Supabase:', e);
    }
    const updatedJobs = jobs.map(job => job.id === jobId ? { ...job, status: 'em_andamento' as const, assignedTo: professionalId } : job);
    const updatedPros = professionals.map(pro => pro.id === professionalId ? { ...pro, completedJobs: pro.completedJobs + 1 } : pro);
    updateJobsState(updatedJobs);
    updateProfessionalsState(updatedPros);
    setSelectedJobId(null);
    showToast(t('toast.approved', { name: targetPro.name }), 'success');
  };

  const handleSendChatMessage = async (jobId: string, text: string, sender: 'client' | 'cleaner') => {
    let senderName = 'Cliente';
    if (sender === 'cleaner') {
      if (activeProfessionalId) {
        const found = professionals.find(p => p.id === activeProfessionalId);
        if (found) senderName = found.name;
      } else senderName = 'Profissional';
    } else {
      const job = jobs.find(j => j.id === jobId);
      if (job) senderName = job.clientName;
    }
    const newMessage: ChatMessage = { id: 'chat_msg_user_' + Date.now(), sender, senderName, text, timestamp: new Date().toISOString() };
    try {
      await insertChatMessage(jobId, newMessage);
    } catch (e) {
      console.error('Failed to insert chat message to Supabase:', e);
    }
    const updatedJobs = jobs.map(job => job.id === jobId ? { ...job, chatMessages: [...(job.chatMessages || []), newMessage] } : job);
    updateJobsState(updatedJobs);
    showToast(t('toast.msg.sent'), 'success');
  };

  const handleAddProfessionalReview = async (professionalId: string, rating: number, comment: string, reviewerName: string) => {
    const newReview = { id: 'r_pro_' + Date.now(), reviewerName: reviewerName || 'Cliente Anônimo', rating, comment, date: new Date().toISOString().split('T')[0] };
    try {
      await insertProfessionalReview(professionalId, newReview);
    } catch (e) {
      console.error('Failed to insert professional review to Supabase:', e);
    }
    const updatedPros = professionals.map(pro => {
      if (pro.id === professionalId) {
        const updatedReviews = [...(pro.reviews || []), newReview];
        const average = updatedReviews.length > 0 ? Math.round((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length) * 10) / 10 : 5.0;
        return { ...pro, reviews: updatedReviews, rating: average };
      }
      return pro;
    });
    updateProfessionalsState(updatedPros);
    showToast(t('toast.review.registered'), 'success');
  };

  const handleAddClientReview = async (clientName: string, rating: number, comment: string, reviewerName: string) => {
    const newReview: ClientReview = { id: 'r_client_' + Date.now(), clientName, reviewerName: reviewerName || 'Diarista Anônimo', rating, comment, date: new Date().toISOString().split('T')[0] };
    try {
      await insertClientReview(newReview);
    } catch (e) {
      console.error('Failed to insert client review to Supabase:', e);
    }
    const updatedReviews = [...clientReviews, newReview];
    setClientReviews(updatedReviews);
    showToast(t('toast.client.review.registered'), 'success');
  };

  return (
    <div id="main-application-view" className="min-h-screen bg-slate-950 flex flex-col antialiased selection:bg-emerald-400 selection:text-black">
      {showSplash && <CleaningSplash onComplete={() => setShowSplash(false)} />}
      
      <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-md border-b border-slate-700 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-emerald-600 text-white rounded-lg p-1.5 shadow-sm shadow-emerald-600/15">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="hidden xs:block">
                <span className="text-sm md:text-lg font-black text-slate-100 tracking-tight block leading-tight">{t('app.title')}</span>
                <span className="text-[8px] md:text-[10px] text-slate-500 font-medium tracking-wide leading-none">{t('app.subtitle')}</span>
              </div>
            </div>

            <div className="relative">
                <button onClick={() => setLangMenuOpen(m => !m)}
                className="text-xl leading-none px-1.5 py-1 rounded-md hover:bg-slate-900 transition cursor-pointer select-none">
                {lang === 'pt' ? '🇧🇷' : lang === 'en' ? '🇺🇸' : '🇪🇸'}
              </button>
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-1 bg-slate-950 border border-slate-600 rounded-xl shadow-xl z-50 py-1 min-w-[140px] animate-fade-in">
                  {[
                    { lang: 'pt', flag: '🇧🇷', label: 'Português' },
                    { lang: 'en', flag: '🇺🇸', label: 'English' },
                    { lang: 'es', flag: '🇪🇸', label: 'Español' },
                  ].map(({ lang: l, flag, label }) => (
                    <button key={l} onClick={() => { setLang(l as any); setLangMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium hover:bg-slate-800 transition cursor-pointer ${lang === l ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-300'}`}>
                      <span className="text-base">{flag}</span> {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 md:gap-3">
              <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-600">
                <button onClick={() => setActiveRole('client')}
                  className={`py-1 px-2 md:py-1.5 md:px-3 rounded-md text-[10px] md:text-xs font-bold transition cursor-pointer ${activeRole === 'client' ? 'bg-slate-800 text-slate-100 shadow-xs' : 'text-slate-500'}`}>
                  {t('header.role.client')}
                </button>
                <button onClick={() => setActiveRole('cleaner')}
                  className={`py-1 px-2 md:py-1.5 md:px-3 rounded-md text-[10px] md:text-xs font-bold transition cursor-pointer ${activeRole === 'cleaner' ? 'bg-slate-800 text-slate-100 shadow-xs' : 'text-slate-500'}`}>
                  {t('header.role.cleaner')}
                </button>
              </div>

              {activeRole === 'client' ? (
                <button onClick={() => { setViewingForm('post-job'); setPrefilledJobData(null); }}
                  className="bg-slate-950 hover:bg-slate-900 text-white font-bold text-[10px] md:text-xs px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg transition-all shadow-xs cursor-pointer whitespace-nowrap">
                  {t('header.btn.post.job')}
                </button>
              ) : (
                <button onClick={() => setViewingForm('register-cleaner')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] md:text-xs px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg transition-all shadow-xs cursor-pointer whitespace-nowrap">
                  {t('header.btn.register')}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3 text-slate-500">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-medium">{t('app.loading')}</p>
            </div>
          </div>
        ) : viewingForm === 'post-job' ? (
          <JobPostForm onPostJob={handlePostJob} onCancel={() => { setViewingForm('none'); setPrefilledJobData(null); }} prefilled={prefilledJobData} />
        ) : viewingForm === 'register-cleaner' ? (
          <CleanerRegisterForm onRegister={handleRegisterCleaner} onCancel={() => setViewingForm('none')} />
        ) : activeRole === 'client' ? (
          <DashboardEmpresa
            professionals={professionals} jobs={jobs}
            onOpenRegisterJob={(prefill) => { if (prefill) setPrefilledJobData(prefill); else setPrefilledJobData(null); setViewingForm('post-job'); }}
            onViewCleanerDetails={(id) => setSelectedCleanerId(id)}
            onViewJobDetails={(id) => setSelectedJobId(id)} />
        ) : (
          <DashboardProfissional
            jobs={jobs} professionals={professionals} activeProfessionalId={activeProfessionalId}
            onSelectActiveProfessional={setActiveProfessionalId}
            onOpenRegisterProfessional={() => setViewingForm('register-cleaner')}
            onViewJobDetails={(id) => setSelectedJobId(id)} onApplyToJob={handleApplyToJob}
            clientReviews={clientReviews} />
        )}
      </main>

      <footer className="bg-slate-950 text-slate-500 text-[10px] md:text-xs py-4 md:py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p>{t('app.footer', { year: new Date().getFullYear() })}</p>
          <div className="flex gap-4">
            <span className="text-[9px] md:text-[10px] text-slate-500">{t('app.terms')}</span>
            <span className="text-[9px] md:text-[10px] text-slate-500">{t('app.privacy')}</span>
          </div>
        </div>
      </footer>

      {toastMessage && (
        <div id="visual-toast-banner"
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 animate-fade-in flex items-center gap-2.5 bg-slate-950 border border-slate-800 text-white rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 shadow-2xl max-w-xs md:max-w-sm">
          <div className="bg-emerald-500 text-black rounded-full p-1 flex-shrink-0">
            <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-black" />
          </div>
          <div>
            <p className="text-[11px] md:text-xs font-bold">{t('system.alert')}</p>
            <p className="text-[10px] md:text-[11px] text-slate-300 mt-0.5 leading-snug">{toastMessage}</p>
          </div>
        </div>
      )}

      {selectedCleanerId && (
        <CleanerDetailsModal
          professional={professionals.find(p => p.id === selectedCleanerId)!}
          onClose={() => setSelectedCleanerId(null)}
          onDirectHire={(proId) => {
            setSelectedCleanerId(null);
            const chosenPro = professionals.find(p => p.id === proId);
            const hourly = chosenPro ? chosenPro.hourlyRate : 35;
            setPrefilledJobData({
              title: lang === 'pt' ? `Limpeza Direta com ${chosenPro?.name || 'Profissional'}` :
                     lang === 'es' ? `Limpieza Directa con ${chosenPro?.name || 'Profesional'}` :
                     `Direct Cleaning with ${chosenPro?.name || 'Professional'}`,
              clientType: 'residencial', cleaningType: 'residencial', price: hourly * 4, durationHours: 4, sizeSqm: 80,
              description: lang === 'pt' ? `Faxina solicitada por meio de contratação direta para ${chosenPro?.name}. Favor confirmar data e detalhes.` :
                           lang === 'es' ? `Limpieza solicitada mediante contratación directa para ${chosenPro?.name}. Favor confirmar fecha y detalles.` :
                           `Cleaning requested via direct hire for ${chosenPro?.name}. Please confirm date and details.`,
              extras: []
            });
            setViewingForm('post-job');
            showToast(t('toast.proposal.sent', { name: chosenPro?.name || '' }), 'info');
          }}
          onAddReview={handleAddProfessionalReview} />
      )}

      {selectedJobId && (
        <JobDetailsModal
          job={jobs.find(j => j.id === selectedJobId)!} currentProfessionalId={activeProfessionalId}
          allProfessionals={professionals} onClose={() => setSelectedJobId(null)}
          onApply={handleApplyToJob} onApproveCandidate={handleApproveCandidate}
          onSendChatMessage={handleSendChatMessage} clientReviews={clientReviews}
          onAddClientReview={handleAddClientReview} />
      )}

      <AIChatAssistant />
    </div>
  );
}
