import { AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export function ApiWarning() {
  return (
    <Card className="border-warning/50 bg-warning/5">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
            <AlertCircle className="h-5 w-5 text-warning" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">
              Binance API Not Configured
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Connect your Binance testnet account to start trading with demo funds.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <Link href="/dashboard/settings">
                <Button size="sm" variant="default">
                  Configure API Keys
                </Button>
              </Link>
              <a
                href="https://testnet.binance.vision"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="outline">
                  Get Testnet Account
                </Button>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
