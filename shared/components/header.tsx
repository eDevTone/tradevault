'use client'

import { Bell, User } from 'lucide-react'
import { Button } from '@/shared/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold text-foreground">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Bell className="h-4 w-4" />
        </Button>

        {/* User menu */}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
