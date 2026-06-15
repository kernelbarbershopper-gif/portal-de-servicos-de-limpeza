import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

interface CleaningSplashProps {
  onComplete: () => void;
}

export default function CleaningSplash({ onComplete }: CleaningSplashProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1200);
    }, 15000); // 15 segundos para apreciação da obra de arte definitiva
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
            backgroundColor: '#ffffff', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            overflow: 'hidden' 
          }}
        >
          {/* Fundo Premium com Iluminação Global */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05)_0%,rgba(255,255,255,1)_80%)]" />

          <div className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center">
            
            {/* PERSONAGEM: FIDELIDADE ABSOLUTA AO PINTEREST (DESIGN V18) */}
            <motion.div
              initial={{ x: '-150%', opacity: 0 }}
              animate={{ x: '160%', opacity: 1 }}
              transition={{ duration: 12, ease: [0.45, 0.05, 0.55, 0.95] }}
              className="absolute top-[5%] z-50"
            >
              <div className="relative scale-[1.8] md:scale-[2.8]">
                <svg width="300" height="400" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* Sombra Dinâmica do Personagem */}
                  <ellipse cx="150" cy="370" rx="80" ry="15" fill="black" fillOpacity="0.04" />

                  {/* BRAÇO TRASEIRO (Sincronizado com a Vassoura) */}
                  <motion.g
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "180px", originY: "150px" }}
                  >
                    <path d="M180 150 L230 220" stroke="#FFD1B3" strokeWidth="14" strokeLinecap="round" />
                    <circle cx="230" cy="220" r="8" fill="#FFD1B3" />
                  </motion.g>

                  {/* VASSOURA: DESIGN FIDELIDADE PINTEREST */}
                  <motion.g
                    animate={{ 
                      rotate: [-25, 25, -25],
                      x: [-10, 10, -10],
                      y: [0, 4, 0]
                    }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "230px", originY: "100px" }}
                  >
                    {/* Cabo com Textura de Madeira */}
                    <rect x="226" y="40" width="10" height="300" rx="5" fill="#4E342E" />
                    <rect x="226" y="40" width="3" height="300" rx="1.5" fill="white" fillOpacity="0.15" />
                    
                    {/* Cabeça da Vassoura (Design Pinterest - Curvado) */}
                    <path d="M140 340C140 340 180 320 230 320C280 320 320 340 320 340L335 385H125L140 340Z" fill="url(#goldPinterestV18)" />
                    <path d="M140 340C140 340 180 325 230 325C280 325 320 340 320 340" stroke="#996515" strokeWidth="6" fill="none" />
                    
                    {/* Cerdas com Física Orgânica */}
                    {[...Array(24)].map((_, i) => (
                      <motion.path 
                        key={i}
                        d={`M${130 + (i * 8.5)} 385 L${130 + (i * 8.5)} 415`}
                        stroke="#FFFDE7" strokeWidth="4.5" strokeLinecap="round"
                        animate={{ 
                          skewX: [-40, 40, -40],
                          y: [0, 6, 0]
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.015 }}
                      />
                    ))}
                  </motion.g>

                  {/* CORPO DO PERSONAGEM: ANATOMIA PINTEREST (V18) */}
                  <motion.g 
                    animate={{ 
                      y: [-4, 4, -4], 
                      rotate: [-1.5, 1.5, -1.5]
                    }} 
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    {/* Uniforme NexaCore de Luxo (Design Avental) */}
                    <path d="M100 130C100 100 200 100 200 130V280C200 300 100 300 100 280V130Z" fill="#121212" />
                    
                    {/* Detalhes de Costura e Branding NexaCore */}
                    <path d="M100 130L150 180L200 130V145L150 195L100 145V130Z" fill="#C5A028" />
                    <circle cx="150" cy="160" r="6" fill="#C5A028" />
                    <rect x="147" y="200" width="6" height="60" rx="3" fill="#C5A028" fillOpacity="0.7" />

                    {/* ROSTO: EXPRESSÃO CARTOON ELITE (FIDELIDADE PINTEREST) */}
                    <circle cx="150" cy="80" r="45" fill="#FFD1B3" />
                    
                    {/* Cabelo e Boné Profissional */}
                    <path d="M105 80C105 40 195 40 195 80H105Z" fill="#121212" />
                    <path d="M105 65C105 65 150 50 195 65V75H105V65Z" fill="#C5A028" /> {/* Aba do Boné */}
                    
                    {/* Olhos Grandes (Inspirado no Pinterest) */}
                    <circle cx="132" cy="85" r="8" fill="white" />
                    <circle cx="168" cy="85" r="8" fill="white" />
                    <circle cx="133" cy="85" r="4" fill="#000" />
                    <circle cx="169" cy="85" r="4" fill="#000" />
                    <circle cx="131" cy="83" r="1.5" fill="white" /> {/* Brilho no Olho */}
                    <circle cx="167" cy="83" r="1.5" fill="white" />
                    
                    {/* Sorriso Largo e Carismático */}
                    <path d="M125 105Q150 120 175 105" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M145 108Q150 112 155 108" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none" />

                    {/* BRAÇO FRONTAL: RIGGING ANATÔMICO Sincronizado */}
                    <motion.g
                      animate={{ rotate: [5, -5, 5] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ originX: "120px", originY: "150px" }}
                    >
                      <path d="M120 150 L190 230" stroke="#FFD1B3" strokeWidth="16" strokeLinecap="round" />
                      <circle cx="190" cy="230" r="10" fill="#FFD1B3" />
                    </motion.g>

                    {/* Pernas com Movimento de Caminhada */}
                    <motion.rect x="115" y="280" width="24" height="70" rx="12" fill="#FFD1B3" 
                      animate={{ height: [70, 40, 70], y: [0, 15, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
                    <motion.rect x="161" y="280" width="24" height="70" rx="12" fill="#FFD1B3" 
                      animate={{ height: [40, 70, 40], y: [15, 0, 15] }} transition={{ duration: 0.6, repeat: Infinity }} />
                  </motion.g>

                  {/* DEFINIÇÕES DE CORES PINTEREST V18 */}
                  <defs>
                    <linearGradient id="goldPinterestV18" x1="125" y1="340" x2="335" y2="385" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#996515" />
                      <stop offset="0.5" stopColor="#C5A028" />
                      <stop offset="1" stopColor="#F9D423" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* EFEITO DE POEIRA ORGÂNICA (VFX ELITE) */}
                <div className="absolute bottom-[-20px] left-32">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 0 }}
                      animate={{ 
                        opacity: [0, 0.4, 0], 
                        scale: [0.4, 3.5, 4], 
                        x: [0, 100, 150], 
                        y: [0, -40, -60] 
                      }}
                      transition={{ 
                        duration: 1.6, 
                        repeat: Infinity, 
                        delay: i * 0.2,
                        ease: "easeOut" 
                      }}
                      className="absolute w-12 h-12 bg-gray-200/40 rounded-full blur-3xl"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* LOGO NEXACORE: LUXO MUNDIAL */}
            <div className="relative z-10 text-center mt-64">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 2, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-12 mb-16">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                      filter: ["drop-shadow(0 0 0px #059669)", "drop-shadow(0 0 40px #059669)", "drop-shadow(0 0 0px #059669)"]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="text-emerald-600 w-28 h-28 md:w-44 md:h-44 fill-emerald-600" />
                  </motion.div>
                  <h1 className="text-[10rem] md:text-[16rem] font-black text-slate-900 tracking-tighter uppercase leading-none select-none italic">
                    CLEANING<span className="text-emerald-600">PORTAL</span>
                  </h1>
                </div>
                
                {/* Barra de Carregamento NexaCore Elite */}
                <div className="relative w-[40rem] h-6 bg-slate-50 rounded-full mb-16 shadow-inner border border-slate-100 overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ delay: 4, duration: 8, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-500 to-emerald-200" 
                  />
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-1/3 bg-white/20 skew-x-12"
                  />
                </div>

                <p className="text-slate-400 font-black tracking-[3.5em] uppercase text-sm md:text-4xl pl-[3.5em] drop-shadow-sm">
                  NexaCore LLC • Global Excellence
                </p>
              </motion.div>
            </div>

            {/* MÁSCARA DE LIMPEZA TOTAL (REVEAL V18) */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '160%' }}
              transition={{ duration: 12, ease: [0.45, 0.05, 0.55, 0.95] }}
              className="absolute inset-0 z-40 bg-white pointer-events-none"
              style={{ 
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 12%, rgba(255,255,255,1) 100%)',
                boxShadow: '-80px 0 160px rgba(255,255,255,1)'
              }}
            />
          </div>

          {/* Partículas de Brilho de Elite (Sparkles) */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 2, 0],
                  x: [Math.random() * 1400 - 700, Math.random() * 1400 - 700],
                  y: [Math.random() * 1400 - 700, Math.random() * 1400 - 700]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: Math.random() * 8,
                  ease: "easeInOut" 
                }}
                className="absolute left-1/2 top-1/2"
              >
                <Sparkles className="text-emerald-300 w-8 h-8" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
