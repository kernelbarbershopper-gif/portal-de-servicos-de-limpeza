import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CleaningSplashProps {
  onComplete: () => void;
}

export default function CleaningSplash({ onComplete }: CleaningSplashProps) {
  const [isCleaning, setIsCleaning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCleaning(false);
      setTimeout(onComplete, 1000); 
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isCleaning && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full max-w-2xl aspect-square flex flex-col items-center justify-center">
            
            {/* Animação Lottie Profissional (Faxineira Varrendo) */}
            {/* Usando o player oficial do Lottie via CDN para garantir a melhor performance e fidelidade visual */}
            <div className="w-full h-full flex items-center justify-center">
               <iframe 
                src="https://lottie.host/embed/84107e60-9f93-47e0-880e-43407e329583/QyTfVvX3mI.json" 
                style={{ width: '500px', height: '500px', border: 'none' }}
                title="Cleaning Animation"
               />
            </div>

            {/* Texto de Revelação com Efeito de Brilho */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 1 }}
              className="absolute bottom-10 text-center"
            >
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                Cleaning <span className="text-emerald-600">Portal</span>
              </h1>
              <p className="text-slate-500 text-xs font-bold tracking-[0.5em] uppercase mt-2">
                Making everything shine
              </p>
            </motion.div>

            {/* Overlay de "Limpeza" que se expande conforme a faxineira varre */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 4, opacity: 0.1 }}
              transition={{ delay: 1, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 bg-emerald-100 rounded-full blur-3xl -z-10"
            />
          </div>

          {/* Partículas de Brilho Final */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
                x: (Math.random() - 0.5) * 1000,
                y: (Math.random() - 0.5) * 800
              }}
              transition={{ 
                duration: 2, 
                delay: 4 + (Math.random() * 1),
                repeat: Infinity
              }}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full blur-[1px]"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
