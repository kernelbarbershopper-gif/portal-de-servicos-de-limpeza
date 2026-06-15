import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Sparkles } from 'lucide-react';

// CÓDIGO DE ANIMAÇÃO LOTTIE EMBUTIDO (LOCAL) - FAXINEIRA VARRENDO PROFISSIONAL
// Isso garante que a animação carregue INSTANTANEAMENTE sem depender de links externos.
const embeddedCleaningLottie = {
  v: "5.7.1",
  fr: 30,
  ip: 0,
  op: 60,
  w: 500,
  h: 500,
  nm: "Professional Sweeper",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: "Character & Broom", sr: 1, ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [-5], e: [5] }, { t: 30, s: [5], e: [-5] }, { t: 60, s: [-5] }] },
        p: { a: 1, k: [{ t: 0, s: [0, 250], e: [500, 250] }, { t: 60, s: [500, 250] }] },
        a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }
      },
      shapes: [
        {
          ty: "gr", it: [
            { ty: "rc", s: { a: 0, k: [20, 200] }, p: { a: 0, k: [0, -100] }, r: { a: 0, k: 10 }, nm: "Handle" },
            { ty: "fl", c: { a: 0, k: [0.4, 0.25, 0.2, 1] }, nm: "Wood" }
          ]
        },
        {
          ty: "gr", it: [
            { ty: "sh", ks: { a: 0, k: { i: [[0,0],[0,0],[0,0],[0,0]], o: [[0,0],[0,0],[0,0],[0,0]], v: [[-60,0],[60,0],[70,50],[-70,50]] } }, nm: "Broom" },
            { ty: "fl", c: { a: 0, k: [0.85, 0.7, 0.2, 1] }, nm: "Gold" }
          ]
        }
      ]
    }
  ]
};

interface CleaningSplashProps {
  onComplete: () => void;
}

export default function CleaningSplash({ onComplete }: CleaningSplashProps) {
  const [isCleaning, setIsCleaning] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 800);
    const timer2 = setTimeout(() => {
      setIsCleaning(false);
      setTimeout(onComplete, 800);
    }, 4500);

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
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20" />

          {/* Container Lottie Local (Infalível) */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-64 h-64 md:w-96 md:h-96 z-20"
          >
            <Lottie 
              animationData={embeddedCleaningLottie}
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
            
            {/* Efeito de Poeira Orgânica (Framer Motion) */}
            <motion.div
              animate={{ x: [-20, 20, -20], opacity: [0, 0.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-10 bg-slate-300/20 blur-xl rounded-full"
            />
          </motion.div>

          {/* Branding de Luxo */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={showContent ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
            className="relative z-30 text-center mt-10"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Sparkles className="text-emerald-500 w-10 h-10 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                CLEANING<span className="text-emerald-600">PORTAL</span>
              </h1>
            </div>
            <div className="h-1.5 w-32 bg-emerald-500 mx-auto mb-6 rounded-full" />
            <p className="text-slate-400 font-bold tracking-[0.8em] uppercase text-[10px] md:text-xs">
              World Class Service • Local Excellence
            </p>
          </motion.div>

          {/* Varredura de Luz (Reveal Effect) */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-40 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
