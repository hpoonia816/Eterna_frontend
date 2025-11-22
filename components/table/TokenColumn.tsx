"use client";

import React, { memo, useMemo, useRef, useEffect } from "react";
import { TokenCard } from "./TokenCard";
import type { Token, TokenCategory } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type ViewMode = "grid-small" | "grid-large" | "list";

interface TokenColumnProps {
  category: TokenCategory;
  tokens: Token[];
  isLoading?: boolean;
  onTokenClick?: (token: Token) => void;
  onAddToWallet?: (token: Token) => void;
  viewMode?: ViewMode;
}

/**
 * Column component for displaying tokens in a specific category
 */
export const TokenColumn = memo(function TokenColumn({
  category,
  tokens,
  isLoading = false,
  onTokenClick,
  onAddToWallet,
  viewMode = "list",
}: TokenColumnProps) {
  const categoryInfo = useMemo(() => {
    switch (category) {
      case "new-pairs":
        return { title: "New Pairs", icon: "⚡" };
      case "final-stretch":
        return { title: "Final Stretch", icon: "⚡" };
      case "migrated":
        return { title: "Migrated", icon: "⚡" };
    }
  }, [category]);

  const filteredTokens = useMemo(
    () => tokens.filter((token) => token.category === category),
    [tokens, category]
  );

  const isGrid = viewMode === "grid-small" || viewMode === "grid-large";
  const gridCols = viewMode === "grid-small" ? "grid-cols-2" : "grid-cols-1";
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Ensure each column has its own scroll context
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Prevent scroll synchronization by stopping event propagation
    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    const handleScroll = (e: Event) => {
      e.stopPropagation();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="flex-1 min-w-0 flex flex-col h-full" 
      style={{ 
        overflow: 'hidden'
      }}
    >
      {/* Column Header */}
      <div className="bg-[#25252b] px-4 py-3 rounded-t-lg border-b border-[#2a2a30] flex-shrink-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm font-medium">{categoryInfo.icon}</span>
            <h3 className="text-white text-sm font-semibold">{categoryInfo.title}</h3>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <span>{filteredTokens.length}</span>
            <span className="text-gray-500">P1 P2 P3</span>
          </div>
        </div>
      </div>

      {/* Token Cards - Independently scrollable with smooth scrolling */}
      <div 
        ref={scrollContainerRef}
        className="bg-[#1f1f24] rounded-b-lg scrollbar-thin p-2 flex-1 overflow-y-auto overflow-x-hidden"
        style={{ 
          minHeight: 0,
          scrollBehavior: 'smooth', 
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}
      >
        {isLoading ? (
          <div className={cn(isGrid && "grid gap-2", gridCols)}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={cn("bg-[#25252b] rounded-lg p-3 space-y-2", !isGrid && "mb-2")}>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-12 w-12 rounded-full bg-[#2a2a30]" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32 bg-[#2a2a30]" />
                    <Skeleton className="h-3 w-24 bg-[#2a2a30]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredTokens.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            No tokens in this category
          </div>
        ) : (
          <div className={cn(isGrid && "grid gap-2", gridCols)}>
            {filteredTokens.map((token) => (
              <TokenCard 
                key={token.id} 
                token={token} 
                onTokenClick={onTokenClick}
                onAddToWallet={onAddToWallet}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

