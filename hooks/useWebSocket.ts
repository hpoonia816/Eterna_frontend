import { useEffect, useRef, useCallback } from "react";
import type { WebSocketMessage, PriceUpdate } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updatePrice } from "@/store/slices/tokenSlice";
import { store } from "@/store";

/**
 * Custom hook for WebSocket connection with automatic reconnection
 * Mocks real-time price updates for demonstration
 */
export function useWebSocket(url: string, enabled: boolean = true) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    if (!enabled) return;

    // For demo purposes, we'll simulate WebSocket with setInterval
    // In production, replace with actual WebSocket connection
    if (wsRef.current) {
      return;
    }

    // Mock WebSocket: simulate price updates every 500-1000ms for faster updates
    // In production, this would be a real WebSocket connection
    const updateMultipleTokens = () => {
      // Get current tokens from store at the time of update
      const currentTokens = store.getState().tokens.tokens;
      if (currentTokens.length === 0) return;

      // Update 2-3 random tokens at once for more realistic updates
      const numUpdates = Math.floor(Math.random() * 2) + 2; // 2-3 updates
      for (let i = 0; i < numUpdates; i++) {
        const randomToken = currentTokens[Math.floor(Math.random() * currentTokens.length)];
        if (!randomToken) continue;
        
        // Simulate realistic price changes (±3%)
        const priceVariation = (Math.random() - 0.5) * 0.06; // ±3%
        const newPrice = Math.max(0.000001, randomToken.price * (1 + priceVariation));
        
        // Calculate new 24h change (slight variation)
        const changeVariation = (Math.random() - 0.5) * 1.5; // ±0.75%
        const newPriceChange24h = Math.max(-99, Math.min(99, randomToken.priceChange24h + changeVariation));
        
        const mockUpdate: PriceUpdate = {
          tokenId: randomToken.id,
          price: newPrice,
          priceChange24h: newPriceChange24h,
          timestamp: Date.now(),
        };

        dispatch(updatePrice(mockUpdate));
      }
    };

    // Initial update
    updateMultipleTokens();
    
    // Update every 500-1000ms for faster updates
    const mockInterval = setInterval(updateMultipleTokens, 500 + Math.random() * 500);

    // Store interval ID in ref for cleanup
    (wsRef.current as any) = { close: () => clearInterval(mockInterval) };
  }, [enabled, dispatch]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      if ("close" in wsRef.current) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    reconnectAttempts.current = 0;
  }, []);

  useEffect(() => {
    if (enabled) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, connect, disconnect]);

  return { connect, disconnect };
}

