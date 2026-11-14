#!/usr/bin/env bash
set -euo pipefail
# Deploy Embers on testnet. Run manually (needs interactive near login).
# Usage: bash scripts/deploy-embers.sh
NIC="near"
NET="testnet"
FACTORY_ID="hackat.testnet"
DAO_ID="genesis.hackat.testnet"
PASSPORT_ID="passport.hackat.testnet"

echo "=== 0. Ensure logged in ==="
echo "Run: near login  (account: hackat.testnet)"

echo "=== 1a. Build Sputnik factory ==="
cd /tmp/sputnik/sputnikdao-factory2 2>/dev/null || (git clone https://github.com/near-daos/sputnik-dao-contract /tmp/sputnik && cd /tmp/sputnik/sputnikdao-factory2)
cargo near build reproducible-wasm || cargo build --target wasm32-unknown-unknown --release
WASM_FACTORY=$(find . -name "sputnikdao_factory2.wasm" | head -1)
echo "Factory WASM: $WASM_FACTORY"

echo "=== 1b. Deploy factory ==="
$NIC deploy $FACTORY_ID --wasmFile "$WASM_FACTORY" --accountId $FACTORY_ID --networkId $NET --signer $FACTORY_ID
$NIC call $FACTORY_ID new --accountId $FACTORY_ID --networkId $NET --signer $FACTORY_ID --gas 100000000000000 --depositYocto 0

echo "=== 2. Create DAO ==="
# NOTE: create_dao args vary by factory version — check with: near view sputnikdao-factory2
$NIC call $FACTORY_ID create_dao --accountId $FACTORY_ID --networkId $NET --signer $FACTORY_ID --depositYocto 1000000000000000000000000 --gas 100000000000000 --args '{"name":"Embers DAO","purpose":"Fund contributor bounties fairly and transparently on NEAR"}'

echo "=== 3. Passport NFT ==="
$NIC deploy $PASSPORT_ID --wasmFile /Users/graph/.deepai-code/projects/muse-ember-1/deploy/passport.wasm --accountId $FACTORY_ID --networkId $NET --signer $FACTORY_ID
$NIC call $PASSPORT_ID new_default_meta --accountId $FACTORY_ID --networkId $NET --signer $FACTORY_ID --args '{"owner_id":"hackat.testnet"}' --depositYocto 0

echo "Done. Verify: near view $DAO_ID get_policy  and  near view $PASSPORT_ID nft_metadata"
