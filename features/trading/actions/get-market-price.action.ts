'use server'

import { getMarketPrice, getMarketPrices } from '../services/exchange.service'

export async function getMarketPriceAction(symbol: string) {
  try {
    const ticker = await getMarketPrice(symbol)
    return {
      success: true,
      data: ticker,
    }
  } catch (error) {
    console.error('[getMarketPriceAction] Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch price',
    }
  }
}

export async function getMarketPricesAction(symbols: string[]) {
  try {
    const tickers = await getMarketPrices(symbols)
    return {
      success: true,
      data: tickers,
    }
  } catch (error) {
    console.error('[getMarketPricesAction] Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch prices',
    }
  }
}
