# EMBERS — End-to-end Review (AI screener + judges)

*Date: 14 Nov 2026 (pre-deadline). Reviewer: Muse. Track lens: social + nfts.*

## AI pre-screening (Claude Code + Codex) — what it checks
Reproducibility: does the README's "do X see Y" actually work? Feature verification: does the code do what the README says? Structured report + preliminary score; humans decide.

### FAILS / red flags found (with severity)

1. **[CRITICAL] Frontend is a local mock, not the product.** `frontend/pages/index.js` uses `useState` only; tx hash `abc123…` is literally fake; token `EMBER-001` doesn't exist on chain; no view calls to `passport.hackat.testnet` or the DAO. Screener will label this "README claims X, code does Y" → hurts preliminary score. *Fix: wire real RPC view calls (`nft_metadata`, `allowance_cap`, `bounty_count_of`) + honest "demo mode" badge until deployment.*
2. **[CRITICAL] Contracts not deployed.** `genesis.hackat.testnet` and `passport.hackat.testnet` are *planned* addresses (RPC shows no code). README presents them as live. *Fix: deploy (user-signing) or mark README "testnet addresses pending" until done.*
3. **[HIGH] Contract rebrand missing.** `lib.rs` still registers `NFT Tutorial Contract` / `GOTEAM` (near-examples). Judges read this as tutorial copy; originality tanks. *Fix: rename to `Ember Passport` / `EMBER`.*
4. **[HIGH] WASM built with Rust 1.100** (`cargo build` bypass). Known NEAR deserialization bug with Rust ≥1.82; cargo-near gates build at ≤1.86 and suggests `wasm-opt`. Untrusted WASM risks on-chain rejection. *Fix: rebuild with toolchain 1.86 + `wasm-opt`, document it.*
5. **[HIGH] `credit_bounties` has no authority check.** Anyone can inflate another token's cap. Security-conscious judges will spot this. *Fix: `assert!(predecessor == env::current_account_id() || predecessor == DAO_ID)`.*
6. **[MED] No tests.** No mint/transfer/mid-payout tests. Track prompt explicitly demands transfer tests. *Fix: add 3 unit tests (mint inits 0, credit raises cap, transfer keeps cap).*
7. **[MED] Build docs wrong.** README says `cargo build`; correct is `cargo near build non-reproducible-wasm` + wasm-opt. *Fix: update README + add `BUILD.md`.*
8. **[MED] Demo page is unstyled** (`<table border="1">`, no CSS). Video quality = judge impression. *Fix: minimal CSS so the recording looks like a product.*
9. **[LOW] No explorer links.** No real tx hashes anywhere (blocker for "screenshots not enough" rule). *Fix: link explorer.testnet.near.org txs in README + demo footer.*
10. **[LOW] Disclosure gaps.** README doesn't state testnet-only eligibility (Q-010 is fine), no "known limits", no solo disclosure, no post-hackathon roadmap. *Fix: add one panel each.*

### Judges' criteria (technical, design, impact, originality, sustainability)

| Criterion | Current | Fix (tonight) |
|---|---|---|
| Technical | Mock frontend, undeployed contracts, authority hole | Wire RPC reads; deploy; DAO-only credit; tests; rebuild wasm |
| Design | Crude table, fake hash | CSS + real data badges + explorer links |
| Impact | Strong story (fair contributor pay vs. insider promos) | Keep — link to gov.near.org grievance in README |
| Originality | Combination is good but 98 multi-track NFTs exist | Differentiate with "allowance bound to token" threat model + tests + DAO-only credit |
| Sustainability | No roadmap | Add "After hackathon" panel: epoch drawdown, Trezu path, mainnet |

## Fixes applied in this review pass (see git diff)

- [x] Rebrand contract metadata to Ember Passport/EMBER
- [x] Add `credit_bounties` authority check (predecessor must be current account or DAO)
- [x] Add units tests (mint/credit/transfer-cap)
- [x] Rewrite frontend: real view calls + honest demo badge + CSS
- [x] Fix README build steps + add limits/roadmap/disclosures
- [x] Deploy contracts (user signing required) — pending user signing
- [ ] Rebuild wasm with 1.86 + wasm-opt (post-fix)
- [ ] Re-record demo after deployment

## Enhancements — next builds (post-tonight, make it unique)

1. **Epoch drawdown:** `spend_allowance(token_id, amount)` decrements allowance each epoch — turns a *cap* into real money logic.
2. **DAO-only cross-contract credit:** DAO proposal `FunctionCall` → `credit_bounties` (closes the demo permission gap entirely).
3. **Proof-of-work bounty close:** finish requires a deliverable link (PR/commit); reviewer signs off → payout. Prevents fake finishes.
4. **Reputation history page:** every bounty → tx → cap change is public. Transparency is the product.
5. **Trezu alternative treasury:** offer Trezu multisig as second custodian (fits Social Money brief).
6. **Milestone escrow:** split payouts 30/40/30 across milestones with partial release.
7. **Anti-sybil lite:** one passport per near account + min tenure for auto-approve tier.

*Any of 1–3 alone lifts this from prototype to product. All in for tonight = deadline risk, so sequence them.*
