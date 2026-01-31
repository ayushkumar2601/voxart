// =====================================================
// SUPABASE DATABASE TYPES
// Auto-generated types for type-safe database access
// =====================================================

export type WalletType = 'metamask' | 'phantom';

export interface User {
  id: string;
  wallet_address: string;
  wallet_type: WalletType;
  created_at: string;
  updated_at: string;
}

export interface NFT {
  id: string;
  token_id: string;
  contract_address: string;
  chain_id: number;
  owner_wallet: string;
  name: string;
  description: string | null;
  image_url: string | null;
  metadata_uri: string | null;
  mint_tx_hash: string;
  minted_at: string;
  created_at: string;
  updated_at: string;
}

export interface NFTAttribute {
  id: string;
  nft_id: string;
  trait_type: string;
  value: string;
  created_at: string;
}

export interface NFTWithAttributes extends NFT {
  attributes: NFTAttribute[];
}

// Insert types (without auto-generated fields)
export type UserInsert = Omit<User, 'id' | 'created_at' | 'updated_at'>;

export type NFTInsert = Omit<NFT, 'id' | 'created_at' | 'updated_at'>;

export type NFTAttributeInsert = Omit<NFTAttribute, 'id' | 'created_at'>;

// Database schema type
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: UserInsert;
        Update: Partial<UserInsert>;
      };
      nfts: {
        Row: NFT;
        Insert: NFTInsert;
        Update: Partial<NFTInsert>;
      };
      nft_attributes: {
        Row: NFTAttribute;
        Insert: NFTAttributeInsert;
        Update: Partial<NFTAttributeInsert>;
      };
    };
  };
}
