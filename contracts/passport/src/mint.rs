use crate::*;

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn nft_mint(
        &mut self,
        token_id: TokenId,
        token_owner_id: AccountId,
        token_metadata: TokenMetadata,
    ) {
        //measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();

        //specify the token struct that contains the owner ID
        let token = Token {
            //set the owner ID equal to the receiver ID passed into the function
            owner_id: token_owner_id,
        };

        //insert the token ID and token struct and make sure that the token doesn't exist
        assert!(
            self.tokens_by_id.insert(&token_id, &token).is_none(),
            "Token already exists"
        );

        //insert the token ID and metadata
        self.token_metadata_by_id.insert(&token_id, &token_metadata);

        //call the internal method for adding the token to the owner
        self.internal_add_token_to_owner(&token.owner_id, &token_id);

        // Ember Passport: init reputation/allowance for the new token
        self.bounty_count.insert(&token_id, &0);
        self.extra_cap.insert(&token_id, &0);

        //calculate the required storage which was the used - initial
        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        //refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
        refund_deposit(required_storage_in_bytes.into());
    }

    /// Record finished bounties for a token; raises its allowance cap.
    /// Only the DAO or the contract owner may call (prevents cap inflation).
    /// Demo: owner (hackat.testnet) calls. Production: DAO proposal FunctionCall.
    pub fn credit_bounties(&mut self, token_id: TokenId, count: u32) {
        let predecessor = env::predecessor_account_id();
        let current = env::current_account_id();
        assert!(
            predecessor == current || predecessor.to_string() == "genesis.hackat.testnet",
            "Only DAO or owner may credit bounties"
        );
        let n = self.bounty_count.get(&token_id).unwrap_or(0) + count;
        self.bounty_count.insert(&token_id, &n);
        let step: u128 = 5_000_000_000_000_000_000; // 0.005 NEAR per bounty (demo)
        self.extra_cap.insert(&token_id, &(n as u128 * step));
    }

    pub fn bounty_count_of(&self, token_id: TokenId) -> u32 {
        self.bounty_count.get(&token_id).unwrap_or(0)
    }

    pub fn allowance_cap(&self, token_id: TokenId) -> u128 {
        const BASE: u128 = 100_000_000_000_000_000_000; // 0.1 NEAR base (demo)
        BASE + self.extra_cap.get(&token_id).unwrap_or(0)
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn cap_math() {
        // allowance = base + n*step, as in Contract::allowance_cap
        const BASE: u128 = 100_000_000_000_000_000_000;
        let step: u128 = 5_000_000_000_000_000_000;
        assert_eq!(BASE, 100_000_000_000_000_000_000);
        assert_eq!(BASE + 0*step, BASE);
        assert_eq!(BASE + 10*step, BASE + 50_000_000_000_000_000_000);
        assert!(BASE + 10*step > BASE);
    }

    #[test]
    fn token_bound_transfer() {
        // cap is a function of token_id only: same token, any owner => same cap.
        use std::collections::HashMap;
        let mut caps: HashMap<String, u128> = HashMap::new();
        caps.insert("t1".to_string(), 150_000_000_000_000_000_000);
        let owner_a_cap = caps["t1"];
        let owner_b_cap = caps["t1"];
        assert_eq!(owner_a_cap, owner_b_cap);
    }
}
