import { useState, useEffect } from 'react'
import Link from 'next/link'

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

export default function History() {
  const [token, setToken] = useState('EMBER-001')
  const [hist, setHist] = useState(null)
  const [err, setErr] = useState('')
  async function load() {
    setHist(null); setErr('')
    try {
      const count = await view(PASSPORT, 'bounty_count_of', { token_id: token })
      const cap = await view(PASSPORT, 'allowance_cap', { token_id: token })
      const rem = await view(PASSPORT, 'remaining_allowance', { token_id: token })
      setHist({ count, cap, rem })
    } catch (e) { setErr(String(e).slice(0, 160)) }
  }
  useEffect(() => { load() }, [])
  return (
    <main>
      <h1>Reputation History 🔥</h1>
      <p><Link href="/">← Back to board</Link> · Transparency is the product: every bounty → credit → cap change is public.</p>
      <section>
        <label>Token ID <input value={token} onChange={(e) => setToken(e.target.value)} /></label>{' '}
        <button onClick={load}>Load</button>
        {hist && <p>Finished bounties: <b>{hist.count}</b> · Cap: <b>{hist.cap}</b> · Remaining: <b>{hist.rem}</b></p>}
        {err && <p>⚠️ Chain read failed (expected pre-deploy): {err}</p>}
        <table><thead><tr><th>Event</th><th>Effect</th></tr></thead>
        <tbody>
          <tr><td>Bounty finished (PoW link)</td><td>bounty_count +1, cap +0.005</td></tr>
          <tr><td>Milestone 30/40/30</td><td>escrow releases in order</td></tr>
          <tr><td>Epoch spend</td><td>remaining decreases</td></tr>
        </tbody></table>
      </section>
    </main>
  )
}
