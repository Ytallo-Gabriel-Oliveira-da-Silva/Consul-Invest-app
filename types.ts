export interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: 'CRYPTO' | 'STOCK' | 'FIAT' | 'ETF';
  price: number;
  changePercent24h: number;
  description: string;
}

export interface ChartDataPoint {
  time: string;
  value: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}
