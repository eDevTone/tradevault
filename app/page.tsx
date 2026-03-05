export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="max-w-2xl text-center space-y-6">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            In Development
          </div>
        </div>
        
        <h1 className="text-6xl font-bold tracking-tight">
          Trade<span className="text-primary">Vault</span> 🏦
        </h1>
        
        <p className="text-xl text-muted-foreground">
          Automated Crypto Trading Platform
        </p>
        
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Professional trading automation with risk management, backtesting, 
          and real-time execution. Built for crypto traders who value security and performance.
        </p>

        <div className="flex flex-col gap-3 pt-8">
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl border border-border/60 bg-card p-4">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Trading</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-4">
              <div className="text-2xl font-bold text-primary">0ms</div>
              <div className="text-muted-foreground">Latency</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-4">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-muted-foreground">Automated</div>
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-2">
          <div className="text-xs text-muted-foreground font-mono">
            Tech Stack: Next.js 16 • TypeScript • CCXT • Binance API
          </div>
          <div className="text-xs text-muted-foreground">
            Status: MVP Phase • Binance Testnet Integration
          </div>
        </div>

        <div className="pt-8 text-xs text-muted-foreground/60">
          ⚠️ Not financial advice. Trade at your own risk.
        </div>
      </div>
    </div>
  );
}
