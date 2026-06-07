import React from 'react';
import { Job } from '../types';
import { Briefcase, Building, Home, MapPin, Calendar, Clock, Sparkles, Shield, User } from 'lucide-react';
import { getCleaningTypeColor, getCleaningTypeLabel, formatCurrency, formatDate } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';

interface JobCardProps {
  key?: string;
  job: Job;
  currentProfessionalId: string | null;
  onViewDetails: (id: string) => void;
  onApply?: (id: string) => void;
  clientRating?: number;
}

export default function JobCard({ job, currentProfessionalId, onViewDetails, onApply, clientRating }: JobCardProps) {
  const { t, lang } = useLanguage();
  const isAppliedByMe = currentProfessionalId ? job.applicants.includes(currentProfessionalId) : false;
  const isAssignedToMe = currentProfessionalId ? job.assignedTo === currentProfessionalId : false;

  const colors = getCleaningTypeColor(job.cleaningType);

  return (
    <div 
      id={`job-card-${job.id}`}
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col h-full ${
        isAssignedToMe 
          ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/10' 
          : isAppliedByMe 
            ? 'border-indigo-300 shadow-xs bg-indigo-50/5' 
            : 'border-slate-100 hover:border-emerald-100 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Upper bar status */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
          job.clientType === 'empresa' 
            ? 'bg-slate-100 text-slate-800' 
            : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
        }`}>
          {job.clientType === 'empresa' ? (
            <>
              <Building className="w-3.5 h-3.5 text-slate-600" />
              {t('job.card.company')}
            </>
          ) : (
            <>
              <Home className="w-3.5 h-3.5 text-emerald-600" />
              {t('job.card.residential')}
            </>
          )}
        </span>

        {/* Price display tags */}
        <div className="text-right">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{t('job.card.price')}</p>
          <span className="text-base font-extrabold text-emerald-700 font-sans">
            {formatCurrency(job.price, lang)}
          </span>
        </div>
      </div>

      <div className="px-5 pb-5 flex-1 flex flex-col">
        {/* Title & Specialties */}
        <div className="mb-4">
          <h3 className="font-sans font-bold text-slate-800 text-base leading-snug line-clamp-2 hover:text-emerald-700 transition-colors">
            {job.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 font-sans flex items-center gap-1.5 flex-wrap">
            <span>{t('job.card.client')}</span>
            <span className="font-semibold text-slate-700">{job.clientName}</span>
            {clientRating !== undefined && clientRating > 0 && (
              <span className="inline-flex items-center gap-0.5 bg-amber-50 border border-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                ★ {clientRating.toFixed(1)}
              </span>
            )}
          </p>
        </div>

        {/* Quick parameters */}
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{formatDate(job.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{job.time} ({t('job.card.duration', { n: job.durationHours })}h)</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{job.address}</span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-slate-600 text-xs line-clamp-2 mb-4 leading-relaxed">
          {job.description}
        </p>

        {/* Cleaning types and size tags */}
        <div className="flex items-center justify-between gap-2 mb-5 mt-auto">
          <div className="flex flex-wrap gap-1">
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${colors.bg} ${colors.text} ${colors.border}`}>
              {getCleaningTypeLabel(job.cleaningType)}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md border border-slate-200 text-slate-600 bg-slate-50">
              {job.sizeSqm} m²
            </span>
          </div>

          <div className="text-[10px] text-slate-500 font-medium">
            {job.applicants.length > 0 ? (
              <span className="text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded-sm">
                {t('job.card.candidates.n', { n: job.applicants.length })}
              </span>
            ) : (
              <span className="text-slate-400 italic">{t('job.card.candidates.none')}</span>
            )}
          </div>
        </div>

        {/* Action controls based on Applicant Status */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Status badge alerts */}
          <div>
            {isAssignedToMe && (
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 fill-emerald-100" /> {t('job.card.approved')}
              </span>
            )}
            {!isAssignedToMe && isAppliedByMe && (
              <span className="text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {t('job.card.applied')}
              </span>
            )}
            {!isAssignedToMe && !isAppliedByMe && job.status === 'em_andamento' && (
              <span className="text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs">
                {t('job.card.filled')}
              </span>
            )}
          </div>

          <div className="flex gap-2 ml-auto">
            <button
              id={`btn-view-job-${job.id}`}
              onClick={() => onViewDetails(job.id)}
              className="bg-slate-100 hover:bg-slate-200 active:bg-slate-350 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer"
            >
              {t('job.card.details')}
            </button>

            {/* Quick apply button if user is registered/logged as Cleaner and has not applied */}
            {!isAppliedByMe && job.status === 'aberto' && onApply && currentProfessionalId && (
              <button
                id={`btn-quick-apply-${job.id}`}
                onClick={() => onApply(job.id)}
                className="bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer shadow-xs"
              >
                {t('job.card.apply')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
