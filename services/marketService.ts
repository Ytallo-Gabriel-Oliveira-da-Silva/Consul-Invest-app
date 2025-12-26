import { Asset, ChartDataPoint } from '../types';

// Initial Mock Data
export const INITIAL_ASSETS: Asset[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', type: 'CRYPTO', price: 64230.50, changePercent24h: 2.4, description: 'Ouro digital descentralizado.' },
  { id: '2', symbol: 'ETH', name: 'Ethereum', type: 'CRYPTO', price: 3450.12, changePercent24h: -1.2, description: 'Plataforma de contratos inteligentes.' },
  { id: '3', symbol: 'USD', name: 'Dólar Americano', type: 'FIAT', price: 5.15, changePercent24h: 0.05, description: 'Moeda de reserva global.' },
  { id: '4', symbol: 'EUR', name: 'Euro', type: 'FIAT', price: 5.58, changePercent24h: -0.1, description: 'Moeda da União Europeia.' },
  { id: '5', symbol: 'BOVA11', name: 'iShares Ibovespa', type: 'ETF', price: 125.40, changePercent24h: 1.1, description: 'ETF que rastreia o índice Bovespa.' },
  { id: '6', symbol: 'PETR4', name: 'Petrobras PN', type: 'STOCK', price: 38.90, changePercent24h: 0.8, description: 'Gigante de energia brasileira.' },
  { id: '7', symbol: 'AAPL', name: 'Apple Inc.', type: 'STOCK', price: 175.30, changePercent24h: 0.5, description: 'Tecnologia de consumo.' },
  { id: '8', symbol: 'NVDA', name: 'NVIDIA Corp', type: 'STOCK', price: 890.00, changePercent24h: 3.5, description: 'Líder em chips de IA.' },
];

// Generate fake chart history based on current price
export const generateChartData = (basePrice: number, points: number = 50): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let currentPrice = basePrice * 0.9; // Start slightly lower to show trend to current

  const now = new Date();
  
  for (let i = 0; i < points; i++) {
    const volatility = basePrice * 0.02; // 2% volatility
    const change = (Math.random() - 0.5) * volatility;
    currentPrice += change;
    
    // Smooth landing to current price at the end
    if (i > points - 5) {
      currentPrice = currentPrice + (basePrice - currentPrice) * 0.5;
    }

    const time = new Date(now.getTime() - (points - i) * 60 * 60 * 1000); // Hourly points back in time
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: Number(currentPrice.toFixed(2)),
    });
  }
  return data;
};

// Simulate live price updates
export const simulateLivePrice = (currentPrice: number): number => {
  const volatility = currentPrice * 0.0005; // Very small movement
  const change = (Math.random() - 0.5) * volatility;
  return Number((currentPrice + change).toFixed(2));
};
