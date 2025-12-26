import React, { useState } from 'react';
import { Lock, Play, Unlock, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { ADMOB_IDS, logAdEvent } from '../services/adMobService';

interface RewardedAdTriggerProps {
  title: string;
  onRewardGranted: () => void;
  children: React.ReactNode;
}

const RewardedAdTrigger: React.FC<RewardedAdTriggerProps> = ({ title, onRewardGranted, children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const handleWatchAd = () => {
    setIsWatching(true);
    setLoadingText(`Conectando: ${ADMOB_IDS.REWARDED.substring(0, 20)}...`);
    logAdEvent('Rewarded Request', ADMOB_IDS.REWARDED);

    // Simulação do carregamento do AdMob
    setTimeout(() => {
      setLoadingText('Exibindo Publicidade...');
      
      // Simulação da duração do vídeo (3s)
      setTimeout(() => {
        setLoadingText('Verificando Recompensa...');
        
        setTimeout(() => {
          setIsWatching(false);
          setIsUnlocked(true);
          onRewardGranted();
          logAdEvent('Reward Granted', ADMOB_IDS.REWARDED);
        }, 1000);
      }, 3000);
    }, 1500);
  };

  if (isUnlocked) {
    return (
      <div className="relative animate-fade-in transition-all duration-500">
        <div className="absolute -top-3 left-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 backdrop-blur-md z-10">
          <CheckCircle2 size={10} /> Acesso Premium Ativo
        </div>
        <div className="border border-emerald-500/20 rounded-2xl overflow-hidden relative shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
            {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center group backdrop-blur-sm">
      {/* Locked Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] opacity-20" />
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-cyan-500/50 transition-colors duration-500">
           <Lock className="w-6 h-6 text-cyan-500" />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{title}</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed font-light">
            Dados institucionais criptografados. Assista a um vídeo patrocinado para descriptografar a análise completa.
          </p>
        </div>

        <button
          onClick={handleWatchAd}
          disabled={isWatching}
          className="mt-4 flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-wait shadow-[0_0_20px_rgba(6,182,212,0.2)] disabled:shadow-none min-w-[200px] justify-center"
        >
          {isWatching ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              <span className="font-mono text-xs">{loadingText}</span>
            </>
          ) : (
            <>
              <Play fill="currentColor" size={14} />
              DESBLOQUEAR (AD)
            </>
          )}
        </button>
        
        <div className="text-[9px] text-slate-600 font-mono mt-4 uppercase tracking-[0.2em]">
          Powered by Google AdMob
        </div>
      </div>
    </div>
  );
};

export default RewardedAdTrigger;
