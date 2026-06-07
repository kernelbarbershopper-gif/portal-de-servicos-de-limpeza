import React, { useState } from 'react';
import { Job, CleaningType } from '../types';
import { FileText, Building, Home, MapPin, Calendar, Clock, DollarSign, Sparkles, Check, Phone, Mail, Plus } from 'lucide-react';
import { EXTRAS_AVAILABLE, formatCurrency } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';

interface JobPostFormProps {
  onPostJob: (job: Job) => void;
  onCancel: () => void;
  prefilled?: {
    title?: string;
    clientType?: 'empresa' | 'residencial';
    cleaningType?: CleaningType;
    price?: number;
    durationHours?: number;
    sizeSqm?: number;
    description?: string;
    extras?: string[];
  };
}

export default function JobPostForm({ onPostJob, onCancel, prefilled }: JobPostFormProps) {
  const { t, lang } = useLanguage();
  const [title, setTitle] = useState(prefilled?.title || '');
  const [clientName, setClientName] = useState('');
  const [clientType, setClientType] = useState<'empresa' | 'residencial'>(prefilled?.clientType || 'empresa');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState(prefilled?.description || '');
  const [cleaningType, setCleaningType] = useState<CleaningType>(prefilled?.cleaningType || 'comercial');
  const [price, setPrice] = useState(prefilled?.price || 250);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('08:00');
  const [durationHours, setDurationHours] = useState(prefilled?.durationHours || 6);
  const [address, setAddress] = useState('');
  const [sizeSqm, setSizeSqm] = useState(prefilled?.sizeSqm || 100);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(prefilled?.extras || []);
  const [error, setError] = useState('');

  // Auto-set cleaning style suggestions when client type toggles
  const handleClientTypeChange = (type: 'empresa' | 'residencial') => {
    setClientType(type);
    if (!prefilled) {
      if (type === 'empresa') {
        setCleaningType('comercial');
      } else {
        setCleaningType('residencial');
      }
    }
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev => {
      const isSelected = prev.includes(extraId);
      if (isSelected) {
        return prev.filter(id => id !== extraId);
      } else {
        return [...prev, extraId];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) return setError(t('form.job.error.title'));
    if (!clientName.trim()) return setError(t('form.job.error.clientName'));
    if (!phone.trim()) return setError(t('form.job.error.phone'));
    if (!email.trim() || !email.includes('@')) return setError(t('form.job.error.email'));
    if (!description.trim() || description.length < 15) return setError(t('form.job.error.description'));
    if (!date) return setError(t('form.job.error.date'));
    if (!address.trim()) return setError(t('form.job.error.address'));
    if (price <= 20) return setError(t('form.job.error.price'));
    if (sizeSqm <= 0) return setError(t('form.job.error.size'));

    const newJob: Job = {
      id: 'j_' + Date.now().toString(),
      title,
      clientName,
      clientType,
      phone,
      email,
      description,
      cleaningType,
      price,
      date,
      time,
      durationHours,
      address,
      sizeSqm,
      status: 'aberto',
      applicants: [],
      assignedTo: null,
      createdAt: new Date().toISOString(),
      extras: selectedExtras,
      chatMessages: [
        {
          id: 'chat_' + Date.now() + '_init',
          sender: 'client',
          senderName: clientName,
          text: lang === 'pt' ? `Olá profissionais! Publiquei esta oferta para o dia ${date} às ${time}. Preciso de um trabalho focado e caprichado.` : lang === 'es' ? `¡Hola profesionales! Publiqué esta oferta para el día ${date} a las ${time}. Necesito un trabajo enfocado y esmerado.` : `Hello professionals! I posted this offer for ${date} at ${time}. I need focused and careful work.`,
          timestamp: new Date().toISOString()
        }
      ]
    };

    onPostJob(newJob);
  };

  return (
    <div id="job-post-form-container" className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold font-sans text-slate-800 flex items-center gap-2">
            <Building className="text-emerald-600 w-5 h-5" /> {t('form.job.title')}
          </h2>
          {prefilled ? (
            <p className="text-xs text-amber-600 font-bold mt-1 bg-amber-50 border border-amber-100 px-3 py-1 rounded-lg inline-block">
              {t('form.job.copied')}
            </p>
          ) : (
            <p className="text-xs text-slate-500 mt-1">{t('form.job.desc')}</p>
          )}
        </div>
        <button
          onClick={onCancel}
          className="text-xs text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          {t('form.job.back')}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Type selector: corporate vs residential */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('form.job.who')}</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleClientTypeChange('empresa')}
              className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                clientType === 'empresa'
                  ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Building className="w-4 h-4" />
              {t('form.job.company')}
            </button>
            
            <button
              type="button"
              onClick={() => handleClientTypeChange('residencial')}
              className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                clientType === 'residencial'
                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Home className="w-4 h-4" />
              {t('form.job.residential')}
            </button>
          </div>
        </div>

        {/* Client details / Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              {clientType === 'empresa' ? t('form.job.companyName') : t('form.job.responsibleName')}
            </label>
            <input
              type="text"
              placeholder={clientType === 'empresa' ? 'Ex: Escritórios Associados S.A.' : 'Ex: Clara Regina Vilela'}
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('form.job.title.label')}</label>
            <input
              type="text"
              placeholder="Ex: Faxina quinzenal escritório recepção / Faxina de natal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('form.job.phone.label')}</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="(11) 98888-7777"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('form.job.email.label')}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="adm@negocio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Cleaning style select */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('form.job.type.label')}</label>
            <select
              value={cleaningType}
              onChange={(e) => setCleaningType(e.target.value as CleaningType)}
              className="w-full py-2.5 px-3 text-xs text-slate-800 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            >
              <option value="residencial">{t('form.job.type.residential')}</option>
              <option value="comercial">{t('form.job.type.commercial')}</option>
              <option value="pesada">{t('form.job.type.heavy')}</option>
              <option value="pos-obra">{t('form.job.type.posObra')}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('form.job.size.label')}</label>
            <input
              type="number"
              min="10"
              max="5000"
              value={sizeSqm}
              onChange={(e) => setSizeSqm(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Dynamic Extras Selectors - GLOBAL PLATFORM PRESTIGE */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('form.job.extras.label')}</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {EXTRAS_AVAILABLE.map((extra) => {
              const checked = selectedExtras.includes(extra.id);
              return (
                <button
                  type="button"
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    checked
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-bold ring-2 ring-emerald-500/25'
                      : 'border-slate-100 bg-slate-50/40 hover:bg-slate-50 text-slate-650'
                  }`}
                >
                  <span className="text-[11px] line-clamp-1">{extra.label}</span>
                  <span className="text-[10px] text-slate-400 font-normal">+{formatCurrency(extra.price, lang)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scheduling Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('form.job.date.label')}</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('form.job.time.label')}</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('form.job.duration.label')}</label>
            <select
              value={durationHours}
              onChange={(e) => setDurationHours(parseInt(e.target.value) || 4)}
              className="w-full py-2 px-3 text-xs text-slate-800 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            >
              <option value="2">{t('form.job.duration.2h')}</option>
              <option value="4">{t('form.job.duration.4h')}</option>
              <option value="6">{t('form.job.duration.6h')}</option>
              <option value="8">{t('form.job.duration.8h')}</option>
              <option value="12">{t('form.job.duration.12h')}</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('form.job.address.label')}</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rua, Número, Bairro - Cidade, Estado (Ex: Av. Paulista, 1200 - Bela Vista, SP)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Details & description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('form.job.desc.label')}</label>
          <textarea
            placeholder={t('form.job.desc.placeholder')}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* Proposed reward budget */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{t('form.job.price.label')}</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold font-mono text-sm">R$</div>
            <input
              type="number"
              min="20"
              max="2000"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-2.5 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-base font-extrabold font-mono"
            />
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">{t('form.job.price.hint')}</span>
        </div>

        {/* Actions Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {t('form.job.back')}
          </button>
          
          <button
            id="btn-post-job-submit"
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:bg-slate-950 transition-all cursor-pointer shadow-md"
          >
            {t('form.job.submit')}
          </button>
        </div>
      </form>
    </div>
  );
}
