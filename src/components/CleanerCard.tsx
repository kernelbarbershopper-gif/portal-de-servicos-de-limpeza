import React from 'react';
import { Professional } from '../types';
import { Star, CheckCircle, MapPin, Sparkles, Phone, Mail } from 'lucide-react';
import { getCleaningTypeColor, getCleaningTypeLabel, formatCurrency } from '../utils';

interface CleanerCardProps {
  key?: string;
  professional: Professional;
  onViewDetails: (id: string) => void;
}

export default function CleanerCard({ professional, onViewDetails }: CleanerCardProps) {
  return (
    <div 
      id={`cleaner-card-${professional.id}`}
      className="bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Background ambient pattern */}
      <div className="h-16 bg-gradient-to-r from-emerald-400/20 to-teal-400/10 relative">
        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full shadow-xs flex items-center gap-1 border border-emerald-100">
          <Star className="w-3 px-0 h-3 fill-amber-400 text-amber-400" />
          {professional.rating.toFixed(1)}
        </span>
      </div>

      <div className="px-6 pb-6 flex-1 flex flex-col -mt-8">
        {/* Avatar section */}
        <div className="relative mb-3 flex items-end justify-between">
          <div className="relative">
            <img 
              src={professional.avatar} 
              alt={professional.name} 
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border-4 border-white bg-slate-50 shadow-sm"
            />
            {professional.isVerified && (
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-xs" title="Profissional Verificado">
                <CheckCircle className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Valor por hora</p>
            <p className="text-lg font-extrabold text-slate-800 font-sans">
              {formatCurrency(professional.hourlyRate)}
              <span className="text-xs font-normal text-slate-500">/h</span>
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mb-4">
          <h3 className="font-sans font-bold text-slate-800 text-base flex items-center gap-1.5 hover:text-emerald-700 transition-colors">
            {professional.name}
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span className="truncate">{professional.location}</span>
          </p>
        </div>

        {/* Bio snippet */}
        <p className="text-slate-600 text-xs line-clamp-2 mb-4 leading-relaxed flex-1">
          {professional.bio}
        </p>

        {/* Cleaning Specialties */}
        <div className="mb-4">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-500" /> Especialidades
          </p>
          <div className="flex flex-wrap gap-1">
            {professional.cleaningTypes.map((type) => {
              const colors = getCleaningTypeColor(type);
              return (
                <span
                  key={type}
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${colors.bg} ${colors.text} ${colors.border}`}
                >
                  {getCleaningTypeLabel(type)}
                </span>
              );
            })}
          </div>
        </div>

        {/* Divider and Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Experiência</span>
            <span className="text-xs font-bold text-slate-700">{professional.experienceYears} {professional.experienceYears === 1 ? 'ano' : 'anos'}</span>
          </div>

          <button
            id={`btn-view-profile-${professional.id}`}
            onClick={() => onViewDetails(professional.id)}
            className="bg-slate-900 text-white hover:bg-emerald-600 active:bg-emerald-700 text-xs font-medium px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm"
          >
            Ver Perfil completo
          </button>
        </div>
      </div>
    </div>
  );
}
