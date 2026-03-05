// Trading Types

export interface Balance {
  asset: string
  free: number
  locked: number
  total: number
}

export interface Ticker {
  symbol: string
  price: number
  change24h: number
  high24h: number
  low24h: number
  volume24h: number
}

export interface Order {
  id: string
  symbol: string
  side: 'buy' | 'sell'
  type: 'market' | 'limit'
  price?: number
  amount: number
  filled: number
  status: 'open' | 'closed' | 'canceled'
  timestamp: number
}

export interface Trade {
  id: string
  orderId: string
  symbol: string
  side: 'buy' | 'sell'
  price: number
  amount: number
  fee: number
  feeAsset: string
  timestamp: number
}

export interface PortfolioAsset {
  symbol: string
  name: string
  amount: number
  avgPrice: number
  currentPrice: number
  value: number
  pnl: number
  pnlPercent: number
}

export interface OrderRequest {
  symbol: string
  side: 'buy' | 'sell'
  type: 'market' | 'limit'
  amount: number
  price?: number
}
