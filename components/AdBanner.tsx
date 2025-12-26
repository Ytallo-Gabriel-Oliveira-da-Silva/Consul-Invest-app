import React, { useEffect, useRef, useState } from 'react';
import { ADMOB_IDS } from '../services/adMobService';
import { Wifi, AlertCircle } from 'lucide-react';

interface AdBannerProps {
  className?: string;
  format?: 'banner' | 'large-banner' | 'rectangle';
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '', format = 'banner' }) => {
  const [adError, setAdError] = useState(false);
  
  // Define dimensions based on format
  const heightStyle = format === 'rectangle' ? { height: '250px' } : format === 'large-banner' ? { height: '100px' } : { height: '60px' };
  
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        // Push the ad request
        // Em ambiente web/localhost, isso geralmente retorna vazio para IDs ca-app-pub
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // Ignora erros de console comuns em localhost
      setAdError(true);
    }
  }, []);

  return (
    <div className={`w-full flex justify-center items-center my-6 animate-fade-in ${className}`}>
      {/* 
         Estratégia Híbrida:
         O Container possui um background visual "Tech" (Placeholder).
         O script do Google AdMob é renderizado POR CIMA deste background (z-index maior).
         
         1. Se o anúncio carregar (App Real): Ele cobre o background.
         2. Se o anúncio falhar (Web/Localhost): O background fica visível, mantendo o design bonito.
      */}
      <div 
        className="w-full max-w-4xl bg-slate-950/40 border border-slate-800/60 border-dashed rounded-xl relative overflow-hidden group"
        style={heightStyle}
      >
        {/* === CAMADA 1: VISUAL DE FUNDO (PLACEHOLDER) === */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
           {/* Grid Effect */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
           
           <div className="flex flex-col items-center justify-center opacity-40 gap-1">
              <div className="flex items-center gap-2 text-cyan-800 text-[10px] font-mono uppercase tracking-[0.2em] border border-cyan-900/30 px-3 py-1 rounded-full">
                 <Wifi size={10} className="animate-pulse" />
                 Espaço Publicitário
              </div>
              <div className="text-[9px] text-slate-700 font-mono hidden md:block">
                 Aguardando conexão segura AdMob...
              </div>
           </div>
        </div>

        {/* === CAMADA 2: O ANÚNCIO REAL === */}
        <div className="absolute inset-0 z-10">
             <ins className="adsbygoogle"
               style={{ display: 'block', width: '100%', height: '100%' }}
               data-ad-client={ADMOB_IDS.APP_ID}
               data-ad-slot={ADMOB_IDS.BANNER}
               data-ad-format="auto"
               data-full-width-responsive="true"
             />
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
