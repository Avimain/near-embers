// Raw JSON-RPC (no SDK dependency) — view calls only for demo.
export const RPC = 'https://rpc.testnet.near.org'
export async function view(accountId, method, args={}) {
  const r = await fetch(RPC, { method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ jsonrpc:'2.0', id:'1', method:'query',
      params:{ request_type:'call_function', finality:'final', account_id:accountId, method_name:method,
        args: btoa(JSON.stringify(args)) } }) })
  const j = await r.json()
  if (j.error) throw new Error(JSON.stringify(j.error))
  return JSON.parse(Buffer.from(j.result.result, 'base64').toString())
}
