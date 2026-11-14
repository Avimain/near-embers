# Ember Passport (NEP-171)
Built on near-examples `nft-contract-basic`, extended with bounty-linked
allowance. Mint: `nft_mint(token_id, receiver, metadata)`.

## Allowance (3 mechanics)
- **Epoch drawdown:** `spend_allowance(token_id, amount)` (owner only) +
  `remaining_allowance`. Panics if amount exceeds cap − spent this epoch.
- **DAO cross-contract credit:** `credit_bounties(token_id, count)` accepts
  only the DAO (`genesis.hackat.testnet`) or the contract owner. DAO path: a
  Sputnik *FunctionCall* proposal → `passport.credit_bounties(...)`. Inspect
  with `crate_credit_args` (view). No new multisig — custody stays Sputnik.
- **Proof-of-work close:** `finish_bounty(token_id, deliverable)` requires a
  non-empty `http…` deliverable (PR/commit URL), then credits +1. Rejects empty
  or non-URL input.

Threat model: allowance bound to `token_id` (not person); transfer moves the
cap; seller cannot retain spend access. `credit_bounties` is DAO/owner-only.

## Build
```bash
cargo build --target wasm32-unknown-unknown --release   # dev
cargo near build non-reproducible-wasm                   # before deploy (Rust ≦1.86)
```
## Tests
`cargo test` (5 logic tests: cap math, drawdown, PoW gating, DAO args, transfer-bound)
