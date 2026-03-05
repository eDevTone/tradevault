import { Target, Plus, Play, Pause, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { formatPercent } from '@/lib/utils'

const strategies = [
  {
    id: '1',
    name: 'BTC Grid Trading',
    type: 'Grid',
    symbol: 'BTC/USDT',
    status: 'active',
    pnl: 245.50,
    pnlPercent: 4.5,
    trades: 24,
    winRate: 75,
  },
  {
    id: '2',
    name: 'ETH DCA',
    type: 'DCA',
    symbol: 'ETH/USDT',
    status: 'inactive',
    pnl: -50.20,
    pnlPercent: -2.1,
    trades: 12,
    winRate: 50,
  },
]

export default function StrategiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Strategies
          </h1>
          <p className="text-sm text-muted-foreground">
            Automated trading strategies
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Strategy
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Active Strategies
            </p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {strategies.filter(s => s.status === 'active').length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Total Trades
            </p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {strategies.reduce((sum, s) => sum + s.trades, 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Total PnL
            </p>
            <p className={`mt-2 text-2xl font-bold ${strategies.reduce((sum, s) => sum + s.pnl, 0) >= 0 ? 'text-profit' : 'text-loss'}`}>
              ${strategies.reduce((sum, s) => sum + s.pnl, 0).toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Avg Win Rate
            </p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {(strategies.reduce((sum, s) => sum + s.winRate, 0) / strategies.length).toFixed(0)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Strategies list */}
      <div className="space-y-3">
        {strategies.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <div className="mb-4 rounded-full bg-muted p-4 inline-block">
                  <Target className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  No strategies yet
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create your first automated trading strategy
                </p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Strategy
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          strategies.map((strategy) => (
            <Card key={strategy.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  {/* Strategy info */}
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${strategy.status === 'active' ? 'bg-profit/10' : 'bg-muted'}`}>
                      <Target className={`h-6 w-6 ${strategy.status === 'active' ? 'text-profit' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {strategy.name}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${strategy.status === 'active' ? 'bg-profit/10 text-profit' : 'bg-muted text-muted-foreground'}`}>
                          {strategy.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {strategy.type} • {strategy.symbol}
                      </p>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">PnL</p>
                      <p className={`text-sm font-semibold ${strategy.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                        {strategy.pnl >= 0 ? '+' : ''}${strategy.pnl.toFixed(2)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                      <p className="text-sm font-semibold text-foreground">
                        {strategy.winRate}%
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Trades</p>
                      <p className="text-sm font-semibold text-foreground">
                        {strategy.trades}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        {strategy.status === 'active' ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
