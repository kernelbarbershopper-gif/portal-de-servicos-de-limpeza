import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CleaningSplashProps {
  onComplete: () => void;
}

export default function CleaningSplash({ onComplete }: CleaningSplashProps) {
  const [isCleaning, setIsCleaning] = useState(true);
  const sweepProgress = useMotionValue(0);
  
  // Efeito de máscara dinâmica: a vassoura revela o conteúdo com suavidade
  const maskX = useTransform(sweepProgress, [0, 100], ['0%', '100%']);

  useEffect(() => {
    const controls = animate(sweepProgress, 100, {
      duration: 5,
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
          {/* Camada 1: O Fundo "Sujo" (Texturizado) */}
          <div className="absolute inset-0 bg-slate-900 z-10 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="text-slate-800 text-[12vw] font-black opacity-10 select-none tracking-tighter">
              DIRTY
            </div>
          </div>

          {/* Camada 2: O Conteúdo "Limpo" (Padrão Mundial) */}
          <motion.div 
            style={{ clipPath: `inset(0 0 0 ${maskX.get()})` }}
            className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30" />
            
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative z-30 text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <Sparkles className="text-emerald-500 w-10 h-10 animate-pulse" />
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                  CLEANING<span className="text-emerald-600">PORTAL</span>
                </h1>
              </div>
              <div className="h-1 w-32 bg-emerald-500 mx-auto mb-6 rounded-full" />
              <p className="text-emerald-800 font-bold tracking-[0.8em] uppercase text-[10px] md:text-sm opacity-70">
                The Gold Standard of Clean
              </p>
            </motion.div>
          </motion.div>

          {/* Camada 3: A Faxineira de Elite (Flat Design Profissional) */}
          <motion.div
            style={{ x: maskX }}
            className="absolute inset-0 z-30 flex items-center justify-start pointer-events-none"
          >
            <motion.div
              animate={{ 
                rotate: [-5, 5, -5, 5, -5],
                y: [0, -15, 0, -15, 0]
              }}
              transition={{ 
                duration: 5, 
                ease: "easeInOut"
              }}
              className="relative left-[-120px] top-[-280px] scale-100 md:scale-125"
            >
              {/* FX de Poeira Volumosa e Brilho */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0.6, 0],
                    scale: [0.5, 2.5, 1],
                    x: [0, 150 + i * 15],
                    y: [220, 200 + (Math.random() - 0.5) * 60]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="absolute w-16 h-10 bg-slate-400/20 rounded-full blur-[25px]"
                />
              ))}

              <svg width="400" height="500" viewBox="0 0 250 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Personagem: Faxineira (Design de Elite) */}
                {/* Tronco/Uniforme */}
                <path d="M160 120C160 120 190 160 190 220V320H130V220C130 160 160 120 160 120Z" fill="#065F46" />
                <path d="M160 120L130 220H190L160 120Z" fill="#047857" opacity="0.5" /> {/* Sombra do Tronco */}
                
                {/* Cabeça e Cabelo */}
                <circle cx="160" cy="85" r="30" fill="#FDBA74" />
                <path d="M130 85C130 85 140 50 160 50C180 50 190 85 190 85L195 100H125L130 85Z" fill="#3E2723" />
                
                {/* Braços com Articulação (Kinematics) */}
                <motion.path 
                  d="M160 140C160 140 110 150 85 190" 
                  stroke="#FDBA74" 
                  strokeWidth="16" 
                  strokeLinecap="round" 
                  animate={{ d: ["M160 140C160 140 110 150 85 190", "M160 140C160 140 120 170 95 210", "M160 140C160 140 110 150 85 190"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M160 140C160 140 130 170 105 210" 
                  stroke="#FDBA74" 
                  strokeWidth="16" 
                  strokeLinecap="round"
                  animate={{ d: ["M160 140C160 140 130 170 105 210", "M160 140C160 140 140 190 115 230", "M160 140C160 140 130 170 105 210"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                />

                {/* Vassoura Premium (Design de Engenharia) */}
                <motion.g
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ originX: "80px", originY: "50px" }}
                >
                  <rect x="75" y="40" width="12" height="200" rx="6" fill="url(#wood_grad)" />
                  <path d="M20 240H140L150 290H10L20 240Z" fill="url(#gold_grad)" />
                  <rect x="20" y="240" width="120" height="8" fill="url(#metal_grad)" />
                  
                  {/* Cerdas Dinâmicas Ultra-detalhadas */}
                  {[...Array(15)].map((_, i) => (
                    <motion.path 
                      key={i}
                      d={`M${22 + (i * 8.5)} 290 Q${25 + (i * 8.5)} 310 ${22 + (i * 8.5)} 325`}
                      stroke="url(#bristle_grad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      animate={{ 
                        d: [
                          `M${22 + (i * 8.5)} 290 Q${25 + (i * 8.5)} 310 ${22 + (i * 8.5)} 325`,
                          `M${22 + (i * 8.5)} 290 Q${45 + (i * 8.5)} 310 ${40 + (i * 8.5)} 325`,
                          `M${22 + (i * 8.5)} 290 Q${25 + (i * 8.5)} 310 ${22 + (i * 8.5)} 325`
                        ]
                      }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.03 }}
                    />
                  ))}
                </motion.g>

                <defs>
                  <linearGradient id="wood_grad" x1="75" y1="40" x2="87" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3E2723" />
                    <stop offset="0.5" stopColor="#5D4037" />
                    <stop offset="1" stopColor="#3E2723" />
                  </linearGradient>
                  <linearGradient id="gold_grad" x1="0" y1="240" x2="0" y2="290" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D4AF37" />
                    <stop offset="1" stopColor="#996515" />
                  </linearGradient>
                  <linearGradient id="metal_grad" x1="20" y1="240" x2="140" y2="240" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B8860B" />
                    <stop offset="0.5" stopColor="#FFD700" />
                    <stop offset="1" stopColor="#B8860B" />
                  </linearGradient>
                  <linearGradient id="bristle_grad" x1="0" y1="290" x2="0" y2="325" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F3E5AB" />
                    <stop offset="1" stopColor="#C9A84C" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </motion.div>

          {/* Efeito de Flash Final (Limpeza Concluída) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ delay: 4.8, duration: 0.5 }}
            className="absolute inset-0 bg-white z-[100] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
