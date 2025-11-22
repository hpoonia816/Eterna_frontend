import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTokens, setLoading, setError } from "@/store/slices/tokenSlice";
import type { Token, TokenCategory } from "@/types";
import { useEffect } from "react";

/**
 * Mock data generator for tokens matching Axiom Trade format
 */
function generateMockTokens(): Token[] {
  const tokens: Token[] = [];
  
  // Sample token names matching the real app
  const tokenNames = [
    { name: "CRAFTIFY Minecraftification", symbol: "CRAFTIFY", category: "new-pairs" as TokenCategory },
    { name: "BTC Bear Tanking Coin", symbol: "BTCBEAR", category: "new-pairs" as TokenCategory },
    { name: "ALGD Aligned", symbol: "ALGD", category: "new-pairs" as TokenCategory },
    { name: "Rinsemas Rinsemas", symbol: "RINSEMAS", category: "new-pairs" as TokenCategory },
    { name: "Fakeout Jewish", symbol: "FAKEOUT", category: "new-pairs" as TokenCategory },
    { name: "SACHI Sachicoin", symbol: "SACHI", category: "final-stretch" as TokenCategory },
    { name: "Goongrip iGrip", symbol: "GOONGRIP", category: "final-stretch" as TokenCategory },
    { name: "89 The Official 89 Coin", symbol: "89", category: "final-stretch" as TokenCategory },
    { name: "McDonalds McDonald's", symbol: "MCD", category: "final-stretch" as TokenCategory },
    { name: "WW With What", symbol: "WW", category: "final-stretch" as TokenCategory },
    { name: "Revive Revive Coin", symbol: "REVIVE", category: "migrated" as TokenCategory },
    { name: "Yoda Yodacoin", symbol: "YODA", category: "migrated" as TokenCategory },
    { name: "Maru Maru Chan", symbol: "MARU", category: "migrated" as TokenCategory },
    { name: "SOL SOLANA", symbol: "SOL", category: "migrated" as TokenCategory },
  ];

  // Generate tokens for each category - ensure at least 8 tokens per category
  ["new-pairs", "final-stretch", "migrated"].forEach((category) => {
    const categoryTokens = tokenNames.filter(t => t.category === category);
    const baseCount = Math.max(categoryTokens.length, 8);
    
    for (let i = 0; i < baseCount; i++) {
      const tokenData = categoryTokens[i] || {
        name: `Token ${category}-${i}`,
        symbol: `TKN${i}`,
        category: category as TokenCategory
      };
      
      const basePrice = Math.random() * 100 + 0.01;
      const priceChange24h = (Math.random() - 0.3) * 100; // Bias towards positive
      const priceChange1h = (Math.random() - 0.4) * 20;
      const priceChange1d = (Math.random() - 0.3) * 50;
      const priceChange1w = (Math.random() - 0.2) * 80;
      const priceChange1m = (Math.random() - 0.1) * 100;
      const priceChange3m = (Math.random() - 0.1) * 100;
      
      const marketCap = basePrice * (Math.random() * 1000000 + 1000);
      const volume24h = marketCap * (Math.random() * 0.1 + 0.01);
      const liquidity = marketCap * (Math.random() * 0.5 + 0.1);
      const fee = Math.random() * 0.1;
      const transactions = Math.floor(Math.random() * 2000);
      
      // Determine status
      const statusRoll = Math.random();
      const status = statusRoll < 0.1 ? "dead-stop" : statusRoll < 0.9 ? "active" : "migrated";
      
      // SOL amount and status
      const solAmount = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 10) + 1;
      const solStatus = solAmount === 0 ? "open" : "active";
      
      // Created time (various ages)
      const ageOptions = [
        Date.now() - Math.random() * 60000, // Recent (seconds)
        Date.now() - Math.random() * 3600000, // Minutes
        Date.now() - Math.random() * 86400000, // Hours
        Date.now() - Math.random() * 2592000000, // Days
        Date.now() - Math.random() * 7776000000, // Months
      ];
      const createdAt = ageOptions[Math.floor(Math.random() * ageOptions.length)];

      tokens.push({
        id: `${category}-${i}-${Date.now()}`,
        symbol: tokenData.symbol,
        name: tokenData.name,
        price: basePrice,
        priceChange24h: Math.max(-99, Math.min(99, priceChange24h)),
        priceChange1h: Math.max(-99, Math.min(99, priceChange1h)),
        priceChange1d: Math.max(-99, Math.min(99, priceChange1d)),
        priceChange1w: Math.max(-99, Math.min(99, priceChange1w)),
        priceChange1m: Math.max(-99, Math.min(99, priceChange1m)),
        priceChange3m: Math.max(-99, Math.min(99, priceChange3m)),
        volume24h,
        liquidity,
        marketCap,
        fee,
        transactions,
        category: category as TokenCategory,
        chain: "sol",
        address: `So${Array.from({ length: 43 }, () => Math.floor(Math.random() * 10)).join("")}`,
        createdAt,
        lastUpdated: Date.now(),
        status: status as "active" | "dead-stop" | "migrated",
        solAmount,
        solStatus: solStatus as "active" | "open",
      });
    }
  });

  return tokens;
}

/**
 * Custom hook for fetching tokens with React Query
 */
export function useTokens() {
  const dispatch = useAppDispatch();
  const { tokens, isLoading: storeLoading } = useAppSelector((state) => state.tokens);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tokens"],
    queryFn: async (): Promise<Token[]> => {
      // Simulate API delay with progressive loading
      await new Promise((resolve) => setTimeout(resolve, 800));
      const tokens = generateMockTokens();
      // Simulate progressive loading
      await new Promise((resolve) => setTimeout(resolve, 200));
      return tokens;
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (data) {
      dispatch(setTokens(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setError(error.message));
    }
  }, [error, dispatch]);

  return {
    tokens,
    isLoading: isLoading || storeLoading,
    error: error?.message || null,
    refetch,
  };
}

