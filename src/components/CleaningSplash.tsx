import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

interface CleaningSplashProps {
  onComplete: () => void;
}

export default function CleaningSplash({ onComplete }: CleaningSplashProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1200);
    }, 11000); // Tempo estendido para apreciação total da arte
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 99999, 
            backgroundColor: '#ffffff', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            overflow: 'hidden' 
          }}
        >
          {/* Fundo com Iluminação Global e Textura de Luxo */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05)_0%,rgba(255,255,255,1)_70%)]" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/clean-gray-paper.png")' }} />
          </div>

          <div className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center">
            
            {/* PERSONAGEM: NEXACORE ELITE SPECIALIST (DESIGN MUNDIAL V16) */}
            <motion.div
              initial={{ x: '-150%' }}
              animate={{ x: '160%' }}
              transition={{ duration: 9.5, ease: [0.45, 0, 0.55, 1] }}
              className="absolute top-[12%] z-50"
            >
              <div className="relative scale-[1.4] md:scale-[2.2]">
                <svg width="240" height="300" viewBox="0 0 240 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* Sombra Projetada Dinâmica */}
                  <ellipse cx="110" cy="270" rx="60" ry="15" fill="url(#shadowGradient)" />

                  {/* RIGGING DE BRAÇO TRASEIRO (ANATOMIA AVANÇADA) */}
                  <motion.g
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M125 110 L160 160" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" />
                    <circle cx="160" cy="160" r="6" fill="#FDBA74" /> {/* Pulso */}
                  </motion.g>

                  {/* VASSOURA DE ALTA COSTURA (FÍSICA DE INÉRCIA) */}
                  <motion.g
                    animate={{ 
                      rotate: [-25, 25, -25],
                      x: [-12, 12, -12],
                      y: [0, 5, 0]
                    }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "160px", originY: "70px" }}
                  >
                    {/* Cabo com Gradiente de Madeira Nobre */}
                    <rect x="157" y="20" width="7" height="210" rx="3.5" fill="url(#woodGradient)" />
                    <rect x="157" y="20" width="2" height="210" rx="1" fill="white" fillOpacity="0.2" />
                    
                    {/* Cabeça de Ouro 24k NexaCore */}
                    <path d="M100 230H220L235 270H85L100 230Z" fill="url(#goldGradientPremium)" />
                    <rect x="100" y="230" width="120" height="8" fill="#8B6914" />
                    
                    {/* Cerdas com Simulação de Resistência */}
                    {[...Array(18)].map((_, i) => (
                      <motion.path 
                        key={i}
                        d={`M${90 + (i * 8)} 270 L${90 + (i * 8)} 295`}
                        stroke="#FFF8DC" strokeWidth="3.5" strokeLinecap="round"
                        animate={{ 
                          skewX: [-30, 30, -30],
                          y: [0, 4, 0],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.02 }}
                      />
                    ))}
                  </motion.g>

                  {/* CORPO DO ESPECIALISTA (ALTA COSTURA NEXACORE) */}
                  <motion.g animate={{ y: [-4, 4, -4], rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 0.9, repeat: Infinity }}>
                    {/* Terno/Uniforme de Luxo */}
                    <path d="M80 90C80 70 140 70 140 90V190H80V90Z" fill="#0A0A0A" />
                    
                    {/* Lapela e Detalhes NexaCore Ouro */}
                    <path d="M80 90L110 125L140 90V100L110 135L80 100V90Z" fill="#D4AF37" />
                    <path d="M108 140H112V185H108V140Z" fill="#D4AF37" fillOpacity="0.9" />
                    <circle cx="110" cy="115" r="4" fill="#D4AF37" /> {/* Pin de Ouro */}

                    {/* ROSTO DE ELITE (DETALHAMENTO MUNDIAL) */}
                    <circle cx="110" cy="55" r="26" fill="#FDBA74" />
                    {/* Cabelo Estilizado */}
                    <path d="M84 55C84 30 136 30 136 55C136 40 84 40 84 55Z" fill="#1A0F0F" />
                    <circle cx="132" cy="45" r="8" fill="#1A0F0F" />
                    
                    {/* Olhos com Profundidade e Reflexo */}
                    <g opacity="0.9">
                      <circle cx="100" cy="58" r="3" fill="#000" />
                      <circle cx="120" cy="58" r="3" fill="#000" />
                      <circle cx="101" cy="57" r="1" fill="#FFF" />
                      <circle cx="121" cy="57" r="1" fill="#FFF" />
                    </g>
                    
                    {/* Expressão Facial Premium */}
                    <path d="M102 70Q110 75 118 70" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                    <path d="M95 50Q100 48 105 50" stroke="#000" strokeWidth="1" opacity="0.3" /> {/* Sobrancelha 1 */}
                    <path d="M115 50Q120 48 125 50" stroke="#000" strokeWidth="1" opacity="0.3" /> {/* Sobrancelha 2 */}

                    {/* BRAÇO FRONTAL (RIGGING DE PRECISÃO) */}
                    <motion.path 
                      d="M85 110 L140 165" 
                      stroke="#FDBA74" strokeWidth="11" strokeLinecap="round"
                      animate={{ d: ["M85 110 L140 165", "M85 110 L175 165", "M85 110 L140 165"] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <circle cx="140" cy="165" r="7" fill="#FDBA74" />

                    {/* Pernas com Física de Caminhada */}
                    <motion.rect x="85" y="190" width="15" height="45" fill="#FDBA74" 
                      animate={{ height: [45, 30, 45], y: [0, 5, 0] }} transition={{ duration: 0.45, repeat: Infinity }} />
                    <motion.rect x="120" y="190" width="15" height="45" fill="#FDBA74" 
                      animate={{ height: [30, 45, 30], y: [5, 0, 5] }} transition={{ duration: 0.45, repeat: Infinity }} />
                  </motion.g>

                  {/* DEFINIÇÕES DE GRADIENTES DE LUXO */}
                  <defs>
                    <linearGradient id="goldGradientPremium" x1="100" y1="230" x2="235" y2="270" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#8B6914" />
                      <stop offset="0.2" stopColor="#D4AF37" />
                      <stop offset="0.5" stopColor="#FFD700" />
                      <stop offset="0.8" stopColor="#D4AF37" />
                      <stop offset="1" stopColor="#8B6914" />
                    </linearGradient>
                    <linearGradient id="woodGradient" x1="157" y1="20" x2="164" y2="230" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#3E2723" />
                      <stop offset="0.5" stopColor="#5D4037" />
                      <stop offset="1" stopColor="#3E2723" />
                    </linearGradient>
                    <radialGradient id="shadowGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(110 270) rotate(90) scale(15 60)">
                      <stop offset="0" stopColor="black" stopOpacity="0.08" />
                      <stop offset="1" stopColor="black" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* EFEITOS DE POEIRA ORGÂNICA (CLOUD FX) */}
                <div className="absolute bottom-0 left-20">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        opacity: [0, 0.4, 0], 
                        scale: [0.5, 2.5, 3], 
                        x: [0, 60, 100], 
                        y: [0, -20, -40] 
                      }}
                      transition={{ 
                        duration: 1.2, 
                        repeat: Infinity, 
                        delay: i * 0.2,
                        ease: "easeOut" 
                      }}
                      className="absolute w-8 h-8 bg-slate-200/40 rounded-full blur-xl"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* LOGO NEXACORE / PORTAL (ESTÉTICA CINEMATOGRÁFICA) */}
            <div className="relative z-10 text-center mt-48">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 2.5, duration: 2, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-8 mb-10">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1],
                      filter: ["drop-shadow(0 0 0px #059669)", "drop-shadow(0 0 20px #059669)", "drop-shadow(0 0 0px #059669)"]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="text-emerald-600 w-20 h-20 md:w-32 md:h-32 fill-emerald-600" />
                  </motion.div>
                  <h1 className="text-8xl md:text-[13rem] font-black text-slate-900 tracking-tighter uppercase leading-none select-none italic">
                    CLEANING<span className="text-emerald-600">PORTAL</span>
                  </h1>
                </div>
                
                {/* Barra de Progresso de Luxo */}
                <div className="relative w-96 h-4 bg-slate-100 rounded-full mb-12 shadow-inner overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ delay: 3, duration: 6, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-400" 
                  />
                  <motion.div
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-1/2 bg-white/20 skew-x-12"
                  />
                </div>

                <p className="text-slate-500 font-black tracking-[2.5em] uppercase text-xs md:text-2xl pl-[2.5em] drop-shadow-sm">
                  NexaCore LLC • Global Excellence
                </p>
              </motion.div>
            </div>

            {/* MÁSCARA DE REVELAÇÃO (LIMPEZA TOTAL DE ELITE) */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '160%' }}
              transition={{ duration: 9.5, ease: [0.45, 0, 0.55, 1] }}
              className="absolute inset-0 z-40 bg-white pointer-events-none"
              style={{ 
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 12%, rgba(255,255,255,1) 100%)',
                boxShadow: '-50px 0 100px rgba(255,255,255,1)'
              }}
            />
          </div>

          {/* Sparkles de Finalização */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1, 0],
                  x: [Math.random() * 1000 - 500, Math.random() * 1000 - 500],
                  y: [Math.random() * 1000 - 500, Math.random() * 1000 - 500]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 5,
                  ease: "easeInOut" 
                }}
                className="absolute left-1/2 top-1/2"
              >
                <Sparkles className="text-emerald-400 w-4 h-4" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
