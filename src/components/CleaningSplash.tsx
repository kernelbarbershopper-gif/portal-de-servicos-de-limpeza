import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CleaningSplashProps {
  onComplete: () => void;
}

export default function CleaningSplash({ onComplete }: CleaningSplashProps) {
  const [isCleaning, setIsCleaning] = useState(true);
  const sweepProgress = useMotionValue(0);
  
  // Efeito de máscara dinâmica: a vassoura revela o conteúdo
  const maskX = useTransform(sweepProgress, [0, 100], ['0%', '100%']);

  useEffect(() => {
    const controls = animate(sweepProgress, 100, {
      duration: 3.5,
      ease: [0.45, 0, 0.55, 1],
      onComplete: () => {
        setTimeout(() => {
          setIsCleaning(false);
          setTimeout(onComplete, 800);
        }, 300);
      }
    });

    return () => controls.stop();
  }, [onComplete, sweepProgress]);

  return (
    <AnimatePresence>
      {isCleaning && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center overflow-hidden"
        >
          {/* Camada 1: O Fundo "Sujo" */}
          <div className="absolute inset-0 bg-slate-900 z-10 flex items-center justify-center">
            <div className="text-slate-800 text-[12vw] font-black opacity-10 select-none tracking-tighter">
              DIRTY
            </div>
          </div>

          {/* Camada 2: O Conteúdo "Limpo" */}
          <motion.div 
            style={{ clipPath: `inset(0 0 0 ${maskX.get()})` }}
            className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-white" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-30 text-center scale-90 md:scale-100"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <Sparkles className="text-emerald-500 w-8 h-8 animate-pulse" />
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">
                  CLEANING<span className="text-emerald-600">PORTAL</span>
                </h1>
              </div>
              <p className="text-emerald-700 font-bold tracking-[0.6em] uppercase text-[10px] md:text-xs">
                The Gold Standard of Clean
              </p>
            </motion.div>
          </motion.div>

          {/* Camada 3: A Vassoura Premium (Design Melhorado) */}
          <motion.div
            style={{ x: maskX }}
            className="absolute inset-0 z-30 flex items-center justify-start pointer-events-none"
          >
            <motion.div
              animate={{ 
                rotate: [-8, 6, -8, 6, -8],
                y: [0, -10, 0, -10, 0]
              }}
              transition={{ 
                duration: 3.5, 
                ease: "easeInOut"
              }}
              className="relative left-[-30px] top-[-140px] scale-90 md:scale-110" // Subindo mais para as cerdas passarem sobre o nome
            >
              <svg width="220" height="350" viewBox="0 0 120 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Cabo com Textura de Madeira Realista */}
                <rect x="54" y="0" width="12" height="150" rx="6" fill="url(#wood_gradient)" />
                <rect x="54" y="0" width="12" height="150" rx="6" fill="url(#wood_texture)" opacity="0.3" />
                
                {/* Cabeça da Vassoura com Efeito 3D */}
                <path d="M10 150H110L120 190H0L10 150Z" fill="url(#broom_head_gradient)" />
                <path d="M10 150H110L112 158H8L10 150Z" fill="white" opacity="0.2" /> {/* Reflexo Superior */}
                
                {/* Detalhe Metálico Dourado */}
                <rect x="10" y="150" width="100" height="6" fill="url(#gold_metal)" />
                
                {/* Cerdas Dinâmicas com Gradiente e Movimento Realista */}
                {[...Array(12)].map((_, i) => (
                  <motion.path 
                    key={i}
                    d={`M${12 + (i * 8.5)} 190 Q${15 + (i * 8.5)} 205 ${12 + (i * 8.5)} 215`}
                    stroke="url(#bristle_gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    animate={{ 
                      d: [
                        `M${12 + (i * 8.5)} 190 Q${15 + (i * 8.5)} 205 ${12 + (i * 8.5)} 215`,
                        `M${12 + (i * 8.5)} 190 Q${25 + (i * 8.5)} 205 ${22 + (i * 8.5)} 215`,
                        `M${12 + (i * 8.5)} 190 Q${15 + (i * 8.5)} 205 ${12 + (i * 8.5)} 215`
                      ]
                    }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.02 }}
                  />
                ))}

                {/* Definições de Gradientes para Realismo */}
                <defs>
                  <linearGradient id="wood_gradient" x1="54" y1="0" x2="66" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4E342E" />
                    <stop offset="0.5" stopColor="#795548" />
                    <stop offset="1" stopColor="#4E342E" />
                  </linearGradient>
                  <pattern id="wood_texture" width="10" height="10" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="10" y2="10" stroke="#3E2723" strokeWidth="0.5" />
                  </pattern>
                  <linearGradient id="broom_head_gradient" x1="0" y1="150" x2="0" y2="190" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D4AF37" />
                    <stop offset="1" stopColor="#996515" />
                  </linearGradient>
                  <linearGradient id="gold_metal" x1="10" y1="150" x2="110" y2="150" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B8860B" />
                    <stop offset="0.5" stopColor="#FFD700" />
                    <stop offset="1" stopColor="#B8860B" />
                  </linearGradient>
                  <linearGradient id="bristle_gradient" x1="0" y1="190" x2="0" y2="215" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F3E5AB" />
                    <stop offset="1" stopColor="#C9A84C" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Partículas de Brilho que saem da vassoura */}
              <motion.div
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute bottom-0 right-0"
              >
                <Sparkles className="text-yellow-200 w-6 h-6 blur-[1px]" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Flash Final de Limpeza */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ delay: 3.3, duration: 0.4 }}
            className="absolute inset-0 bg-white z-[100] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
