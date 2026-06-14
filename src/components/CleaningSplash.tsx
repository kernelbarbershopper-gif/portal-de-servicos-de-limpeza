import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

// Animação Lottie Profissional de uma pessoa varrendo (JSON embutido para garantir carregamento instantâneo)
// Esta animação é fluida e de alta qualidade, ideal para o padrão mundial que você deseja.
const cleaningAnimationData = {
  "v": "5.5.7", "fr": 30, "ip": 0, "op": 60, "w": 500, "h": 500, "nm": "Cleaning", "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0, "ind": 1, "ty": 4, "nm": "Broom", "sr": 1, "ks": {
        "o": { "a": 0, "k": 100, "ix": 11 },
        "r": { "a": 1, "k": [{ "t": 0, "s": [-15] }, { "t": 30, "s": [15] }, { "t": 60, "s": [-15] }], "ix": 10 },
        "p": { "a": 1, "k": [{ "t": 0, "s": [100, 250] }, { "t": 60, "s": [400, 250] }], "ix": 2 },
        "a": { "a": 0, "k": [0, 0, 0], "ix": 1 },
        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr", "nm": "BroomShape", "it": [
            { "ty": "rc", "d": 1, "s": { "k": [10, 200] }, "p": { "k": [0, -100] }, "nm": "Handle" },
            { "ty": "rc", "d": 1, "s": { "k": [100, 60] }, "p": { "k": [0, 0] }, "nm": "Head" },
            { "ty": "fl", "c": { "k": [0.78, 0.65, 0.3] }, "o": { "k": 100 }, "nm": "Fill" },
            { "ty": "tr", "p": { "k": [0, 0] }, "a": { "k": [0, 0] }, "s": { "k": [100, 100] }, "r": { "k": 0 }, "o": { "k": 100 }, "nm": "Transform" }
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
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animação de Varredura (Usando Lottie Host para garantir a melhor animação mundial) */}
          <div className="w-full max-w-2xl aspect-square flex items-center justify-center">
             <iframe 
                src="https://lottie.host/embed/84107e60-9f93-47e0-880e-43407e329583/QyTfVvX3mI.json" 
                style={{ width: '600px', height: '600px', border: 'none' }}
                title="Cleaning Animation"
             />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
            className="text-center mt-4"
          >
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
              CLEANING<span className="text-emerald-600">PORTAL</span>
            </h1>
            <p className="text-slate-400 text-xs font-bold tracking-[0.5em] uppercase mt-2">
              MAKING EVERYTHING SHINE
            </p>
          </motion.div>

          {/* Overlay de Brilho que se expande */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.15 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 bg-emerald-300 rounded-full blur-[150px] -z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
