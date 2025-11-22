import React, { memo, useState } from "react";
import { ExternalLink, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatCurrency, formatPercentage, formatNumber, getPriceChangeColor, truncateAddress } from "@/lib/utils";
import type { Token } from "@/types";
import { cn } from "@/lib/utils";

interface TokenRowProps {
  token: Token;
  onTokenClick?: (token: Token) => void;
}

// Memo comparison function for TokenRow
const areEqual = (prevProps: TokenRowProps, nextProps: TokenRowProps) => {
  return (
    prevProps.token.id === nextProps.token.id &&
    prevProps.token.price === nextProps.token.price &&
    prevProps.token.priceChange24h === nextProps.token.priceChange24h &&
    prevProps.token.lastUpdated === nextProps.token.lastUpdated &&
    prevProps.onTokenClick === nextProps.onTokenClick
  );
};

/**
 * Individual token row component with interactive elements
 */
export const TokenRow = memo(function TokenRow({ token, onTokenClick }: TokenRowProps) {
  const [priceAnimation, setPriceAnimation] = useState<"up" | "down" | null>(null);
  const [prevPrice, setPrevPrice] = useState(token.price);
  const priceRef = React.useRef(token.price);

  // Update price animation when price updates
  React.useEffect(() => {
    if (token.price !== prevPrice && prevPrice > 0) {
      const isIncreasing = token.price > prevPrice;
      setPriceAnimation(isIncreasing ? "up" : "down");
      priceRef.current = token.price;
      setPrevPrice(token.price);

      // Reset animation after transition
      const timeout = setTimeout(() => {
        setPriceAnimation(null);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (prevPrice === 0) {
      setPrevPrice(token.price);
      priceRef.current = token.price;
    }
  }, [token.price, prevPrice]);

  const priceColorClass = getPriceChangeColor(token.priceChange24h);
  const isPriceIncreasing = priceAnimation === "up";

  return (
    <tr
      className={cn(
        "border-b border-gray-200 hover:bg-gray-50/50 transition-all duration-150 cursor-pointer",
        "group relative",
        "hover:shadow-sm"
      )}
      onClick={() => onTokenClick?.(token)}
    >
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:shadow-md transition-shadow duration-150">
            {token.symbol.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-semibold text-gray-900 group-hover:text-gray-950 transition-colors">
              {token.symbol}
            </div>
            <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
              {token.name}
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-1">
                <span
                  className={cn(
                    "text-sm font-medium transition-all duration-300",
                    priceColorClass,
                    priceAnimation === "up" && "price-increase",
                    priceAnimation === "down" && "price-decrease"
                  )}
                >
                  {formatCurrency(token.price)}
                </span>
                {priceAnimation === "up" && (
                  <span className="text-green-500 text-xs animate-fade-in">↑</span>
                )}
                {priceAnimation === "down" && (
                  <span className="text-red-500 text-xs animate-fade-in">↓</span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-medium">Price: {formatCurrency(token.price)}</p>
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date(token.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <span className={cn("text-sm font-medium", priceColorClass)}>
          {formatPercentage(token.priceChange24h)}
        </span>
      </td>

      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        <Popover>
          <PopoverTrigger asChild>
            <button className="hover:text-gray-700 underline decoration-dotted decoration-gray-400 hover:decoration-gray-600 transition-colors duration-150">
              {formatNumber(token.volume24h, 2, true)}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">24h Volume Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Volume:</span>
                  <span className="font-medium">{formatCurrency(token.volume24h)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Liquidity:</span>
                  <span className="font-medium">{formatCurrency(token.liquidity)}</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </td>

      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatCurrency(token.liquidity)}
      </td>

      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatCurrency(token.marketCap)}
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <button 
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <Info className="h-4 w-4" />
                <span className="text-sm font-medium">View</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md" onClick={(e) => e.stopPropagation()}>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <div>{token.name}</div>
                    <div className="text-sm font-normal text-gray-500">({token.symbol})</div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Address</p>
                  <p className="text-sm font-mono bg-gray-50 p-2 rounded border">{truncateAddress(token.address)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Price</p>
                    <p className="text-lg font-semibold">{formatCurrency(token.price)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">24h Change</p>
                    <p className={cn("text-lg font-semibold", priceColorClass)}>
                      {formatPercentage(token.priceChange24h)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Volume</p>
                    <p className="text-sm font-medium">{formatCurrency(token.volume24h)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Market Cap</p>
                    <p className="text-sm font-medium">{formatCurrency(token.marketCap)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Liquidity</p>
                  <p className="text-sm font-medium">{formatCurrency(token.liquidity)}</p>
                </div>
                <a
                  href={`https://solscan.io/token/${token.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-sm font-medium">View on Solscan</span>
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </td>
    </tr>
  );
}, areEqual);

