import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CleaningSplashProps {
  onComplete: () => void;
}

export default function CleaningSplash({ onComplete }: CleaningSplashProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000);
    }, 10000); // Mais tempo para apreciar a obra de arte
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          {/* Fundo com Gradiente de Profundidade */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-emerald-50/20" />

          <div className="relative w-full max-w-6xl h-[75vh] flex flex-col items-center justify-center">
            
            {/* PERSONAGEM: NEXACORE ELITE CLEANER (OBRA DE ARTE) */}
            <motion.div
              initial={{ x: '-140%' }}
              animate={{ x: '150%' }}
              transition={{ duration: 8.5, ease: "easeInOut" }}
              className="absolute top-[10%] z-50"
            >
              <div className="relative scale-[1.3] md:scale-[1.8]">
                <svg width="220" height="260" viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* Sombreamento no Chão */}
                  <ellipse cx="100" cy="230" rx="50" ry="12" fill="black" fillOpacity="0.04" />

                  {/* BRAÇO TRASEIRO COM RIGGING REALISTA */}
                  <motion.path 
                    d="M110 95 L150 135" 
                    stroke="#FDBA74" strokeWidth="8" strokeLinecap="round"
                    animate={{ d: ["M110 95 L150 135", "M110 95 L175 135", "M110 95 L150 135"] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* VASSOURA DE LUXO NEXACORE (FÍSICA AVANÇADA) */}
                  <motion.g
                    animate={{ rotate: [-22, 22, -22], x: [-8, 8, -8] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "150px", originY: "60px" }}
                  >
                    {/* Cabo com Textura e Brilho */}
                    <rect x="147" y="10" width="6" height="180" rx="3" fill="#4E342E" />
                    <rect x="147" y="10" width="2" height="180" rx="1" fill="white" fillOpacity="0.15" />
                    
                    {/* Cabeça Ouro Polido */}
                    <path d="M100 190H200L215 230H85L100 190Z" fill="url(#goldGradient)" />
                    <rect x="100" y="190" width="100" height="6" fill="#B8860B" />
                    
                    {/* Cerdas com Deformação Individual */}
                    {[...Array(15)].map((_, i) => (
                      <motion.path 
                        key={i}
                        d={`M${92 + (i * 8)} 230 L${92 + (i * 8)} 250`}
                        stroke="#F3E5AB" strokeWidth="3" strokeLinecap="round"
                        animate={{ skewX: [-25, 25, -25], y: [0, 3, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.03 }}
                      />
                    ))}
                  </motion.g>

                  {/* CORPO DO FAXINEIRO (DESIGN DE ALTA COSTURA NEXACORE) */}
                  <motion.g animate={{ y: [-3, 3, -3], rotate: [-1, 1, -1] }} transition={{ duration: 0.9, repeat: Infinity }}>
                    {/* Uniforme de Luxo Preto Carbono */}
                    <path d="M70 80C70 65 130 65 130 80V170H70V80Z" fill="#121212" />
                    
                    {/* Detalhes em Ouro NexaCore (V-Neck & Stripes) */}
                    <path d="M70 80L100 110L130 80V88L100 118L70 88V80Z" fill="#D4AF37" />
                    <rect x="97" y="125" width="6" height="45" fill="#D4AF37" fillOpacity="0.9" />
                    <circle cx="100" cy="100" r="3" fill="#D4AF37" /> {/* Botão de Ouro */}

                    {/* ROSTO DETALHADO (ANATOMIA DE ELITE) */}
                    <circle cx="100" cy="50" r="22" fill="#FDBA74" /> {/* Pele */}
                    <path d="M78 50C78 28 122 28 122 50C122 35 78 35 78 50Z" fill="#2D1B1B" /> {/* Cabelo Moderno */}
                    
                    {/* Olhos Realistas com Brilho */}
                    <circle cx="92" cy="52" r="2" fill="#1A1A1A" />
                    <circle cx="108" cy="52" r="2" fill="#1A1A1A" />
                    <circle cx="92.5" cy="51.5" r="0.5" fill="white" />
                    <circle cx="108.5" cy="51.5" r="0.5" fill="white" />
                    
                    {/* Expressão de Excelência */}
                    <path d="M94 62Q100 66 106 62" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />

                    {/* BRAÇO FRONTAL COM ANATOMIA DETALHADA */}
                    <motion.path 
                      d="M75 100 L125 140" 
                      stroke="#FDBA74" strokeWidth="9" strokeLinecap="round"
                      animate={{ d: ["M75 100 L125 140", "M75 100 L155 140", "M75 100 L125 140"] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Pernas com Movimento de Caminhada Fluida */}
                    <motion.rect x="75" y="170" width="12" height="40" fill="#FDBA74" 
                      animate={{ height: [40, 28, 40], y: [0, 2, 0] }} transition={{ duration: 0.45, repeat: Infinity }} />
                    <motion.rect x="113" y="170" width="12" height="40" fill="#FDBA74" 
                      animate={{ height: [28, 40, 28], y: [2, 0, 2] }} transition={{ duration: 0.45, repeat: Infinity }} />
                  </motion.g>

                  {/* Definições de Gradiente para o Ouro */}
                  <defs>
                    <linearGradient id="goldGradient" x1="100" y1="190" x2="215" y2="230" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#B8860B" />
                      <stop offset="0.5" stopColor="#D4AF37" />
                      <stop offset="1" stopColor="#AA8A2E" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* LOGO NEXACORE / PORTAL (ESTÉTICA DE LUXO) */}
            <div className="relative z-10 text-center mt-40">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-6 mb-8">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
                    <Sparkles className="text-emerald-600 w-16 h-16 md:w-24 md:h-24 opacity-80" />
                  </motion.div>
                  <h1 className="text-7xl md:text-[11rem] font-black text-slate-900 tracking-tighter uppercase leading-none select-none">
                    CLEANING<span className="text-emerald-600">PORTAL</span>
                  </h1>
                </div>
                
                <div className="relative w-72 h-3 bg-slate-100 rounded-full mb-10 overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ delay: 2.5, duration: 5 }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400" 
                  />
                </div>

                <p className="text-slate-400 font-black tracking-[1.8em] uppercase text-[10px] md:text-lg pl-[1.8em]">
                  NexaCore LLC • Global Standard
                </p>
              </motion.div>
            </div>

            {/* MÁSCARA DE REVELAÇÃO (LIMPEZA TOTAL) */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '150%' }}
              transition={{ duration: 8.5, ease: "easeInOut" }}
              className="absolute inset-0 z-40 bg-white pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 8%, rgba(255,255,255,1) 100%)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
