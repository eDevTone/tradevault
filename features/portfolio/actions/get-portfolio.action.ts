'use server'

import { getPortfolio, getTotalPortfolioValue, getTotalPnL } from '../services/portfolio.service'

export async function getPortfolioAction() {
  try {
    const portfolio = await getPortfolio()
    const totalValue = await getTotalPortfolioValue()
    const { pnl, pnlPercent } = await getTotalPnL()

    return {
      success: true,
      data: {
        assets: portfolio,
        totalValue,
        totalPnl: pnl,
        totalPnlPercent: pnlPercent,
      },
    }
  } catch (error) {
    console.error('[getPortfolioAction] Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch portfolio',
    }
  }
}
