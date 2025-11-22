"use client";

import React, { useState, useMemo } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import type { Token } from "@/types";

interface SearchBarProps {
  tokens: Token[];
  onTokenSelect?: (token: Token) => void;
  visible?: boolean;
}

export function SearchBar({ tokens, onTokenSelect, visible = true }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredTokens = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return tokens
      .filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query) ||
          token.address.toLowerCase().includes(query)
      )
      .slice(0, 10);
  }, [searchQuery, tokens]);

  if (!visible) return null;

  return (
    <div className="relative">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by token or CA..."
          className="w-full pl-10 pr-10 py-2 bg-[#1f1f24] border border-[#2a2a30] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && filteredTokens.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#25252b] border border-[#2a2a30] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {filteredTokens.map((token) => (
            <button
              key={token.id}
              onClick={() => {
                onTokenSelect?.(token);
                setSearchQuery("");
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-[#1f1f24] transition-colors text-left"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {token.symbol.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{token.name}</div>
                <div className="text-gray-400 text-xs truncate">{token.symbol}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-white text-sm">{formatCurrency(token.price)}</div>
                <div className="text-gray-400 text-xs">{token.category}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

