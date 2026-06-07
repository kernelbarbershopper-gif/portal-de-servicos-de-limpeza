import React, { useState } from 'react';
import { Professional, CleaningType } from '../types';
import { Plus, Check, Star, ShieldAlert, Sparkles, Clock, MapPin, User, Phone, Mail, Award, CheckSquare, Square } from 'lucide-react';

interface CleanerRegisterFormProps {
  onRegister: (professional: Professional) => void;
  onCancel: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
];

const DAYS_OF_WEEK = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

export default function CleanerRegisterForm({ onRegister, onCancel }: CleanerRegisterFormProps) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(PRESET_AVATARS[0]);
  const [customAvatar, setCustomAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hourlyRate, setHourlyRate] = useState(30);
  const [cleaningTypes, setCleaningTypes] = useState<CleaningType[]>(['residencial']);
  const [location, setLocation] = useState('São Paulo - SP');
  const [experienceYears, setExperienceYears] = useState(2);
  const [availability, setAvailability] = useState<string[]>(['Segunda', 'Quarta', 'Sexta']);
  const [gender, setGender] = useState<'M' | 'F' | 'Outro'>('F');
  const [error, setError] = useState('');

  const handleTypeToggle = (type: CleaningType) => {
    if (cleaningTypes.includes(type)) {
      if (cleaningTypes.length > 1) {
        setCleaningTypes(cleaningTypes.filter(t => t !== type));
      }
    } else {
      setCleaningTypes([...cleaningTypes, type]);
    }
  };

  const handleDayToggle = (day: string) => {
    if (availability.includes(day)) {
      setAvailability(availability.filter(d => d !== day));
    } else {
      setAvailability([...availability, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Por favor, informe seu nome completo.');
    if (!bio.trim() || bio.length < 20) return setError('Escreva uma breve apresentação (mínimo de 20 caracteres).');
    if (!phone.trim()) return setError('Por favor, informe um telefone para contato.');
    if (!email.trim() || !email.includes('@')) return setError('Por favor, informe um email válido.');
    if (!location.trim()) return setError('Por favor, informe o seu bairro ou cidade.');
    if (hourlyRate <= 10) return setError('O valor por hora deve ser maior que R$ 10.');

    const finalAvatar = customAvatar.trim() ? customAvatar : avatar;

    const newProfessional: Professional = {
      id: 'p_' + Date.now().toString(),
      name,
      avatar: finalAvatar,
      bio,
      phone,
      email,
      rating: 5.0, // New cleaners start with standard rating
      completedJobs: 0,
      hourlyRate,
      cleaningTypes,
      location,
      experienceYears,
      availability,
      gender,
      isVerified: true, // Set automatically for user convenience/fun demo context
      reviews: []
    };

    onRegister(newProfessional);
  };

  return (
    <div id="cleaner-register-form-container" className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold font-sans text-slate-805 flex items-center gap-2">
            <Sparkles className="text-emerald-500 w-5 h-5 animate-pulse" /> Seletor de Cadastro de Faxina
          </h2>
          <p className="text-xs text-slate-500 mt-1">Inscreva-se como profissional e comece a receber propostas de trabalho hoje mesmo!</p>
        </div>
        <button
          onClick={onCancel}
          className="text-xs text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          Voltar
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar select */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Sua Foto de Perfil</label>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <img 
                src={customAvatar.trim() ? customAvatar : avatar} 
                alt="Avatar draft" 
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 bg-slate-100"
              />
              <span className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full p-0.5 text-[8.5px] font-bold">OK</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-400">Escolha uma imagem de teste rápida abaixo:</span>
              <div className="flex gap-2">
                {PRESET_AVATARS.map((pic, idx) => (
                  <button
                    type="button"
                    key={pic}
                    onClick={() => {
                      setAvatar(pic);
                      setCustomAvatar('');
                    }}
                    className={`relative rounded-full overflow-hidden w-10 h-10 border-2 transition-all cursor-pointer ${
                      avatar === pic && !customAvatar ? 'border-emerald-500 scale-110 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={pic} alt={`preset-${idx}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              
              <div className="mt-1">
                <span className="text-xs text-slate-400">Ou utilize um link personalizado:</span>
                <input
                  type="url"
                  placeholder="https://exemplo.com/sua-foto.jpg"
                  value={customAvatar}
                  onChange={(e) => setCustomAvatar(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500 outline-none mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Name and Gender */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Nome Completo *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Maria de Souza Cardoso"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Gênero</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full py-2.5 px-3 text-xs text-slate-800 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            >
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>

        {/* Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Telefone Comercial / WhatsApp *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="(11) 99999-8888"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">E-mail *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="maria.souza@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Rate, Location, Experience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Preço por Hora (R$)*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">R$</span>
              <input
                type="number"
                min="10"
                max="250"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Anos de Experiência</label>
            <div className="relative">
              <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="number"
                min="0"
                max="50"
                value={experienceYears}
                onChange={(e) => setExperienceYears(parseInt(e.target.value) || 0)}
                className="w-full pl-9 pr-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Bairro / Localização *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Pinheiros, São Paulo - SP"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bio / Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Apresentação Profissional * (Mínimo de 20 letras)</label>
          <textarea
            placeholder="Conte aos contratantes sobre você, quais técnicas utiliza, quais produtos prefere e garanta um primeiro contato de confiança..."
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 text-xs text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* Specialties / Cleaning categories */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Especialidades de Atendimento (Selecione ao menos 1)</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { type: 'residencial', label: 'Residencial' },
              { type: 'comercial', label: 'Comercial' },
              { type: 'pos-obra', label: 'Pós-Obra' },
              { type: 'pesada', label: 'Faxina Pesada' }
            ].map((item) => {
              const isSelected = cleaningTypes.includes(item.type as CleaningType);
              return (
                <button
                  type="button"
                  key={item.type}
                  onClick={() => handleTypeToggle(item.type as CleaningType)}
                  className={`flex items-center gap-2 p-2.5 text-xs rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800 font-semibold' 
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Availability days */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Dias Disponíveis na Semana</label>
          <div className="flex flex-wrap gap-1.5">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = availability.includes(day);
              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => handleDayToggle(day)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Voltar
          </button>
          
          <button
            id="btn-submit-registration"
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 active:bg-emerald-800 transition-all cursor-pointer shadow-md"
          >
            Concluir Cadastro & Ficar Disponível
          </button>
        </div>
      </form>
    </div>
  );
}
