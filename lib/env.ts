/**
 * Environment variables validation and helpers
 */

export function isBinanceConfigured(): boolean {
  return !!(
    process.env.BINANCE_API_KEY &&
    process.env.BINANCE_API_SECRET &&
    process.env.BINANCE_API_KEY !== 'your_api_key_here' &&
    process.env.BINANCE_API_SECRET !== 'your_api_secret_here'
  )
}

export function isTestnetMode(): boolean {
  return process.env.BINANCE_TESTNET === 'true'
}

export function getEnvStatus() {
  return {
    binance: isBinanceConfigured(),
    testnet: isTestnetMode(),
    database: !!process.env.DATABASE_URL,
    clerk: !!(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY
    ),
  }
}
