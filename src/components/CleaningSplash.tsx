import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Sparkles } from 'lucide-react';

// Animação Lottie de Alta Fidelidade: Faxineira Profissional Varrendo
// Este asset foi selecionado por possuir a mesma fluidez e estilo artístico do vídeo de referência.
const cleaningAnimationUrl = "https://assets10.lottiefiles.com/packages/lf20_m6cu96.json";

interface CleaningSplashProps {
  onComplete: () => void;
}

export default function CleaningSplash({ onComplete }: CleaningSplashProps) {
  const [isCleaning, setIsCleaning] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Sequência de animação de nível mundial (5 segundos de imersão)
    const timer1 = setTimeout(() => setShowContent(true), 1000);
    const timer2 = setTimeout(() => {
      setIsCleaning(false);
      setTimeout(onComplete, 800);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isCleaning && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Fundo com Brilho e Elegância */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white opacity-60" />

          {/* Container da Animação de Elite (Faxineira Varrendo) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-[500px] aspect-square z-20"
          >
            {/* Renderização Lottie Nativa para Fluidez de 60fps */}
            <Lottie 
              animationData={null}
              path={cleaningAnimationUrl}
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
            
            {/* Efeito de Revelação (Mask) */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent z-10 pointer-events-none"
            />
          </motion.div>

          {/* Branding de Luxo (Revelado após a limpeza) */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={showContent ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 1, ease: "backOut" }}
            className="relative z-30 text-center -mt-10"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Sparkles className="text-emerald-500 w-12 h-12 animate-pulse" />
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                CLEANING<span className="text-emerald-600">PORTAL</span>
              </h1>
            </div>
            <div className="h-1.5 w-40 bg-emerald-500 mx-auto mb-6 rounded-full" />
            <p className="text-slate-500 font-bold tracking-[1em] uppercase text-[10px] md:text-sm opacity-80">
              The Gold Standard of Clean
            </p>
          </motion.div>

          {/* Partículas de Brilho Final */}
          {showContent && (
            <div className="absolute inset-0 pointer-events-none z-40">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1.5, 0],
                    x: [Math.random() * 100 + "%"],
                    y: [Math.random() * 100 + "%"]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: Math.random() * 2 
                  }}
                  className="absolute w-2 h-2 bg-emerald-400 rounded-full blur-[1px]"
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
