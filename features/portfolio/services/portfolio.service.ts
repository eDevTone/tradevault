import { binanceClient } from '@/lib/binance-client'
import { getMarketPrices } from '@/features/trading/services/exchange.service'
import type { Balance, PortfolioAsset } from '@/types/trading'

const ASSET_NAMES: Record<string, string> = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  BNB: 'Binance Coin',
  USDT: 'Tether',
  USDC: 'USD Coin',
  SOL: 'Solana',
  ADA: 'Cardano',
  DOT: 'Polkadot',
  MATIC: 'Polygon',
  LINK: 'Chainlink',
}

/**
 * Get all balances from exchange
 */
export async function getBalances(): Promise<Balance[]> {
  try {
    return await binanceClient.getBalances()
  } catch (error) {
    console.error('[PortfolioService] Error fetching balances:', error)
    throw new Error('Failed to fetch balances')
  }
}

/**
 * Get portfolio with current prices and PnL
 */
export async function getPortfolio(): Promise<PortfolioAsset[]> {
  try {
    const balances = await binanceClient.getBalances()
    
    // Filter out USDT/USDC (stablecoins don't need price fetch)
    const cryptoBalances = balances.filter(
      (b) => !['USDT', 'USDC', 'BUSD'].includes(b.asset)
    )
    
    const stableBalances = balances.filter(
      (b) => ['USDT', 'USDC', 'BUSD'].includes(b.asset)
    )

    // Get current prices for crypto assets
    const symbols = cryptoBalances.map((b) => `${b.asset}/USDT`)
    const tickers = symbols.length > 0 ? await getMarketPrices(symbols) : []

    // Build portfolio assets
    const portfolio: PortfolioAsset[] = []

    // Add crypto assets with real prices
    cryptoBalances.forEach((balance, index) => {
      const ticker = tickers[index]
      const currentPrice = ticker?.price || 0
      const value = balance.total * currentPrice

      // For now, use current price as avg price (will be stored in DB later)
      const avgPrice = currentPrice
      const pnl = (currentPrice - avgPrice) * balance.total
      const pnlPercent = avgPrice > 0 ? (pnl / (avgPrice * balance.total)) * 100 : 0

      portfolio.push({
        symbol: balance.asset,
        name: ASSET_NAMES[balance.asset] || balance.asset,
        amount: balance.total,
        avgPrice,
        currentPrice,
        value,
        pnl,
        pnlPercent,
      })
    })

    // Add stablecoins (1:1 USD)
    stableBalances.forEach((balance) => {
      portfolio.push({
        symbol: balance.asset,
        name: ASSET_NAMES[balance.asset] || balance.asset,
        amount: balance.total,
        avgPrice: 1,
        currentPrice: 1,
        value: balance.total,
        pnl: 0,
        pnlPercent: 0,
      })
    })

    // Sort by value (highest first)
    return portfolio.sort((a, b) => b.value - a.value)
  } catch (error) {
    console.error('[PortfolioService] Error fetching portfolio:', error)
    throw new Error('Failed to fetch portfolio')
  }
}

/**
 * Get total portfolio value in USD
 */
export async function getTotalPortfolioValue(): Promise<number> {
  try {
    const portfolio = await getPortfolio()
    return portfolio.reduce((sum, asset) => sum + asset.value, 0)
  } catch (error) {
    console.error('[PortfolioService] Error calculating portfolio value:', error)
    throw new Error('Failed to calculate portfolio value')
  }
}

/**
 * Get total PnL
 */
export async function getTotalPnL(): Promise<{ pnl: number; pnlPercent: number }> {
  try {
    const portfolio = await getPortfolio()
    const totalPnl = portfolio.reduce((sum, asset) => sum + asset.pnl, 0)
    const totalValue = portfolio.reduce((sum, asset) => sum + asset.value, 0)
    const totalCost = totalValue - totalPnl

    return {
      pnl: totalPnl,
      pnlPercent: totalCost > 0 ? (totalPnl / totalCost) * 100 : 0,
    }
  } catch (error) {
    console.error('[PortfolioService] Error calculating PnL:', error)
    throw new Error('Failed to calculate PnL')
  }
}
