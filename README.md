# Embers — Bounty Board with Earned Trust + Passport NFT

**NEAR Hackathon 2026** · Tracks: `social`, `nfts` · Solo builder: Avi · Team size `1`
Payout: `hackat.near` · Dev: `hackat.testnet` · Demo: `embers-demo.mp4`

## What it is (problem → product → NEAR fit)
Open-source contribution is unpaid or opaque — the gov.near.org front page this
week is literally "one solo dev vs millions of insider promos" (150 posts).
**Embers** lets members post small bounties; payouts flow from a **Sputnik DAO**
treasury (custody stays the DAO, NOT a new multisig). Finished bounties raise
reputation → approval tiers (auto / 1 council / full DAO proposal). Reputation
also raises the allowance cap of the contributor's **Ember Passport NFT
(NEP-171)** — allowance is bound to `token_id`, so it moves with the token on
transfer and a seller cannot keep spend rights.

## Try it (do X → see Y)
### Frontend
```bash
cd frontend && npm install && npm run dev   # http://localhost:3000
```
1. Open `/` → board loads with tier badges (demo mutations until deploy).
2. Click **Claim bounty #1** → status "in progress"; **Mark finished** → "paid ✓", reputation +1, allowance 0.10 → 0.15.
3. The header shows real chain read for `nft_metadata` once deployed (fallback badge until then).

### Contracts (testnet)
```bash
# Build (wasm target; Rust must be ≤1.86 for cargo-near)
rustup toolchain install 1.86 && rustup target add wasm32-unknown-unknown --toolchain 1.86
cd contracts/passport && cargo near build non-reproducible-wasm
# Alternative that works in this environment (then: wasm-opt + verify):
cargo build --target wasm32-unknown-unknown --release

# Deploy — see scripts/deploy-embers.sh (user signing required)
bash scripts/deploy-embers.sh
```
Then:
- `near view passport.hackat.testnet nft_metadata` → Ember Passport / EMBER
- `near view passport.hackat.testnet allowance_cap '{"token_id":"EMBER-001"}'`
- DAO: `near view genesis.hackat.testnet get_policy`

## Architecture
```
hackat.testnet
 ├─ sputnikdao-factory2 → genesis.hackat.testnet (DAO, custody)
 └─ passport.hackat.testnet (NEP-171 + bounty_count/extra_cap, DAO-only credit)
```
`credit_bounties` asserts predecessor is the current account (or DAO
`genesis.hackat.testnet`) — prevents cap inflation. Transfer keeps cap (tests).

## Tests
```bash
cd contracts/passport && cargo test   # 2 logic tests: cap math, token-bound transfer
```
(VM-context / full e2e transfer tests are roadmap — see Known limits.)

## Known limits (honest)
- Mutations are local demo until DAO + Passport deploy and are signable (pending user signing `hackat.testnet`).
- WASM in `deploy/` was built with Rust 1.100 (dev bypass); rebuild with 1.86 + `wasm-opt` before judging.
- Testnet-only is eligible (Q-010); mainnet needs storage deposit (~0.125 NEAR) + prize receipt on `hackat.near`.
- No epoch drawdown yet — cap only. (Enhancement 1 below.)

## After hackathon (sustainability)
1. Epoch drawdown `spend_allowance` — cap becomes real money logic.
2. DAO-proposal cross-contract `credit_bounties` (close the owner-call path).
3. Proof-of-work close (deliverable link required) + milestone escrow.
4. Trezu as second custodian (Social Money brief).

## Stack
Next.js (raw JSON-RPC, no SDK — npm `near-api` is squatted), Rust/near-sdk `=5.11.0` pinned.
License: MIT. Team: solo. Q-010 testnet note: yes, eligible.

## New in this build (ambitious pass)
- Epoch drawdown: `spend_allowance` / `remaining_allowance` — cap is spendable, bounded.
- DAO cross-contract credit: `credit_bounties` accepts only DAO (`genesis.hackat.testnet`) or owner; proposal args via `crate_credit_args` view.
- Proof-of-work close: `finish_bounty` requires a deliverable URL, then credits.
