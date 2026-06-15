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
      duration: 4.5,
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
          {/* Camada 1: O Fundo "Sujo" (Escuro) */}
          <div className="absolute inset-0 bg-slate-900 z-10 flex items-center justify-center">
            <div className="text-slate-800 text-[10vw] font-black opacity-10 select-none tracking-tighter">
              DIRTY
            </div>
          </div>

          {/* Camada 2: O Conteúdo "Limpo" (Revelado pela vassoura) */}
          <motion.div 
            style={{ clipPath: `inset(0 0 0 ${maskX.get()})` }}
            className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-white" />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-30 text-center"
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

          {/* Camada 3: A Faxineira e a Vassoura (Movimento Realista) */}
          <motion.div
            style={{ x: maskX }}
            className="absolute inset-0 z-30 flex items-center justify-start pointer-events-none"
          >
            <motion.div
              animate={{ 
                rotate: [-15, 10, -15, 10, -15],
                y: [0, -20, 0, -20, 0]
              }}
              transition={{ 
                duration: 4.5, 
                ease: "easeInOut"
              }}
              className="relative left-[-60px] top-[-200px] scale-100 md:scale-125"
            >
              {/* Poeira Volumosa (Cloud FX) */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 190 }}
                  animate={{ 
                    opacity: [0, 0.6, 0.3, 0],
                    scale: [0.5, 2.5, 4, 3],
                    x: [0, 80 + i * 15, 150 + i * 20],
                    y: [190, 150 - i * 8, 180],
                    rotate: [0, 90, 180]
                  }}
                  transition={{ 
                    duration: 1.4, 
                    repeat: Infinity, 
                    delay: i * 0.12,
                    ease: "easeOut"
                  }}
                  className="absolute w-14 h-10 bg-gradient-to-r from-slate-400/30 to-slate-300/10 rounded-[50%] blur-[18px]"
                />
              ))}

              {/* Personagem (Faxineira - Braço e Tronco Estilizados) */}
              <svg width="300" height="400" viewBox="0 0 150 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Braço da Faxineira */}
                <path d="M140 50C130 60 100 80 80 120" stroke="#E2E8F0" strokeWidth="20" strokeLinecap="round" />
                <path d="M80 120C70 140 60 160 54 180" stroke="#E2E8F0" strokeWidth="18" strokeLinecap="round" />
                
                {/* Cabo da Vassoura */}
                <rect x="52" y="30" width="10" height="160" rx="5" fill="url(#wood_gradient)" />
                
                {/* Cabeça da Vassoura Premium */}
                <path d="M10 180H110L120 220H0L10 180Z" fill="url(#broom_head_gradient)" />
                <rect x="10" y="180" width="100" height="6" fill="url(#gold_metal)" />
                
                {/* Cerdas Dinâmicas */}
                {[...Array(12)].map((_, i) => (
                  <motion.path 
                    key={i}
                    d={`M${12 + (i * 8.5)} 220 Q${15 + (i * 8.5)} 235 ${12 + (i * 8.5)} 245`}
                    stroke="url(#bristle_gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    animate={{ 
                      d: [
                        `M${12 + (i * 8.5)} 220 Q${15 + (i * 8.5)} 235 ${12 + (i * 8.5)} 245`,
                        `M${12 + (i * 8.5)} 220 Q${30 + (i * 8.5)} 235 ${25 + (i * 8.5)} 245`,
                        `M${12 + (i * 8.5)} 220 Q${15 + (i * 8.5)} 235 ${12 + (i * 8.5)} 245`
                      ]
                    }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.02 }}
                  />
                ))}

                <defs>
                  <linearGradient id="wood_gradient" x1="52" y1="30" x2="62" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4E342E" />
                    <stop offset="0.5" stopColor="#795548" />
                    <stop offset="1" stopColor="#4E342E" />
                  </linearGradient>
                  <linearGradient id="broom_head_gradient" x1="0" y1="180" x2="0" y2="220" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D4AF37" />
                    <stop offset="1" stopColor="#996515" />
                  </linearGradient>
                  <linearGradient id="gold_metal" x1="10" y1="180" x2="110" y2="180" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B8860B" />
                    <stop offset="0.5" stopColor="#FFD700" />
                    <stop offset="1" stopColor="#B8860B" />
                  </linearGradient>
                  <linearGradient id="bristle_gradient" x1="0" y1="220" x2="0" y2="245" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F3E5AB" />
                    <stop offset="1" stopColor="#C9A84C" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </motion.div>

          {/* Flash Final Suave */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ delay: 4.2, duration: 0.4 }}
            className="absolute inset-0 bg-white z-[100] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
