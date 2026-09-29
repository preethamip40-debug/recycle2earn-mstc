# ♻️ Recycle2Earn – Powered by MSTC Rewards (VS Code Live Server Prototype)

A complete, international-standard digital circular-economy web platform where citizens recycle categorized waste, receive cryptographically verified **MSTC Points**, and redeem those points for everyday mobile recharges, utility bill payments, and digital shopping vouchers.

---

## 🚀 How to Run in VS Code

1. Open the folder **`Recycle2Earn-MSTC-Prototype (1)`** in VS Code.
2. Ensure you have the **Live Server** extension (by Ritwick Dey) installed in VS Code.
3. Right-click on **`index.html`** in the VS Code file explorer.
4. Select **"Open with Live Server"** (or click **"Go Live"** in the bottom status bar).
5. The platform will open in your browser at:
   ```text
   http://127.0.0.1:5500/index.html
   ```
   or
   ```text
   http://localhost:5500/index.html
   ```

*(Note: The platform is built with pure HTML, CSS, JavaScript, CDN Chart.js, and persistent localStorage. It runs locally without needing any backend server configuration).*

---

## 🌟 Complete User Journey to Test

1. **Landing Page (`index.html`)**: View the hero introduction, real-time statistics, configured waste categories, and environmental impact counters. Click **"Start Recycling"**.
2. **Login / Register (`pages/login.html`)**: Click **"⚡ Fast Login as Demo User (Arjun)"** (or create a new account with Full Name, Email, Phone, Password).
3. **User Dashboard (`pages/dashboard.html`)**: View live balance (**1,250 MSTC • ₹125.00**), 4 metric cards, monthly 25 kg challenge progress, recent transactions, and quick action shortcuts.
4. **Recycle & Earn (`pages/recycle.html`)**:
   - **Step 1:** Select **Metal** (15 MSTC/kg).
   - **Step 2:** Enter **2.0 kg** (Live estimate calculates **+30 MSTC Points / ₹3.00**).
   - **Step 3:** Select **GreenCycle Hub Bengaluru**.
   - **Step 4:** Click **"Click to Scan QR Code"** → animated scanner verifies the station token → click **"Complete & Verify Recycling"**.
   - **Result:** Success modal pops up with transaction hash `0x4e...`, wallet updates from **1,250 → 1,280 MSTC**, and new transaction is logged to localStorage!
5. **Wallet (`pages/wallet.html`)**: Inspect live balance, ₹ reward conversion, lifetime points earned, on-chain ledger proof, and instant conversion calculator.
6. **Mobile Recharge (`pages/recharge.html`)**: Select Airtel ₹100 plan (1,000 MSTC) → Click **"Pay with MSTC Points"** → Balance decreases to 280 MSTC and transaction is recorded.
7. **Utility Bills (`pages/bills.html`)**: Enter BESCOM ₹850 Electricity bill → apply ₹20 (200 MSTC) reward → payable amount updates to ₹830 → click **"Continue Payment"** → Success confirmation.
8. **Rewards Marketplace (`pages/rewards.html`)**: Browse gift cards (Amazon, Flipkart, Swiggy) and redeem promo codes.
9. **Smart Waste Passport (`pages/passport.html`)**: View interactive Chart.js visualizations (Doughnut & Bar charts), CO2 avoided, trees saved, energy conserved, and click **"View Official Certificate"**.
10. **Transactions (`pages/transactions.html`)**: Search and filter all recycling and redemption records, click **"Inspect ⛓"** to open the Blockchain Block Explorer, or click **"Export CSV"**.
11. **Leaderboard (`pages/leaderboard.html`) & Achievements (`pages/achievements.html`)**: Track recycling streaks and community ranking.
12. **Collection Center Portal (`pages/center-dashboard.html`) & Admin Analytics (`pages/admin-dashboard.html`)**: Manage incoming queues and global material intake trends.

---

## 📊 Configured Waste Categories & Prototype Rates

| Category | Rate (MSTC / kg) | CO₂ Factor | Description |
|---|---:|---|---|
| **Plastic** | 10 MSTC / kg | 1.5x | Bottles, containers, rigid plastics |
| **Paper & Cardboard** | 5 MSTC / kg | 0.9x | Newspapers, cartons, boxes |
| **Metal** | 15 MSTC / kg | 4.2x | Aluminium cans, steel, brass scrap |
| **Glass** | 7 MSTC / kg | 0.3x | Bottles, containers, jars |
| **E-waste** | 25 MSTC / kg | 3.8x | Phones, laptops, PCBs, cables |
| **Batteries** | 30 MSTC / kg | 5.1x | Lithium-ion, lead-acid, AA cells |
| **Clothes & Textiles** | 8 MSTC / kg | 3.2x | Wearable garments, fabrics |
| **Used Cooking Oil** | 12 MSTC / kg | 2.8x | Kitchen oil in sealed canisters |
| **Organic Waste** | 3 MSTC / kg | 0.5x | Biodegradable compostables |

---

## 🪙 Reward Conversion Rule

- **100 MSTC Points = ₹10.00 Platform Reward Value** (`1 MSTC = ₹0.10`).
- **Minimum Redemption Threshold:** `1,000 MSTC Points = ₹100.00`.
- All transactions create verifiable ledger entries with simulated cryptographic hashes.

---

## 📁 Project File Structure

```text
Recycle2Earn-MSTC-Prototype (1)/
├── index.html                   # Main Landing Page entry point
├── README.md                    # Platform documentation
├── config.json                  # Application configuration
├── assets/
│   └── css/
│       └── style.css            # Dark graphite + neon green/cyan fintech styles
├── js/
│   ├── app.js                   # Central LocalStorage state, auth, recycling & wallet logic
│   └── data.js                  # Configured rates, centers, plans, vouchers, badges
└── pages/
    ├── login.html               # Registration & Login
    ├── dashboard.html           # User Dashboard & live metrics
    ├── recycle.html             # Step-by-step verified recycling wizard
    ├── centers.html             # Collection centers directory
    ├── wallet.html              # MSTC Rewards Wallet & Ledger
    ├── recharge.html            # Mobile & DTH recharge redemption
    ├── bills.html               # Electricity & Utility bill settlement
    ├── rewards.html             # Rewards Marketplace & Vouchers
    ├── passport.html            # Digital Waste Passport & Chart.js
    ├── transactions.html        # Filterable transaction history & block explorer
    ├── achievements.html        # Gamification, badges & streaks
    ├── leaderboard.html         # Community & city leaderboards
    ├── center-dashboard.html    # Center operator scale & queue terminal
    ├── admin-dashboard.html     # Global admin analytics & telemetry
    └── support.html             # Help desk, FAQs & hub onboarding
```

---

## 🛡️ Anti-Fraud Rules Implemented

- **QR Verification Simulation:** Station token validation.
- **Single Deposit Scale Cap:** Maximum 500 kg per single deposit to prevent industrial dump exploits.
- **Balance Validation:** Real-time checking to prevent negative balances.
- **Auditable Cryptographic Hashes:** Unique `0x...` transaction identifiers generated per activity.

---

*Recycle2Earn © 2026 • Recycle More • Earn More • Live Greener*