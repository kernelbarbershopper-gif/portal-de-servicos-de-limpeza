import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

interface CleaningSplashProps {
  onComplete: () => void;
}

export default function CleaningSplash({ onComplete }: CleaningSplashProps) {
  const [isCleaning, setIsCleaning] = useState(true);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Carregando uma animação de limpeza profissional de alta qualidade via URL direta estável
    // Se a URL falhar, temos um fallback visual elegante
    fetch('https://assets9.lottiefiles.com/packages/lf20_m6cu98v2.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Lottie load error:", err));

    const timer = setTimeout(() => {
      setIsCleaning(false);
      setTimeout(onComplete, 1000); 
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
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="w-full max-w-lg aspect-square flex items-center justify-center relative">
            {animationData ? (
              <Lottie 
                animationData={animationData} 
                loop={true} 
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 font-bold animate-pulse">PREPARING CLEANING...</p>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-center mt-8"
          >
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
              CLEANING<span className="text-emerald-600">PORTAL</span>
            </h1>
            <p className="text-slate-400 text-xs font-bold tracking-[0.5em] uppercase mt-2">
              The standard of excellence
            </p>
          </motion.div>

          {/* Efeito de brilho de fundo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 bg-emerald-200 rounded-full blur-[120px] -z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
