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
    }, 7000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 99999, 
            backgroundColor: 'white', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            overflow: 'hidden' 
          }}
        >
          {/* Fundo Premium com Textura de Limpeza */}
          <div className="absolute inset-0 bg-white">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#065f46 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-transparent to-transparent" />
          </div>

          <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
            
            {/* PERSONAGEM: FAXINEIRA DE ELITE (SVG DETALHADO) */}
            <motion.div
              initial={{ x: '-120%', y: 0 }}
              animate={{ x: '150%' }}
              transition={{ duration: 6, ease: "easeInOut" }}
              className="absolute left-0 z-50"
            >
              <div className="relative scale-[1.5] md:scale-[2.5]">
                <svg width="120" height="160" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Sombra no chão */}
                  <ellipse cx="60" cy="150" rx="30" ry="8" fill="black" fillOpacity="0.05" />
                  
                  {/* Braço de trás */}
                  <path d="M75 65L90 85" stroke="#FDBA74" strokeWidth="6" strokeLinecap="round" />

                  {/* Vassoura de Luxo */}
                  <motion.g
                    animate={{ rotate: [-15, 15, -15] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "85px", originY: "40px" }}
                  >
                    {/* Cabo */}
                    <rect x="82" y="10" width="5" height="120" rx="2.5" fill="#5D4037" />
                    <rect x="82" y="10" width="2" height="120" rx="1" fill="white" fillOpacity="0.1" />
                    
                    {/* Cabeça da Vassoura */}
                    <path d="M60 130H105L115 155H50L60 130Z" fill="#D4AF37" />
                    <rect x="60" y="130" width="45" height="4" fill="#B8860B" />
                    
                    {/* Cerdas com Movimento */}
                    {[...Array(12)].map((_, i) => (
                      <motion.path 
                        key={i}
                        d={`M${55 + (i * 5)} 155 L${55 + (i * 5)} 165`}
                        stroke="#F3E5AB"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        animate={{ 
                          y: [0, 2, 0],
                          rotate: [-5, 5, -5]
                        }}
                        transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.05 }}
                      />
                    ))}
                  </motion.g>

                  {/* Corpo da Faxineira */}
                  {/* Vestido/Uniforme */}
                  <path d="M40 60C40 50 80 50 80 60V120H40V60Z" fill="#065F46" />
                  <path d="M45 60C45 55 75 55 75 60V110H45V60Z" fill="white" fillOpacity="0.1" />
                  
                  {/* Avental */}
                  <path d="M45 75H75V110C75 115 45 115 45 110V75Z" fill="white" />
                  <rect x="58" y="75" width="4" height="35" fill="#E2E8F0" />

                  {/* Cabeça e Cabelo */}
                  <circle cx="60" cy="40" r="15" fill="#FDBA74" />
                  <path d="M45 40C45 25 75 25 75 40C75 30 45 30 45 40Z" fill="#3E2723" />
                  <circle cx="72" cy="35" r="5" fill="#3E2723" /> {/* Coque */}

                  {/* Braço da frente */}
                  <path d="M45 65L75 90" stroke="#FDBA74" strokeWidth="7" strokeLinecap="round" />
                  
                  {/* Pernas */}
                  <rect x="45" y="120" width="8" height="25" fill="#FDBA74" />
                  <rect x="67" y="120" width="8" height="25" fill="#FDBA74" />
                  <path d="M42 145H55V152H42V145Z" fill="#1F2937" /> {/* Sapato 1 */}
                  <path d="M65 145H78V152H65V145Z" fill="#1F2937" /> {/* Sapato 2 */}
                </svg>

                {/* Efeito de Brilho saindo da vassoura */}
                <motion.div
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute bottom-0 left-10"
                >
                  <Sparkles className="text-yellow-400 w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>

            {/* LOGO SENDO REVELADO (MÁSCARA DE ELITE) */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="text-emerald-600 w-12 h-12 md:w-16 md:h-16" />
                  </motion.div>
                  <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter uppercase leading-none select-none">
                    CLEANING<span className="text-emerald-600">PORTAL</span>
                  </h1>
                </div>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 2, duration: 1.5 }}
                  className="h-2 bg-emerald-600 rounded-full mb-8 shadow-[0_0_15px_rgba(5,150,105,0.5)]" 
                />

                <p className="text-slate-400 font-bold tracking-[1.2em] uppercase text-[10px] md:text-sm pl-[1.2em]">
                  The Gold Standard in Cleaning
                </p>
              </motion.div>
            </div>

            {/* Camada de "Sujeira" que é limpa */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ duration: 6, ease: "easeInOut" }}
              className="absolute inset-0 z-40 bg-white/10 backdrop-blur-[2px] pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 5%, rgba(255,255,255,1) 100%)',
                left: '0'
              }}
            />
          </div>

          {/* Rodapé de Carregamento Elegante */}
          <div className="absolute bottom-12 w-full max-w-xs px-8">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              <span>Initializing</span>
              <span>100%</span>
            </div>
            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 6 }}
                className="h-full w-full bg-emerald-600"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
