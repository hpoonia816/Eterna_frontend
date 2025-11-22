"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#25252b] border-[#2a2a30] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Help & Documentation</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4 text-sm text-gray-300">
          <div>
            <h3 className="text-white font-semibold mb-2">Getting Started</h3>
            <p>Welcome to Eterna Pulse! Use the search bar to find tokens, or browse through the columns.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Hotkeys</h3>
            <p>Configure hotkeys in Settings to quickly buy tokens using keyboard shortcuts.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Wallet</h3>
            <p>Add tokens to your wallet to track them easily. Click the SOL button on any token card.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

