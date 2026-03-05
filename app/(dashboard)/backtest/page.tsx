import { FlaskConical, Play, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'

export default function BacktestPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Backtest
          </h1>
          <p className="text-sm text-muted-foreground">
            Test strategies on historical data
          </p>
        </div>
        <Button>
          <Play className="mr-2 h-4 w-4" />
          Run Backtest
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backtest Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Strategy */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Strategy
                </label>
                <div className="flex h-10 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm">
                  Select strategy...
                </div>
              </div>

              {/* Symbol */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Symbol
                </label>
                <div className="flex h-10 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm">
                  BTC/USDT
                </div>
              </div>

              {/* Time range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Initial capital */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Initial Capital (USDT)
                </label>
                <input
                  type="number"
                  placeholder="10,000"
                  className="flex h-10 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button variant="default" className="w-full" size="lg">
                <Play className="mr-2 h-4 w-4" />
                Run Backtest
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>How it Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Backtesting simulates your strategy on historical market data to evaluate its performance.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <p>Select a strategy and symbol</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <p>Choose time range</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <p>Set initial capital</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <p>Run simulation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>Backtest Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mb-4 rounded-full bg-muted p-4 inline-block">
              <FlaskConical className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              No results yet
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Run a backtest to see performance metrics
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
