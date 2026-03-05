import { Wallet, TrendingUp, Target, Activity } from 'lucide-react'
import { StatsCard } from '@/features/portfolio/components/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { formatCurrency } from '@/lib/utils'

// Mock data
const stats = {
  portfolioValue: 10000,
  portfolioChange: 5.24,
  pnl24h: 524,
  pnl24hPercent: 5.24,
  activeStrategies: 0,
  totalTrades: 0,
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of your portfolio and trading activity
          </p>
        </div>
        <Button size="sm">New Trade</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Portfolio Value"
          value={formatCurrency(stats.portfolioValue)}
          change={stats.portfolioChange}
          icon={Wallet}
          trend="up"
        />
        <StatsCard
          title="24h PnL"
          value={formatCurrency(stats.pnl24h)}
          change={stats.pnl24hPercent}
          icon={TrendingUp}
          trend="up"
        />
        <StatsCard
          title="Active Strategies"
          value={stats.activeStrategies.toString()}
          icon={Target}
        />
        <StatsCard
          title="Total Trades"
          value={stats.totalTrades.toString()}
          icon={Activity}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mb-4 rounded-full bg-muted p-4 inline-block">
              <Activity className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              No open positions
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Connect your exchange to start trading
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
