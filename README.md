# Embers — Bounty Board with Earned Trust + Passport NFT

**NEAR Hackathon 2026** · Tracks: `social`, `nfts` · Solo builder: Avi · Team size `1`
Payout: `hackat.near` · Dev: `hackat.testnet`

## What it is
Members post small bounties; contributors claim + finish; payouts flow from a
**Sputnik DAO** treasury (custody stays the DAO, NOT a new multisig). Finished
bounties raise reputation → approval tiers (auto / 1 council / full DAO proposal).
Reputation also raises the allowance cap of the contributor's **Ember Passport
NFT (NEP-171)** — the NFT carries its own wallet behaviour: allowance moves
with the token on transfer.

## Try it (do X → see Y)
1. `cd frontend && npm install && npm run dev` → bounty board loads.
2. View the DAO: `genesis.hackat.testnet` (bounties, proposals).
3. View the Passport: `passport.hackat.testnet` → `nft_mint`, `allowance_cap`.
4. Full loop: post bounty → claim → finish → payout → credit_bounties → cap rises.

## Threat model (NFT transfers)
Allowance is bound to `token_id`, not to the seller. On transfer the new owner
gets the cap; the seller cannot keep spend rights. `credit_bounties` in the demo
is owner-callable; in production only the DAO/bounty contract calls it. Full
analysis in contracts/passport/README.md.

## Contracts
- Passport NFT (NEP-171): `contracts/passport` → `passport.hackat.testnet`
- Sputnik DAO v2: factory deployed on testnet → `genesis.hackat.testnet`

## Stack
Next.js (Raw JSON-RPC, no SDK), Rust/near-sdk 5.11 (pinned), cargo-near.
Build: `cd contracts/passport && cargo build --target wasm32-unknown-unknown --release`
