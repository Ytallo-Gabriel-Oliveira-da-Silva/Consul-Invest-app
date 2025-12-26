import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const dim = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-cyan-500 blur-lg opacity-20 rounded-full animate-pulse-slow`} />
        
        <svg
          width={dim}
          height={dim}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Outer Ring */}
          <path
            d="M50 5 A45 45 0 0 1 95 50"
            stroke="url(#grad1)"
            strokeWidth="8"
            strokeLinecap="round"
            className="opacity-80"
          />
          <path
            d="M50 95 A45 45 0 0 1 5 50"
            stroke="url(#grad2)"
            strokeWidth="8"
            strokeLinecap="round"
            className="opacity-80"
          />
          
          {/* Inner Abstract C/I */}
          <path
            d="M35 35 L65 35 L50 65 L35 35"
            stroke="#22d3ee"
            strokeWidth="4"
            fill="none"
            className="animate-[spin_10s_linear_infinite]"
            style={{transformOrigin: '50% 50%'}}
          />
          
          <circle cx="50" cy="50" r="10" fill="#0ea5e9" />

          <defs>
            <linearGradient id="grad1" x1="50" y1="5" x2="95" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22d3ee" />
              <stop stopColor="#0f172a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad2" x1="50" y1="95" x2="5" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop stopColor="#0f172a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className={`font-bold tracking-wider text-white relative flex items-baseline ${size === 'xl' ? 'text-3xl' : size === 'lg' ? 'text-2xl' : 'text-lg'}`}>
        CONSUL <span className="text-cyan-400 font-light ml-1.5">INVEST</span>
        <span 
          className="text-cyan-600 font-mono opacity-80 select-none ml-0.5" 
          style={{ fontSize: '0.4em', transform: 'translateY(-0.8em)' }}
        >
          TM
        </span>
      </div>
    </div>
  );
};

export default Logo;