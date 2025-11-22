"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VolumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VolumeModal({ open, onOpenChange }: VolumeModalProps) {
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#25252b] border-[#2a2a30] text-white max-w-sm">
        <DialogHeader>
          <DialogTitle>Audio Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Sound Effects</span>
            <button
              onClick={() => setMuted(!muted)}
              className={cn(
                "p-2 rounded transition-colors",
                muted ? "text-gray-400" : "text-blue-500"
              )}
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Volume: {volume}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={muted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                setMuted(false);
              }}
              className="w-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

