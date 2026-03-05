'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  TrendingUp, 
  Target, 
  FlaskConical,
  Settings,
  Wallet
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Portfolio',
    href: '/dashboard/portfolio',
    icon: Wallet,
  },
  {
    name: 'Trading',
    href: '/dashboard/trading',
    icon: TrendingUp,
  },
  {
    name: 'Strategies',
    href: '/dashboard/strategies',
    icon: Target,
  },
  {
    name: 'Backtest',
    href: '/dashboard/backtest',
    icon: FlaskConical,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-border px-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <span className="text-sm font-bold">TV</span>
          </div>
          <span className="text-base font-semibold">
            Trade<span className="text-primary">Vault</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border p-3">
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="text-xs text-muted-foreground">API Status</div>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-profit animate-pulse" />
            <span className="text-xs font-medium text-profit">Connected</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
