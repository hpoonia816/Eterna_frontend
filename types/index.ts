/**
 * Core type definitions for the token discovery table
 */

export type TokenCategory = "new-pairs" | "final-stretch" | "migrated";

export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  priceChange1h?: number;
  priceChange1d?: number;
  priceChange1w?: number;
  priceChange1m?: number;
  priceChange3m?: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fee: number;
  transactions: number;
  category: TokenCategory;
  chain: string;
  address: string;
  imageUrl?: string;
  createdAt: number;
  lastUpdated: number;
  status?: "active" | "dead-stop" | "migrated";
  solAmount?: number;
  solStatus?: "active" | "open";
}

export type SortField = "price" | "priceChange24h" | "volume24h" | "liquidity" | "marketCap" | "createdAt";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

export interface TableState {
  tokens: Token[];
  filteredTokens: Token[];
  sortConfig: SortConfig;
  selectedCategory: TokenCategory | "all";
  isLoading: boolean;
  error: string | null;
}

export interface PriceUpdate {
  tokenId: string;
  price: number;
  priceChange24h: number;
  timestamp: number;
}

export interface WebSocketMessage {
  type: "price_update" | "token_added" | "token_removed";
  data: PriceUpdate | Token;
}

