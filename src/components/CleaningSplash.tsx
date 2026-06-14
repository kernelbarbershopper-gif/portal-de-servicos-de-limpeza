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
    // Sequência de animação mundial:
    // 1. A vassoura entra e faz 3 passadas realistas
    // 2. A cada passada, a máscara revela mais do portal
    // 3. O brilho final consome a tela e transiciona para o login
    
    const controls = animate(sweepProgress, 100, {
      duration: 4,
      ease: [0.45, 0, 0.55, 1],
      onComplete: () => {
        setTimeout(() => {
          setIsCleaning(false);
          setTimeout(onComplete, 1000);
        }, 500);
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
            <div className="text-slate-800 text-[20vw] font-black opacity-20 select-none tracking-tighter">
              DIRTY
            </div>
          </div>

          {/* Camada 2: O Conteúdo "Limpo" (Revelado pela Vassoura) */}
          <motion.div 
            style={{ clipPath: `inset(0 0 0 ${maskX.get()})` }}
            className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center"
          >
            {/* Brilhos de Fundo */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white" />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative z-30 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="text-emerald-500 w-12 h-12 animate-pulse" />
                <h1 className="text-7xl font-black text-slate-900 tracking-tighter uppercase">
                  CLEANING<span className="text-emerald-600">PORTAL</span>
                </h1>
              </div>
              <p className="text-emerald-700 font-bold tracking-[0.8em] uppercase text-sm">
                Excellence Redefined
              </p>
            </motion.div>

            {/* Partículas de Brilho */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: (Math.random() - 0.5) * 1000,
                  y: (Math.random() - 0.5) * 800
                }}
                transition={{ 
                  duration: 2, 
                  delay: Math.random() * 4,
                  repeat: Infinity
                }}
                className="absolute w-1 h-1 bg-emerald-400 rounded-full"
              />
            ))}
          </motion.div>

          {/* Camada 3: A Vassoura (O Ator Principal) */}
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
                duration: 4, 
                ease: "easeInOut"
              }}
              className="relative left-[-50px]"
            >
              {/* SVG da Vassoura de Luxo */}
              <svg width="250" height="400" viewBox="0 0 100 200" fill="none">
                {/* Cabo com Gradiente de Madeira */}
                <rect x="45" y="0" width="10" height="150" rx="5" fill="url(#wood)" />
                {/* Cabeça da Vassoura */}
                <path d="M10 150H90L100 190H0L10 150Z" fill="#C9A84C" />
                {/* Detalhe Dourado */}
                <rect x="10" y="150" width="80" height="5" fill="#E8C96A" />
                {/* Cerdas com Movimento */}
                {[...Array(10)].map((_, i) => (
                  <motion.line 
                    key={i}
                    x1={10 + (i * 9)} y1="190" 
                    x2={10 + (i * 9)} y2="210" 
                    stroke="#F3E5AB" strokeWidth="2" strokeLinecap="round"
                    animate={{ x2: [10 + (i * 9), 20 + (i * 9), 10 + (i * 9)] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
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

              {/* Efeito de "Vento/Velocidade" */}
              <motion.div 
                animate={{ opacity: [0, 0.5, 0], x: [0, -30] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="absolute top-1/2 right-full w-20 h-1 bg-gradient-to-r from-transparent to-white/30 rounded-full"
              />
            </motion.div>
          </motion.div>

          {/* Overlay de Flash Final */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 3.8, duration: 0.5 }}
            className="absolute inset-0 bg-white z-[100] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
