# NEAR — Developer & User Pain Points → Hackathon Track Map

**Method + caveat:** Direct Reddit access was blocked ("You've been blocked by network security") and Google/DDG rate-limited bots, so pain points were gathered via Brave Search result snippets (which surface Reddit r/nearprotocol, r/CryptoCurrency, NEAR Forum gov.near.org, StackOverflow, Decrypt/TechInformed news), GitHub issue search API (near-wallet, near-core), and gov.near.org Discourse latest feed. Snippets are secondary summaries, not full threads — I can not verify every claim. The Nov 2026 NEAR AI breach items are from Decrypt/TechInformed/CSA Lab reporting.

## Developer pain points

1. **Rust/WASM deserialization failures (r/nearprotocol, 2025).** Open issue: deploying an SDK-5.9 contract with rustc 1.87 / near-cli 0.19 gives `CompilationError(PrepareError(Deserialization))`; even the official fungible-token example fails. Older Rust (<1.69–1.81) works. Fix path known but poorly documented: use `cargo near build` (runs `wasm-opt`) or pin Rust ≤1.81/≤1.85. Root cause: Rust 1.82+ enables WASM features by default that nearcore doesn't support yet. near-sdk-rs criticized for verbose Borsh derived code bloating contracts; U256 + `JsonSchema` trait errors; near-kit docs gaps.
2. **RPC / indexer instability (StackOverflow, r/nearprotocol).** Official RPC described as unstable/slow → dApps fail to load; slow responses attributed to indexer lag, not congestion. Wallet balances, staking rewards show **zero / "status unavailable"** despite successful on-chain txs (pinned-fix post March 2024, still recurring). Testnet RPC load can interfere with block production. Workarounds: FASTNEAR, Rocket RPC, third-party providers. Recurring StackOverflow confusion: tx-status via RPC, view vs. call function.
3. **Docs staleness (near/docs PR #3177, StackOverflow).** Blank Transaction spec page, retired Pagoda testnet RPC in Python examples, dead Hermes oracle links, moved parameters.yaml, Ref Finance → Rhea rename, retired forum links, un-maintained SDKs. Devs fall back to GitHub issues and community wikis.
4. **Tooling / onboarding friction (StackOverflow 2020→2026, near-wallet issues).** `near login` keys don't port across machines; testnet faucet needs incognito mode; dev-service ports clash with localnet ports; no high-level Kotlin SDK; querying FT balances / block timestamps in tests is hard; testnet wallet connection flaky.
5. **Support latency (forum/Discord reports).** Discord/Zulip answers for complex issues are slow → reliance on GitHub. Wallet migration from deprecated near.org wallet to MyNearWallet/Meteor **fails if 2FA wasn't disabled first** or if an old dApp access key exists.

## User pain points

6. **Phishing / scam epidemic (r/nearprotocol; NEAR Forum scam-alert; near-wallet GitHub).** Fake `nearwallet.site` steals seed phrases via Google ads; Telegram impersonators of mods drain wallets (1000+ NEAR loss reported April 2024); spam NFTs push users to enter 12-word seed phrases on attacker sites; fake domains (`youwon500neartoclaim...`) keep appearing (issues #3112, #3091 request wildcards blacklists); "I see an IP check" issues (#3132). Ledger+Firefox broken (#3055), auto-connect missing (#3101), `signMessage` confusingly costs gas (#3135), "Transfer Accounts" errors (#3124). Trust cost: new users arrive fearful.
7. **HOT Protocol / fake activity controversy (r/nearprotocol July 2025, update Nov 2025).** Users mined non-transferable HOT for 1+ year, burned gas, got nothing; suspicions that constant micro-txs **inflated NEAR DAU/tx stats** (claimed 30M wallets). WhiteBIT delisted HOT-perp Nov 2025; OP calls it a scam. Team counter: building product, new `wrap.hot.tg` contract. Either way: a trust deficit about "real" usage numbers.
8. **Staking / DeFi gap (r/nearprotocol, CoinBureau/Cube reviews).** Rewards show zero; unbonding ~24–48h native, 2–6 days for LSTs with exit fees; Liquid-staking derivatives thin; "no meaningful pools to maximize yield"; DeFi liquidity fragmented/thin vs. ETH/SOL; routing best-execution across chains needs manual bridges (Brave summary of review threads).
9. **Intents / bridge risk (CryptoRank Oct 2026; Brave synthesis).** NEAR Intents paused after **$3.8M Omni deposit/withdrawal exploit** (contract-side, not protocol); users reported frozen funds; 0.2% fee without JWT confuses; solver liquidity + bridge failure risk remains user-facing.
10. **NEAR AI breach — Nov 2026 (Decrypt, TechInformed, CSA Lab, dev.to).** SGLang inference-engine RCE exposed **18 legacy AI agents' chat histories, settings, logs, and 2 customers' API keys**, plus ~100 users' names/emails/balances. Legacy agents **outside the TEE** were the weak link; TEE hardware doesn't stop in-enclave software vulns. MCP angle: many MCP servers recommend installs resolving from public registries. Directly relevant to Track 03.
11. **Governance / ecosystem fairness (CCN Oct 2025; gov.near.org).** Inflation cut 5%→2.5% enacted **without supermajority** in community vote; validators adopted anyway; Chorus One called it a "dangerous precedent". House of Stake launched late 2025 but Foundation/Pagoda still drive AI pivot + near.com. gov.near.org front page: "Pumpopoly — one solo dev vs millions of dollars of grants and insider promos" (150 posts — the hottest thread), HSP-029 issuance-ramp fight (61 posts), "54 pay-per-job agents live on NEAR AI Agent Market: feedback wanted". Perceived insider allocation + meme/rug culture vs. community builders.

## Map: pain → best-fit tracks (★ = strongest fit)

| Pain | Map to |
|---|---|
| #1 Rust/WASM + SDK bloat | **Track 13 Open** (a "fix-it-first" developer tool: deploy-checker CLI that catches deserialization errors before deploy) — bonus Open×DeFi feel. Or **02 Thesis** (reproducible build-failure rate study). |
| #2 Zero balances / status unavailable | **Track 08 Real-World Money ★** — an honest status UX for invoices/payments that explains indexer lag (never shows bogus zero); or **01 DeFi** liquidity tool with truthful balances. |
| #3 Docs rot | **Track 02 Thesis** ("docs-freshness auditor" as evidence product) or **13 Open** (a "last-verified" docs overlay). |
| #4 Onboarding / faucet / keys | **Track 09 Games ★** (social login, no popup = no phishing) and **08** (walletless invoice pay — nearcarta/NearHr already prove demand). |
| #5 2FA migration trap | **Track 12 Social Money** (community migration-support DAO bounty) or **08**. |
| #6 Phishing / spam NFTs | **Track 06 Security ★★** (domain/npm-scam blocklist + spam-NFT quarantine; near-wallet issues #3091/#3112 are the spec) and **10 NFTs** (scam-NFT-immune vault). |
| #7 HOT fake-activity | **Track 02 Thesis ★★** ("Real vs. gamed DAU" reproducible audit — the single most on-narrative thesis for 2026) and **11 Memecoins** (anti-rug mechanic with transparent treasury). |
| #8 Staking/DeFi gap | **Track 01 DeFi ★** (best-route yield router that shows true exit cost/time incl. LST fees) or **08** (remittance that avoids LST traps). |
| #9 Intents exploit fear | **Track 06 Security** (pre-send risk score incl. freeze history) + **01 DeFi** (proof-of-reserves dashboard for Intents solvers). |
| #10 NEAR AI breach | **Track 03 Privacy ★★** (post-breach attestation verifier + legacy-agent-outside-TEE checker; MCP supply-chain guard) and **06** (blocklist with evidence). Most timely story right now. |
| #11 Insider-promo grievance | **Track 12 Social Money ★★** (public, per-contributor reward ledger so "who got paid what" is visible) and **07 Agent Economy** (open pay-per-job marketplace). |

## Top 5 build opportunities (pain-backed)

1. **"Verify my agent is private" — Track 03 Privacy** — choose a NEAR AI Cloud TEE model, fetch fresh-nonce attestation, verify, list what's covered vs. outside; plus a legacy/MCP scanner. Timely post-breach; judge-friendly live demo.
2. **"Is your NEAR activity real?" — Track 02 Thesis** — reproducible DAU/tx audit separating HOT-style micro-cross from genuine usage, with BigQuery queries + falsification section. Evidence-first = exactly what this track scores.
3. **Phishing-proof wallet front-end — Track 06 Security (+10 NFTs)** — link/domain checker, spam-NFT quarantine, per-destination allowances (fixes out-layer double-pay issue #34: fake "payment failed, send again"). Solves #6 directly.
4. **Invoice that never lies about status — Track 08 Real-World Money** — gasless, walletless, indexer-lag-aware UX ("pending" vs. confirmed, plain-English freeze notices post-Intents-exploit). Sells safety over accuracy — users' #1 need.
5. **Fair community pay-per-job — Track 12 Social Money (+07)** — Sputnik/Trezu-custodied bounties with a public per-contributor ledger; the gov forum's hottest complaint (Pumpopoly) becomes your product.
