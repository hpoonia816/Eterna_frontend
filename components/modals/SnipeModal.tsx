"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SnipeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SnipeModal({ open, onOpenChange }: SnipeModalProps) {
  const [autoSnipe, setAutoSnipe] = useState(false);
  const [snipeDelay, setSnipeDelay] = useState(0);
  const [maxSlippage, setMaxSlippage] = useState(5);
  const [gasPrice, setGasPrice] = useState("standard");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#25252b] border-[#2a2a30] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Snipe Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-sm font-medium text-white">Auto Snipe</div>
              <div className="text-xs text-gray-400 mt-1">Automatically snipe new tokens</div>
            </div>
            <button
              onClick={() => setAutoSnipe(!autoSnipe)}
              className={cn(
                "w-10 h-5 rounded-full transition-colors relative",
                autoSnipe ? "bg-blue-500" : "bg-[#2a2a30]"
              )}
            >
              <div
                className={cn(
                  "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                  autoSnipe ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </label>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Snipe Delay (ms)</label>
            <input
              type="number"
              value={snipeDelay}
              onChange={(e) => setSnipeDelay(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#1f1f24] border border-[#2a2a30] rounded text-white focus:outline-none focus:border-blue-500"
              min="0"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Max Slippage (%)</label>
            <input
              type="number"
              value={maxSlippage}
              onChange={(e) => setMaxSlippage(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#1f1f24] border border-[#2a2a30] rounded text-white focus:outline-none focus:border-blue-500"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Gas Price</label>
            <div className="flex gap-2">
              {["slow", "standard", "fast"].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setGasPrice(speed)}
                  className={cn(
                    "flex-1 px-3 py-2 rounded text-sm font-medium transition-colors capitalize",
                    gasPrice === speed
                      ? "bg-blue-500 text-white"
                      : "bg-[#1f1f24] text-gray-400 border border-[#2a2a30] hover:border-[#3a3a40]"
                  )}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#2a2a30]">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

