"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { TokenCategory } from "@/types";

interface FiltersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab?: TokenCategory;
  onTabChange?: (tab: TokenCategory) => void;
  onApplyFilters?: (filters: FilterState) => void;
}

interface FilterState {
  protocols: string[];
  quoteTokens: string[];
  searchKeywords: string;
  excludeKeywords: string;
  dexPaid: boolean;
  caEndsInPump: boolean;
  auditTab: boolean;
  metricsTab: boolean;
  socialsTab: boolean;
}

const protocols = [
  { name: "Pump", color: "green", icon: "🔄" },
  { name: "Bags", color: "green" },
  { name: "Daos.fun", color: "blue" },
  { name: "Believe", color: "green" },
  { name: "Boop", color: "blue" },
  { name: "Mayhem", color: "red", icon: "🔥" },
  { name: "Moonshot", color: "purple", icon: "🌙" },
  { name: "Candle", color: "orange", icon: "🕯️" },
  { name: "Jupiter Studio", color: "rainbow", icon: "🌈" },
  { name: "Moonit", color: "yellow", icon: "⬆️" },
  { name: "Dynamic BC", color: "red", icon: "➡️" },
  { name: "Bonk", color: "orange", icon: "🔥" },
  { name: "Sugar", color: "pink", icon: "🍩" },
  { name: "Raydium", color: "gray" },
  { name: "Meteora AMM", color: "gray" },
  { name: "Pump AMM", color: "gray" },
  { name: "Orca", color: "gray" },
  { name: "LaunchLab", color: "gray" },
  { name: "Meteora AMM V2", color: "gray" },
  { name: "Heaven", color: "gray" },
];

const quoteTokens = [
  { name: "SOL", color: "green", icon: "💎" },
  { name: "USDC", color: "blue", icon: "💵" },
  { name: "USD1", color: "yellow", icon: "1" },
];

