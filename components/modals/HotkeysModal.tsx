"use client";

import React, { useState } from "react";
import { X, RotateCcw, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HotkeysModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ModifierKey = "shift" | "ctrl" | "alt" | "win";

export function HotkeysModal({ open, onOpenChange }: HotkeysModalProps) {
  const [hotkeysEnabled, setHotkeysEnabled] = useState(true);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [pauseKey, setPauseKey] = useState("Space");
  const [modifierKeys, setModifierKeys] = useState<Record<string, ModifierKey>>({
    "new-pairs": "shift",
    "final-stretch": "ctrl",
    "migrated": "alt",
  });
  const [rowKeys, setRowKeys] = useState({ row1: "1", row2: "2", row3: "3" });

  const handleModifierKeyChange = (category: string, key: ModifierKey) => {
    setModifierKeys((prev) => ({ ...prev, [category]: key }));
  };

  const handleReset = () => {
    setHotkeysEnabled(true);
    setPauseOnHover(true);
    setPauseKey("Space");
    setModifierKeys({
      "new-pairs": "shift",
      "final-stretch": "ctrl",
      "migrated": "alt",
    });
    setRowKeys({ row1: "1", row2: "2", row3: "3" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#25252b] border-[#2a2a30] text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Pulse Hotkeys</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* General Hotkey Settings */}
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-sm font-medium text-white">Hotkeys</div>
                <div className="text-xs text-gray-400 mt-1">Quick buy tokens with custom hotkeys</div>
              </div>
              <button
                onClick={() => setHotkeysEnabled(!hotkeysEnabled)}
                className={cn(
                  "w-10 h-5 rounded-full transition-colors relative",
                  hotkeysEnabled ? "bg-blue-500" : "bg-[#2a2a30]"
                )}
              >
                <div
                  className={cn(
                    "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                    hotkeysEnabled ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-sm font-medium text-white">Pause live feed on Hover</div>
              </div>
              <button
                onClick={() => setPauseOnHover(!pauseOnHover)}
                className={cn(
                  "w-10 h-5 rounded-full transition-colors relative",
                  pauseOnHover ? "bg-blue-500" : "bg-[#2a2a30]"
                )}
              >
                <div
                  className={cn(
                    "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                    pauseOnHover ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </label>

            <div className="flex items-center space-x-2 text-xs text-gray-400 bg-[#1f1f24] p-2 rounded">
              <Info className="h-4 w-4" />
              <span>Combine the Pause + Modifier + Row keys to buy tokens</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Pause Key</span>
              <button className="px-4 py-2 bg-[#1f1f24] border border-[#2a2a30] rounded text-sm text-white hover:border-blue-500">
                {pauseKey}
              </button>
            </div>
          </div>

          {/* Table Modifier Keys */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Table Modifier Keys</h3>
            <div className="space-y-3">
              {[
                { label: "New Pairs", key: "new-pairs" },
                { label: "Final Stretch", key: "final-stretch" },
                { label: "Migrated", key: "migrated" },
              ].map(({ label, key }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{label}</span>
                  <div className="flex gap-2">
                    {(["shift", "ctrl", "alt", "win"] as ModifierKey[]).map((modKey) => (
                      <button
                        key={modKey}
                        onClick={() => handleModifierKeyChange(key, modKey)}
                        className={cn(
                          "px-3 py-1 rounded text-xs font-medium transition-colors capitalize",
                          modifierKeys[key] === modKey
                            ? "bg-blue-500 text-white"
                            : "bg-[#1f1f24] text-gray-400 border border-[#2a2a30] hover:border-[#3a3a40]"
                        )}
                      >
                        {modKey === "win" ? "Win" : modKey}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row Keys */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Row Keys</h3>
            <div className="space-y-2">
              {[1, 2, 3].map((rowNum) => (
                <div key={rowNum} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Row {rowNum}</span>
                  <button className="px-4 py-2 bg-[#1f1f24] border border-[#2a2a30] rounded text-sm text-white hover:border-blue-500">
                    {rowKeys[`row${rowNum}` as keyof typeof rowKeys]}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#2a2a30]">
            <Button
              onClick={handleReset}
              variant="outline"
              className="bg-[#1f1f24] border-[#2a2a30] text-white hover:bg-[#2a2a30] flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

