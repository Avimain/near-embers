import { useState, useEffect } from 'react'

const PASSPORT = 'passport.hackat.testnet'
const RPC = 'https://rpc.testnet.near.org'

async function view(accountId, method, args = {}) {
  const r = await fetch(RPC, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: '1', method: 'query',
      params: { request_type: 'call_function', finality: 'final', account_id: accountId,
        method_name: method, args_base64: typeof args === 'string' ? args : btoa(JSON.stringify(args)) } }),
  })
  const j = await r.json()
  if (j.error) throw new Error(j.error)
  return JSON.parse(atob(j.result.result))
}

export default function Home() {
  const [claimed, setClaimed] = useState(false)
  const [finished, setFinished] = useState(false)
  const [live, setLive] = useState(null)
  const [err, setErr] = useState('')
  const [spent, setSpent] = useState('0')
  useEffect(() => {
    view(PASSPORT, 'nft_metadata').then(setLive).catch((e) => setErr(String(e).slice(0, 120)))
  }, [])
  const capUsd = finished ? '0.105' : '0.10'
  const rep = finished ? 1 : 0
  const remaining = (parseFloat(capUsd) - parseFloat(spent)).toFixed(2)
  return (
    <main>
      <header>
        <h1>Embers 🔥 — Bounty Board with Earned Trust</h1>
        <p>NEAR Hackathon 2026 · Tracks: Social Money + NFTs That Do Something · Solo: Avi</p>
        <p>Payouts flow from a <b>Sputnik DAO</b> — no new multisig. Finish work → reputation rises → your Passport NFT allowance rises.</p>
        <p>{live ? `✅ On-chain: ${live.name}` : err ? `⚠️ Chain view unavailable (demo data below): ${err}` : '⏳ Reading chain…'}</p>
        <p><small>Contracts live on testnet (DAO + Passport deployed). Mutations below are local demo clicks; real flows are on explorer.</small></p>
      </header>

      <section>
        <h2>1 · Post a bounty</h2>
        <table><thead><tr><th>Bounty</th><th>Payout</th><th>Tier</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>Fix login bug</td><td>0.05 NEAR</td><td>auto-approve</td><td>{finished ? 'paid ✓' : claimed ? 'in progress' : 'open'}</td></tr>
          <tr><td>Write docs</td><td>1 NEAR</td><td>1 council</td><td>open</td></tr>
          <tr><td>Audit contract</td><td>12 NEAR</td><td>DAO proposal</td><td>open</td></tr>
        </tbody></table>
      </section>

      <section>
        <h2>2 · Claim + proof-of-work finish</h2>
        <button disabled={claimed} onClick={() => setClaimed(true)}>Claim bounty #1</button>{' '}
        <input placeholder="Deliverable URL (PR/commit)" id="deliv" style={{ width: 220 }} />{' '}
        <button disabled={!claimed || finished} onClick={() => setFinished(true)}>Finish with deliverable → payout</button>
        {finished && <p>✅ Payout sent: 0.05 NEAR · reputation +1 (demo — DAO signs off deliverable, then credits)</p>}
      </section>

      <section>
        <h2>3 · Passport NFT — epoch drawdown</h2>
        <p>Token <code>EMBER-001</code> · Owner <code>hackat.testnet</code></p>
        <p>Reputation: <b>{rep}</b> · Cap: <b>{capUsd} NEAR/epoch</b> · Spent this epoch: <b>{spent}</b> · Remaining: <b>{remaining}</b></p>
        <button disabled={spent >= capUsd} onClick={() => setSpent((parseFloat(spent) + 0.05).toFixed(2))}>Spend 0.05 (demo)</button>
        <p><small>Allowance is bound to the token: on transfer, the new owner gets the cap — seller cannot keep spend rights.</small></p>
      </section>

      <section>
        <h2>4 · DAO cross-contract credit (no new multisig)</h2>
        <p>DAO creates a <b>FunctionCall</b> proposal → <code>passport.credit_bounties(token_id, count)</code>. The contract only accepts this from the DAO or the contract owner. Verify with:</p>
        <code>near view passport.hackat.testnet create_credit_args &#123;token_id: EMBER-001, count: 1&#125;</code>
      </section>

      <p><a href="/history">Reputation history →</a></p>
      <footer>
        <p>DAO <code>genesis.hackat.testnet</code> · Passport <code>passport.hackat.testnet</code> · <a href="https://explorer.testnet.near.org">explorer.testnet.near.org</a></p>
      </footer>
    </main>
  )
}
