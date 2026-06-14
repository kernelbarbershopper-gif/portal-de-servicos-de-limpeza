import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CleaningSplashProps {
  onComplete: () => void;
}

export default function CleaningSplash({ onComplete }: CleaningSplashProps) {
  const [isCleaning, setIsCleaning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCleaning(false);
      setTimeout(onComplete, 1000); // Espera a animação de saída final
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isCleaning && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center overflow-hidden"
        >
          {/* Fundo "Sujo" com Textura */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20" />

          {/* Camada de Máscara (O que está sendo limpo) */}
          <motion.div 
            initial={{ clipPath: 'inset(0 0 0 0)' }}
            animate={{ clipPath: 'inset(0 0 0 100%)' }}
            transition={{ duration: 3.5, ease: [0.45, 0, 0.55, 1], delay: 0.5 }}
            className="absolute inset-0 bg-slate-900 z-10 flex items-center justify-center"
          >
             <div className="text-slate-700 text-9xl font-black opacity-10 select-none">DIRTY</div>
          </motion.div>

          {/* O Personagem/Vassoura (Inspirado no vídeo) */}
          <div className="relative z-30 w-full h-full flex items-center">
            <motion.div
              initial={{ x: '-20%', y: '20%', rotate: -15 }}
              animate={{ 
                x: ['-20%', '110%'],
                y: ['20%', '15%', '25%', '18%', '22%'],
                rotate: [-15, 5, -10, 8, -5]
              }}
              transition={{ 
                duration: 4, 
                ease: "easeInOut",
                delay: 0.2
              }}
              className="absolute pointer-events-none"
            >
              {/* SVG da Vassoura Profissional */}
              <svg width="300" height="300" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Cabo da Vassoura */}
                <rect x="95" y="0" width="10" height="140" rx="5" fill="#8B4513" />
                {/* Cabeça da Vassoura */}
                <path d="M40 140H160L180 190H20L40 140Z" fill="#C9A84C" />
                {/* Cerdas */}
                {[...Array(15)].map((_, i) => (
                  <line 
                    key={i} 
                    x1={30 + (i * 10)} y1="190" 
                    x2={35 + (i * 10)} y2="205" 
                    stroke="#E8C96A" strokeWidth="2" strokeLinecap="round" 
                  />
                ))}
                {/* Efeito de Movimento/Vento */}
                <motion.path
                  d="M190 150Q210 170 190 190"
                  stroke="white" strokeWidth="2" strokeOpacity="0.3"
                  animate={{ opacity: [0, 0.5, 0], x: [0, 20] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                />
              </svg>

              {/* Partículas de "Sujeira" fugindo da vassoura */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ 
                    x: [0, 50 + Math.random() * 50], 
                    y: [0, (Math.random() - 0.5) * 100],
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  className="absolute top-[180px] left-[150px] w-2 h-2 bg-slate-600 rounded-full"
                />
              ))}
            </motion.div>
          </div>

          {/* Conteúdo Revelado (O Brilho) */}
          <div className="relative z-20 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3, duration: 1, type: "spring" }}
              className="text-center"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 opacity-20"
                >
                   <Sparkles className="text-[#C9A84C] w-24 h-24" />
                </motion.div>
                
                <h1 className="text-6xl font-black text-white tracking-tighter mb-2 drop-shadow-2xl">
                  CLEANING<span className="text-[#C9A84C]">PORTAL</span>
                </h1>
              </div>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 3.5 }}
                className="text-[#C9A84C] font-bold tracking-[0.3em] uppercase text-sm"
              >
                The Gold Standard of Clean
              </motion.p>

              {/* Barra de Progresso de "Polimento" */}
              <div className="mt-8 w-64 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#C9A84C] to-white"
                />
              </div>
            </motion.div>
          </div>

          {/* Faíscas de Brilho Aleatórias (Pós-Limpeza) */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: (Math.random() - 0.5) * 800,
                y: (Math.random() - 0.5) * 600
              }}
              transition={{ 
                duration: 2, 
                delay: 2.5 + (Math.random() * 2),
                repeat: Infinity
              }}
              className="absolute"
            >
              <Sparkles className="text-white w-4 h-4" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
