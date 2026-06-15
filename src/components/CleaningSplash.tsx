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
          {/* Camada 1: O Fundo "Sujo" (Escuro e Opaco) */}
          <div className="absolute inset-0 bg-slate-900 z-10 flex items-center justify-center">
            <div className="text-slate-800 text-[12vw] font-black opacity-10 select-none tracking-tighter">
              DIRTY
            </div>
          </div>

          {/* Camada 2: O Conteúdo "Limpo" (Revelado pela Vassoura) - Ajustado com menos zoom */}
          <motion.div 
            style={{ clipPath: `inset(0 0 0 ${maskX.get()})` }}
            className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center"
          >
            {/* Brilhos de Fundo Suaves */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-white" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-30 text-center scale-90 md:scale-100" // Menos zoom no logo
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

            {/* Partículas de Brilho Menores */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 800,
                  y: (Math.random() - 0.5) * 600
                }}
                transition={{ 
                  duration: 2, 
                  delay: Math.random() * 3,
                  repeat: Infinity
                }}
                className="absolute w-0.5 h-0.5 bg-emerald-300 rounded-full"
              />
            ))}
          </motion.div>

          {/* Camada 3: A Vassoura (Redimensionada para menos zoom) */}
          <motion.div
            style={{ x: maskX }}
            className="absolute inset-0 z-30 flex items-center justify-start pointer-events-none"
          >
            <motion.div
              animate={{ 
                rotate: [-10, 8, -10, 8, -10],
                y: [0, -15, 0, -15, 0]
              }}
              transition={{ 
                duration: 3.5, 
                ease: "easeInOut"
              }}
              className="relative left-[-30px] top-[-50px] scale-75 md:scale-90" // Vassoura mais para cima
            >
              <svg width="180" height="300" viewBox="0 0 100 200" fill="none">
                <rect x="46" y="0" width="8" height="140" rx="4" fill="url(#wood)" />
                <path d="M15 140H85L95 180H5L15 140Z" fill="#C9A84C" />
                <rect x="15" y="140" width="70" height="4" fill="#E8C96A" />
                {[...Array(8)].map((_, i) => (
                  <motion.line 
                    key={i}
                    x1={15 + (i * 10)} y1="180" 
                    x2={15 + (i * 10)} y2="195" 
                    stroke="#F3E5AB" strokeWidth="2" strokeLinecap="round"
                    animate={{ x2: [15 + (i * 10), 22 + (i * 10), 15 + (i * 10)] }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                  />
                ))}
                <defs>
                  <linearGradient id="wood" x1="0" y1="0" x2="10" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5D4037" />
                    <stop offset="0.5" stopColor="#8D6E63" />
                    <stop offset="1" stopColor="#5D4037" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </motion.div>

          {/* Flash Final Suave */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ delay: 3.3, duration: 0.4 }}
            className="absolute inset-0 bg-white z-[100] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
