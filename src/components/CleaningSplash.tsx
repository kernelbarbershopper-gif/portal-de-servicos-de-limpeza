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
      setTimeout(onComplete, 800); // Espera a animação de saída
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isCleaning && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-slate-950 flex flex-center justify-center overflow-hidden"
        >
          {/* Fundo "Sujo" (Overlay escuro que será limpo) */}
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"
          />

          <div className="relative z-20 flex flex-col items-center">
            {/* Vassoura Animada (SVG) */}
            <motion.div
              initial={{ x: -200, rotate: -20 }}
              animate={{ 
                x: [ -200, 400 ],
                rotate: [ -20, 20, -20, 20 ]
              }}
              transition={{ 
                duration: 2, 
                ease: "linear",
                rotate: { repeat: Infinity, duration: 0.5 }
              }}
              className="mb-8"
            >
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 4V12M18 4L16 2M18 4L20 2" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 16C5 14.8954 5.89543 14 7 14H17C18.1046 14 19 14.8954 19 16V18C19 20.2091 17.2091 22 15 22H9C6.79086 22 5 20.2091 5 18V16Z" fill="#C9A84C" fillOpacity="0.2" stroke="#C9A84C" strokeWidth="2"/>
                <path d="M7 14V12C7 9.23858 9.23858 7 12 7V7C14.7614 7 17 9.23858 17 12V14" stroke="#C9A84C" strokeWidth="2"/>
                <path d="M9 18H15" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
                <path d="M9 22V18" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 22V18" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
                <path d="M15 22V18" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.div>

            {/* Texto e Brilho */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="text-emerald-400 w-6 h-6 animate-pulse" />
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
                  Cleaning Portal
                </h2>
              </div>
              <p className="text-slate-400 text-xs font-medium tracking-widest uppercase">
                Making your space shine...
              </p>
            </motion.div>
          </div>

          {/* Partículas de "Limpeza" */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200
              }}
              transition={{ 
                duration: 1.5, 
                delay: 1 + (i * 0.2),
                repeat: Infinity
              }}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full blur-sm"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
