"use client";

import React, { memo, useState, useEffect } from "react";
import { 
  Send, 
  Link2, 
  Search, 
  User, 
  Trophy, 
  Crown, 
  Zap,
  ExternalLink,
  Box,
  Target
} from "lucide-react";
import { formatCurrency, formatNumber, formatPercentage, getPriceChangeColor, truncateAddress } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Token } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ViewMode = "grid-small" | "grid-large" | "list";

interface TokenCardProps {
  token: Token;
  onTokenClick?: (token: Token) => void;
  onAddToWallet?: (token: Token) => void;
  viewMode?: ViewMode;
}

/**
 * Format time ago (e.g., "6s", "9s", "1m", "2h")
 */
function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  return `${months}mo`;
}

/**
 * Get status text (DS for Dead Stop, or time period)
 */
function getStatusText(token: Token): string {
  if (token.status === "dead-stop") return "DS";
  if (token.createdAt) {
    const age = Date.now() - token.createdAt;
    const months = Math.floor(age / (1000 * 60 * 60 * 24 * 30));
    if (months > 0) return `${months}mo`;
    const days = Math.floor(age / (1000 * 60 * 60 * 24));
    if (days > 0) return `${days}d`;
    const hours = Math.floor(age / (1000 * 60 * 60));
    if (hours > 0) return `${hours}h`;
    const minutes = Math.floor(age / (1000 * 60));
    if (minutes > 0) return `${minutes}m`;
  }
  return "";
}

/**
 * Individual token card component matching Axiom Trade design
 */
