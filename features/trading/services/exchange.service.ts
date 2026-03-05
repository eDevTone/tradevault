import { binanceClient } from '@/lib/binance-client'
import type { Ticker, Order, Trade, OrderRequest } from '@/types/trading'

/**
 * Get market price for a symbol
 */
export async function getMarketPrice(symbol: string): Promise<Ticker> {
  try {
    return await binanceClient.getTicker(symbol)
  } catch (error) {
    console.error('[ExchangeService] Error fetching ticker:', error)
    throw new Error('Failed to fetch market price')
  }
}

/**
 * Get market prices for multiple symbols
 */
export async function getMarketPrices(symbols: string[]): Promise<Ticker[]> {
  try {
    return await binanceClient.getTickers(symbols)
  } catch (error) {
    console.error('[ExchangeService] Error fetching tickers:', error)
    throw new Error('Failed to fetch market prices')
  }
}

/**
 * Create a new order
 */
export async function createOrder(request: OrderRequest): Promise<Order> {
  try {
    const { symbol, side, type, amount, price } = request

    // Validate
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0')
    }

    if (type === 'limit' && !price) {
      throw new Error('Price is required for limit orders')
    }

    if (type === 'limit' && price && price <= 0) {
      throw new Error('Price must be greater than 0')
    }

    return await binanceClient.createOrder(symbol, side, type, amount, price)
  } catch (error) {
    console.error('[ExchangeService] Error creating order:', error)
    throw error
  }
}

/**
 * Get all open orders
 */
export async function getOpenOrders(symbol?: string): Promise<Order[]> {
  try {
    return await binanceClient.getOpenOrders(symbol)
  } catch (error) {
    console.error('[ExchangeService] Error fetching open orders:', error)
    throw new Error('Failed to fetch open orders')
  }
}

/**
 * Get recent trades for a symbol
 */
export async function getRecentTrades(
  symbol: string,
  limit = 20
): Promise<Trade[]> {
  try {
    return await binanceClient.getRecentTrades(symbol, limit)
  } catch (error) {
    console.error('[ExchangeService] Error fetching recent trades:', error)
    throw new Error('Failed to fetch recent trades')
  }
}

/**
 * Cancel an order
 */
export async function cancelOrder(
  orderId: string,
  symbol: string
): Promise<void> {
  try {
    await binanceClient.cancelOrder(orderId, symbol)
  } catch (error) {
    console.error('[ExchangeService] Error canceling order:', error)
    throw new Error('Failed to cancel order')
  }
}

/**
 * Check if exchange is connected
 */
export function isExchangeConnected(): boolean {
  return binanceClient.isConnected()
}

/**
 * Check if running in testnet mode
 */
export function isTestnetMode(): boolean {
  return binanceClient.getTestnetStatus()
}
