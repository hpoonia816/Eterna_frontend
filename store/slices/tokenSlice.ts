import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Token, SortConfig, TokenCategory, PriceUpdate } from "@/types";

interface TokenState {
  tokens: Token[];
  filteredTokens: Token[];
  sortConfig: SortConfig;
  selectedCategory: TokenCategory | "all";
  isLoading: boolean;
  error: string | null;
}

const initialState: TokenState = {
  tokens: [],
  filteredTokens: [],
  sortConfig: {
    field: null,
    direction: "desc",
  },
  selectedCategory: "all",
  isLoading: false,
  error: null,
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.filteredTokens = filterTokens(action.payload, state.selectedCategory);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCategory: (state, action: PayloadAction<TokenCategory | "all">) => {
      state.selectedCategory = action.payload;
      state.filteredTokens = filterTokens(state.tokens, action.payload);
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
      // Re-sort filtered tokens based on new sort config
      const filtered = filterTokens(state.tokens, state.selectedCategory);
      state.filteredTokens = sortTokens(
        filtered,
        action.payload.field,
        action.payload.direction
      );
    },
    updatePrice: (state, action: PayloadAction<PriceUpdate>) => {
      const { tokenId, price, priceChange24h } = action.payload;
      const token = state.tokens.find((t) => t.id === tokenId);
      if (token) {
        const oldPrice = token.price;
        token.price = price;
        token.priceChange24h = priceChange24h;
        token.lastUpdated = Date.now();
        
        // Update other price change fields slightly
        if (token.priceChange1h !== undefined) {
          token.priceChange1h = Math.max(-99, Math.min(99, token.priceChange1h + (Math.random() - 0.5) * 0.5));
        }
        
        // Update filtered tokens as well
        const filteredToken = state.filteredTokens.find((t) => t.id === tokenId);
        if (filteredToken) {
          filteredToken.price = price;
          filteredToken.priceChange24h = priceChange24h;
          filteredToken.lastUpdated = Date.now();
          if (filteredToken.priceChange1h !== undefined) {
            filteredToken.priceChange1h = token.priceChange1h;
          }
        }
      }
    },
    addToken: (state, action: PayloadAction<Token>) => {
      state.tokens.push(action.payload);
      if (
        state.selectedCategory === "all" ||
        action.payload.category === state.selectedCategory
      ) {
        state.filteredTokens.push(action.payload);
      }
    },
    removeToken: (state, action: PayloadAction<string>) => {
      state.tokens = state.tokens.filter((t) => t.id !== action.payload);
      state.filteredTokens = state.filteredTokens.filter(
        (t) => t.id !== action.payload
      );
    },
  },
});

function filterTokens(tokens: Token[], category: TokenCategory | "all"): Token[] {
  if (category === "all") return [...tokens];
  return tokens.filter((token) => token.category === category);
}

function sortTokens(
  tokens: Token[],
  field: string | null,
  direction: "asc" | "desc"
): Token[] {
  if (!field) return [...tokens];

  const sorted = [...tokens].sort((a, b) => {
    const aValue = a[field as keyof Token];
    const bValue = b[field as keyof Token];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return sorted;
}

export const {
  setTokens,
  setLoading,
  setError,
  setCategory,
  setSortConfig,
  updatePrice,
  addToken,
  removeToken,
} = tokenSlice.actions;

export default tokenSlice.reducer;

