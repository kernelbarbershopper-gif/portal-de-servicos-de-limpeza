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
    }, 12000); // Tempo estendido para apreciação da obra de arte inspirada no Pinterest
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.08)_0%,rgba(255,255,255,1)_75%)]" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/clean-gray-paper.png")' }} />
          </div>

          <div className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center">
            
            {/* PERSONAGEM: INSPIRADO NO PINTEREST (DESIGN V17) */}
            <motion.div
              initial={{ x: '-160%' }}
              animate={{ x: '170%' }}
              transition={{ duration: 10, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-[10%] z-50"
            >
              <div className="relative scale-[1.5] md:scale-[2.4]">
                <svg width="260" height="320" viewBox="0 0 260 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* Sombra Projetada Suave */}
                  <ellipse cx="120" cy="285" rx="70" ry="18" fill="black" fillOpacity="0.05" />

                  {/* RIGGING DE BRAÇO TRASEIRO (ELÁSTICO) */}
                  <motion.g
                    animate={{ rotate: [-8, 8, -8], scaleY: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M135 120 L180 170" stroke="#FFCC99" strokeWidth="12" strokeLinecap="round" />
                    <circle cx="180" cy="170" r="7" fill="#FFCC99" />
                  </motion.g>

                  {/* VASSOURA PREMIUM (INSPIRADA NO PINTEREST) */}
                  <motion.g
                    animate={{ 
                      rotate: [-30, 30, -30],
                      x: [-15, 15, -15],
                      y: [0, 6, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "180px", originY: "80px" }}
                  >
                    {/* Cabo de Madeira Escura */}
                    <rect x="176" y="25" width="8" height="230" rx="4" fill="#5D4037" />
                    <rect x="176" y="25" width="2" height="230" rx="1" fill="white" fillOpacity="0.2" />
                    
                    {/* Cabeça de Vassoura (Design Pinterest) */}
                    <path d="M110 255H250L265 300H95L110 255Z" fill="url(#goldGradientPinterest)" />
                    <rect x="110" y="255" width="140" height="10" fill="#996515" />
                    
                    {/* Cerdas com Curvatura Realista */}
                    {[...Array(20)].map((_, i) => (
                      <motion.path 
                        key={i}
                        d={`M${100 + (i * 8)} 300 L${100 + (i * 8)} 330`}
                        stroke="#FFFACD" strokeWidth="4" strokeLinecap="round"
                        animate={{ 
                          skewX: [-35, 35, -35],
                          y: [0, 5, 0]
                        }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.02 }}
                      />
                    ))}
                  </motion.g>

                  {/* CORPO DO PERSONAGEM (ESTILO PINTEREST) */}
                  <motion.g 
                    animate={{ 
                      y: [-5, 5, -5], 
                      rotate: [-2, 2, -2],
                      scaleY: [1, 1.02, 1] 
                    }} 
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {/* Uniforme NexaCore de Luxo (Estilo Macacão/Avental) */}
                    <path d="M90 100C90 75 150 75 150 100V210H90V100Z" fill="#1A1A1A" />
                    
                    {/* Detalhes Ouro NexaCore */}
                    <path d="M90 100L120 140L150 100V110L120 150L90 110V100Z" fill="#D4AF37" />
                    <circle cx="120" cy="125" r="5" fill="#D4AF37" />
                    <rect x="118" y="155" width="4" height="45" fill="#D4AF37" fillOpacity="0.8" />

                    {/* ROSTO CARTOON PREMIUM (FIEL AO PINTEREST) */}
                    <circle cx="120" cy="60" r="30" fill="#FFCC99" />
                    {/* Cabelo e Boné NexaCore */}
                    <path d="M90 60C90 30 150 30 150 60H90Z" fill="#1A1A1A" />
                    <rect x="90" y="45" width="70" height="15" rx="5" fill="#D4AF37" /> {/* Aba do Boné */}
                    
                    {/* Olhos Grandes e Expressivos */}
                    <circle cx="108" cy="65" r="5" fill="white" />
                    <circle cx="132" cy="65" r="5" fill="white" />
                    <circle cx="109" cy="65" r="2.5" fill="#000" />
                    <circle cx="133" cy="65" r="2.5" fill="#000" />
                    
                    {/* Sorriso Largo e Amigável */}
                    <path d="M105 80Q120 90 135 80" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />

                    {/* BRAÇO FRONTAL (MOVIMENTO ELÁSTICO) */}
                    <motion.path 
                      d="M95 120 L155 180" 
                      stroke="#FFCC99" strokeWidth="14" strokeLinecap="round"
                      animate={{ d: ["M95 120 L155 180", "M95 120 L195 180", "M95 120 L155 180"] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <circle cx="155" cy="180" r="8" fill="#FFCC99" />

                    {/* Pernas Estilizadas */}
                    <motion.rect x="95" y="210" width="18" height="55" fill="#FFCC99" 
                      animate={{ height: [55, 35, 55], y: [0, 10, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                    <motion.rect x="127" y="210" width="18" height="55" fill="#FFCC99" 
                      animate={{ height: [35, 55, 35], y: [10, 0, 10] }} transition={{ duration: 0.5, repeat: Infinity }} />
                  </motion.g>

                  {/* DEFINIÇÕES DE GRADIENTES */}
                  <defs>
                    <linearGradient id="goldGradientPinterest" x1="110" y1="255" x2="265" y2="300" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#996515" />
                      <stop offset="0.5" stopColor="#D4AF37" />
                      <stop offset="1" stopColor="#FFD700" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* NUVENS DE POEIRA CARTOON */}
                <div className="absolute bottom-0 left-24">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 0 }}
                      animate={{ 
                        opacity: [0, 0.5, 0], 
                        scale: [0.5, 3, 3.5], 
                        x: [0, 80, 120], 
                        y: [0, -30, -50] 
                      }}
                      transition={{ 
                        duration: 1.4, 
                        repeat: Infinity, 
                        delay: i * 0.25,
                        ease: "easeOut" 
                      }}
                      className="absolute w-10 h-10 bg-slate-300/50 rounded-full blur-2xl"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* LOGO NEXACORE / PORTAL (ESTILO MUNDIAL) */}
            <div className="relative z-10 text-center mt-56">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1.8, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-10 mb-12">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.15, 1],
                      filter: ["drop-shadow(0 0 0px #059669)", "drop-shadow(0 0 30px #059669)", "drop-shadow(0 0 0px #059669)"]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="text-emerald-600 w-24 h-24 md:w-36 md:h-36 fill-emerald-600" />
                  </motion.div>
                  <h1 className="text-9xl md:text-[14rem] font-black text-slate-900 tracking-tighter uppercase leading-none select-none italic">
                    CLEANING<span className="text-emerald-600">PORTAL</span>
                  </h1>
                </div>
                
                {/* Barra de Progresso NexaCore */}
                <div className="relative w-[32rem] h-5 bg-slate-100 rounded-full mb-14 shadow-inner overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ delay: 3.5, duration: 7, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-800 via-emerald-500 to-emerald-300" 
                  />
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-1/2 bg-white/30 skew-x-12"
                  />
                </div>

                <p className="text-slate-500 font-black tracking-[3em] uppercase text-sm md:text-3xl pl-[3em] drop-shadow-md">
                  NexaCore LLC • Global Excellence
                </p>
              </motion.div>
            </div>

            {/* MÁSCARA DE REVELAÇÃO (LIMPEZA TOTAL V17) */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '170%' }}
              transition={{ duration: 10, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 z-40 bg-white pointer-events-none"
              style={{ 
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 15%, rgba(255,255,255,1) 100%)',
                boxShadow: '-60px 0 120px rgba(255,255,255,1)'
              }}
            />
          </div>

          {/* Sparkles de Finalização de Elite */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1.5, 0],
                  x: [Math.random() * 1200 - 600, Math.random() * 1200 - 600],
                  y: [Math.random() * 1200 - 600, Math.random() * 1200 - 600]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  delay: Math.random() * 6,
                  ease: "easeInOut" 
                }}
                className="absolute left-1/2 top-1/2"
              >
                <Sparkles className="text-emerald-400 w-6 h-6" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
