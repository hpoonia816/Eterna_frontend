"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Grid3x3, Grid2x2, List } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "grid-small" | "grid-large" | "list";

interface GridModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function GridModal({ open, onOpenChange, viewMode, onViewModeChange }: GridModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#25252b] border-[#2a2a30] text-white max-w-sm">
        <DialogHeader>
          <DialogTitle>View Mode</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          <button
            onClick={() => {
              onViewModeChange("grid-small");
              onOpenChange(false);
            }}
            className={cn(
              "w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors",
              viewMode === "grid-small"
                ? "bg-blue-500 border-blue-500 text-white"
                : "bg-[#1f1f24] border-[#2a2a30] text-gray-300 hover:border-[#3a3a40]"
            )}
          >
            <Grid3x3 className="h-5 w-5" />
            <span>Small Grid</span>
          </button>
          <button
            onClick={() => {
              onViewModeChange("grid-large");
              onOpenChange(false);
            }}
            className={cn(
              "w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors",
              viewMode === "grid-large"
                ? "bg-blue-500 border-blue-500 text-white"
                : "bg-[#1f1f24] border-[#2a2a30] text-gray-300 hover:border-[#3a3a40]"
            )}
          >
            <Grid2x2 className="h-5 w-5" />
            <span>Large Grid</span>
          </button>
          <button
            onClick={() => {
              onViewModeChange("list");
              onOpenChange(false);
            }}
            className={cn(
              "w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors",
              viewMode === "list"
                ? "bg-blue-500 border-blue-500 text-white"
                : "bg-[#1f1f24] border-[#2a2a30] text-gray-300 hover:border-[#3a3a40]"
            )}
          >
            <List className="h-5 w-5" />
            <span>List View</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

