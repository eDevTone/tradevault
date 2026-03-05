# Binance Testnet Setup Guide

## 1. Create Binance Testnet Account

1. Go to **Binance Testnet**: https://testnet.binance.vision/
2. Click **"GitHub Login"** (or create account with email)
3. Authorize with your GitHub account

## 2. Get API Keys

1. Once logged in, go to **API Keys** section
2. Click **"Create API"**
3. Give it a name (e.g., "TradeVault")
4. **Copy the API Key and Secret Key** (you won't see the secret again!)
5. **Important**: Store them securely

## 3. Configure TradeVault

1. Open `.env.local` in the project root
2. Replace placeholders:

```env
BINANCE_API_KEY=your_actual_api_key_here
BINANCE_API_SECRET=your_actual_secret_key_here
BINANCE_TESTNET=true
```

3. Restart the dev server:

```bash
npm run dev
```

## 4. Get Test Funds

Binance Testnet gives you **free test funds**:

1. Go to **Wallet** → **Spot Wallet**
2. You should see test USDT, BTC, ETH, BNB
3. If not, click **"Get Test Funds"** or use the faucet

**Default testnet balances:**
- 10,000 USDT
- 1 BTC
- 10 ETH
- 100 BNB

## 5. Test the Connection

1. Go to http://localhost:3000/dashboard/portfolio
2. You should see your testnet balances
3. Check Settings page for API status (should show "Connected")

## 6. Security Notes

⚠️ **Testnet API Keys:**
- These are for **testing only** (no real money)
- Safe to commit to private repos (but don't share publicly)
- Cannot withdraw or transfer real funds

⚠️ **Mainnet API Keys (when you go live):**
- **NEVER** commit to Git
- Add to `.gitignore`
- Use environment variables in production
- Enable **IP whitelist**
- Disable **withdraw permissions**
- Enable **2FA** for all changes

## 7. API Permissions

Your testnet API key should have:
- ✅ **Enable Reading** (view balances, orders)
- ✅ **Enable Spot & Margin Trading** (create/cancel orders)
- ❌ **Enable Withdrawals** (NOT needed, keep disabled)

## 8. Rate Limits

Binance Testnet has the same rate limits as mainnet:
- **1200 requests/minute** (general)
- **50 orders/10 seconds** (order placement)
- CCXT handles rate limiting automatically

## 9. Troubleshooting

### "API credentials not configured"
- Check `.env.local` file exists
- Verify API key/secret are correct
- Restart dev server

### "Invalid API key"
- Regenerate API keys on testnet
- Copy/paste carefully (no extra spaces)
- Check if key was deleted

### "Timestamp error"
- Your system clock might be off
- Sync time: `sudo ntpdate -s time.nist.gov`

### "IP not whitelisted"
- Testnet doesn't require IP whitelist
- If enabled, add your IP or use 0.0.0.0/0

## 10. Next Steps

Once connected:
1. ✅ View portfolio balances
2. ✅ Execute test trades
3. ✅ Build strategies
4. ✅ Backtest on historical data
5. ✅ When confident → switch to mainnet

---

**Need help?** Check the [CCXT Documentation](https://docs.ccxt.com/) or [Binance API Docs](https://binance-docs.github.io/apidocs/spot/en/)