export function FiltersModal({ 
  open, 
  onOpenChange, 
  activeTab = "new-pairs",
  onTabChange,
  onApplyFilters 
}: FiltersModalProps) {
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([
    "Pump", "Bags", "Daos.fun", "Believe", "Boop", "Mayhem", 
    "Moonshot", "Candle", "Jupiter Studio", "Moonit", "Dynamic BC", "Bonk", "Sugar"
  ]);
  const [selectedQuoteTokens, setSelectedQuoteTokens] = useState<string[]>(["SOL", "USDC", "USD1"]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [excludeKeywords, setExcludeKeywords] = useState("");
  const [dexPaid, setDexPaid] = useState(false);
  const [caEndsInPump, setCaEndsInPump] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<"audit" | "metrics" | "socials">("audit");

  const handleProtocolToggle = (protocol: string) => {
    setSelectedProtocols(prev =>
      prev.includes(protocol)
        ? prev.filter(p => p !== protocol)
        : [...prev, protocol]
    );
  };

  const handleSelectAllProtocols = () => {
    setSelectedProtocols(protocols.map(p => p.name));
  };

  const handleUnselectAllQuoteTokens = () => {
    setSelectedQuoteTokens([]);
  };

  const handleQuoteTokenToggle = (token: string) => {
    setSelectedQuoteTokens(prev =>
      prev.includes(token)
        ? prev.filter(t => t !== token)
        : [...prev, token]
    );
  };

  const handleApply = () => {
    const filters: FilterState = {
      protocols: selectedProtocols,
      quoteTokens: selectedQuoteTokens,
      searchKeywords,
      excludeKeywords,
      dexPaid,
      caEndsInPump,
      auditTab: activeFilterTab === "audit",
      metricsTab: activeFilterTab === "metrics",
      socialsTab: activeFilterTab === "socials",
    };
    onApplyFilters?.(filters);
    onOpenChange(false);
  };

  const getProtocolColor = (color: string) => {
    const colors: Record<string, string> = {
      green: "bg-green-500 text-white",
      blue: "bg-blue-500 text-white",
      red: "bg-red-500 text-white",
      purple: "bg-purple-500 text-white",
      orange: "bg-orange-500 text-white",
      yellow: "bg-yellow-500 text-white",
      pink: "bg-pink-500 text-white",
      rainbow: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white",
      gray: "bg-gray-600 text-gray-300",
    };
    return colors[color] || "bg-gray-600 text-gray-300";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#25252b] border-[#2a2a30] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white">Filters</DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Tabs */}
          <div className="flex space-x-1 border-b border-[#2a2a30]">
            {(["new-pairs", "final-stretch", "migrated"] as TokenCategory[]).map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange?.(tab)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors border-b-2",
                  activeTab === tab
                    ? "text-white border-blue-500"
                    : "text-gray-400 border-transparent hover:text-gray-300"
                )}
              >
                {tab === "new-pairs" ? "New Pairs" : tab === "final-stretch" ? "Final Stretch" : "Migrated"}
              </button>
            ))}
          </div>

          {/* Protocols Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">Protocols</h3>
              <button
                onClick={handleSelectAllProtocols}
                className="text-xs text-blue-500 hover:text-blue-400"
              >
                Select All
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {protocols.map((protocol) => {
                const isSelected = selectedProtocols.includes(protocol.name);
                return (
                  <button
                    key={protocol.name}
                    onClick={() => handleProtocolToggle(protocol.name)}
                    className={cn(
                      "px-3 py-2 rounded text-xs font-medium transition-colors flex items-center justify-center space-x-1",
                      isSelected
                        ? getProtocolColor(protocol.color)
                        : "bg-[#1f1f24] text-gray-400 border border-[#2a2a30] hover:border-[#3a3a40]"
                    )}
                  >
                    {protocol.icon && <span>{protocol.icon}</span>}
                    <span>{protocol.name}</span>
                    {isSelected && <Check className="h-3 w-3 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quote Tokens Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">Quote Tokens</h3>
              <button
                onClick={handleUnselectAllQuoteTokens}
                className="text-xs text-blue-500 hover:text-blue-400"
              >
                Unselect All
              </button>
            </div>
            <div className="flex gap-2">
              {quoteTokens.map((token) => {
                const isSelected = selectedQuoteTokens.includes(token.name);
                return (
                  <button
                    key={token.name}
                    onClick={() => handleQuoteTokenToggle(token.name)}
                    className={cn(
                      "px-4 py-2 rounded text-sm font-medium transition-colors flex items-center space-x-2",
                      isSelected
                        ? getProtocolColor(token.color)
                        : "bg-[#1f1f24] text-gray-400 border border-[#2a2a30] hover:border-[#3a3a40]"
                    )}
                  >
                    <span>{token.icon}</span>
                    <span>{token.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Keywords Section */}
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Search Keywords</label>
              <Input
                value={searchKeywords}
                onChange={(e) => setSearchKeywords(e.target.value)}
                placeholder="keyword1, keyword2..."
                className="bg-[#1f1f24] border-[#2a2a30] text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Exclude Keywords</label>
              <Input
                value={excludeKeywords}
                onChange={(e) => setExcludeKeywords(e.target.value)}
                placeholder="keyword1, keyword2..."
                className="bg-[#1f1f24] border-[#2a2a30] text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Additional Filters */}
          <div>
            <div className="flex space-x-1 mb-3">
              {(["audit", "metrics", "socials"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilterTab(tab)}
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium transition-colors",
                    activeFilterTab === tab
                      ? "bg-blue-500 text-white"
                      : "bg-[#1f1f24] text-gray-400 border border-[#2a2a30] hover:border-[#3a3a40]"
                  )}
                >
                  {tab === "audit" ? "Audit" : tab === "metrics" ? "$ Metrics" : "Socials"}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dexPaid}
                  onChange={(e) => setDexPaid(e.target.checked)}
                  className="w-4 h-4 rounded border-[#2a2a30] bg-[#1f1f24] text-blue-500"
                />
                <span className="text-sm text-gray-300">Dex Paid</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={caEndsInPump}
                  onChange={(e) => setCaEndsInPump(e.target.checked)}
                  className="w-4 h-4 rounded border-[#2a2a30] bg-[#1f1f24] text-blue-500"
                />
                <span className="text-sm text-gray-300">CA ends in 'pump'</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-[#2a2a30]">
            <Button
              variant="outline"
              className="bg-[#1f1f24] border-[#2a2a30] text-white hover:bg-[#2a2a30]"
            >
              Import
            </Button>
            <Button
              variant="outline"
              className="bg-[#1f1f24] border-[#2a2a30] text-white hover:bg-[#2a2a30]"
            >
              Export
            </Button>
            <Button
              onClick={handleApply}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Apply All
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

