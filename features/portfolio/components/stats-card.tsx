import { Card, CardContent } from '@/shared/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn, formatCurrency, formatPercent } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string
  change?: number
  icon: LucideIcon
  trend?: 'up' | 'down'
}

export function StatsCard({ title, value, change, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {title}
            </p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {value}
            </p>
            {change !== undefined && (
              <p
                className={cn(
                  'mt-1 text-xs font-medium',
                  change >= 0 ? 'text-profit' : 'text-loss'
                )}
              >
                {formatPercent(change)}
              </p>
            )}
          </div>
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full',
              trend === 'up' && 'bg-profit/10 text-profit',
              trend === 'down' && 'bg-loss/10 text-loss',
              !trend && 'bg-muted text-muted-foreground'
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
