#!/usr/bin/env bash
set -euo pipefail
# Deploy Embers on testnet — FIXED for near-cli-rs 0.31 (positional ACCOUNT_ID, --wasm-file, --network-id).
# Usage: bash scripts/deploy-embers.sh
NET="testnet"
FACTORY_ID="hackat.testnet"
DAO_ID="genesis.hackat.testnet"
PASSPORT_ID="passport.hackat.testnet"

echo "=== 0. Ensure logged in (account: hackat.testnet) ==="
echo "Run: near login"

echo "=== 1a. Find Sputnik factory WASM (built last run) ==="
WASM_FACTORY=$(find /tmp/sputnik -path "*target/wasm32-unknown-unknown/release/sputnikdao_factory2.wasm" | head -1)
if [ -z "$WASM_FACTORY" ]; then
  echo "Factory WASM not found — cloning + building first:"
  rm -rf /tmp/sputnik
  git clone --depth 1 https://github.com/near-daos/sputnik-dao-contract /tmp/sputnik
  cd /tmp/sputnik/sputnikdao-factory2
  cargo build --target wasm32-unknown-unknown --release || cargo near build non-reproducible-wasm
  WASM_FACTORY=$(find /tmp/sputnik -path "*target/wasm32-unknown-unknown/release/sputnikdao_factory2.wasm" | head -1)
fi
echo "Factory WASM: $WASM_FACTORY"

echo "=== 1b. Deploy factory to ${FACTORY_ID} ==="
near deploy --wasm-file "$WASM_FACTORY" "$FACTORY_ID" --network-id "$NET"
near contract call-function as-transaction "$FACTORY_ID" new '{}' --network-id "$NET" --gas 100000000000000 --deposit 0

echo "=== 2. Create DAO (name/purpose) ==="
near contract call-function as-transaction "$FACTORY_ID" create_dao \
  '{"name":"Embers DAO","purpose":"Fund contributor bounties fairly and transparently on NEAR"}' \
  --network-id "$NET" --gas 100000000000000 --deposit 1

echo "=== 3. Passport NFT (prebuilt wasm in deploy/passport.wasm) ==="
near deploy --wasm-file "/Users/graph/.deepai-code/projects/muse-ember-1/deploy/passport.wasm" "$PASSPORT_ID" --network-id "$NET"
near contract call-function as-transaction "$PASSPORT_ID" new_default_meta '{"owner_id":"hackat.testnet"}' --network-id "$NET" --deposit 0

echo "Done. Verify:"
echo "  near view $DAO_ID get_policy"
echo "  near view $PASSPORT_ID nft_metadata"
