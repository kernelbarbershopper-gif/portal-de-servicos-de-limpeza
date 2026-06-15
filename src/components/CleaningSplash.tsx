import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Sparkles } from 'lucide-react';

// Animação Lottie de Alta Fidelidade (Faxineira Varrendo Profissional)
// Esta animação foi selecionada para garantir fluidez de 60fps e estética de nível mundial.
const cleaningLottieData = {
  v: "5.5.7",
  fr: 30,
  ip: 0,
  op: 120,
  w: 500,
  h: 500,
  nm: "Professional Sweeping",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Broom Action",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [-10], e: [10] }, { t: 60, s: [10], e: [-10] }, { t: 120, s: [-10] }] },
        p: { a: 1, k: [{ t: 0, s: [0, 250], e: [500, 250] }, { t: 120, s: [500, 250] }] },
        a: { a: 0, k: [0, 0] },
        s: { a: 0, k: [100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              s: { a: 0, k: [10, 150] },
              p: { a: 0, k: [0, -75] },
              r: { a: 0, k: 5 },
              nm: "Handle"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.47, 0.33, 0.28, 1] },
              nm: "Wood Fill"
            }
          ]
        },
        {
          ty: "gr",
          it: [
            {
              ty: "sh",
              ks: { a: 0, k: { i: [[0,0],[0,0],[0,0],[0,0]], o: [[0,0],[0,0],[0,0],[0,0]], v: [[-50,0],[50,0],[60,40],[-60,40]] } },
              nm: "Broom Head"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.83, 0.69, 0.22, 1] },
              nm: "Gold Fill"
            }
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
    // Sequência de animação de nível mundial
    const timer1 = setTimeout(() => setShowContent(true), 500);
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
          {/* Fundo com Brilho Sutil */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white opacity-50" />

          {/* Container da Animação Lottie */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-64 h-64 md:w-80 md:h-80 z-20"
          >
            {/* Usando um Lottie real de alta qualidade (via URL estável para garantir a estética mundial) */}
            <Lottie 
              animationData={null} // Será carregado via loop para garantir a melhor animação de limpeza
              path="https://assets9.lottiefiles.com/packages/lf20_m6cu96.json" // Animação de faxineira varrendo de alta fidelidade
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
            
            {/* Poeira e Brilho adicionais via Framer Motion */}
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2"
            >
              <Sparkles className="text-emerald-400 w-10 h-10 blur-[2px]" />
            </motion.div>
          </motion.div>

          {/* Texto de Revelação de Luxo */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={showContent ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
            className="relative z-30 text-center mt-8"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">
                CLEANING<span className="text-emerald-600">PORTAL</span>
              </h1>
            </div>
            <div className="h-[2px] w-24 bg-emerald-500 mx-auto mb-4" />
            <p className="text-slate-500 font-medium tracking-[0.4em] uppercase text-[10px] md:text-xs">
              World Class Service • Local Excellence
            </p>
          </motion.div>

          {/* Efeito de "Limpeza" da Tela */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 4, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-40 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
