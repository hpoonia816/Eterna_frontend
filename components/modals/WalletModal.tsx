"use client";

import React, { useState } from "react";
import { X, Trash2, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { Token } from "@/types";

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletTokens: Token[];
  onRemoveToken: (tokenId: string) => void;
}

export function WalletModal({ open, onOpenChange, walletTokens, onRemoveToken }: WalletModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#25252b] border-[#2a2a30] text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">My Wallet</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {walletTokens.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>No tokens in wallet</p>
              <p className="text-sm mt-2">Add tokens from the token list to track them here</p>
            </div>
          ) : (
            <div className="space-y-2">
              {walletTokens.map((token) => (
                <div
                  key={token.id}
                  className="bg-[#1f1f24] rounded-lg p-4 border border-[#2a2a30] hover:border-[#3a3a40] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        {token.symbol.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">{token.name}</div>
                        <div className="text-gray-400 text-xs truncate">{token.symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm font-medium">{formatCurrency(token.price)}</div>
                        <div className="text-gray-400 text-xs">
                          MC: {formatNumber(token.marketCap / 1000, 2, true)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <a
                        href={`https://solscan.io/token/${token.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => onRemoveToken(token.id)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

