"use client";

import React, { memo, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { TokenColumn } from "./TokenColumn";
import { ErrorDisplay } from "@/components/error/ErrorDisplay";
import { Settings } from "lucide-react";
import type { Token, TokenCategory } from "@/types";
import { cn } from "@/lib/utils";

type ViewMode = "grid-small" | "grid-large" | "list";

interface TokenTableProps {
  onTokenClick?: (token: Token) => void;
  onAddToWallet?: (token: Token) => void;
  viewMode?: ViewMode;
}

/**
 * Main token discovery table component with three-column layout (desktop) and tabs (mobile)
 */
export const TokenTable = memo(function TokenTable({ onTokenClick, onAddToWallet, viewMode = "list" }: TokenTableProps) {
  const { tokens, isLoading, error } = useAppSelector((state) => state.tokens);
  const [activeTab, setActiveTab] = useState<TokenCategory | "all">("new-pairs");

  if (error) {
    return (
      <div className="p-8">
        <ErrorDisplay message={error} />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Mobile Tab Navigation */}
      <div className="md:hidden bg-[#25252b] border-b border-[#2a2a30] px-2 py-2">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          {(["new-pairs", "final-stretch", "migrated"] as TokenCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
                activeTab === category
                  ? "bg-blue-500 text-white"
                  : "bg-[#1f1f24] text-gray-400 hover:text-white"
              )}
            >
              {category === "new-pairs" ? "Pairs" : category === "final-stretch" ? "Final Stretch" : "Migrated"}
            </button>
          ))}
          <button className="px-4 py-2 rounded-md text-sm font-medium bg-[#1f1f24] text-gray-400 hover:text-white flex items-center space-x-1">
            <span>P1</span>
            <Settings className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Desktop: Three Column Layout */}
      <div 
        className="hidden md:flex gap-4 p-4 h-full"
      >
        <TokenColumn
          category="new-pairs"
          tokens={tokens}
          isLoading={isLoading}
          onTokenClick={onTokenClick}
          onAddToWallet={onAddToWallet}
          viewMode={viewMode}
        />
        <TokenColumn
          category="final-stretch"
          tokens={tokens}
          isLoading={isLoading}
          onTokenClick={onTokenClick}
          onAddToWallet={onAddToWallet}
          viewMode={viewMode}
        />
        <TokenColumn
          category="migrated"
          tokens={tokens}
          isLoading={isLoading}
          onTokenClick={onTokenClick}
          onAddToWallet={onAddToWallet}
          viewMode={viewMode}
        />
      </div>

      {/* Mobile: Single Column with Active Tab */}
      <div className="md:hidden flex-1 min-h-0 pb-20 overflow-hidden">
        <TokenColumn
          category={activeTab as TokenCategory}
          tokens={tokens}
          isLoading={isLoading}
          onTokenClick={onTokenClick}
          onAddToWallet={onAddToWallet}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
});

