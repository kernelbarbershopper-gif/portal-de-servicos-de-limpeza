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
    }, 6000); // Duração total da animação de elite
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          {/* Fundo com Brilho Suave */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/20" />

          {/* Container da Animação (Faxineira e Vassoura) */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Personagem Faxineira (Codificada em SVG para Garantia de Visibilidade) */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '120%' }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute left-0 flex flex-col items-center"
            >
              <div className="relative scale-150 md:scale-[2]">
                {/* FX de Poeira Volumosa */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 0.4, 0], scale: [1, 3, 1], x: [-20, 20], y: [0, -10] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                    className="absolute bottom-0 left-0 w-8 h-6 bg-slate-300/40 rounded-full blur-md"
                  />
                ))}

                {/* SVG da Faxineira e Vassoura (Design de Elite) */}
                <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Corpo da Faxineira */}
                  <circle cx="50" cy="30" r="10" fill="#FDBA74" /> {/* Cabeça */}
                  <path d="M40 40H60V80H40V40Z" fill="#065F46" /> {/* Tronco */}
                  <path d="M40 40L30 60" stroke="#FDBA74" strokeWidth="4" strokeLinecap="round" /> {/* Braço 1 */}
                  <path d="M60 40L70 60" stroke="#FDBA74" strokeWidth="4" strokeLinecap="round" /> {/* Braço 2 */}
                  
                  {/* Vassoura Profissional */}
                  <motion.g
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "50px", originY: "40px" }}
                  >
                    <rect x="48" y="20" width="4" height="60" rx="2" fill="#5D4037" /> {/* Cabo */}
                    <path d="M30 80H70L75 95H25L30 80Z" fill="#D4AF37" /> {/* Cabeça */}
                    <rect x="30" y="80" width="40" height="3" fill="#FFD700" /> {/* Detalhe Ouro */}
                    
                    {/* Cerdas Dinâmicas */}
                    {[...Array(8)].map((_, i) => (
                      <motion.path 
                        key={i}
                        d={`M${32 + (i * 5)} 95 Q${34 + (i * 5)} 100 ${32 + (i * 5)} 105`}
                        stroke="#F3E5AB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        animate={{ d: [`M${32 + (i * 5)} 95 Q${34 + (i * 5)} 100 ${32 + (i * 5)} 105`, `M${32 + (i * 5)} 95 Q${40 + (i * 5)} 100 ${38 + (i * 5)} 105`] }}
                        transition={{ duration: 0.25, repeat: Infinity }}
                      />
                    ))}
                  </motion.g>
                </svg>
              </div>
            </motion.div>

            {/* Máscara de Revelação do Logo */}
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center overflow-hidden"
              style={{ clipPath: 'inset(0 0 0 0)' }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Sparkles className="text-emerald-500 w-12 h-12 animate-pulse" />
                  <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                    CLEANING<span className="text-emerald-600">PORTAL</span>
                  </h1>
                </div>
                <div className="h-1.5 w-40 bg-emerald-500 mx-auto mb-6 rounded-full" />
                <p className="text-slate-400 font-bold tracking-[1em] uppercase text-[10px] md:text-sm">
                  The Gold Standard
                </p>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
