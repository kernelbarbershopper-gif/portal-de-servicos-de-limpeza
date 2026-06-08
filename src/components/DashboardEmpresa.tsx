import { useState } from 'react';
import { Professional, Job, CleaningType } from '../types';
import CleanerCard from './CleanerCard';
import { Search, Filter, Plus, Minus, Calendar, Star, Building, ShoppingBag, Info, User, CheckCircle, Calculator, Sparkles } from 'lucide-react';
import { formatCurrency, getCleaningTypeLabel, EXTRAS_AVAILABLE, getExtraPrice } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';

interface DashboardEmpresaProps {
  professionals: Professional[];
  jobs: Job[];
  onOpenRegisterJob: (prefilled?: any) => void;
  onViewCleanerDetails: (id: string) => void;
  onViewJobDetails: (id: string) => void;
}

export default function DashboardEmpresa({
  professionals,
  jobs,
  onOpenRegisterJob,
  onViewCleanerDetails,
  onViewJobDetails
}: DashboardEmpresaProps) {
  const { t, lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<CleaningType | 'todos'>('todos');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'rate-low' | 'rate-high' | 'experience'>('rating');

  // --- Premium Calculator States (Inspired by Helpling/Handy) ---
  const [calcRooms, setCalcRooms] = useState(2);
  const [calcBaths, setCalcBaths] = useState(1);
  const [calcType, setCalcType] = useState<CleaningType>('residencial');
  const [calcExtras, setCalcExtras] = useState<string[]>([]);

  // Calculate dynamic outputs
  const getCalculation = () => {
    // Estimations of duration (in hours)
    let baseHours = 2; // base for 1 bedroom
    if (calcType === 'comercial') baseHours = 3;
    if (calcType === 'pesada') baseHours = 5;
    if (calcType === 'pos-obra') baseHours = 6;

    const extraRoomsHours = Math.max(0, calcRooms - 1) * 0.5;
    const extraBathsHours = Math.max(0, calcBaths - 1) * 0.5;
    const extraServicesHours = calcExtras.length * 0.5;

    const totalHours = Math.round((baseHours + extraRoomsHours + extraBathsHours + extraServicesHours) * 2) / 2; // round to nearest 0.5

    // Multipliers for rate per hour
    let hourlyRate = 35;
    if (calcType === 'comercial') hourlyRate = 40;
    if (calcType === 'pesada') hourlyRate = 45;
    if (calcType === 'pos-obra') hourlyRate = 50;

    const baseCost = totalHours * hourlyRate;
    const extrasCost = calcExtras.reduce((sum, extraId) => sum + getExtraPrice(extraId), 0);
    const totalCost = baseCost + extrasCost;

    // Approximate Size (Sqm) helper
    const approxSqm = (calcRooms * 25) + (calcBaths * 12) + (calcType === 'comercial' ? 40 : 20);

    return {
      hours: totalHours,
      cost: totalCost,
      sqm: approxSqm
    };
  };

  const calculated = getCalculation();

  const toggleCalcExtra = (id: string) => {
    setCalcExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const handleApplyCalculatedBudget = () => {
    const formattedTitle = `Limpeza ${getCleaningTypeLabel(calcType)} (${calcRooms} Q / ${calcBaths} B)`;
    const prefilledDescription = `Faxina contratada com base no calculador inteligente global do LimpezaJá. Local composto por ${calcRooms} cômodo(s)/quarto(s) e ${calcBaths} banheiro(s). Serviços adicionais incluídos: ${calcExtras.length > 0 ? calcExtras.join(', ') : 'Nenhum'}.`;
    
    onOpenRegisterJob({
      title: formattedTitle,
      clientType: calcType === 'comercial' ? 'empresa' : 'residencial',
      cleaningType: calcType,
      price: calculated.cost,
      durationHours: Math.min(12, Math.max(2, Math.round(calculated.hours))),
      sizeSqm: calculated.sqm,
      description: prefilledDescription,
      extras: calcExtras
    });
  };

  // Filter professionals based on search and selected specialty
  const filteredProfessionals = professionals
    .filter((pro) => {
      const matchesSearch = pro.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            pro.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pro.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'todos' || pro.cleaningTypes.includes(selectedType);
      const matchesRating = pro.rating >= minRating;

      return matchesSearch && matchesType && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'rate-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'rate-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return 0;
    });

  return (
    <div id="company-contractor-dashboard" className="space-y-8 animate-fade-in">
      {/* Banner / Hero Section */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl space-y-4">
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/20">
            {t('dashboard.company.hero.badge')}
          </span>
          <h1 className="text-2xl md:text-4xl font-black font-sans leading-tight">
            {t('dashboard.company.hero.title')}
          </h1>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            {t('dashboard.company.hero.desc')}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              id="btn-post-cleaning-banner"
              onClick={() => onOpenRegisterJob()}
              className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950" /> {t('dashboard.company.hero.btn')}
            </button>
          </div>
        </div>
      </div>

      {/* --- PRESTIGE GLOBAL FEATURE: ESTIMATOR CALCULATOR CARD --- */}
      <div id="smart-calculator-widget" className="bg-slate-900 rounded-3xl border border-slate-700 p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-bl-2xl flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-600 animate-spin" /> Tecnologia Recomendada
        </div>
        
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-2xl">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-200">{t('dashboard.company.calc.title')}</h2>
            <p className="text-xs text-slate-500">{t('dashboard.company.calc.desc')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
          
          {/* Controls Column */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Input selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('dashboard.company.calc.rooms')}</label>
                <div className="flex items-center group">
                  <button 
                    onClick={() => setCalcRooms(Math.max(1, calcRooms - 1))}
                    className="p-2 border border-slate-600 bg-slate-900 hover:bg-slate-800 rounded-l-xl text-slate-500 cursor-pointer text-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-full text-center border-y border-slate-600 bg-slate-900 py-1.5 font-mono text-xs font-bold text-slate-200">
                    {t('dashboard.company.calc.rooms.n', { n: calcRooms })}
                  </div>
                  <button 
                    onClick={() => setCalcRooms(Math.min(10, calcRooms + 1))}
                    className="p-2 border border-slate-600 bg-slate-900 hover:bg-slate-800 rounded-r-xl text-slate-500 cursor-pointer text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('dashboard.company.calc.baths')}</label>
                <div className="flex items-center group">
                  <button 
                    onClick={() => setCalcBaths(Math.max(1, calcBaths - 1))}
                    className="p-2 border border-slate-600 bg-slate-900 hover:bg-slate-800 rounded-l-xl text-slate-500 cursor-pointer text-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-full text-center border-y border-slate-600 bg-slate-900 py-1.5 font-mono text-xs font-bold text-slate-200">
                    {t('dashboard.company.calc.baths.n', { n: calcBaths })}
                  </div>
                  <button 
                    onClick={() => setCalcBaths(Math.min(5, calcBaths + 1))}
                    className="p-2 border border-slate-600 bg-slate-900 hover:bg-slate-800 rounded-r-xl text-slate-500 cursor-pointer text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('dashboard.company.calc.type')}</label>
                <select
                  value={calcType}
                  onChange={(e: any) => setCalcType(e.target.value)}
                  className="w-full py-1.5 px-3 border border-slate-600 rounded-xl bg-slate-900 text-xs text-slate-300 outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  <option value="residencial">{t('calc.type.residential')}</option>
                  <option value="comercial">{t('calc.type.commercial')}</option>
                  <option value="pesada">{t('calc.type.heavy')}</option>
                  <option value="pos-obra">{t('calc.type.pos')}</option>
                </select>
              </div>
            </div>

            {/* Extras Selection internally */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">{t('dashboard.company.calc.extras')}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {EXTRAS_AVAILABLE.map((extra) => {
                  const isChecked = calcExtras.includes(extra.id);
                  return (
                    <button
                      key={extra.id}
                      onClick={() => toggleCalcExtra(extra.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isChecked 
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-400/20' 
                          : 'bg-slate-900 border-slate-600 text-slate-500 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="text-[11px] line-clamp-1">{extra.label}</div>
                      <div className="text-[10px] text-slate-500 font-normal">+{formatCurrency(extra.price, lang)}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-600 p-4.5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-slate-420 font-black block mb-1">{t('dashboard.company.calc.result')}</span>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 border-b border-dashed border-slate-700 pb-1.5">
                  <span>{t('dashboard.company.calc.duration')}</span>
                  <span className="font-bold text-slate-200">{calculated.hours} horas</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 border-b border-dashed border-slate-700 pb-1.5">
                  <span>{t('dashboard.company.calc.area')}</span>
                  <span className="font-bold text-slate-200">~{calculated.sqm} m²</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 pb-1">
                  <span>{t('dashboard.company.calc.extras.active')}</span>
                  <span className="font-bold text-slate-200">{calcExtras.length} itens</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">{t('dashboard.company.calc.price')}</span>
              <span className="text-2xl font-black font-mono text-emerald-700 tracking-tight block mt-0.5">{formatCurrency(calculated.cost, lang)}</span>
            </div>

            <button
              onClick={handleApplyCalculatedBudget}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {t('dashboard.company.calc.apply')}
            </button>
          </div>

        </div>
      </div>

      {/* Your Posted Services / My Jobs list section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-extrabold font-sans text-slate-200">{t('dashboard.company.jobs.title', { n: jobs.length })}</h2>
            <p className="text-xs text-slate-500">{t('dashboard.company.jobs.desc')}</p>
          </div>
          <button
            onClick={() => onOpenRegisterJob()}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/85 transition-colors px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> {t('dashboard.company.jobs.new')}
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl border border-dashed border-slate-600 p-8 text-center bg-slate-800/50">
            <p className="text-slate-450 italic text-xs">{t('dashboard.company.jobs.empty')}</p>
            <button
              onClick={() => onOpenRegisterJob()}
              className="mt-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              {t('dashboard.company.jobs.first')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => {
              const isAssigned = job.assignedTo !== null;
              const hasApplicants = job.applicants.length > 0;
              return (
                <div 
                  key={job.id}
                  className={`bg-slate-900 rounded-2xl border p-4 flex flex-col justify-between transition-all hover:bg-slate-700/50 ${
                    isAssigned ? 'border-emerald-250 bg-emerald-50/5 shadow-2xs' : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        job.clientType === 'empresa' ? 'bg-slate-800 text-slate-200' : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        {job.clientType === 'empresa' ? t('dashboard.company.jobs.corporate') : t('dashboard.company.jobs.residential')}
                      </span>
                      
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isAssigned 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : hasApplicants 
                            ? 'bg-amber-100 text-amber-800 animate-pulse' 
                            : 'bg-slate-800 text-slate-500'
                      }`}>
                        {isAssigned ? t('dashboard.company.jobs.filled') : hasApplicants ? t('dashboard.company.jobs.interested', { n: job.applicants.length }) : t('dashboard.company.jobs.none')}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-slate-200 text-sm line-clamp-1 mb-1">{job.title}</h3>
                    <p className="text-[10px] font-mono text-slate-500 mb-2">{t('dashboard.company.jobs.price')} <span className="font-bold text-emerald-700">{formatCurrency(job.price, lang)}</span> | {t('dashboard.company.jobs.date')} {job.date}</p>
                    <p className="text-slate-500 text-xs text-slate-500 line-clamp-2 leading-relaxed">{job.description}</p>
                    
                    {/* Show simple list of extras if any */}
                    {job.extras && job.extras.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.extras.map(e => (
                          <span key={e} className="text-[9px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded">
                            +{e}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-700 mt-4 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-405 font-medium block">
                      {isAssigned ? t('dashboard.company.jobs.assigned') : t('dashboard.company.jobs.waiting')}
                    </span>
                    <button
                      onClick={() => onViewJobDetails(job.id)}
                      className="bg-slate-900 text-white font-semibold hover:bg-emerald-600 active:bg-emerald-700 text-[11px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {hasApplicants && !isAssigned ? t('dashboard.company.jobs.review') : t('dashboard.company.jobs.details')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Directory & Filters of Cleaning Professionals */}
      <div>
        <div className="border-t border-slate-700 pt-6">
          <div className="md:flex md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-lg font-bold font-sans text-slate-200">{t('dashboard.company.dir.title')}</h2>
              <p className="text-xs text-slate-500">{t('dashboard.company.dir.desc')}</p>
            </div>
            
            {/* Quick Sorting Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 whitespace-nowrap">{t('dashboard.company.dir.sort')}</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="text-xs py-2 px-3 border border-slate-600 rounded-xl bg-slate-900 text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              >
                <option value="rating">{t('dashboard.company.dir.sort.rating')}</option>
                <option value="rate-low">{t('dashboard.company.dir.sort.low')}</option>
                <option value="rate-high">{t('dashboard.company.dir.sort.high')}</option>
                <option value="experience">{t('dashboard.company.dir.sort.exp')}</option>
              </select>
            </div>
          </div>

          {/* Search + categories filtering header */}
          <div className="bg-slate-800 rounded-2xl p-4 mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Search text input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder={t('dashboard.company.dir.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs text-slate-200 bg-slate-900 border border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400 outline-none"
                />
              </div>

              {/* Min rating filter */}
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-600 rounded-xl px-3 py-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                <span className="text-xs text-slate-500 min-w-[130px]">{t('dashboard.company.dir.min.rating')}</span>
                <div className="flex gap-1">
                  {[0, 4.0, 4.5, 4.8, 5.0].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setMinRating(star)}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                        minRating === star
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-105 hover:bg-slate-600 text-slate-500'
                      }`}
                    >
                      {star === 0 ? t('dashboard.company.dir.any') : `${star}★`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Specialty tag picker */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-600/60">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> {t('dashboard.company.dir.filter')}
              </span>
              {[
                { type: 'todos', label: t('dashboard.company.dir.all') },
                { type: 'residencial', label: t('dashboard.company.dir.residential') },
                { type: 'comercial', label: t('dashboard.company.dir.commercial') },
                { type: 'pesada', label: t('dashboard.company.dir.heavy') },
                { type: 'pos-obra', label: t('dashboard.company.dir.pos') }
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setSelectedType(item.type as any)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    selectedType === item.type
                      ? 'bg-slate-900 border-slate-900 text-white font-medium'
                      : 'bg-slate-900 border-slate-600 text-slate-500 hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Directory Grid output */}
          {filteredProfessionals.length === 0 ? (
            <div className="bg-slate-900 rounded-2xl border border-slate-700 p-12 text-center shadow-xs">
              <Info className="w-8 h-8 text-slate-450 mx-auto mb-2" />
              <p className="text-slate-500 font-sans italic text-sm">{t('dashboard.company.dir.empty')}</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('todos');
                  setMinRating(0);
                }}
                className="mt-3 text-xs text-emerald-600 underline hover:text-emerald-700 cursor-pointer font-bold"
              >
                {t('dashboard.company.dir.clear')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProfessionals.map((pro) => (
                <CleanerCard 
                  key={pro.id} 
                  professional={pro} 
                  onViewDetails={onViewCleanerDetails} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
