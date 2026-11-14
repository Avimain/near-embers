# NEAR HACKATHON — Review & Brainstorm

Source: https://nearhackathon.com (note: `www.` does not resolve, the bare domain works).

## At a glance

- **Theme:** "The era of programmable money starts here... Autonomous payments. Intelligent agents. Money with a mind of its own."
- **Prize pool: $250,000** (paid in NEAR, single payment within 30 days of results)
  - Grand prize: $55K × 1
  - Per track (13 tracks): 1st $10K, 2nd $3K, 3rd $2K → $195K total for tracks
- **Timeline (UTC):**
  - Hackathon start: 1 Nov 2026 00:00
  - Development ends / submission deadline: **14 Nov 2026 23:59**
  - Judging: 16–18 Nov 2026; results by 18 Nov 23:59
  - Note: code from the announcement (19 Oct 2026) onward counts as in-window.
- **1,256 projects submitted at time of review.**

## How to submit

1. Build anything you like; no sign-up needed to start. Solo or team, one submission per project. One person can enter up to 2 *different* projects (READMEs must name each other).
2. Publish the repo **public** before deadline. Video demo required if judges can't open the app (Q-012).
3. Post demo on X: say you built it at NEAR HACKATHON, tag **@NEARProtocol + #NEARHackathon** (optionally @NearLegion @NearBuilders), attach video/screenshots.
4. Submit once via form (#apply) or API. Fields: project name, team lead, email, team size, track ids, NEAR payout account, repo link (unique, once-only), demo post link, "what did you build?" (20–2000 chars), consent.
5. Mistakes can't be edited directly — use **request-changes** page (manual review). A second submission of same repo = rejected 409.

## Rules that matter

- **Multi-track is allowed:** pick every track your project fits, still one submission.
- **No mandatory integration** (Q-011): "own contract on NEAR that fits the track is enough", but hints are what organizers hope to see. Testnet-only is eligible (Q-010).
- **Old project as-is: no. New NEAR feature in window: yes** (separate branch + tags + README diff note). Existing product on another chain allowed if NEAR integration is disclosed.
- **AI code allowed** (Q-005). List libraries in README.
- **Judging:** Claude Code & Codex screen (reproducibility, does it do what README says), human judges decide. Prior NEAR hackathons scored technical implementation, design, impact, originality, sustainability.
- **Screenshot-only demo insufficient** if judges can't open it — hosted demo + video is safest.
- **No secrets in repo.** NEAR AI credits: claim $10 via NEAR Builders dashboard (separate key, not auto-applied).
- 1Click JWT: optional (without it 0.2% fee). No Intents testnet — mainnet, tiny amounts, `dry:true` quotes.

## Judges

Illia Polosukhin (NEAR), Eddy Lazzarin (a16z crypto), Mert Mumtaz (Helius), Avichal Garg (Electric Capital), Kain Warwick (Synthetix/Infinex), Haseeb Qureshi (Dragonfly), Stepan Gershuni (cyber•Fund), Claude Code & Codex (Anthropic/OpenAI).

## Already crowded (from first 8 of 1,256 listings)

Most early submissions cluster in **AI Security & Defense + Agent Economy + Autonomous Business** (spending firewalls, allowances, spend guards). Track 2 (Investment Thesis) and Open Innovation already have entries too. Avoid generic "agent spend guard" unless you add a sharp twist — DeFi, Privacy, Social Money, Real-World Money, Games, NFTs, Memecoins look less saturated so far (sample is small, be careful).

## Existing early submissions seen

1. Veto — on-chain spending firewall for AI agents (Security, Agents)
2. Semilla1 Guard (Security, Agents)
3. Allowance (Business, Security, Agents)
4. near-thesis: NEAR on the evidence (Thesis)
5. LeashPay (Security, Agents)
6. NEAR Private OTC (DeFi)
7. Tidepool (Open Innovation)
8. NEAR Agent Spend Guard (Business, Security, Agents)

---

# 39 ideas — 3 per track

## 01 · Unstoppable DeFi — Markets that never close (id: `defi`)
Lean on: Trading, NEAR Intents, Chain Signatures. Build: exchanges, perps, lending, vaults, trading agents settling cross-chain via NEAR Intents, no custodian.

1. **Cross-chain DCA vault** — deposit USDC from any chain, auto-buy BTC/ETH/NEAR on a schedule via 1Click, slippage-checked; dry-run mode with real quotes. Stretch: Chain-Signatures-owned BTC address.
2. **Perps with Intents settlement + socialized backstop** — perpetuals market where funding/liquidation settles cross-chain; liquidation insurance funded by a community vault.
3. **On-chain event-volatility trader for RWA ranges** — trading agent that opens hedged positions when NEAR Intents flow on an asset spikes; fully transparent fills + P&L ledger. (DeFi × Agents crossover.)

## 02 · Investment Thesis — Make the long-term case (id: `thesis`)
Lean on: onchain data, dashboards, research. Judged on reproducible evidence, not conviction.

1. **"Intents volume as leading indicator" thesis kit** — test cross-chain Intents volume vs. NEAR token price/usage with BigQuery + Intents Explorer API; THESIS.md with evidence *against* the claim, one-command chart rebuild.
2. **Developer-activity moat dashboard** — contract usage, active accounts, storage growth + cost-per-transaction trend; thesis: NEAR's lead-2-user economics win when AI-agent traffic grows.
3. **Agent-traffic economics model** — estimate cost of agent jobs settled via NEAR vs. other L1s (x402 pays, API payments); reproducible notebook + dashboard + "what would change my mind" falsification section.

## 03 · Privacy & Private AI — Private by design (id: `privacy`)
Lean on: Private AI, TEE, NEAR AI Cloud. Intelligence without exposure.

1. **Private expense auditor** — upload receipts/statement, NEAR AI Cloud (TEE model) categorizes + flags anomalies, verifiable attestation panel ("Verified"), nothing stored server-side, fictional sample docs included.
2. **Private salary / payroll negotiation assistant** — employee shares compensation data privately, AI suggests ranges; TEE attestation shown, no data retention. (Privacy × Real-World Money.)
3. **Confidential DAO voting insight** — voters submit encrypted preferences; private AI summarizes the anonymous electorate without exposing anyone; results published with attestation. (Privacy × Social Money.)

## 04 · Autonomous Business — Company of one, or none (id: `business`)
Lean on: AI agents, NEAR Intents, Chain Signatures. Agents run treasury/sales/procurement; humans set constraints.

1. **One-agent research shop** — sells market reports, paid cross-chain via Intents, buys its own inference, auto-splits revenue to contributors; config.yaml rules + kill switch + public ledger, <2 min testnet demo loop.
2. **Autonomous e-commerce seller** — agent runs a digital-goods (NEP-171 license/key) store: lists, prices, delivers, pays for marketing via x402, treasury rules cap spend.
3. **AI freelance-agency front desk** — human experts book via agent; agent scopes, quotes, pays contractors cross-chain, takes a revenue share; ledger + dispute holdback. (Business × Agent Economy.)

## 05 · AI Swarms — Many agents, one economy (id: `swarms`)
Lean on: multi-agent systems, NEAR Intents, sub-accounts. Coordination markets, bidding, collective purchasing, emergent economies.

1. **GPU-hours group-buying swarm** — buyer agents pool demand, sealed-bid auction vs. seller agents, settles via Intents; per-agent sub-accounts, 20×5 simulation mode, live auction page.
2. **Data-commons swarm** — agents contribute datasets, earn proportionally to usage via an attention-based reward pool; no central curator.
3. **Disaster-resource swarm** — agents representing neighborhoods bid for shared relief supplies; allocation by transparent rules, settlement onchain. (Swarms × Real-World Money.)

## 06 · AI Security & Defense — Trust, but verify (id: `security`)
Lean on: agent security, function-call keys, TEE attestation. Spending limits, policy engines, reputation, scam detection.

1. **Counterparty check service** — agent asks allow/warn/block before paying; signals: account age, contract-code-change, prior interactions, shared blocklist with evidence; wrapper + prompt-injection attack demo. *(Note: crowded area — give it a unique angle, e.g. cross-chain reputation.)*
2. **Scoped-agent wallet sandbox** — function-call keys limited to one contract + per-day caps + simulator that previews outcomes before signing, with auto-shutdown on anomalous spend rate.
3. **Intent-firewall for humans** — scans incoming Intents/withdrawal requests for look-alike addresses, fake deposit addresses and double-spend patterns; warns wallet users in plain English. (Security × DeFi.)

## 07 · Agent Economy — Give AI a wallet (id: `agents`)
Lean on: Agent commerce, NEAR Intents, Chain Signatures. Agents earn/spend/negotiate/hire.

1. **General-contractor agent** — takes a task + budget, plans, hires from Agent Market, negotiates once, verifies work, pays on pass; receipt per task. Budget never exceeded.
2. **API-broker agent** — agents buy/sell x402-gated APIs and data through a policy wallet; broker batches, discounts and audits every call. (Agents × Business.)
3. **Tutor-to-earn agent marketplace** — specialized agents (code review, translation, QA) list on Agent Market, compete on price/quality, escrow via Intents. *Better: run the market itself — one-click listing + jobs API for Claude Code/MCP clients.*

## 08 · Real-World Money — Bring the boring money onchain (id: `realworld`)
Lean on: stablecoins, NEAR Intents, meta transactions. Payroll, invoicing, remittances, merchant payments.

1. **Crypto invoicing for freelancers who don't care about crypto** — link-based invoice, client pays any chain/token via 1Click, freelancer receives USDC on NEAR gasless (meta-tx relayer), CSV export. *(Highest "real company could use it tomorrow" score.)*
2. **Remittance corridor with near-zero spread** — sender pays local currency, recipient gets stablecoins on NEAR; corridor pricing dashboard + compliance-lite KYC.
3. **Merchant stablecoin checkout for Telegram/WhatsApp** — stores accept USDC via NEAR Intents; gasless for merchants, daily settlement, QR + link flow. (Real-World × Open.)

## 09 · Games With Real Economies — The economy is the gameplay (id: `games`)
Lean on: agent NPCs, social login, NEAR Intents, NEP-245. Judged on game loop; bonus if players never notice the chain.

1. **Market-town game with agent merchants** — gather/trade; merchants are priced agents (NEP-245 items, social login, fast-forward week simulation); prices emerge from supply/demand.
2. **Rental-market sim with player-owned shops** — players own storefronts as NFTs earning rent; NPC customers spend; shops can be foreclosed/bought; economy evolves without patches.
3. **Betting-free prediction game** — players back in-game events with points that convert to prizes; leaderboard + onchain settlement; pure social loop, no wallet popups during play. (Games × Social.)

## 10 · NFTs That Do Something — What comes after the JPEG (id: `nfts`)
Lean on: dynamic NFTs, NEP-171, sub-accounts. NFTs as accounts that own money, earn, hold inventory, carry access.

1. **Membership NFT with its own wallet** — token maps to a sub-account holding club-treasury share + ticket-sale royalties; transfer moves wallet + access; gated page + per-NFT history; threat-model README (seller can't keep access).
2. **Token that IS a storefront** — NFT owns inventory, sets prices, sells items, splits revenue to creator/owner; resale flips the store. (NFTs × Games.)
3. **Soulbound credential NFT with spendable allowance** — DAO contributor passport (NFT) carrying a per-epoch USDC allowance; reputation from completed bounties raises the cap. (NFTs × Social Money — strong multi-track.)

## 11 · Memecoins With Mechanics — The joke needs rules (id: `memecoins`)
Lean on: memecoins, token mechanics, NEP-141. Judged on mechanic, not chart.

1. **Streak coin** — daily community check-in target; hit it → holders who checked in get a mint; miss → treasury burn + streak resets; 60-day simulation + onchain log.
2. **"Mood supply" coin** — supply and treasury rules react to community votes (governance rituals, challenges); no admin key after launch, all params public.
3. **Quest-gated supply** — new supply unlocked only by completing onchain mini-quests (trading, staking, social posts verified via data); burn on failed quests. (Meme × Games.)

## 12 · Social Money — Coordinate value together (id: `social`)
Lean on: Sputnik DAO, Trezu, named accounts. Build what communities do with the multisig.

1. **Bounty board with earned trust** — post/claim/finish small bounties, payouts from DAO/Trezu; reputation → auto-approve tiers; traceable points. (Low build risk: custody already exists.)
2. **Programmable community rewards** — sponsors fund reward pools; contributors earn weighted shares from peer ratings + completion; streaming payouts, all onchain.
3. **Collective-ownership wrapper** — community pools funds to buy an asset (NFT/domain) as a shared "vessel" DAO with per-member shares and exit prices. (Social × NFTs.)

## 13 · Open Innovation — Something we haven't seen (id: `open`)
Lean on: experimental, chain abstraction, build your own. Can be entered *alongside* any other track.

1. **Inheritance account** — NEAR controls BTC/ETH addresses via Chain Signatures; missed check-ins → guardians + waiting period → heirs; cancelable; testnet demo with shortened timers.
2. **Off-chain promise, on-chain proof** — "sleeping" prepaid commitments (gift cards, deposits) that release automatically on verifiable real-world milestones via attested events.
3. **Cross-chain subscriptions / streaming** — any-chain token streamed to a biller via Intents with pause/refund rules enforced by a NEAR contract; consumer protection for Web2 subscriptions.

---

## Promising cross-track mixes (my take)

- **#10.3 Credential NFT + #12.1 Bounties** (NFTs + Social Money + Business): passport-allowance bounties. Real, demoable, multi-track, less crowded.
- **#08.1 Invoicing + #06.3 Intent-firewall**: payments product with a safety story judges love.
- **#04.1 Research shop + #07.1 Contractor**: autonomous business that hires other agents — two hot tracks in one demo.
- **#03.1 Private auditor + #08.2 Remittance**: "boring money, privately" narrative.

## Clarifying questions for you

1. Solo or team (and size)? Technical background — Rust/NEAR contracts, web apps, AI/agent tooling, data work?
2. Testnet-only is fine, but do you want mainnet flavor (Intents/Chain Signatures)? These score "NEAR-native" points.
3. Goal: max prize chance, learning, portfolio piece, or a real product after? This changes how ambitious vs. safe to build.
4. Time available before 14 Nov 23:59 UTC — hours/day? (Context date: 14 Nov 2026, so we're at/near deadline — confirm: are we building for this cycle or the next?)
5. NEAR wallet (payout account) and X account for demo post — already set up?
6. Any existing project you want to add a NEAR feature to (counts if separated)?
