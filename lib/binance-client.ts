import ccxt from 'ccxt'
import type { Balance, Ticker, Order, Trade } from '@/types/trading'

class BinanceClient {
  private exchange: ccxt.binance | null = null
  private isTestnet: boolean = true

  constructor() {
    this.initialize()
  }

  private initialize() {
    const apiKey = process.env.BINANCE_API_KEY
    const apiSecret = process.env.BINANCE_API_SECRET
    const testnet = process.env.BINANCE_TESTNET === 'true'

    if (!apiKey || !apiSecret) {
      console.warn('[BinanceClient] API credentials not configured')
      return
    }

    this.isTestnet = testnet

    this.exchange = new ccxt.binance({
      apiKey,
      secret: apiSecret,
      enableRateLimit: true,
      options: {
        defaultType: 'spot',
        ...(testnet && {
          urls: {
            api: {
              public: 'https://testnet.binance.vision/api/v3',
              private: 'https://testnet.binance.vision/api/v3',
            },
          },
        }),
      },
    })

    console.log(
      `[BinanceClient] Initialized (${testnet ? 'testnet' : 'mainnet'})`
    )
  }

  async getBalances(): Promise<Balance[]> {
    if (!this.exchange) throw new Error('Exchange not initialized')

    const balance = await this.exchange.fetchBalance()
    const balances: Balance[] = []

    Object.keys(balance.total).forEach((asset) => {
      const total = balance.total[asset] || 0
      if (total > 0) {
        balances.push({
          asset,
          free: balance.free[asset] || 0,
          locked: balance.used[asset] || 0,
          total,
        })
      }
    })

    return balances
  }

  async getTicker(symbol: string): Promise<Ticker> {
    if (!this.exchange) throw new Error('Exchange not initialized')

    const ticker = await this.exchange.fetchTicker(symbol)

    return {
      symbol,
      price: ticker.last || 0,
      change24h: ticker.percentage || 0,
      high24h: ticker.high || 0,
      low24h: ticker.low || 0,
      volume24h: ticker.baseVolume || 0,
    }
  }

  async getTickers(symbols: string[]): Promise<Ticker[]> {
    if (!this.exchange) throw new Error('Exchange not initialized')

    const tickers = await Promise.all(
      symbols.map((symbol) => this.getTicker(symbol))
    )

    return tickers
  }

  async createOrder(
    symbol: string,
    side: 'buy' | 'sell',
    type: 'market' | 'limit',
    amount: number,
    price?: number
  ): Promise<Order> {
    if (!this.exchange) throw new Error('Exchange not initialized')

    const order = await this.exchange.createOrder(
      symbol,
      type,
      side,
      amount,
      price
    )

    return {
      id: order.id,
      symbol: order.symbol,
      side: side,
      type: type,
      price: order.price,
      amount: order.amount,
      filled: order.filled || 0,
      status: order.status as 'open' | 'closed' | 'canceled',
      timestamp: order.timestamp || Date.now(),
    }
  }

  async getOpenOrders(symbol?: string): Promise<Order[]> {
    if (!this.exchange) throw new Error('Exchange not initialized')

    const orders = await this.exchange.fetchOpenOrders(symbol)

    return orders.map((order) => ({
      id: order.id,
      symbol: order.symbol,
      side: order.side as 'buy' | 'sell',
      type: order.type as 'market' | 'limit',
      price: order.price,
      amount: order.amount,
      filled: order.filled || 0,
      status: order.status as 'open' | 'closed' | 'canceled',
      timestamp: order.timestamp || Date.now(),
    }))
  }

  async getRecentTrades(symbol: string, limit = 20): Promise<Trade[]> {
    if (!this.exchange) throw new Error('Exchange not initialized')

    const trades = await this.exchange.fetchMyTrades(symbol, undefined, limit)

    return trades.map((trade) => ({
      id: trade.id,
      orderId: trade.order || '',
      symbol: trade.symbol,
      side: trade.side as 'buy' | 'sell',
      price: trade.price,
      amount: trade.amount,
      fee: trade.fee?.cost || 0,
      feeAsset: trade.fee?.currency || '',
      timestamp: trade.timestamp || Date.now(),
    }))
  }

  async cancelOrder(orderId: string, symbol: string): Promise<void> {
    if (!this.exchange) throw new Error('Exchange not initialized')
    await this.exchange.cancelOrder(orderId, symbol)
  }

  isConnected(): boolean {
    return this.exchange !== null
  }

  getTestnetStatus(): boolean {
    return this.isTestnet
  }
}

// Singleton instance
export const binanceClient = new BinanceClient()
