import { useState } from 'react';
import { Job, Professional, CleaningType, ClientReview } from '../types';
import JobCard from './JobCard';
import { Search, Filter, Sparkles, TrendingUp, CheckCircle, Clock, Smartphone, AlertCircle, RefreshCw } from 'lucide-react';
import { formatCurrency, getCleaningTypeLabel } from '../utils';

interface DashboardProfissionalProps {
  jobs: Job[];
  professionals: Professional[];
  activeProfessionalId: string | null;
  onSelectActiveProfessional: (id: string | null) => void;
  onOpenRegisterProfessional: () => void;
  onViewJobDetails: (id: string) => void;
  onApplyToJob: (jobId: string) => void;
  clientReviews: ClientReview[];
}

export default function DashboardProfissional({
  jobs,
  professionals,
  activeProfessionalId,
  onSelectActiveProfessional,
  onOpenRegisterProfessional,
  onViewJobDetails,
  onApplyToJob,
  clientReviews
}: DashboardProfissionalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<CleaningType | 'todos'>('todos');
  const [minPrice, setMinPrice] = useState<number>(0);

  const getClientRating = (clientName: string) => {
    const reviews = clientReviews.filter(r => r.clientName === clientName);
    if (reviews.length === 0) return 5.0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  };

  // Active Professional detail
  const activePro = professionals.find(p => p.id === activeProfessionalId);

  // Filter open jobs
  const openJobs = jobs.filter((job) => {
    // Show job if open OR if we are applied to it
    const isApplied = activeProfessionalId ? job.applicants.includes(activeProfessionalId) : false;
    const matchesStatus = job.status === 'aberto' || isApplied;

    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'todos' || job.cleaningType === selectedType;
    const matchesPrice = job.price >= minPrice;

    return matchesStatus && matchesSearch && matchesType && matchesPrice;
  });

  // Calculate my applications & status
  const myApplications = activeProfessionalId 
    ? jobs.filter(j => j.applicants.includes(activeProfessionalId)) 
    : [];

  return (
    <div id="professional-cleaners-dashboard" className="space-y-8 animate-fade-in">
      {/* Simulation Identity Banner */}
      <div className="bg-emerald-650 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5 col-span-3">
            <span className="bg-white/10 text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wide">
              Área de Trabalho da Faxina
            </span>
            <h2 className="text-xl md:text-2xl font-black font-sans leading-none">
              Olá, Profissional de Limpeza!
            </h2>
            <p className="text-emerald-100 text-xs">
              Selecione quem você é para simular candidaturas, ou crie seu perfil profissional se ainda não estiver cadastrado.
            </p>
          </div>

          {/* Identity switcher dropdown simulator */}
          <div className="flex flex-col gap-2 bg-black/15 backdrop-blur-xs p-4 rounded-2xl border border-white/10 min-w-[250px]">
            <label className="text-[10px] text-emerald-200 uppercase font-black tracking-widest">Seu Perfil Ativo (Simulador)</label>
            {professionals.length === 0 ? (
              <p className="text-xs text-white italic">Nenhum cadastrado</p>
            ) : (
              <select
                id="active-professional-simulator-select"
                value={activeProfessionalId || ''}
                onChange={(e) => onSelectActiveProfessional(e.target.value || null)}
                className="text-xs font-bold py-2 px-3 rounded-lg bg-white text-slate-800 border border-slate-200 focus:outline-none"
              >
                <option value="">-- Escolher quem está navegando --</option>
                {professionals.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.location.split(',')[0]} - R$ {p.hourlyRate}/h)
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={onOpenRegisterProfessional}
              className="text-center text-[10px] font-black text-emerald-200 hover:text-white underline mt-1.5 flex items-center justify-center gap-1 cursor-pointer"
            >
              🚀 Não está na lista? Cadastre-se em 1 minuto
            </button>
          </div>
        </div>
      </div>

      {activePro && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <img 
              src={activePro.avatar} 
              alt={activePro.name} 
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 bg-slate-50"
            />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Logado como</p>
              <h3 className="font-bold text-slate-800 font-sans text-xs">{activePro.name}</h3>
              <p className="text-[10px] text-emerald-700 bg-emerald-50 inline-block px-1.5 py-0.5 rounded-md font-semibold mt-0.5">{activePro.location}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center border-t md:border-t-0 md:border-x border-slate-100 py-3 md:py-0 px-0 md:px-6">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Seus Ganhos Propostos</span>
            <span className="text-base font-extrabold text-slate-800 font-sans mt-0.5">
              {formatCurrency(activePro.hourlyRate)}/hora
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Suas Candidaturas Ativas</span>
            <span className="text-base font-extrabold text-slate-800 font-sans mt-0.5 flex items-center gap-1.5">
              {myApplications.length} {myApplications.length === 1 ? 'vaga' : 'vagas'}
            </span>
          </div>
        </div>
      )}

      {/* Alerts for non registered */}
      {!activeProfessionalId && (
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="font-bold">Modo de Visualização</p>
            <p className="text-slate-600 mt-0.5">Para se candidatar a faxinas residenciais ou corporativas, por favor selecione ou cadastre uma identidade profissional no painel acima.</p>
          </div>
        </div>
      )}

      {/* Applied jobs tracker */}
      {activeProfessionalId && myApplications.length > 0 && (
        <div>
          <h3 className="text-base font-extrabold text-slate-800 font-sans mb-3.5 flex items-center gap-2">
            📥 Status de Minhas Candidaturas ({myApplications.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-3xl">
            {myApplications.map((job) => {
              const isAssignedToMe = job.assignedTo === activeProfessionalId;
              const isAssignedToSomeoneElse = job.assignedTo !== null && job.assignedTo !== activeProfessionalId;
              
              return (
                <div key={job.id} className="bg-white p-4 rounded-2xl border border-slate-150 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                        {getCleaningTypeLabel(job.cleaningType)}
                      </span>
                      
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isAssignedToMe
                          ? 'bg-emerald-100 text-emerald-800'
                          : isAssignedToSomeoneElse
                            ? 'bg-red-50 text-red-700'
                            : 'bg-indigo-50 text-indigo-850 animate-pulse'
                      }`}>
                        {isAssignedToMe ? 'Contratado(a) ✔️' : isAssignedToSomeoneElse ? 'Preenchido por outro' : 'Aguardando Avaliação'}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-slate-800 line-clamp-1 text-xs">{job.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Contratante: {job.clientName}</p>
                    <p className="text-slate-550 text-xs mt-2 line-clamp-2">{job.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-emerald-700">{formatCurrency(job.price)}</p>
                    <button
                      onClick={() => onViewJobDetails(job.id)}
                      className="text-[10.5px] font-bold bg-slate-900 text-white rounded-lg px-2.5 py-1.5 hover:bg-emerald-600 transition-colors cursor-pointer"
                    >
                      Ver Detalhes do Contrato
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Gigs Board */}
      <div>
        <div className="border-t border-slate-100 pt-6">
          <div className="md:flex md:items-center md:justify-between mb-4 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-lg font-bold font-sans text-slate-800">Oportunidades de Faxina Disponíveis</h2>
              <p className="text-xs text-slate-500">Candidate-se para fazer faxinas em empresas e recidências conforme sua agenda.</p>
            </div>
          </div>

          {/* Filter bars */}
          <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search text input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Pesquisar por título, empresa, endereço ou palavra-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
              </div>

              {/* Slider / Budget selector */}
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-1">
                <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs text-slate-500 min-w-[130px]">Valor Mínimo Cobrado:</span>
                <div className="flex gap-1">
                  {[0, 150, 200, 250, 350].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setMinPrice(val)}
                      className={`text-[10px] px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                        minPrice === val
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {val === 0 ? 'Qualquer' : `R$ ${val}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Specialty tag picker */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filtrar Tipo de Obra:
              </span>
              {[
                { type: 'todos', label: 'Todos os Serviços' },
                { type: 'residencial', label: 'Apenas Residenciais' },
                { type: 'comercial', label: 'Apenas Comerciais' },
                { type: 'pesada', label: 'Apenas Faxinas Pesadas' },
                { type: 'pos-obra', label: 'Apenas Pós-Obra' }
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setSelectedType(item.type as any)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    selectedType === item.type
                      ? 'bg-slate-900 border-slate-900 text-white font-medium'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gigs lists */}
          {openJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-xs">
              <p className="text-slate-450 font-sans italic text-sm">Não encontramos nenhum serviço com os filtros configurados.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('todos');
                  setMinPrice(0);
                }}
                className="mt-3 text-xs text-emerald-600 underline hover:text-emerald-700 cursor-pointer font-bold"
              >
                Limpar todos os filtros para reexibir todos os anúncios
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job}
                  currentProfessionalId={activeProfessionalId}
                  onViewDetails={onViewJobDetails}
                  onApply={onApplyToJob}
                  clientRating={getClientRating(job.clientName)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