export const TokenCard = memo(function TokenCard({ token, onTokenClick, onAddToWallet, viewMode = "list" }: TokenCardProps) {
  const [timeAgo, setTimeAgo] = useState(formatTimeAgo(token.createdAt));
  const [priceAnimation, setPriceAnimation] = useState<"up" | "down" | null>(null);
  const [prevPrice, setPrevPrice] = useState(token.price);

  // Update time ago every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(token.createdAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [token.createdAt]);

  // Price animation
  useEffect(() => {
    if (token.price !== prevPrice && prevPrice > 0) {
      setPriceAnimation(token.price > prevPrice ? "up" : "down");
      setPrevPrice(token.price);
      setTimeout(() => setPriceAnimation(null), 1000);
    }
  }, [token.price, prevPrice]);

  const priceColorClass = getPriceChangeColor(token.priceChange24h);
  const statusText = getStatusText(token);

  const isGrid = viewMode === "grid-small" || viewMode === "grid-large";
  
  return (
    <div
      className={cn(
        "bg-[#25252b] hover:border-blue-500 transition-colors cursor-pointer border border-[#2a2a30]",
        isGrid ? "p-2 rounded-lg" : "p-2 sm:p-3 mb-2 rounded-none"
      )}
      onClick={() => onTokenClick?.(token)}
    >
      {/* Header: Image, Name, Time, Icons */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          {/* Token Image */}
          <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm overflow-hidden">
            {token.imageUrl ? (
              <img src={token.imageUrl} alt={token.symbol} className="w-full h-full object-cover" />
            ) : (
              token.symbol.charAt(0)
            )}
          </div>

          {/* Token Name */}
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm sm:text-base font-medium truncate">{token.name}</div>
            <div className="text-gray-400 text-xs truncate">
              <span className="sm:hidden">{token.symbol}...</span>
              <span className="hidden sm:inline">{token.symbol}</span>
            </div>
            {/* Contract Address - Mobile */}
            <div className="sm:hidden text-gray-400 text-xs mt-0.5 font-mono">
              {truncateAddress(token.address, 4, 4)}
            </div>
          </div>
        </div>

        {/* Time and Icons */}
        <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
          <span className="text-gray-400 text-xs">{timeAgo}</span>
          <div className="hidden sm:flex items-center space-x-1 ml-2">
            <Send className="h-3 w-3 text-gray-400 hover:text-white" />
            <Link2 className="h-3 w-3 text-gray-400 hover:text-white" />
            <Search className="h-3 w-3 text-gray-400 hover:text-white" />
            <User className="h-3 w-3 text-gray-400 hover:text-white" />
            <Trophy className="h-3 w-3 text-gray-400 hover:text-white" />
            <Crown className="h-3 w-3 text-gray-400 hover:text-white" />
          </div>
        </div>
      </div>

      {/* Mobile: Additional Icons Row */}
      <div className="sm:hidden flex items-center space-x-2 mb-2 text-xs">
        <div className="flex items-center space-x-1">
          <Send className="h-3 w-3 text-gray-400" />
          <Link2 className="h-3 w-3 text-gray-400" />
          <Search className="h-3 w-3 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>{Math.floor(Math.random() * 100)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Box className="h-3 w-3" />
            <span>{Math.floor(Math.random() * 100)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Trophy className="h-3 w-3" />
            <span>0</span>
          </div>
          <div className="flex items-center space-x-1">
            <Crown className="h-3 w-3" />
            <span>0/{Math.floor(Math.random() * 2000)}</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
        <div>
          <span className="text-green-500">MC</span>
          <span className="text-white ml-1">${formatNumber(token.marketCap / 1000, 2, true)}</span>
        </div>
        <div>
          <span className="text-green-500">V</span>
          <span className="text-white ml-1">${formatNumber(token.volume24h, 0, true)}</span>
        </div>
        <div>
          <span className="text-gray-400">F</span>
          <span className="text-white ml-1">{token.fee?.toFixed(3) || "0.000"}</span>
          <span className="text-gray-400 ml-1">TX</span>
          <span className="text-white ml-1">{token.transactions || 0}</span>
        </div>
      </div>

      {/* Percentage Changes Row */}
      <div className="flex items-center space-x-1 mb-2 text-xs flex-wrap gap-1">
        <div className={cn(
          "flex items-center space-x-0.5",
          token.priceChange24h > 0 ? "text-green-500" : token.priceChange24h < 0 ? "text-red-500" : "text-gray-400"
        )}>
          <User className="h-3 w-3" />
          <span>{Math.abs(token.priceChange24h).toFixed(0)}%</span>
        </div>
        <div className={cn(
          "flex items-center space-x-0.5",
          token.priceChange1h !== undefined && token.priceChange1h > 0 ? "text-green-500" : 
          token.priceChange1h !== undefined && token.priceChange1h < 0 ? "text-red-500" : "text-gray-400"
        )}>
          <span className="text-xs">🌿</span>
          <span>{token.priceChange1h !== undefined ? Math.abs(token.priceChange1h).toFixed(0) + "%" : "0%"}</span>
          {statusText && <span className="text-gray-400 ml-1">{statusText}</span>}
        </div>
        <div className={cn(
          "flex items-center space-x-0.5",
          token.priceChange1d !== undefined && token.priceChange1d > 0 ? "text-green-500" : 
          token.priceChange1d !== undefined && token.priceChange1d < 0 ? "text-red-500" : "text-gray-400"
        )}>
          <Target className="h-3 w-3" />
          <span>{token.priceChange1d !== undefined ? Math.abs(token.priceChange1d).toFixed(0) + "%" : "0%"}</span>
        </div>
        <div className={cn(
          "flex items-center space-x-0.5",
          token.priceChange1w !== undefined && token.priceChange1w > 0 ? "text-green-500" : 
          token.priceChange1w !== undefined && token.priceChange1w < 0 ? "text-red-500" : "text-gray-400"
        )}>
          <User className="h-3 w-3" />
          <span>{token.priceChange1w !== undefined ? Math.abs(token.priceChange1w).toFixed(0) + "%" : "0%"}</span>
        </div>
        <div className={cn(
          "flex items-center space-x-0.5",
          token.priceChange1m !== undefined && token.priceChange1m > 0 ? "text-green-500" : 
          token.priceChange1m !== undefined && token.priceChange1m < 0 ? "text-red-500" : "text-gray-400"
        )}>
          <span className="text-xs">🎁</span>
          <span>{token.priceChange1m !== undefined ? Math.abs(token.priceChange1m).toFixed(0) + "%" : "0%"}</span>
        </div>
      </div>

      {/* SOL Button */}
      <div className="flex justify-end mt-2">
        <Dialog>
          <DialogTrigger asChild>
            <button
              className={cn(
                "flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs font-medium text-white transition-colors",
                token.solStatus === "open" ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-500 hover:bg-blue-600"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onAddToWallet?.(token);
              }}
            >
              {token.solStatus === "open" ? (
                <span className="h-2 w-2 rounded-full bg-white"></span>
              ) : (
                <Zap className="h-3 w-3" />
              )}
              <span>{token.solAmount || 0} SOL</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#25252b] border-[#2a2a30] text-white max-w-md" onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {token.symbol.charAt(0)}
                </div>
                <div>
                  <div>{token.name}</div>
                  <div className="text-sm font-normal text-gray-400">({token.symbol})</div>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Market Cap</p>
                  <p className="text-white font-medium">{formatCurrency(token.marketCap)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Volume 24h</p>
                  <p className="text-white font-medium">{formatCurrency(token.volume24h)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Price</p>
                  <p className="text-white font-medium">{formatCurrency(token.price)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">24h Change</p>
                  <p className={cn("font-medium", priceColorClass)}>
                    {formatPercentage(token.priceChange24h)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 mb-1 text-xs">Address</p>
                <p className="text-white font-mono text-xs bg-[#1f1f24] p-2 rounded border border-[#2a2a30]">
                  {truncateAddress(token.address)}
                </p>
              </div>
              <a
                href={`https://solscan.io/token/${token.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-blue-400 hover:text-blue-300 p-2 rounded-md hover:bg-[#1f1f24] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">View on Solscan</span>
              </a>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
});

