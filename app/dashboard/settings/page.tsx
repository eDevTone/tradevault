import { Settings, Key, Bell, Shield, Database } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { isBinanceConfigured, isTestnetMode } from '@/lib/env'

export default function SettingsPage() {
  const binanceConfigured = isBinanceConfigured()
  const testnetMode = isTestnetMode()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and API connections
        </p>
      </div>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Exchange API Keys</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect your trading accounts
                </p>
              </div>
            </div>
            {!binanceConfigured && (
              <Button size="sm">Configure API</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {binanceConfigured ? (
            <div className="space-y-3">
              {/* Binance */}
              <div className="flex items-center justify-between rounded-lg border border-border/40 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10 font-bold text-warning">
                    B
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Binance</p>
                    <p className="text-xs text-muted-foreground">
                      {testnetMode ? 'Testnet' : 'Mainnet'} • Connected
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-profit animate-pulse" />
                  <span className="text-xs text-profit font-medium">Active</span>
                  <Button variant="outline" size="sm" className="ml-4">
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 rounded-lg border border-dashed border-border/40">
              <p className="text-sm text-foreground font-medium mb-2">
                No exchange connected
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Configure your Binance API keys to start trading
              </p>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  📖 Read the setup guide: <code className="text-primary">docs/BINANCE_SETUP.md</code>
                </p>
                <p className="text-xs text-muted-foreground">
                  🔑 Get testnet keys: <a href="https://testnet.binance.vision" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">testnet.binance.vision</a>
                </p>
                <p className="text-xs text-muted-foreground">
                  ⚙️ Configure: <code className="text-primary">.env.local</code>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Security</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Protect your account
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-border/40">
            <div>
              <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground mt-1">Required for live trading</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-loss">Not enabled</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-foreground">API Permissions</p>
              <p className="text-xs text-muted-foreground mt-1">
                {binanceConfigured 
                  ? 'Spot trading only (withdrawals disabled)'
                  : 'Not configured'
                }
              </p>
            </div>
            {binanceConfigured && (
              <span className="text-xs text-profit">Secure</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Notifications</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Manage alerts and updates
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-border/40">
            <div>
              <p className="text-sm font-medium text-foreground">Trade Alerts</p>
              <p className="text-xs text-muted-foreground mt-1">Get notified on order execution</p>
            </div>
            <input type="checkbox" className="h-4 w-4" />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border/40">
            <div>
              <p className="text-sm font-medium text-foreground">Price Alerts</p>
              <p className="text-xs text-muted-foreground mt-1">Price movement notifications</p>
            </div>
            <input type="checkbox" className="h-4 w-4" />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-foreground">Strategy Updates</p>
              <p className="text-xs text-muted-foreground mt-1">Automated strategy events</p>
            </div>
            <input type="checkbox" className="h-4 w-4" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Risk Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Risk Management</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Set trading limits
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wider">
              Max Daily Loss (%)
            </label>
            <input
              type="number"
              placeholder="5"
              className="flex h-10 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wider">
              Max Position Size (%)
            </label>
            <input
              type="number"
              placeholder="25"
              className="flex h-10 w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button className="w-full">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}
