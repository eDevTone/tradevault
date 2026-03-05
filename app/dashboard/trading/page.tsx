'use client'

import { useState } from 'react'
import { TrendingUp, ArrowUpDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { formatCurrency } from '@/lib/utils'

export default function TradingPage() {
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Trading
        </h1>
        <p className="text-sm text-muted-foreground">
          Execute trades on connected exchanges
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trading form */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Buy/Sell tabs */}
              <div className="flex gap-2">
                <Button
                  variant={side === 'buy' ? 'buy' : 'outline'}
                  className="flex-1"
                  onClick={() => setSide('buy')}
                >
                  Buy
                </Button>
                <Button
                  variant={side === 'sell' ? 'sell' : 'outline'}
                  className="flex-1"
                  onClick={() => setSide('sell')}
                >
                  Sell
                </Button>
              </div>

              {/* Order type */}
              <div className="flex gap-2">
                <Button
                  variant={orderType === 'market' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('market')}
                >
                  Market
                </Button>
                <Button
                  variant={orderType === 'limit' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('limit')}
                >
                  Limit
                </Button>
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

              {/* Price (limit only) */}
              {orderType === 'limit' && (
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Price (USDT)
                  </label>
                  <input
                    type="number"
                    placeholder="43,000.00"
                    className="flex h-10 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              {/* Amount */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Amount (BTC)
                </label>
                <input
                  type="number"
                  placeholder="0.5"
                  className="flex h-10 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Total */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Total (USDT)
                </label>
                <div className="flex h-10 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                  0.00
                </div>
              </div>

              {/* Submit */}
              <Button
                variant={side === 'buy' ? 'buy' : 'sell'}
                className="w-full"
                size="lg"
              >
                {side === 'buy' ? 'Buy' : 'Sell'} BTC
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Market info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">BTC/USDT</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(43000)}
                  </p>
                  <p className="text-xs text-profit">+2.5% (24h)</p>
                </div>

                <div className="space-y-2 border-t border-border/40 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">24h High</span>
                    <span className="text-foreground font-medium">{formatCurrency(44500)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">24h Low</span>
                    <span className="text-foreground font-medium">{formatCurrency(41000)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">24h Volume</span>
                    <span className="text-foreground font-medium">1.2M BTC</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">BTC</span>
                  <span className="text-sm font-medium text-foreground">0.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">USDT</span>
                  <span className="text-sm font-medium text-foreground">5,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent trades */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mb-4 rounded-full bg-muted p-4 inline-block">
              <ArrowUpDown className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              No trades yet
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Execute your first trade to see history here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
