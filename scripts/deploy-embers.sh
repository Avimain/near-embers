#!/usr/bin/env bash
set -euo pipefail
# Deploy Embers on testnet — near-cli-rs 0.31 trailing network-config pattern.
# Usage: bash scripts/deploy-embers.sh
NET="testnet"
FACTORY_ID="hackat.testnet"
DAO_ID="genesis.hackat.testnet"
PASSPORT_ID="passport2.hackat.testnet"

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
near contract deploy "$FACTORY_ID" use-file "$WASM_FACTORY" without-init-call network-config "$NET" sign-with-keychain send

echo "=== 1c. Init factory ==="
near contract call-function as-transaction "$FACTORY_ID" new json-args '{}' prepaid-gas "100 TeraGas" network-config "$NET" sign-with-keychain send

echo "=== 2. Create DAO (name/purpose) ==="
near contract call-function as-transaction "$FACTORY_ID" create_dao \
  json-args '{"name":"Embers DAO","purpose":"Fund contributor bounties fairly and transparently on NEAR"}' \
  prepaid-gas "100 TeraGas" network-config "$NET" sign-with-keychain send

echo "=== 3. Passport NFT (prebuilt wasm in deploy/passport.wasm) ==="
near contract deploy "$PASSPORT_ID" use-file "deploy/passport-opt.wasm" without-init-call network-config "$NET" sign-with-keychain send
near contract call-function as-transaction "$PASSPORT_ID" new_default_meta \
  json-args '{"owner_id":"hackat.testnet"}' \
  prepaid-gas "100 TeraGas" network-config "$NET" sign-with-keychain send

echo "Done. Verify:"
echo "  near contract call-function as-read-only $DAO_ID get_policy json-args '{}' network-config $NET"
echo "  near contract call-function as-read-only $PASSPORT_ID nft_metadata json-args '{}' network-config $NET"
