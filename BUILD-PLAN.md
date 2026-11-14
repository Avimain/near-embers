# EMBERS — Bounty Board with Earned Trust + Credential NFT Allowance

*Working title: **Embers** (members earn ember allowances by finishing bounties).*
*Teams: Solo (`1`), tracks: `social`, `nfts` — one submission.*
*Accounts: payout `hackat.near` (mainnet, exists, 0 NEAR today — needs NEAR for prize receipt) · dev `hackat.testnet` (10 tNEAR, signer local).*
*Deadline: **14 Nov 2026 23:59 UTC** (tonight). Local date check: ~15h remaining at plan time.*

## Submission checklist (HACKATHON.md)

- [ ] Public repo (link unique, submitted once) + LICENSE (MIT)
- [ ] X demo post (@NEARProtocol #NEARHackathon + video/screenshots) — I draft, you post
- [ ] Form fields: projectName, leadName (you), email, size `1`, tracks `["social","nfts"]`, nearAddress `hackat.near`, projectUrl, demoUrl, idea 20–2000 chars, consent=true
- [ ] README machine-readable: what/problem/how-to-try "do X see Y", Sputnik store path, contract addresses, how allowance ties to NFT
- [ ] Never: commit secrets, invent wallet/email, post on X for you, submit without your explicit payload-yes

## Environment (verified 14 Nov)

- `node v22.14.0` + `npm 10.9.2` — local install at `/tmp/nodetool/bin` (not on PATH by default; export it)
- `near-cli-rs 0.31.1` present but **interactive only** — use raw JSON-RPC (`curl POST rpc.testnet.near.org`) for reads/headless scripts
- `rustc/cargo 1.100` present — ⚠ nearcore doesn't support Rust ≥1.82 WASM features by default → must build with **cargo-near** (`cargo near build`, which runs wasm-opt). Install: `cargo install cargo-near` before compiling
- `gh` / GitHub CLI **not installed, no git credentials** — needs user action (below)
- Both accounts verified on-chain via RPC (`hackat.testnet` = 10 NEAR, `hackat.near` = 0 NEAR)

## Architecture (spine + stretch)

```
hackat.testnet
 ├─ sputnikdao-factory2 (deploy own factory on testnet — confirmed path in sputnikv2 README)
 │   └─ genesis.hackat.testnet (DAO, name/purpose/metadata/council, policy quorum/threshold, proposal+bounty bonds)
 └─ passport NFT (NEP-171, rust contract)
      └─ maps tokenId → sub-account (contributor passport)
      └─ allowance cap (USDC) per epoch; earned by finished bounties
```

**Spine loop (demo):** post bounty → claim → finish → DAO transfer payout → reputation +1 → NFT allowance rises.
**Tiers:** ≤ 1 NEAR-equivalent auto-approve · ≤ 10 mid needs 1 council · > 10 full DAO proposal (mirrors brief).
**Stretch link:** allowance cap = f(finished bounties); on NFT transfer, token + sub-account + balance + rights move together; seller can't keep access (allowance bound to tokenId, keys revoked on sale).

## Sprint (tonight, in order)

1. **Scaffold** Next.js + near-api-js app, public repo (awaiting remote URL), LICENSE, README skeleton, `.env.example`
2. **DAO** — deploy factory → create DAO → seed 3 demo bounties (tiny amounts)
3. **Passport NFT** — Rust NEP-171 contract, `cargo near build`, deploy to `passport.hackat.testnet`, unit tests for transfer path
4. **UI** — bounty board, claim/finish, reputation tiers view, passport + allowance page
5. **Demo** — record 60–90s web video; draft X post; prepare payload; **you confirm payload → I POST once**
6. **Submit** before 23:59 UTC; verify 201; if typo, use request-changes (never resubmit)

## Blockers needing you (do these ASAP)

1. **GitHub repo** — create a **public** repo (e.g. `embers`) and give me the clone URL, *or* install/`gh` auth so I can push. My CLI can't create it without credentials.
2. **Email + lead name** — for the form (never invent these).
3. **X account** — confirm the @handle that will post the demo.
4. **~2 NEAR on testnet** — bounty + DAO bonds (~1 NEAR proposal/bounty bond × few ops) — we have 10, OK.
5. **Mainnet NEAR on `hackat.near`** — only needed to *receive* prize; 0 now, add later. Storage deposit (~0.125 NEAR+) will be needed for NFT contract on mainnet if we deploy there.

## Risks + mitigations

- **Deadline crunch** — if timer < 4h at any point, ship spine-only, keep NFT as stretch note in README. One submission still ticks both tracks honestly (NFT stub + roadmap) — better than a broken dual build.
- **Rust/WASM deserialization** — cargo-near + pinned Rust ≤1.81 if deserialization errors appear.
- **Sputnik factory on testnet** — deploy our own (README-verified); fallback: use Astro DAO factory if ours fails.
- **Don't double-submit** — one payload, one requestId, print it first, wait for your yes.
