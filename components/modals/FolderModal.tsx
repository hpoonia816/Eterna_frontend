"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderPlus, FolderOpen, Trash2 } from "lucide-react";

interface FolderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FolderModal({ open, onOpenChange }: FolderModalProps) {
  const [folders] = useState(["My Favorites", "Watchlist", "Recent"]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#25252b] border-[#2a2a30] text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Folders</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          {folders.map((folder) => (
            <div
              key={folder}
              className="flex items-center justify-between p-3 bg-[#1f1f24] rounded-lg border border-[#2a2a30] hover:border-[#3a3a40] transition-colors"
            >
              <div className="flex items-center space-x-2">
                <FolderOpen className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-white">{folder}</span>
              </div>
              <button className="text-red-400 hover:text-red-300">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center space-x-2">
            <FolderPlus className="h-4 w-4" />
            <span>Create New Folder</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

