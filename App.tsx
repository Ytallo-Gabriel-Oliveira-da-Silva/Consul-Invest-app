import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { 
  LayoutDashboard, 
  LineChart, 
  User as UserIcon, 
  LogOut, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  Globe,
  Camera,
  MessageSquare,
  Activity,
  ChevronRight,
  ShieldCheck,
  Lock,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer 
} from 'recharts';
import Logo from './components/Logo';
import StockChart from './components/StockChart';
import AIChat from './components/AIChat';
import AssetIcon from './components/AssetIcon';
import AdBanner from './components/AdBanner'; 
import RewardedAdTrigger from './components/RewardedAdTrigger'; 
import { Asset } from './types';
import { INITIAL_ASSETS, generateChartData, simulateLivePrice } from './services/marketService';

// --- Page Components ---

// Login / Register Page
const LoginPage = () => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, isRegister ? name : 'Investidor');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Background Tech Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" />

      <div className="w-full max-w-md p-8 bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
        
        <div className="flex justify-center mb-10 transform group-hover:scale-105 transition-transform duration-500">
          <Logo size="lg" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">
          {isRegister ? 'Criar Conta' : 'Acessar Conta'}
        </h2>
        <p className="text-slate-400 text-sm mb-8 text-center font-light">
          Terminal de inteligência financeira global.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div className="group/input">
              <label className="block text-[10px] font-mono text-cyan-500 mb-1 tracking-widest uppercase group-hover/input:text-cyan-400 transition-colors">Nome Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 focus:bg-slate-900/80 outline-none transition-all duration-300"
                placeholder="Ex: João Silva"
                required
              />
            </div>
          )}
          
          <div className="group/input">
            <label className="block text-[10px] font-mono text-cyan-500 mb-1 tracking-widest uppercase group-hover/input:text-cyan-400 transition-colors">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 focus:bg-slate-900/80 outline-none transition-all duration-300"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="group/input">
            <label className="block text-[10px] font-mono text-cyan-500 mb-1 tracking-widest uppercase group-hover/input:text-cyan-400 transition-colors">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 focus:bg-slate-900/80 outline-none transition-all duration-300"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] mt-4 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider text-sm"
          >
            {isRegister ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest"
          >
            {isRegister ? 'Já possui uma conta? Faça Login' : 'Não tem conta? Cadastre-se'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Dashboard Page
interface DashboardProps {
  onSelectAsset: (asset: Asset) => void;
  onNavigate: (tab: 'dashboard' | 'market' | 'profile') => void;
  onOpenChat: () => void;
}

const Dashboard = ({ onSelectAsset, onNavigate, onOpenChat }: DashboardProps) => {
  const { user } = useAuth();
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(current => 
        current.map(asset => ({
          ...asset,
          price: simulateLivePrice(asset.price),
          changePercent24h: asset.changePercent24h + (Math.random() - 0.5) * 0.1
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const topAssets = assets.slice(0, 3);
  const totalBalance = 145230.50; 

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
            <span className="text-xs font-mono text-green-500 tracking-wider">SISTEMA ONLINE</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">Visão Geral</h1>
          <p className="text-slate-400 font-light">Olá, <span className="text-cyan-400">{user?.name}</span>. O mercado está volátil hoje.</p>
        </div>
        <div className="text-left md:text-right bg-slate-900/50 p-4 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <p className="text-[10px] font-mono text-cyan-500 mb-1 uppercase tracking-widest">Patrimônio Total Estimado</p>
          <div className="text-3xl font-mono font-bold text-white tracking-tight flex items-baseline gap-2">
            R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-green-400 text-xs font-mono flex justify-start md:justify-end items-center gap-1 mt-1">
            <TrendingUp size={12} /> +2.4% (últimas 24h)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Card */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-1 backdrop-blur-md relative group overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
          <div className="bg-slate-950/50 rounded-[22px] p-6 h-full relative z-10">
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-slate-800 rounded-lg">
                   <Activity className="text-cyan-400 w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-lg font-semibold text-white">BTC / USD</h3>
                    <p className="text-xs text-slate-500 font-mono">ÍNDICE DE REFERÊNCIA GLOBAL</p>
                 </div>
               </div>
               <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                {['1H', '1D', '1S', '1M', '1A'].map(p => (
                  <button key={p} className={`px-3 py-1 rounded-md text-[10px] font-mono transition-all ${p === '1D' ? 'bg-cyan-500 text-slate-900 font-bold shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px] w-full">
              <StockChart data={generateChartData(assets[0].price)} />
            </div>
          </div>
        </div>

        {/* Top Assets Card */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-1 backdrop-blur-md flex flex-col shadow-2xl">
          <div className="bg-slate-950/50 rounded-[22px] p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="text-cyan-500 w-5 h-5" />
              Ativos em Destaque
            </h3>
            <div className="flex-1 space-y-4">
              {topAssets.map(asset => (
                <div 
                  key={asset.id} 
                  onClick={() => onSelectAsset(asset)}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 border border-transparent hover:border-slate-700 cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <AssetIcon symbol={asset.symbol} className="w-10 h-10" />
                    <div>
                      <div className="text-white font-bold text-sm tracking-wide group-hover:text-cyan-400 transition-colors">{asset.symbol}</div>
                      <div className="text-slate-500 text-[10px] uppercase font-mono">{asset.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-mono text-sm">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(asset.price)}
                    </div>
                    <div className={`text-[10px] font-mono flex items-center justify-end gap-1 ${asset.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.changePercent24h >= 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onNavigate('market')}
              className="w-full mt-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 hover:text-white transition-all font-mono uppercase tracking-widest flex items-center justify-center gap-2 group"
            >
              Ver Mercado Completo <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* AdBanner Placement 1 (Between Charts and Actions) */}
      <AdBanner />
      
      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Wallet, label: 'Carteira Digital', desc: 'Gestão de Ativos', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', action: () => onNavigate('profile') },
          { icon: LineChart, label: 'Análise Técnica', desc: 'Gráficos Avançados', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', action: () => onNavigate('market') },
          { icon: Globe, label: 'Câmbio Global', desc: 'Forex & Commodities', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', action: () => onNavigate('market') },
          { icon: MessageSquare, label: 'Consul AI', desc: 'Consultoria Híbrida', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', action: () => onOpenChat() },
        ].map((item, i) => (
          <div 
            key={i} 
            onClick={item.action}
            className={`relative overflow-hidden p-1 rounded-2xl transition-transform hover:-translate-y-1 duration-300 group cursor-pointer`}
          >
             <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity ${item.bg} blur-xl`} />
             <div className={`bg-slate-900/80 backdrop-blur-xl border ${item.border} group-hover:border-opacity-50 p-5 rounded-xl h-full relative z-10 flex flex-col items-start gap-3`}>
                <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{item.label}</div>
                  <div className="text-slate-500 text-xs font-mono mt-0.5">{item.desc}</div>
                </div>
                <div className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0 ${item.color}`}>
                  <ChevronRight size={16} />
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Market Page
const MarketPage = ({ onSelectAsset }: { onSelectAsset: (asset: Asset) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);

   useEffect(() => {
    const interval = setInterval(() => {
      setAssets(current => 
        current.map(asset => ({
          ...asset,
          price: simulateLivePrice(asset.price),
          changePercent24h: asset.changePercent24h + (Math.random() - 0.5) * 0.05
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredAssets = assets.filter(
    a => a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         a.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
         <h1 className="text-3xl font-bold text-white tracking-tight">Mercado Global</h1>
         <div className="relative w-full md:w-96 group">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-slate-900 border border-slate-700 rounded-full flex items-center px-4 py-3 focus-within:border-cyan-500 transition-colors">
              <Search className="text-slate-400 w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="Pesquisar ativos (Ex: Bitcoin, AAPL)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white w-full focus:outline-none placeholder-slate-600 font-mono text-sm"
              />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset, index) => (
          <React.Fragment key={asset.id}>
            <div 
              onClick={() => onSelectAsset(asset)}
              className="group relative bg-slate-900/60 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <AssetIcon symbol={asset.symbol} className="w-12 h-12 shadow-lg" />
                    <div>
                      <h3 className="text-white font-bold tracking-wide text-lg group-hover:text-cyan-400 transition-colors">{asset.symbol}</h3>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700">{asset.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-mono font-bold px-2 py-1 rounded-lg ${asset.changePercent24h >= 0 ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                      {asset.changePercent24h > 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-3xl text-white font-mono font-bold tracking-tighter">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(asset.price)}
                  </div>
                  <p className="text-slate-500 text-xs mt-2 truncate font-light">{asset.description}</p>
                </div>

                <div className="h-16 w-full opacity-40 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 duration-500">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateChartData(asset.price, 20)}>
                      <defs>
                        <linearGradient id={`grad-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={asset.changePercent24h >= 0 ? "#4ade80" : "#f87171"} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={asset.changePercent24h >= 0 ? "#4ade80" : "#f87171"} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke={asset.changePercent24h >= 0 ? "#4ade80" : "#f87171"} fill={`url(#grad-${asset.id})`} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {/* Inject Banner after 3rd item */}
            {index === 2 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                 <AdBanner format="large-banner" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* AdBanner Placement 2 */}
      <AdBanner format="large-banner" />
    </div>
  );
};

// Asset Detail Modal/Page
const AssetDetail = ({ asset, onBack }: { asset: Asset, onBack: () => void }) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setChartData(generateChartData(asset.price, 100));
  }, [asset]);

  return (
    <div className="space-y-6 animate-fade-in pb-10">
       <button onClick={onBack} className="group flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-mono mb-4">
         <div className="p-1 rounded bg-slate-800 border border-slate-700 group-hover:border-cyan-500 transition-colors">
            <ChevronRight className="rotate-180 w-3 h-3" />
         </div>
         VOLTAR AO MERCADO
       </button>

       <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 backdrop-blur-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
           <AssetIcon symbol={asset.symbol} className="w-64 h-64 grayscale" />
         </div>
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
           <div className="flex items-center gap-6">
              <div className="relative">
                 <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20" />
                 <AssetIcon symbol={asset.symbol} className="w-20 h-20 relative z-10 drop-shadow-2xl" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-white tracking-tighter mb-1">{asset.symbol}</h1>
                <p className="text-slate-400 text-lg font-light">{asset.name}</p>
              </div>
           </div>
           <div className="text-left md:text-right bg-slate-950/30 p-4 rounded-xl border border-white/5 backdrop-blur-md">
              <div className="text-4xl font-mono font-bold text-white tracking-tight">
                 {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(asset.price)}
              </div>
              <div className={`text-sm font-mono flex items-center gap-2 justify-start md:justify-end mt-2 ${asset.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {asset.changePercent24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {asset.changePercent24h.toFixed(2)}% (24h)
              </div>
           </div>
         </div>

         {/* Detailed Chart */}
         <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 h-[450px] mb-8 relative">
            <div className="absolute top-4 left-4 flex gap-2">
               <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
               <span className="text-[10px] font-mono text-cyan-500 uppercase">Dados em Tempo Real</span>
            </div>
            <StockChart data={chartData} color={asset.changePercent24h >= 0 ? '#22d3ee' : '#f87171'} />
         </div>
         
         {/* AdBanner Placement 3 */}
         <AdBanner className="my-8" />

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-950/30 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Activity size={16} className="text-cyan-500" />
                Análise Fundamentalista
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm font-light">
                {asset.description}. O ativo demonstra alta liquidez no mercado atual. A tecnologia de monitoramento da Consul Invest indica uma tendência {asset.changePercent24h >= 0 ? 'altista' : 'de correção'} no curto prazo, baseada no fluxo de ordens globais.
              </p>
            </div>
            <div className="bg-slate-950/30 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
               <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                 <LineChart size={16} className="text-cyan-500" />
                 Métricas (24h)
               </h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                   <span className="text-slate-500 text-sm">Máxima</span>
                   <span className="text-white font-mono">R$ {(asset.price * 1.05).toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                   <span className="text-slate-500 text-sm">Mínima</span>
                   <span className="text-white font-mono">R$ {(asset.price * 0.95).toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                   <span className="text-slate-500 text-sm">Volatilidade</span>
                   <span className="text-yellow-400 font-mono text-xs">MÉDIA / ALTA</span>
                 </div>
               </div>
            </div>
         </div>

         {/* Rewarded Ad Section */}
         <RewardedAdTrigger title="Deep Market Analysis" onRewardGranted={() => console.log('Reward granted!')}>
            <div className="p-6 bg-slate-900/50">
               <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                 <Zap className="text-yellow-400" size={18} />
                 Análise Institucional Premium
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                     <div className="text-slate-500 mb-1">Fluxo de Baleias (24h)</div>
                     <div className="text-green-400 font-mono font-bold text-lg">+R$ 45.2M (Entrada)</div>
                     <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                       <div className="bg-green-500 h-full w-[70%]" />
                     </div>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                     <div className="text-slate-500 mb-1">Sentimento Social AI</div>
                     <div className="text-cyan-400 font-mono font-bold text-lg">92% Otimista</div>
                     <p className="text-xs text-slate-500 mt-2">Baseado em 1.2M de interações analisadas.</p>
                  </div>
               </div>
               <p className="mt-4 text-slate-400 leading-relaxed text-sm">
                 A análise preditiva da Consul AI sugere um movimento de ruptura nos próximos 48h. As ordens de compra institucionais estão se acumulando na zona de suporte de R$ {(asset.price * 0.98).toFixed(2)}. Recomendação: Manter posição com stop-loss ajustado.
               </p>
            </div>
         </RewardedAdTrigger>
       </div>
    </div>
  );
};

// Profile Page
const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile({ name });
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-10">
      <h1 className="text-3xl font-bold text-white">Configurações de Perfil</h1>
      
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
         
         <div className="flex flex-col items-center sm:flex-row sm:items-start gap-10">
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur opacity-20 group-hover:opacity-60 transition-opacity" />
               <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-900">
                 <img src={user?.avatarUrl || 'https://picsum.photos/200'} alt="Profile" className="w-full h-full object-cover" />
               </div>
               <label className="absolute bottom-0 right-0 bg-cyan-500 p-2.5 rounded-full cursor-pointer hover:bg-cyan-400 transition-all shadow-lg hover:scale-110 z-20 border-4 border-slate-900">
                 <Camera size={18} className="text-slate-900" />
                 <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
               </label>
            </div>
            
            <div className="flex-1 w-full space-y-8 pt-2">
              <div>
                <label className="block text-[10px] font-mono text-cyan-500 mb-2 uppercase tracking-widest">Identidade do Operador</label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none font-medium"
                    />
                    <button onClick={handleSave} className="bg-cyan-500 hover:bg-cyan-400 px-6 py-2 rounded-xl text-slate-900 font-bold text-sm transition-colors">Salvar</button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <span className="text-2xl text-white font-bold tracking-tight">{user?.name}</span>
                    <button onClick={() => setIsEditing(true)} className="text-cyan-500 text-xs uppercase tracking-widest hover:text-white transition-colors border border-cyan-900 hover:border-cyan-500 px-3 py-1 rounded-full">Editar</button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-widest">Protocolo de Email</label>
                <div className="text-slate-300 font-mono bg-slate-950/50 p-3 rounded-xl border border-slate-800/50 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                  {user?.email}
                </div>
              </div>

              <div>
                 <label className="block text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-widest">Nível de Acesso</label>
                 <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide">
                   <ShieldCheck size={14} />
                   VERIFICADO // NÍVEL PLATINUM
                 </div>
              </div>
            </div>
         </div>
      </div>
      
      {/* Banner in Profile Page */}
      <AdBanner format="large-banner" />
    </div>
  );
};

// Main Layout Component
const AppLayout = () => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'market' | 'profile'>('dashboard');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleNav = (tab: 'dashboard' | 'market' | 'profile') => {
    setActiveTab(tab);
    setSelectedAsset(null);
  };

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const renderContent = () => {
    if (selectedAsset) {
      return <AssetDetail asset={selectedAsset} onBack={() => setSelectedAsset(null)} />;
    }
    switch (activeTab) {
      case 'dashboard': 
        return (
          <Dashboard 
            onSelectAsset={handleAssetSelect} 
            onNavigate={handleNav} 
            onOpenChat={() => setIsChatOpen(true)}
          />
        );
      case 'market': return <MarketPage onSelectAsset={handleAssetSelect} />;
      case 'profile': return <ProfilePage />;
      default: 
        return (
          <Dashboard 
            onSelectAsset={handleAssetSelect} 
            onNavigate={handleNav} 
            onOpenChat={() => setIsChatOpen(true)}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
         {/* Cyber Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_10%,transparent_100%)]" />
         
         {/* Glow Spots */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      </div>

      {/* Sidebar - High Tech Design */}
      <aside className="fixed left-0 top-0 h-full w-72 hidden md:flex flex-col z-30 transition-all duration-300">
        <div className="h-full bg-slate-900/60 backdrop-blur-2xl border-r border-white/5 flex flex-col relative overflow-hidden">
          {/* Sidebar Glow Line */}
          <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />

          <div className="p-8 pb-4">
            <Logo />
          </div>
          
          <nav className="flex-1 px-4 space-y-3 mt-8">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-4 mb-2">Menu Principal</div>
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Visão Geral' },
              { id: 'market', icon: LineChart, label: 'Mercado' },
              { id: 'profile', icon: UserIcon, label: 'Perfil' },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id as any)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative group overflow-hidden ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500/10 to-transparent text-white border-l-2 border-cyan-500' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                  }`}
                >
                  <div className={`relative z-10 p-1 rounded transition-colors ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`}>
                     <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className={`relative z-10 font-medium tracking-wide ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                  
                  {/* Hover Glow */}
                  {isActive && (
                     <div className="absolute inset-0 bg-cyan-400/5 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]" />
                  )}
                </button>
              );
            })}
            
            {/* Sidebar Ad Spot */}
            <div className="px-4 mt-8 opacity-80 hover:opacity-100 transition-opacity">
               <AdBanner format="rectangle" className="!h-[150px] !my-0" />
            </div>
          </nav>

          <div className="p-6 border-t border-white/5 bg-slate-950/30">
            <div className="flex items-center gap-3 mb-5 px-1">
              <div className="relative">
                 <img src={user?.avatarUrl || 'https://picsum.photos/200'} className="w-10 h-10 rounded-full border-2 border-slate-700" alt="Avatar" />
                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div className="overflow-hidden">
                 <div className="text-sm font-bold text-white truncate">{user?.name}</div>
                 <div className="text-[10px] text-cyan-500 truncate font-mono tracking-wider">CONECTADO</div>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors text-xs font-bold uppercase tracking-widest border border-red-500/20"
            >
              <LogOut size={14} /> Desconectar
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900/90 backdrop-blur-xl border-b border-white/10 z-40 p-4 flex justify-between items-center shadow-lg">
         <Logo size="sm" />
         <button onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')} className="text-white p-2">
           <div className="space-y-1.5">
             <div className="w-6 h-0.5 bg-white shadow-[0_0_10px_white]"></div>
             <div className="w-6 h-0.5 bg-white shadow-[0_0_10px_white]"></div>
             <div className="w-6 h-0.5 bg-white shadow-[0_0_10px_white]"></div>
           </div>
         </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div id="mobile-menu" className="hidden fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl md:hidden flex flex-col pt-24 px-8">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none" />
          <button onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')} className="absolute top-6 right-6 text-slate-400 hover:text-white p-2">
             <div className="text-2xl">✕</div>
          </button>
          <div className="space-y-6 relative z-10">
             <div className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-4">Navegação</div>
             <button onClick={() => { handleNav('dashboard'); document.getElementById('mobile-menu')?.classList.add('hidden'); }} className="flex items-center gap-4 text-xl font-bold text-white py-4 border-b border-slate-800 active:text-cyan-400"><LayoutDashboard className="text-cyan-500" /> Visão Geral</button>
             <button onClick={() => { handleNav('market'); document.getElementById('mobile-menu')?.classList.add('hidden'); }} className="flex items-center gap-4 text-xl font-bold text-white py-4 border-b border-slate-800 active:text-cyan-400"><LineChart className="text-cyan-500" /> Mercado</button>
             <button onClick={() => { handleNav('profile'); document.getElementById('mobile-menu')?.classList.add('hidden'); }} className="flex items-center gap-4 text-xl font-bold text-white py-4 border-b border-slate-800 active:text-cyan-400"><UserIcon className="text-cyan-500" /> Perfil</button>
             <button onClick={logout} className="flex items-center gap-4 text-xl font-bold text-red-400 py-6 mt-8"><LogOut /> Sair do Sistema</button>
          </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 p-6 md:p-10 pt-24 md:pt-10 min-h-screen relative z-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* AI Chat Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-20 animate-pulse rounded-full" />
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`relative group flex items-center justify-center w-16 h-16 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:scale-110 border border-white/10 ${
            isChatOpen ? 'bg-slate-800 text-slate-400 rotate-90' : 'bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white hover:brightness-110'
          }`}
        >
          {isChatOpen ? (
            <div className="relative w-6 h-6">
               <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-white -translate-y-1/2 rotate-45" />
               <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-white -translate-y-1/2 -rotate-45" />
            </div>
          ) : (
            <MessageSquare className="w-7 h-7 fill-white/20" />
          )}
        </button>
        
        {!isChatOpen && (
          <div className="absolute right-20 top-4 bg-slate-900/90 text-white text-xs px-4 py-2 rounded-xl whitespace-nowrap border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 backdrop-blur-md shadow-xl">
            <span className="text-cyan-400 font-bold">Consul AI</span> Online
          </div>
        )}
      </div>

      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppLayout /> : <LoginPage />;
};

export default App;