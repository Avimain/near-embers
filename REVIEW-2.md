# EMBERS — Review #2 (post-fix) + Cost Check v2

*Date: 14 Nov 2026, ~17:40 UTC. After the 8 review findings were fixed and pushed (`59d47ea`).*

## Verdict
**Screener-facing** (reproducibility + feature verification):

| # | Original finding | Status now |
|---|---|---|
| 1 | RPC `args` → parse error | ✅ `args_base64` in `near.js` + both pages; verified via live curl (200) |
| 2 | credit lets token owner self-credit | ✅ Now DAO-or-contract-owner only; new test proves token-owner credit **fails** |
| 3 | demo numbers 0.15 vs contract 0.105 | ✅ All aligned to 0.105 (README, index.js, DEMO) |
| 4 | tests didn't instantiate the contract | ✅ 3 real contract tests (mint→credit→cap, self-credit blocked, transfer keeps cap) |
| 5 | epochs were dead state | ✅ 7-day rollover (`block_timestamp/604800`) resets spent; `remaining` is per-epoch |
| 6 | escrow unguarded | ✅ owner/DAO guards on `open_escrow` + `release_milestone` |
| 7 | script path hardcoded; `crate_credit_args` typo | ✅ deploy script uses `deploy/passport-opt.wasm`; `create_credit_args` canonical (alias kept) |
| 8 | Q-005 disclosure missing | ✅ Added (`near-examples nft-contract-basic` + permissionless-mint limit disclosed) |

**Remaining for a fully "gold" screening pass:**
- Redeploy the patched wasm to `passport.hackat.testnet` (fixes #2/#5/#6 authority + epoch logic go live) — do this next
- Re-record the demo with the aligned 0.105 numbers + the new "live" banner
- Q-005 disclosure added (`near-examples nft-contract-basic` + permissionless-mint limit)

## Cost check v2 (14 Nov, testnet — free test funds, mainnet for reference)

| Item | Cost (testnet) | Notes |
|---|---|---|
| Factory deploy+init | ~0.0002 NEAR gas | sputnikdao-factory2 on `hackat.testnet` |
| Genesis sub-account | 5 NEAR deposit | reused as DAO home |
| DAO deploy + init (direct, not factory) | ~0.004 NEAR gas + 1 NEAR init deposit (refundable-ish) | Saved ~52 NEAR by skipping `store` (11× global storage) |
| Passport deploy (207KB wasm-opt) | ~0.0015 NEAR gas + storage | Optimized down from 388KB → 207KB (46% ↓) |
| Passport init + mint EMBER-001 + finish_bounty | ~0.002 NEAR gas | Allowance now 0.105 NEAR (0.1 base + 1×0.005) |
| **Total spent today** | **~10 NEAR testnet** (free) | On mainnet this would be ~$0.30–0.50 in gas + storage |

**Mainnet projection:** deploy + init + 1 mint ≈ 4–6 NEAR storage + <0.01 gas. Payout `hackat.near` needs a storage deposit for the NFT contract (~0.13 NEAR) when winning.

**Balances now (14 Nov ~17:42 UTC):** `hackat 4.46` · `genesis 4.80` · `passport 5.70` · `inky 5.00` (faucet leftover) = ~20 NEAR testnet buffered for tonight + redeploy.
