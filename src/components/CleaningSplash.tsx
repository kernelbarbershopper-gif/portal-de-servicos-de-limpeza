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
    }, 8500); 
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
          <div className="absolute inset-0 bg-white" />

          <div className="relative w-full max-w-5xl h-[70vh] flex flex-col items-center justify-center">
            
            {/* PERSONAGEM: FAXINEIRA NEXACORE ELITE (DESIGN MUNDIAL) */}
            <motion.div
              initial={{ x: '-130%' }}
              animate={{ x: '140%' }}
              transition={{ duration: 7, ease: "linear" }}
              className="absolute top-[15%] z-50" // POSICIONADA ACIMA DO NOME
            >
              <div className="relative scale-[1.2] md:scale-[1.6]"> {/* MENOS ZOOM / MAIS ELEGANTE */}
                <svg width="180" height="220" viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* Braço Traseiro (Sincronizado) */}
                  <motion.path 
                    d="M95 85 L125 110" 
                    stroke="#FDBA74" strokeWidth="6" strokeLinecap="round"
                    animate={{ d: ["M95 85 L125 110", "M95 85 L145 110", "M95 85 L125 110"] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />

                  {/* VASSOURA DE LUXO NEXACORE */}
                  <motion.g
                    animate={{ rotate: [-18, 18, -18], x: [-5, 5, -5] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "125px", originY: "50px" }}
                  >
                    <rect x="122" y="10" width="5" height="150" rx="2.5" fill="#5D4037" /> {/* Cabo */}
                    <path d="M90 160H155L165 190H80L90 160Z" fill="#D4AF37" /> {/* Cabeça Ouro */}
                    <rect x="90" y="160" width="65" height="5" fill="#B8860B" />
                    
                    {/* Cerdas com Física */}
                    {[...Array(12)].map((_, i) => (
                      <motion.path 
                        key={i}
                        d={`M${85 + (i * 7)} 190 L${85 + (i * 7)} 205`}
                        stroke="#F3E5AB" strokeWidth="2.5" strokeLinecap="round"
                        animate={{ skewX: [-20, 20, -20] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    ))}
                  </motion.g>

                  {/* CORPO DA FAXINEIRA (UNIFORME NEXACORE: PRETO E OURO) */}
                  <motion.g animate={{ y: [-2, 2, -2] }} transition={{ duration: 0.8, repeat: Infinity }}>
                    {/* Uniforme Preto */}
                    <path d="M60 70C60 60 110 60 110 70V140H60V70Z" fill="#1A1A1A" />
                    
                    {/* Detalhes em Ouro (NexaCore Brand) */}
                    <path d="M60 70L85 95L110 70V75L85 100L60 75V70Z" fill="#D4AF37" />
                    <rect x="82" y="105" width="6" height="35" fill="#D4AF37" fillOpacity="0.8" />

                    {/* ROSTO DETALHADO (ELITE DESIGN) */}
                    <circle cx="85" cy="45" r="18" fill="#FDBA74" /> {/* Pele */}
                    <path d="M67 45C67 28 103 28 103 45C103 35 67 35 67 45Z" fill="#2D1B1B" /> {/* Cabelo */}
                    <circle cx="100" cy="38" r="6" fill="#2D1B1B" /> {/* Coque */}
                    
                    {/* Olhos e Expressão */}
                    <circle cx="78" cy="48" r="1.5" fill="#1A1A1A" />
                    <circle cx="92" cy="48" r="1.5" fill="#1A1A1A" />
                    <path d="M80 55Q85 58 90 55" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" /> {/* Sorriso Leve */}

                    {/* Braço Frontal (Sincronizado) */}
                    <motion.path 
                      d="M65 85 L105 115" 
                      stroke="#FDBA74" strokeWidth="7" strokeLinecap="round"
                      animate={{ d: ["M65 85 L105 115", "M65 85 L125 115", "M65 85 L105 115"] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />

                    {/* Pernas (Caminhada) */}
                    <motion.rect x="65" y="140" width="10" height="30" fill="#FDBA74" 
                      animate={{ height: [30, 22, 30] }} transition={{ duration: 0.4, repeat: Infinity }} />
                    <motion.rect x="95" y="140" width="10" height="30" fill="#FDBA74" 
                      animate={{ height: [22, 30, 22] }} transition={{ duration: 0.4, repeat: Infinity }} />
                  </motion.g>
                </svg>
              </div>
            </motion.div>

            {/* LOGO NEXACORE / PORTAL (POSICIONADO ABAIXO DA ANIMAÇÃO) */}
            <div className="relative z-10 text-center mt-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.2 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Sparkles className="text-emerald-600 w-12 h-12 md:w-20 md:h-20" />
                  <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                    CLEANING<span className="text-emerald-600">PORTAL</span>
                  </h1>
                </div>
                <div className="h-2 w-48 bg-emerald-600 rounded-full mb-8" />
                <p className="text-slate-400 font-bold tracking-[1.2em] uppercase text-[10px] md:text-sm pl-[1.2em]">
                  NexaCore LLC • Global Excellence
                </p>
              </motion.div>
            </div>

            {/* Máscara de Limpeza (Reveal Mask) */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '140%' }}
              transition={{ duration: 7, ease: "linear" }}
              className="absolute inset-0 z-40 bg-white pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 10%, rgba(255,255,255,1) 100%)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
