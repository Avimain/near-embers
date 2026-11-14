# Ember Passport (NEP-171)
Built on near-examples `nft-contract-basic`, extended with bounty-linked
allowance. Mint: `nft_mint(token_id, receiver, metadata)`. Credit:
`credit_bounties(token_id, count)` → `allowance_cap(token_id)`.
Threat model: allowance bound to token_id (not person); transfer moves rights;
seller cannot retain spend access; credit restricted in production to DAO.
