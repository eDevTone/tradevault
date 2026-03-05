import { Wallet, TrendingUp, PieChart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { formatCurrency, formatPercent, formatCrypto } from '@/lib/utils'

const assets = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: 0.5,
    avgPrice: 40000,
    currentPrice: 43000,
    value: 21500,
    pnl: 1500,
    pnlPercent: 7.5,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    amount: 5,
    avgPrice: 2000,
    currentPrice: 1800,
    value: 9000,
    pnl: -1000,
    pnlPercent: -10,
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    amount: 5000,
    avgPrice: 1,
    currentPrice: 1,
    value: 5000,
    pnl: 0,
    pnlPercent: 0,
  },
]

const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
const totalPnl = assets.reduce((sum, asset) => sum + asset.pnl, 0)
const totalPnlPercent = (totalPnl / (totalValue - totalPnl)) * 100

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Portfolio
        </h1>
        <p className="text-sm text-muted-foreground">
          Your crypto assets and performance
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Balance</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(totalValue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${totalPnl >= 0 ? 'bg-profit/10' : 'bg-loss/10'}`}>
                <TrendingUp className={`h-5 w-5 ${totalPnl >= 0 ? 'text-profit' : 'text-loss'}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total PnL</p>
                <p className={`text-xl font-bold ${totalPnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                  {totalPnl >= 0 ? '+' : ''}{formatCurrency(totalPnl)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <PieChart className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Assets</p>
                <p className="text-xl font-bold text-foreground">
                  {assets.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets table */}
      <Card>
        <CardHeader>
          <CardTitle>Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assets.map((asset) => (
              <div
                key={asset.symbol}
                className="flex items-center justify-between rounded-lg border border-border/40 p-4 hover:border-border transition-colors"
              >
                {/* Asset info */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-mono text-sm font-bold">
                    {asset.symbol.substring(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCrypto(asset.amount, 4)} {asset.symbol}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {formatCurrency(asset.currentPrice)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Avg: {formatCurrency(asset.avgPrice)}
                  </p>
                </div>

                {/* Value */}
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(asset.value)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {((asset.value / totalValue) * 100).toFixed(1)}%
                  </p>
                </div>

                {/* PnL */}
                <div className="text-right">
                  <p className={`text-sm font-semibold ${asset.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                    {asset.pnl >= 0 ? '+' : ''}{formatCurrency(asset.pnl)}
                  </p>
                  <p className={`text-xs font-medium ${asset.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                    {formatPercent(asset.pnlPercent)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
