import React from 'react';

interface AssetIconProps {
  symbol: string;
  className?: string;
}

const AssetIcon: React.FC<AssetIconProps> = ({ symbol, className = "w-10 h-10" }) => {
  const getIcon = () => {
    switch (symbol.toUpperCase()) {
      case 'BTC':
        return (
          <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#F7931A"/>
            <path d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.848 1.728.43.718-2.881c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.402-1.594-4.212 1.132-.26 1.986-1.003 2.213-2.538zm-3.96 5.608c-.54 2.162-4.188.994-5.368.7l.957-3.84c1.18.294 4.976.875 4.412 3.14zm.536-5.633c-.493 1.976-3.536.972-4.522.726l.87-3.488c.986.246 4.166.705 3.652 2.762z" fill="white"/>
          </svg>
        );
      case 'ETH':
        return (
          <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#627EEA"/>
            <path d="M16.498 4v8.87l7.497 3.35L16.498 4z" fill="#C0CBF6" fillOpacity=".602"/>
            <path d="M16.498 4L9 16.22l7.498-3.35V4z" fill="#C0CBF6"/>
            <path d="M16.498 21.968v6.027L24 17.616l-7.502 4.352z" fill="#C0CBF6" fillOpacity=".602"/>
            <path d="M16.498 27.995v-6.027L9 17.616l7.498 10.38z" fill="#C0CBF6"/>
            <path d="M16.498 20.573l7.497-4.353-7.497-3.348v7.7z" fill="#fff" fillOpacity=".2"/>
            <path d="M9 16.22l7.498 4.353v-7.7L9 16.22z" fill="#fff" fillOpacity=".602"/>
          </svg>
        );
      case 'USD':
        return (
          <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#10B981"/>
            <path d="M16 7v18M11 11h4a4 4 0 0 1 0 8h-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 21h-4a4 4 0 0 1 0-8h4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'EUR':
        return (
          <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#3B82F6"/>
            <path d="M19 10a7 7 0 1 0 0 12M8 14h10M8 18h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'AAPL':
        return (
          <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#111"/>
            <path d="M20.66 18.28c-.01 1.62 1.42 2.15 1.43 2.16-.01.03-.22.76-.74 1.52-.46.67-.94 1.34-1.69 1.35-.74.01-.98-.44-1.83-.44-.85 0-1.12.44-1.83.45-.73.02-1.29-.73-1.76-1.41-.96-1.39-1.69-3.95-.7-6.13.49-1.08 1.37-1.76 2.32-1.78.71-.02 1.38.48 1.81.48.43 0 1.23-.59 2.07-.5.35.02 1.35.14 2.38 1.22-.05.03-1.42.83-1.46 2.58zm-2.45-5.32c.39-.47.65-1.12.58-1.77-.56.02-1.24.37-1.64.84-.36.41-.67 1.08-.59 1.71.62.05 1.25-.32 1.65-.78z" fill="white"/>
          </svg>
        );
      case 'NVDA':
        return (
          <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#76B900"/>
            <path d="M6 16c0-5.52 4.48-10 10-10 .55 0 1 .45 1 1s-.45 1-1 1c-4.42 0-8 3.58-8 8s3.58 8 8 8c.55 0 1 .45 1 1s-.45 1-1 1c-5.52 0-10-4.48-10-10z" fill="white"/>
            <path d="M23.5 16c0-4.14-3.36-7.5-7.5-7.5-.55 0-1 .45-1 1s.45 1 1 1c3.04 0 5.5 2.46 5.5 5.5s-2.46 5.5-5.5 5.5c-.55 0-1 .45-1 1s.45 1 1 1c4.14 0 7.5-3.36 7.5-7.5z" fill="white"/>
            <path d="M16 13c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="white"/>
          </svg>
        );
      case 'PETR4':
        return (
          <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#008542"/>
            <path d="M6 16h20M16 6v20" stroke="#FFCC29" strokeWidth="8"/>
            <path d="M24 8l-16 16" stroke="#FFCC29" strokeWidth="2"/>
          </svg>
        );
      case 'BOVA11':
        return (
          <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
             <rect width="32" height="32" rx="16" fill="#151e2e" stroke="#22d3ee" strokeWidth="1"/>
             <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold">B3</text>
          </svg>
        );
      default:
        // Default generic icon
        return (
          <div className={`${className} rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-white font-bold text-xs`}>
            {symbol.substring(0, 2)}
          </div>
        );
    }
  };

  return (
    <div className="relative group">
       <div className="absolute inset-0 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
       <div className="relative z-10 drop-shadow-lg">
        {getIcon()}
       </div>
    </div>
  );
};

export default AssetIcon;
