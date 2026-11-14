import { useState, useEffect } from 'react'

const PASSPORT = 'passport.hackat.testnet'
const RPC = 'https://rpc.testnet.near.org'

async function view(accountId, method, args = {}) {
  const r = await fetch(RPC, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: '1', method: 'query',
      params: { request_type: 'call_function', finality: 'final', account_id: accountId,
        method_name: method, args: typeof args === 'string' ? args : btoa(JSON.stringify(args)) } }),
  })
  const j = await r.json()
  if (j.error) throw new Error(j.error)
  return JSON.parse(Buffer.from(j.result.result, 'base64').toString())
}

export default function Home() {
  const [claimed, setClaimed] = useState(false)
  const [finished, setFinished] = useState(false)
  const [live, setLive] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => {
    view(PASSPORT, 'nft_metadata').then(setLive).catch((e) => setErr(String(e).slice(0, 120)))
  }, [])
  const cap = finished ? '0.15' : '0.10'
  const rep = finished ? 1 : 0
  return (
    <main>
      <header>
        <h1>Embers 🔥 — Bounty Board with Earned Trust</h1>
        <p>NEAR Hackathon 2026 · Tracks: Social Money + NFTs That Do Something · Solo: Avi</p>
        <p>Payouts flow from a <b>Sputnik DAO</b> — no new multisig. Finish work → reputation rises → your Passport NFT allowance rises.</p>
        <p>{live ? `✅ On-chain: ${live.name}` : err ? `⚠️ Chain view unavailable (demo data below): ${err}` : '⏳ Reading chain…'}</p>
        <p><small>Demo mode: mutations below are local until contracts are deployed (user-signing pending).</small></p>
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
        <h2>2 · Claim + finish</h2>
        <button disabled={claimed} onClick={() => setClaimed(true)}>Claim bounty #1</button>{' '}
        <button disabled={!claimed || finished} onClick={() => setFinished(true)}>Mark finished → payout</button>
        {finished && <p>✅ Payout sent: 0.05 NEAR · reputation +1 (demo — no tx yet until DAO deploys)</p>}
      </section>

      <section>
        <h2>3 · Passport NFT — allowance rises with reputation</h2>
        <p>Token <code>EMBER-001</code> · Owner <code>hackat.testnet</code></p>
        <p>Reputation: <b>{rep}</b> finished bounty · Allowance cap: <b>{cap} NEAR / epoch</b>{finished && ' ↑'}</p>
        <p><small>Allowance is bound to the token: on transfer, the new owner gets the cap — seller cannot keep spend rights.</small></p>
      </section>

      <footer>
        <p>DAO <code>genesis.hackat.testnet</code> · Passport <code>passport.hackat.testnet</code> · <a href="https://explorer.testnet.near.org">explorer.testnet.near.org</a></p>
      </footer>
    </main>
  )
}
