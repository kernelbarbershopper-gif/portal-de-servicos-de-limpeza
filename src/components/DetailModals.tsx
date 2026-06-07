import React, { useState } from 'react';
import { Professional, Job, ChatMessage, ClientReview } from '../types';
import { X, Star, CheckCircle, MapPin, Calendar, Clock, DollarSign, Sparkles, Phone, Mail, Award, Building, Home, ShieldCheck, Send, MessageSquare } from 'lucide-react';
import { getCleaningTypeColor, getCleaningTypeLabel, formatCurrency, formatDate } from '../utils';

interface CleanerDetailsModalProps {
  professional: Professional;
  onClose: () => void;
  // If the company is viewing they can see contact data or simulate messages
  onDirectHire?: (professionalId: string) => void;
  onAddReview?: (professionalId: string, rating: number, comment: string, reviewerName: string) => void;
}

export function CleanerDetailsModal({ professional, onClose, onDirectHire, onAddReview }: CleanerDetailsModalProps) {
  const colors = getCleaningTypeColor(professional.cleaningTypes[0] || 'residencial');

  // Review states
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [newReviewerName, setNewReviewerName] = useState<string>('');
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !newReviewerName.trim()) {
      alert('Por favor, preencha o seu nome e faça um breve comentário sobre o atendimento.');
      return;
    }
    if (onAddReview) {
      onAddReview(professional.id, newRating, newComment, newReviewerName);
      setNewComment('');
      setNewReviewerName('');
      setNewRating(5);
      setShowReviewForm(false);
    }
  };

  return (
    <div id="cleaner-detail-modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 flex flex-col my-8">
        {/* Banner with avatar floating */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-28 relative flex items-end p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 translate-y-8">
            <div className="relative">
              <img 
                src={professional.avatar} 
                alt={professional.name} 
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover border-4 border-white bg-slate-105 shadow-md"
              />
              {professional.isVerified && (
                <span className="absolute bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-white fill-white" />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-12 pb-6 flex-1 overflow-y-auto max-h-[70vh]">
          {/* Header */}
          <div className="mb-5 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold font-sans text-slate-800">
                {professional.name}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                {professional.location}
              </p>
            </div>
            
            <div className="text-right">
              <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-md">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {professional.rating.toFixed(1)}
              </div>
              <p className="text-[9px] text-slate-400 mt-1 uppercase font-semibold">Tarifa: {formatCurrency(professional.hourlyRate)}/h</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            {/* Bio */}
            <div className="bg-slate-50 p-3.5 rounded-2xl">
              <p className="font-semibold text-slate-800 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Histórico e Apresentação
              </p>
              <p className="text-slate-655 font-sans leading-relaxed text-xs">{professional.bio}</p>
            </div>

            {/* Quick specifications stats */}
            <div className="grid grid-cols-2 gap-3 border-y border-slate-100 py-3">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Experiência de Trabalho</p>
                <p className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5 text-slate-500" />
                  {professional.experienceYears} {professional.experienceYears === 1 ? 'ano' : 'anos'} de mercado
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Serviços Completados</p>
                <p className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {professional.completedJobs} diárias recomendadas
                </p>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1.5">Especialidades Recomendadas</p>
              <div className="flex flex-wrap gap-1">
                {professional.cleaningTypes.map((type) => {
                  const colors = getCleaningTypeColor(type);
                  return (
                    <span
                      key={type}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {getCleaningTypeLabel(type)}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1.5">Agenda Semanal Disponível</p>
              <div className="flex flex-wrap gap-1">
                {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day) => {
                  const isAvailable = professional.availability.includes(day);
                  return (
                    <span
                      key={day}
                      className={`text-[9px] px-2 py-0.5 rounded-full ${
                        isAvailable
                          ? 'bg-slate-900 text-white font-medium'
                          : 'bg-slate-100 text-slate-405 line-through'
                      }`}
                    >
                      {day}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* --- PRESTIGE GLOBAL FEATURE: CLEANER REVIEWS SYSTEM --- */}
            <div className="pt-2">
              <p className="text-[10px] text-slate-405 uppercase tracking-widest font-bold mb-2 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Avaliações Verified de Clientes ({professional.reviews?.length || 0})
              </p>
              
              {!professional.reviews || professional.reviews.length === 0 ? (
                <p className="text-slate-400 italic bg-slate-50 p-2.5 rounded-xl text-center">Ainda sem avaliações nesta temporada.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {professional.reviews.map((rev) => (
                    <div key={rev.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800 text-[11px]">{rev.reviewerName}</span>
                        <div className="flex items-center gap-1.5">
                          <div className="flex text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-2.5 h-2.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-[9px] text-slate-400 font-mono">{formatDate(rev.date)}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 font-sans leading-snug">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Form to write a review */}
              {onAddReview && (
                <div className="mt-3.5 border-t border-slate-100 pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-800 uppercase">Fazer Nova Avaliação</span>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
                    >
                      {showReviewForm ? 'Fechar Form' : 'Avaliar Profissional'}
                    </button>
                  </div>

                  {showReviewForm && (
                    <form onSubmit={handleSubmitReview} className="bg-slate-50 p-3 rounded-2xl border border-slate-150/75 space-y-2.5 text-xs">
                      {/* Star selection */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-600 font-semibold font-sans">Sua Nota:</span>
                        <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200 w-fit">
                          {[1, 2, 3, 4, 5].map((starValue) => (
                            <button
                              key={starValue}
                              type="button"
                              onClick={() => setNewRating(starValue)}
                              className="p-1 hover:scale-115 transition"
                            >
                              <Star className={`w-4 h-4 ${starValue <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                            </button>
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-600 ml-1">({newRating} ★)</span>
                      </div>

                      {/* Text feedback */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-semibold text-slate-600 uppercase">Comentários e Detalhes</label>
                        <textarea
                          rows={2}
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Fale um pouco sobre a pontualidade, rapidez, qualidade da faxina..."
                          className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white text-slate-800 focus:outline-emerald-500"
                        />
                      </div>

                      {/* Reviewer name */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-semibold text-slate-600 uppercase">Seu Nome / Empresa</label>
                        <input
                          type="text"
                          value={newReviewerName}
                          onChange={(e) => setNewReviewerName(e.target.value)}
                          placeholder="Ex: Carlos Vieira ou Residência Jardins"
                          className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white text-slate-800 focus:outline-emerald-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
                      >
                        Enviar Avaliação Oficial
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Contacts details */}
            <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100 space-y-1.5 mt-2">
              <p className="font-bold text-emerald-800 text-xs flex items-center gap-1 mb-0.5">
                🎯 Informações de Contato Direto
              </p>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold font-mono">{professional.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold">{professional.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-5 rounded-xl border border-slate-200 cursor-pointer"
          >
            Fechar Janela
          </button>
          
          {onDirectHire && (
            <button
              onClick={() => onDirectHire(professional.id)}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Convidar para um Serviço
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface JobDetailsModalProps {
  job: Job;
  currentProfessionalId: string | null;
  allProfessionals: Professional[];
  onClose: () => void;
  onApply?: (jobId: string) => void;
  onApproveCandidate?: (jobId: string, professionalId: string) => void;
  onSendChatMessage?: (jobId: string, text: string, sender: 'client' | 'cleaner') => void;
  clientReviews?: ClientReview[];
  onAddClientReview?: (clientName: string, rating: number, comment: string, reviewerName: string) => void;
}

export function JobDetailsModal({
  job,
  currentProfessionalId,
  allProfessionals,
  onClose,
  onApply,
  onApproveCandidate,
  onSendChatMessage,
  clientReviews = [],
  onAddClientReview
}: JobDetailsModalProps) {
  const isAppliedByMe = currentProfessionalId ? job.applicants.includes(currentProfessionalId) : false;
  const isAssigned = job.assignedTo !== null;
  const assignedProfessional = isAssigned ? allProfessionals.find(p => p.id === job.assignedTo) : null;

  // Retrieve details of candidates who applied to this job
  const applicantsList = allProfessionals.filter(p => job.applicants.includes(p.id));

  // Chat message input state
  const [chatInput, setChatInput] = useState('');

  const activeProProfile = currentProfessionalId 
    ? allProfessionals.find(p => p.id === currentProfessionalId) 
    : null;

  // Client rating submission states
  const [newClientRating, setNewClientRating] = useState<number>(5);
  const [newClientComment, setNewClientComment] = useState<string>('');
  const [newClientReviewerName, setNewClientReviewerName] = useState<string>('');
  const [showClientForm, setShowClientForm] = useState<boolean>(false);

  const handleSubmitClientReview = () => {
    if (!newClientComment.trim()) {
      alert('Por favor, escreva um comentário sobre o contratante.');
      return;
    }
    const reviewer = newClientReviewerName.trim() || (activeProProfile?.name) || 'Diarista Parceiro';
    if (onAddClientReview) {
      onAddClientReview(job.clientName, newClientRating, newClientComment, reviewer);
      setNewClientComment('');
      setNewClientReviewerName('');
      setNewClientRating(5);
      setShowClientForm(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !onSendChatMessage) return;

    // Determine sender style helper
    const senderRole = currentProfessionalId ? 'cleaner' as const : 'client' as const;
    onSendChatMessage(job.id, chatInput, senderRole);
    setChatInput('');
  };

  return (
    <div id="job-detail-modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 flex flex-col my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white rounded-full p-1.5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex gap-2 mb-2">
            <span className="bg-emerald-500 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">
              {job.clientType === 'empresa' ? 'Corporativo' : 'Residencial'}
            </span>
            <span className="bg-slate-800 text-slate-300 text-[9px] font-bold px-2 py-0.5 rounded">
              {getCleaningTypeLabel(job.cleaningType)}
            </span>
          </div>

          <h3 className="text-base font-bold font-sans text-white pr-6 leading-snug">
            {job.title}
          </h3>
          <p className="text-[10px] text-slate-405 mt-1 font-mono">Dono do Anúncio: {job.clientName}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[55vh] text-slate-700 text-xs">
          
          {/* Main indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 bg-slate-50 p-3.5 rounded-2xl">
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-semibold">Orçamento total</p>
              <p className="text-sm font-extrabold text-emerald-700 mt-0.5 font-sans">
                {formatCurrency(job.price)}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-semibold">Tamanho aprox.</p>
              <p className="text-xs font-bold text-slate-800 mt-1 font-sans">
                {job.sizeSqm} m²
              </p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-semibold">Agendado para</p>
              <p className="text-xs font-bold text-slate-800 mt-1 font-sans">
                {formatDate(job.date)}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-semibold text-slate-430">Início sugerido</p>
              <p className="text-xs font-bold text-slate-800 mt-1 font-mono">{job.time}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <p className="font-bold text-slate-800 uppercase tracking-widest text-[9px]">Instruções e Tarefas Requeridas</p>
            <p className="text-slate-650 bg-slate-50 border border-slate-100 p-3.5 rounded-2xl leading-relaxed text-xs">
              {job.description}
            </p>
          </div>

          {/* Extras Included badges */}
          {job.extras && job.extras.length > 0 && (
            <div>
              <p className="font-bold text-slate-800 uppercase tracking-widest text-[9px] mb-1.5">Serviços Extras Desejados</p>
              <div className="flex flex-wrap gap-1">
                {job.extras.map(item => (
                  <span key={item} className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium px-2 py-0.5 rounded-md">
                    ✨ {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Local / duration specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-3">
            <div className="space-y-1">
              <p className="font-bold text-slate-800 uppercase tracking-widest text-[9px]">Endereço Completo</p>
              <p className="text-xs flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                {job.address}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-800 uppercase tracking-widest text-[9px]">Duração Prevista</p>
              <p className="text-xs flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                {job.durationHours} horas de atividade recomendadas
              </p>
            </div>
          </div>

          {/* Hired status badge */}
          {isAssigned && assignedProfessional && (
            <div className="border-t border-slate-100 pt-3 bg-emerald-50/20 p-3 rounded-xl border border-emerald-150">
              <p className="font-bold text-emerald-800 uppercase tracking-wider text-[9px] mb-1.5 flex items-center gap-1">
                ✔️ Profissional Contratado para a Diária
              </p>
              <div className="flex items-center gap-2">
                <img 
                  src={assignedProfessional.avatar} 
                  alt={assignedProfessional.name} 
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-emerald-500 bg-slate-50"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">{assignedProfessional.name}</h4>
                  <p className="text-[10px] text-slate-500">{assignedProfessional.location}</p>
                </div>
                <span className="ml-auto text-[9px] text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded">
                  Confirmado
                </span>
              </div>
            </div>
          )}

          {/* --- PRESTIGE GLOBAL FEATURE: CONTRACTOR PROFILE & RATINGS --- */}
          <div className="border-t border-slate-100 pt-3.5 space-y-3 animate-fade-in">
            <div className="bg-amber-50/20 border border-amber-100/70 p-3.5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-bold text-amber-900 uppercase tracking-wider text-[9px] flex items-center gap-1 font-sans">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Reputação do Contratante ({clientReviews.filter(r => r.clientName === job.clientName).length} avaliações)
                </p>
                <span className="font-black text-[11px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                  ★ {(clientReviews.filter(r => r.clientName === job.clientName).length > 0
                    ? clientReviews.filter(r => r.clientName === job.clientName).reduce((s, r) => s + r.rating, 0) / clientReviews.filter(r => r.clientName === job.clientName).length
                    : 5.0).toFixed(1)} / 5.0
                </span>
              </div>

              {clientReviews.filter(r => r.clientName === job.clientName).length === 0 ? (
                <p className="text-slate-400 italic text-[11px] py-1 text-center bg-white/50 rounded-lg">Este contratante ainda não recebeu nenhuma avaliação de diarista.</p>
              ) : (
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {clientReviews.filter(r => r.clientName === job.clientName).map((r) => (
                    <div key={r.id} className="p-2.5 bg-white rounded-xl border border-amber-100/40 space-y-1 text-[11px]">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-slate-700">{r.reviewerName} (Diarista)</span>
                        <div className="flex items-center gap-1">
                          <span className="text-amber-600 font-bold">★ {r.rating}</span>
                          <span className="text-[9px] text-slate-400">| {formatDate(r.date)}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 font-sans leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Leave rating form as professional/cleaner */}
              {currentProfessionalId && onAddClientReview && (
                <div className="border-t border-amber-200/50 pt-2 bg-amber-50/10 rounded-b-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-slate-700 uppercase">Avaliar {job.clientName}</span>
                    <button 
                      type="button" 
                      onClick={() => setShowClientForm(!showClientForm)}
                      className="text-xs text-amber-800 underline hover:text-amber-900 font-bold cursor-pointer"
                    >
                      {showClientForm ? 'Ocultar Formulário' : 'Avaliar Contratante'}
                    </button>
                  </div>

                  {showClientForm && (
                     <div className="bg-white p-3 rounded-xl border border-amber-200/40 space-y-2.5">
                      {/* Star select buttons */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-600 font-semibold font-sans text-[11px]">Sua Nota:</span>
                        <div className="flex gap-1 bg-amber-50/50 p-1 rounded border border-amber-100">
                          {[1, 2, 3, 4, 5].map((starValue) => (
                            <button
                              key={starValue}
                              type="button"
                              onClick={() => setNewClientRating(starValue)}
                              className="p-1 hover:scale-115 transition cursor-pointer"
                            >
                              <Star className={`w-3.5 h-3.5 ${starValue <= newClientRating ? 'fill-amber-400 text-amber-400' : 'text-slate-205'}`} />
                            </button>
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-600 ml-1">({newClientRating} ★)</span>
                      </div>

                      {/* Comment body */}
                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase">Seu comentário sobre o contratante</label>
                        <textarea
                          rows={2}
                          value={newClientComment}
                          onChange={(e) => setNewClientComment(e.target.value)}
                          placeholder="Ex: Forneceu todos os produtos, pagou imediatamente, conversou muito bem..."
                          className="w-full border border-slate-200 rounded-lg p-2 text-xs bg-slate-50 text-slate-800 focus:outline-emerald-500"
                        />
                      </div>

                      {/* Reviewer name input */}
                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase">Seu Nome Revisor</label>
                        <input
                          type="text"
                          value={newClientReviewerName}
                          onChange={(e) => setNewClientReviewerName(e.target.value)}
                          placeholder={activeProProfile?.name || "Nome da Diarista"}
                          className="w-full border border-slate-200 rounded-lg p-2 text-xs bg-slate-50 text-slate-800 focus:outline-emerald-500"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleSubmitClientReview}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg text-xs transition cursor-pointer"
                      >
                        Publicar Minha Avaliação
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* --- PRESTIGE GLOBAL FEATURE: REALTIME SIMULATED NEGOTIATING CHAT --- */}
          <div className="border-t border-slate-100 pt-3.5">
            <div className="flex items-center gap-1.5 mb-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <p className="font-bold text-slate-850 uppercase tracking-widest text-[9px]">
                Chat de Alinhamento das Partes (Diarista ⇆ Cliente)
              </p>
            </div>

            {/* Chat Box panel */}
            <div className="border border-slate-100 rounded-2xl bg-slate-50/50 p-3 space-y-3">
              <div className="max-h-36 overflow-y-auto space-y-2 pr-1 font-sans">
                {(!job.chatMessages || job.chatMessages.length === 0) ? (
                  <p className="text-slate-400 italic text-center py-2 text-[11px]">Nenhuma mensagem enviada ainda. Use o campo de texto para iniciar a conversa.</p>
                ) : (
                  job.chatMessages.map((msg) => {
                    const isMe = currentProfessionalId
                      ? msg.sender === 'cleaner'
                      : msg.sender === 'client';
                    return (
                      <div 
                        key={msg.id} 
                        className={`flex flex-col max-w-[85%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                      >
                        <span className="text-[9px] text-slate-405 font-semibold px-1 mb-0.5">{msg.senderName}</span>
                        <div 
                          className={`p-2.5 rounded-2xl text-[11px] leading-snug font-medium shadow-2xs ${
                            isMe 
                              ? 'bg-slate-900 text-white rounded-tr-none' 
                              : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Chat Input form triggers */}
              {onSendChatMessage && (
                <form onSubmit={handleSend} className="flex gap-2 border-t border-slate-150 pt-2 bg-white rounded-xl p-1 shadow-sm">
                  <input
                    type="text"
                    placeholder={
                      currentProfessionalId
                        ? `Conversar como ${activeProProfile?.name || 'Profissional'}...`
                        : "Conversar como Contratante..."
                    }
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs text-slate-800 outline-none border-none focus:ring-0"
                  />
                  <button 
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl transition-transform hover:scale-105 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Candidates / Applicants listing for hiring approval context */}
          {!isAssigned && (
            <div className="border-t border-slate-100 pt-3 space-y-3">
              <p className="font-bold text-slate-850 uppercase tracking-widest text-[9px]">
                Profissionais Interessados na Diária ({applicantsList.length})
              </p>
              {applicantsList.length === 0 ? (
                <p className="text-slate-400 italic bg-slate-50 p-2 text-center text-[11px] rounded-lg">Ainda sem candidaturas neste mural.</p>
              ) : (
                <div className="space-y-1.5">
                  {applicantsList.map((cand) => (
                    <div 
                      key={cand.id} 
                      className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-150 rounded-xl transition hover:border-slate-350"
                    >
                      <div className="flex items-center gap-2">
                        <img 
                          src={cand.avatar} 
                          alt={cand.name} 
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover border border-emerald-500 bg-white"
                        />
                        <div>
                          <p className="font-bold text-slate-800 text-[11px]">{cand.name}</p>
                          <div className="flex items-center gap-1 text-[9px] font-semibold text-amber-700">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            {cand.rating.toFixed(1)}
                            <span className="text-slate-400 font-normal ml-1">({cand.completedJobs} fx.)</span>
                            <span className="text-slate-400 font-normal ml-1">| {formatCurrency(cand.hourlyRate)}/h</span>
                          </div>
                        </div>
                      </div>

                      {onApproveCandidate && (
                        <button
                          onClick={() => onApproveCandidate(job.id, cand.id)}
                          className="text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg px-3 py-1 cursor-pointer transition-colors"
                        >
                          Aprovar
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action triggers */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-5 rounded-xl border border-slate-200 cursor-pointer"
          >
            Fechar Janela
          </button>

          {/* Professional Context apply button */}
          {onApply && currentProfessionalId && !isAppliedByMe && !isAssigned && job.status === 'aberto' && (
            <button
              onClick={() => {
                onApply(job.id);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-md cursor-pointer animate-pulsate"
            >
              Candidatar-se à Vaga
            </button>
          )}

          {isAppliedByMe && !isAssigned && (
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5">
              <Clock className="w-4 h-4 animate-spin-slow" /> Diarista Candidatado(a)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
