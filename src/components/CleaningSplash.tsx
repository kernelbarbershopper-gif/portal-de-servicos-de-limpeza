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
    }, 8000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Variantes de animação para a física da vassoura (vai e vem orgânico)
  const broomVariants = {
    sweep: {
      rotate: [-20, 25, -20],
      x: [-10, 15, -10],
      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          <div className="absolute inset-0 bg-white" />

          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* PERSONAGEM COM RIGGING 2D AVANÇADO */}
            <motion.div
              initial={{ x: '-120%' }}
              animate={{ x: '130%' }}
              transition={{ duration: 7, ease: "linear" }}
              className="absolute z-50 flex items-center"
            >
              <div className="relative scale-[1.8] md:scale-[2.8]">
                <svg width="150" height="200" viewBox="0 0 150 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* CABO DA VASSOURA (O EIXO DA ANIMAÇÃO) */}
                  <motion.g variants={broomVariants} animate="sweep" style={{ originX: "100px", originY: "60px" }}>
                    <rect x="98" y="20" width="4" height="140" rx="2" fill="#5D4037" />
                    <path d="M75 160H125L135 185H65L75 160Z" fill="#D4AF37" />
                    
                    {/* Cerdas com física individual */}
                    {[...Array(10)].map((_, i) => (
                      <motion.path 
                        key={i}
                        d={`M${70 + (i * 6)} 185 L${70 + (i * 6)} 195`}
                        stroke="#F3E5AB"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        animate={{ skewX: [-15, 15, -15] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ))}
                  </motion.g>

                  {/* CORPO DA FAXINEIRA COM MOVIMENTO SINCRONIZADO */}
                  <motion.g
                    animate={{ x: [-2, 2, -2], rotate: [-1, 1, -1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Cabeça e Cabelo */}
                    <circle cx="60" cy="40" r="14" fill="#FDBA74" />
                    <path d="M46 40C46 25 74 25 74 40C74 30 46 30 46 40Z" fill="#3E2723" />
                    <circle cx="70" cy="32" r="6" fill="#3E2723" />

                    {/* Uniforme de Luxo */}
                    <path d="M45 55C45 50 75 50 75 55V110H45V55Z" fill="#065F46" />
                    <path d="M45 70H75V110C75 115 45 115 45 110V70Z" fill="white" /> {/* Avental */}
                    
                    {/* BRAÇO 1 (SINCRONIZADO COM A VASSOURA) */}
                    <motion.path
                      d="M45 60 L80 85"
                      stroke="#FDBA74"
                      strokeWidth="6"
                      strokeLinecap="round"
                      animate={{ d: ["M45 60 L80 85", "M45 60 L110 85", "M45 60 L80 85"] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* BRAÇO 2 (SINCRONIZADO COM A VASSOURA) */}
                    <motion.path
                      d="M75 60 L95 90"
                      stroke="#FDBA74"
                      strokeWidth="6"
                      strokeLinecap="round"
                      animate={{ d: ["M75 60 L95 90", "M75 60 L115 90", "M75 60 L95 90"] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Pernas em movimento de caminhada */}
                    <motion.rect x="48" y="110" width="8" height="25" fill="#FDBA74" 
                      animate={{ height: [25, 20, 25] }} transition={{ duration: 0.4, repeat: Infinity }} />
                    <motion.rect x="64" y="110" width="8" height="25" fill="#FDBA74" 
                      animate={{ height: [20, 25, 20] }} transition={{ duration: 0.4, repeat: Infinity }} />
                  </motion.g>
                </svg>
              </div>
            </motion.div>

            {/* REVELAÇÃO DO LOGO (DESIGN MUNDIAL) */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 1.5 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-6 mb-8">
                  <Sparkles className="text-emerald-600 w-16 h-16 md:w-24 md:h-24 animate-pulse" />
                  <h1 className="text-7xl md:text-[10rem] font-black text-slate-900 tracking-tighter uppercase leading-none">
                    CLEANING<span className="text-emerald-600">PORTAL</span>
                  </h1>
                </div>
                <div className="h-3 w-64 bg-emerald-600 rounded-full mb-10 shadow-[0_0_30px_rgba(5,150,105,0.3)]" />
                <p className="text-slate-400 font-bold tracking-[1.5em] uppercase text-xs md:text-lg pl-[1.5em]">
                  The World Standard
                </p>
              </motion.div>
            </div>

            {/* Máscara de Limpeza (Reveal Mask) */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '130%' }}
              transition={{ duration: 7, ease: "linear" }}
              className="absolute inset-0 z-40 bg-white pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 5%, rgba(255,255,255,1) 100%)'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
