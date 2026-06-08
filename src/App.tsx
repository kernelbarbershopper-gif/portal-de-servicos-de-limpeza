import { useState, useEffect } from 'react';
import { Professional, Job, ChatMessage, ClientReview } from './types';
import { INITIAL_PROFESSIONALS, INITIAL_JOBS, INITIAL_CLIENT_REVIEWS } from './data';
import DashboardEmpresa from './components/DashboardEmpresa';
import DashboardProfissional from './components/DashboardProfissional';
import CleanerRegisterForm from './components/CleanerRegisterForm';
import JobPostForm from './components/JobPostForm';
import { CleanerDetailsModal, JobDetailsModal } from './components/DetailModals';
import AndroidSimulator from './components/AndroidSimulator';
import { useLanguage } from './i18n/LanguageContext';
import { Sparkles, Smartphone, CheckCircle, Check } from 'lucide-react';

export default function App() {
  const { t, lang, setLang } = useLanguage();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [clientReviews, setClientReviews] = useState<ClientReview[]>([]);
  
  // App routing and views - default to web mode, auto-detect mobile later
  const [isAndroidMode, setIsAndroidMode] = useState<boolean>(false);
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    if (isMobile) setIsAndroidMode(true);
  }, []);
  const [activeRole, setActiveRole] = useState<'client' | 'cleaner'>('client');
  const [viewingForm, setViewingForm] = useState<'post-job' | 'register-cleaner' | 'none'>('none');
  const [selectedCleanerId, setSelectedCleanerId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeProfessionalId, setActiveProfessionalId] = useState<string | null>(null);
  
  // Custom smart calculator integration state
  const [prefilledJobData, setPrefilledJobData] = useState<any>(null);

  // Toast interaction signals
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');

  // Load and seed localStorage records
  useEffect(() => {
    const savedPros = localStorage.getItem('limpeza_professionals');
    const savedJobs = localStorage.getItem('limpeza_jobs');
    const savedClientReviews = localStorage.getItem('limpeza_client_reviews');

    let parsedPros = INITIAL_PROFESSIONALS;
    let parsedJobs = INITIAL_JOBS;
    let parsedClientReviews = INITIAL_CLIENT_REVIEWS;

    if (savedPros) {
      try {
        parsedPros = JSON.parse(savedPros);
      } catch (e) {
        console.error('Error parsing professionals', e);
      }
    } else {
      localStorage.setItem('limpeza_professionals', JSON.stringify(INITIAL_PROFESSIONALS));
    }

    if (savedJobs) {
      try {
        parsedJobs = JSON.parse(savedJobs);
      } catch (e) {
        console.error('Error parsing jobs', e);
      }
    } else {
      localStorage.setItem('limpeza_jobs', JSON.stringify(INITIAL_JOBS));
    }

    if (savedClientReviews) {
      try {
        parsedClientReviews = JSON.parse(savedClientReviews);
      } catch (e) {
        console.error('Error parsing client reviews', e);
      }
    } else {
      localStorage.setItem('limpeza_client_reviews', JSON.stringify(INITIAL_CLIENT_REVIEWS));
    }

    setProfessionals(parsedPros);
    setJobs(parsedJobs);
    setClientReviews(parsedClientReviews);

    // Auto-select first professional as default navigation cleaner draft
    if (parsedPros.length > 0) {
      setActiveProfessionalId(parsedPros[0].id);
    }
  }, []);

  // Save states helper helpers
  const updateProfessionalsState = (newPros: Professional[]) => {
    setProfessionals(newPros);
    localStorage.setItem('limpeza_professionals', JSON.stringify(newPros));
  };

  const updateJobsState = (newJobs: Job[]) => {
    setJobs(newJobs);
    localStorage.setItem('limpeza_jobs', JSON.stringify(newJobs));
  };

  // Toast dispatch helper
  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Cleaner Signup Action
  const handleRegisterCleaner = (newPro: Professional) => {
    const updatedPros = [newPro, ...professionals];
    updateProfessionalsState(updatedPros);
    setActiveProfessionalId(newPro.id);
    setViewingForm('none');
    setActiveRole('cleaner');
    showToast(t('toast.registered', { name: newPro.name }), 'success');
  };

  // Job Announcement Action
  const handlePostJob = (newJob: Job) => {
    const updatedJobs = [newJob, ...jobs];
    updateJobsState(updatedJobs);
    setViewingForm('none');
    setPrefilledJobData(null);
    setActiveRole('client');
    showToast(t('toast.job.posted', { title: newJob.title }), 'success');
  };

  // Apply to a specific service Opportunity
  const handleApplyToJob = (jobId: string) => {
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

    // Insert auto conversation chat note to represent active engagement
    const autoChatMessage: ChatMessage = {
      id: 'chat_msg_auto_' + Date.now(),
      sender: 'cleaner',
      senderName: applicantPro.name,
      text: lang === 'pt' ? `Olá! Tenho interesse na diária proposta de ${targetJob.title}. Garanto pontualidade e dedicação total!` :
           lang === 'es' ? `¡Hola! Estoy interesado en la tarifa de ${targetJob.title}. ¡Garantizo puntualidad y dedicación total!` :
           `Hello! I'm interested in the proposed rate for ${targetJob.title}. I guarantee punctuality and total dedication!`,
      timestamp: new Date().toISOString()
    };

    const updatedJobs = jobs.map((job) => {
      if (job.id === jobId) {
        const currMessages = job.chatMessages || [];
        return {
          ...job,
          applicants: [...job.applicants, activeProfessionalId],
          chatMessages: [...currMessages, autoChatMessage]
        };
      }
      return job;
    });

    updateJobsState(updatedJobs);
    showToast(t('toast.applied', { name: applicantPro.name }), 'success');
  };

  // Approve a cleaner candidate for a job
  const handleApproveCandidate = (jobId: string, professionalId: string) => {
    const targetPro = professionals.find(p => p.id === professionalId);
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetPro || !targetJob) return;

    // Set job status
    const updatedJobs = jobs.map((job) => {
      if (job.id === jobId) {
        return {
          ...job,
          status: 'em_andamento' as const,
          assignedTo: professionalId
        };
      }
      return job;
    });

    // Award +1 completed jobs to the cleaner profile
    const updatedPros = professionals.map((pro) => {
      if (pro.id === professionalId) {
        return {
          ...pro,
          completedJobs: pro.completedJobs + 1
        };
      }
      return pro;
    });

    updateJobsState(updatedJobs);
    updateProfessionalsState(updatedPros);
    setSelectedJobId(null); // Close details modal
    showToast(t('toast.approved', { name: targetPro.name }), 'success');
  };

  // --- PRESTIGE GLOBAL CHAT NEGOTIATION WRITER ---
  const handleSendChatMessage = (jobId: string, text: string, sender: 'client' | 'cleaner') => {
    let senderName = 'Cliente';
    if (sender === 'cleaner') {
      if (activeProfessionalId) {
        const found = professionals.find(p => p.id === activeProfessionalId);
        if (found) senderName = found.name;
      } else {
        senderName = 'Profissional';
      }
    } else {
      const job = jobs.find(j => j.id === jobId);
      if (job) senderName = job.clientName;
    }

    const newMessage: ChatMessage = {
      id: 'chat_msg_user_' + Date.now(),
      sender,
      senderName,
      text,
      timestamp: new Date().toISOString()
    };

    const updatedJobs = jobs.map((job) => {
      if (job.id === jobId) {
        const currMessages = job.chatMessages || [];
        return {
          ...job,
          chatMessages: [...currMessages, newMessage]
        };
      }
      return job;
    });

    updateJobsState(updatedJobs);
    showToast(t('toast.msg.sent'), 'success');
  };

  const handleAddProfessionalReview = (professionalId: string, rating: number, comment: string, reviewerName: string) => {
    const newReview = {
      id: 'r_pro_' + Date.now(),
      reviewerName: reviewerName || 'Cliente Anônimo',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedPros = professionals.map((pro) => {
      if (pro.id === professionalId) {
        const updatedReviews = [...(pro.reviews || []), newReview];
        const average = updatedReviews.length > 0
          ? Math.round((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length) * 10) / 10
          : 5.0;
        return {
          ...pro,
          reviews: updatedReviews,
          rating: average
        };
      }
      return pro;
    });

    updateProfessionalsState(updatedPros);
    showToast(t('toast.review.registered'), 'success');
  };

  const handleAddClientReview = (clientName: string, rating: number, comment: string, reviewerName: string) => {
    const newReview: ClientReview = {
      id: 'r_client_' + Date.now(),
      clientName,
      reviewerName: reviewerName || 'Diarista Anônimo',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedReviews = [...clientReviews, newReview];
    setClientReviews(updatedReviews);
    localStorage.setItem('limpeza_client_reviews', JSON.stringify(updatedReviews));
    showToast(t('toast.client.review.registered'), 'success');
  };

  return (
    <div id="main-application-view" className="min-h-screen bg-slate-50 flex flex-col justify-between antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* Top Header Section */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs px-4 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo element */}
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white rounded-xl p-2 shadow-sm shadow-emerald-600/15">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black font-sans text-slate-900 tracking-tight block">{t('app.title')}</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">{t('app.subtitle')}</span>
            </div>
          </div>

          {/* Language Flags */}
          <div className="flex items-center gap-1.5 self-center">
            <button
              onClick={() => setLang('pt')}
              className={`text-lg leading-none px-1 py-1 rounded-md transition-all cursor-pointer ${lang === 'pt' ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-50 hover:opacity-100'}`}
              title="Português"
            >
              🇧🇷
            </button>
            <button
              onClick={() => setLang('en')}
              className={`text-lg leading-none px-1 py-1 rounded-md transition-all cursor-pointer ${lang === 'en' ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-50 hover:opacity-100'}`}
              title="English"
            >
              🇺🇸
            </button>
            <button
              onClick={() => setLang('es')}
              className={`text-lg leading-none px-1 py-1 rounded-md transition-all cursor-pointer ${lang === 'es' ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-50 hover:opacity-100'}`}
              title="Español"
            >
              🇪🇸
            </button>
          </div>

          {/* Platform Mode Switching Selector (Desktop vs Android) */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-205/60 w-full md:w-auto self-center">
            <button
              id="switch-mode-web"
              onClick={() => {
                setIsAndroidMode(false);
              }}
              className={`flex-1 md:flex-initial py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                !isAndroidMode
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🌐 {t('header.btn.web')}
            </button>
            <button
              id="switch-mode-android"
              onClick={() => {
                setIsAndroidMode(true);
              }}
              className={`flex-1 md:flex-initial py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isAndroidMode
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 animate-pulse" />
              {t('header.btn.android')}
            </button>
          </div>

          {/* Create quick trigger shortcuts */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            {!isAndroidMode ? (
              <>
                <div className="flex bg-slate-150 p-0.5 rounded-xl border border-slate-200 mr-1">
                  <button
                    onClick={() => setActiveRole('client')}
                    className={`py-1.5 px-2.5 rounded-lg text-[10px] font-bold cursor-pointer transition ${
                      activeRole === 'client' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-500'
                    }`}
                  >
                    {t('header.role.client')}
                  </button>
                  <button
                    onClick={() => setActiveRole('cleaner')}
                    className={`py-1.5 px-2.5 rounded-lg text-[10px] font-bold cursor-pointer transition ${
                      activeRole === 'cleaner' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-500'
                    }`}
                  >
                    {t('header.role.cleaner')}
                  </button>
                </div>

                {activeRole === 'client' ? (
                  <button
                    id="header-btn-post-job"
                    onClick={() => {
                      setPrefilledJobData(null);
                      setViewingForm('post-job');
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    {t('header.btn.post.job')}
                  </button>
                ) : (
                  <button
                    id="header-btn-register-cleaner"
                    onClick={() => setViewingForm('register-cleaner')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    {t('header.btn.register')}
                  </button>
                )}
              </>
            ) : (
              <span className="hidden md:flex items-center gap-1 text-[11px] font-bold text-emerald-850 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-xl">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> {t('header.android.active')}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
        
        {/* Dynamic State view Router */}
        {isAndroidMode ? (
          <AndroidSimulator
            professionals={professionals}
            jobs={jobs}
            activeProfessionalId={activeProfessionalId}
            onSelectActiveProfessional={setActiveProfessionalId}
            onApplyToJob={handleApplyToJob}
            onPostJob={handlePostJob}
            onRegisterCleaner={handleRegisterCleaner}
            onApproveCandidate={handleApproveCandidate}
            onSendChatMessage={handleSendChatMessage}
            onCloseSimulator={() => setIsAndroidMode(false)}
            clientReviews={clientReviews}
            onAddClientReview={handleAddClientReview}
            onAddProfessionalReview={handleAddProfessionalReview}
          />
        ) : viewingForm === 'post-job' ? (
          <JobPostForm 
            onPostJob={handlePostJob} 
            onCancel={() => {
              setViewingForm('none');
              setPrefilledJobData(null);
            }} 
            prefilled={prefilledJobData}
          />
        ) : viewingForm === 'register-cleaner' ? (
          <CleanerRegisterForm 
            onRegister={handleRegisterCleaner} 
            onCancel={() => setViewingForm('none')} 
          />
        ) : activeRole === 'client' ? (
          <DashboardEmpresa
            professionals={professionals}
            jobs={jobs}
            onOpenRegisterJob={(prefill) => {
              if (prefill) {
                setPrefilledJobData(prefill);
              } else {
                setPrefilledJobData(null);
              }
              setViewingForm('post-job');
            }}
            onViewCleanerDetails={(id) => setSelectedCleanerId(id)}
            onViewJobDetails={(id) => setSelectedJobId(id)}
          />
        ) : (
          <DashboardProfissional
            jobs={jobs}
            professionals={professionals}
            activeProfessionalId={activeProfessionalId}
            onSelectActiveProfessional={setActiveProfessionalId}
            onOpenRegisterProfessional={() => setViewingForm('register-cleaner')}
            onViewJobDetails={(id) => setSelectedJobId(id)}
            onApplyToJob={handleApplyToJob}
            clientReviews={clientReviews}
          />
        )}
      </main>

      {/* Interactive Helper Banner for continuous simulation */}
      <div className="bg-slate-900 w-full text-slate-100 py-3.5 px-4 border-t border-slate-850">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-md text-[10px]">{t('banner.simulator')}</span>
            <p className="text-slate-350">{t('banner.text')}</p>
          </div>
          <div className="flex items-center gap-3.5 text-[11px] text-slate-400">
            <span>{t('banner.cleaners')} <strong>{professionals.length}</strong></span>
            <span>{t('banner.jobs')} <strong>{jobs.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p>{t('app.footer', { year: new Date().getFullYear() })}</p>
          <div className="flex gap-4">
            <span className="text-[10px] text-slate-550">{t('app.terms')}</span>
            <span className="text-[10px] text-slate-550">{t('app.privacy')}</span>
          </div>
        </div>
      </footer>

      {/* Toast Notifications Overlay */}
      {toastMessage && (
        <div 
          id="visual-toast-banner"
          className="fixed bottom-6 right-6 z-50 animate-fade-in flex items-center gap-3 bg-slate-900 border border-slate-800 text-white rounded-2xl px-5 py-4 shadow-2xl max-w-sm"
        >
          <div className="bg-emerald-500 text-slate-950 rounded-full p-1.5 flex-shrink-0 animate-bounce">
            <Check className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <p className="text-xs font-bold font-sans">{t('system.alert')}</p>
            <p className="text-[11px] text-slate-305 mt-0.5 leading-snug">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Modal overlays */}
      {selectedCleanerId && (
        <CleanerDetailsModal 
          professional={professionals.find(p => p.id === selectedCleanerId)!}
          onClose={() => setSelectedCleanerId(null)}
          onDirectHire={(proId) => {
            // Let the client send a proposal to this cleaner: simple helper automation
            setSelectedCleanerId(null);
            // Autofill the pricing & type using standard recommended stats
            const chosenPro = professionals.find(p => p.id === proId);
            const hourly = chosenPro ? chosenPro.hourlyRate : 35;
            setPrefilledJobData({
              title: lang === 'pt' ? `Limpeza Direta com ${chosenPro?.name || 'Profissional'}` :
                     lang === 'es' ? `Limpieza Directa con ${chosenPro?.name || 'Profesional'}` :
                     `Direct Cleaning with ${chosenPro?.name || 'Professional'}`,
              clientType: 'residencial',
              cleaningType: 'residencial',
              price: hourly * 4,
              durationHours: 4,
              sizeSqm: 80,
              description: lang === 'pt' ? `Faxina solicitada por meio de contratação direta para ${chosenPro?.name}. Favor confirmar data e detalhes.` :
                           lang === 'es' ? `Limpieza solicitada mediante contratación directa para ${chosenPro?.name}. Favor confirmar fecha y detalles.` :
                           `Cleaning requested via direct hire for ${chosenPro?.name}. Please confirm date and details.`,
              extras: []
            });
            setViewingForm('post-job');
            showToast(t('toast.proposal.sent', { name: chosenPro?.name || '' }), 'info');
          }}
          onAddReview={handleAddProfessionalReview}
        />
      )}

      {selectedJobId && (
        <JobDetailsModal 
          job={jobs.find(j => j.id === selectedJobId)!}
          currentProfessionalId={activeProfessionalId}
          allProfessionals={professionals}
          onClose={() => setSelectedJobId(null)}
          onApply={handleApplyToJob}
          onApproveCandidate={handleApproveCandidate}
          onSendChatMessage={handleSendChatMessage}
          clientReviews={clientReviews}
          onAddClientReview={handleAddClientReview}
        />
      )}
    </div>
  );
}
