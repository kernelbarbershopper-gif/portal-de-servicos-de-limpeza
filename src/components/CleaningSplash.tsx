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
          {/* Camada 1: O Fundo "Sujo" */}
          <div className="absolute inset-0 bg-slate-900 z-10 flex items-center justify-center">
            <div className="text-slate-800 text-[10vw] font-black opacity-10 select-none tracking-tighter">
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

          {/* Camada 3: A Faxineira Segurando a Vassoura */}
          <motion.div
            style={{ x: maskX }}
            className="absolute inset-0 z-30 flex items-center justify-start pointer-events-none"
          >
            <motion.div
              animate={{ 
                rotate: [-5, 5, -5, 5, -5],
                y: [0, -10, 0, -10, 0]
              }}
              transition={{ 
                duration: 4.5, 
                ease: "easeInOut"
              }}
              className="relative left-[-100px] top-[-200px] scale-90 md:scale-110"
            >
              {/* Poeira Volumosa */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 190 }}
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    scale: [1, 3, 1],
                    x: [0, 100 + i * 10],
                    y: [190, 180 + (Math.random() - 0.5) * 40]
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  className="absolute w-12 h-8 bg-slate-400/20 rounded-full blur-[15px]"
                />
              ))}

              <svg width="300" height="400" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Faxineira Completa */}
                {/* Corpo/Uniforme */}
                <path d="M140 100C140 100 160 140 160 180V250H120V180C120 140 140 100 140 100Z" fill="#065F46" />
                <circle cx="140" cy="70" r="25" fill="#FDBA74" /> {/* Cabeça */}
                <path d="M115 70C115 70 125 45 140 45C155 45 165 70 165 70" fill="#4B2C20" /> {/* Cabelo */}
                
                {/* Braços Segurando a Vassoura */}
                <path d="M140 110C140 110 100 120 80 150" stroke="#FDBA74" strokeWidth="12" strokeLinecap="round" />
                <path d="M140 110C140 110 120 130 100 170" stroke="#FDBA74" strokeWidth="12" strokeLinecap="round" />

                {/* Vassoura Premium */}
                <rect x="75" y="40" width="10" height="180" rx="5" fill="url(#wood_gradient)" />
                <path d="M30 220H130L140 260H20L30 220Z" fill="url(#broom_head_gradient)" />
                <rect x="30" y="220" width="100" height="6" fill="url(#gold_metal)" />
                
                {/* Cerdas Dinâmicas */}
                {[...Array(12)].map((_, i) => (
                  <motion.path 
                    key={i}
                    d={`M${32 + (i * 8.5)} 260 Q${35 + (i * 8.5)} 275 ${32 + (i * 8.5)} 285`}
                    stroke="url(#bristle_gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    animate={{ 
                      d: [
                        `M${32 + (i * 8.5)} 260 Q${35 + (i * 8.5)} 275 ${32 + (i * 8.5)} 285`,
                        `M${32 + (i * 8.5)} 260 Q${50 + (i * 8.5)} 275 ${45 + (i * 8.5)} 285`,
                        `M${32 + (i * 8.5)} 260 Q${35 + (i * 8.5)} 275 ${32 + (i * 8.5)} 285`
                      ]
                    }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.02 }}
                  />
                ))}

                <defs>
                  <linearGradient id="wood_gradient" x1="75" y1="40" x2="85" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4E342E" />
                    <stop offset="0.5" stopColor="#795548" />
                    <stop offset="1" stopColor="#4E342E" />
                  </linearGradient>
                  <linearGradient id="broom_head_gradient" x1="0" y1="220" x2="0" y2="260" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D4AF37" />
                    <stop offset="1" stopColor="#996515" />
                  </linearGradient>
                  <linearGradient id="gold_metal" x1="30" y1="220" x2="130" y2="220" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B8860B" />
                    <stop offset="0.5" stopColor="#FFD700" />
                    <stop offset="1" stopColor="#B8860B" />
                  </linearGradient>
                  <linearGradient id="bristle_gradient" x1="0" y1="260" x2="0" y2="285" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F3E5AB" />
                    <stop offset="1" stopColor="#C9A84C" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </motion.div>

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
