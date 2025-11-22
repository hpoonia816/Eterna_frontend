"use client";

import React, { useState } from "react";
import { 
  Menu, 
  Box, 
  HelpCircle, 
  List, 
  Folder, 
  Grid, 
  Volume2, 
  Settings, 
  Search,
  BarChart3,
  Equal,
  ChevronDown,
  Copy,
  Target
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onDisplayClick?: () => void;
  onHotkeysClick?: () => void;
  onSnipeClick?: () => void;
  onSearchClick?: () => void;
  onHelpClick?: () => void;
  onFolderClick?: () => void;
  onGridClick?: () => void;
  onVolumeClick?: () => void;
  onFilterClick?: () => void;
}

/**
 * Top navigation header matching Axiom Trade design - Responsive
 */
export function Header({ 
  onDisplayClick, 
  onHotkeysClick, 
  onSnipeClick, 
  onSearchClick,
  onHelpClick,
  onFolderClick,
  onGridClick,
  onVolumeClick,
  onFilterClick,
}: HeaderProps) {
  const [pasteCADialogOpen, setPasteCADialogOpen] = useState(false);
  const [contractAddress, setContractAddress] = useState("");

  const handlePasteCA = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setContractAddress(text);
      setPasteCADialogOpen(true);
    } catch (err) {
      setPasteCADialogOpen(true);
    }
  };

  const handlePasteCASubmit = () => {
    // Handle contract address submission
    console.log("Contract address:", contractAddress);
    setPasteCADialogOpen(false);
    setContractAddress("");
  };

  return (
    <>
      <header className="bg-[#1a1a1f] border-b border-[#2a2a30] px-2 sm:px-4 py-2 sm:py-3">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left: Logo and Icons */}
          <div className="flex items-center space-x-4">
            <h1 className="text-white text-lg font-semibold">Eterna</h1>
            <div className="flex items-center space-x-2">
              <Menu 
                className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
                onClick={onFilterClick}
              />
              <Box className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Right: Icons and Controls */}
          <div className="flex items-center space-x-3">
            <HelpCircle 
              className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
              onClick={onHelpClick}
            />
            <div 
              className="flex items-center space-x-1 text-gray-400 hover:text-white cursor-pointer"
              onClick={onDisplayClick}
            >
              <List className="h-4 w-4" />
              <span className="text-xs">Display</span>
            </div>
            <Folder 
              className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
              onClick={onFolderClick}
            />
            <Grid 
              className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
              onClick={onGridClick}
            />
            <Volume2 
              className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
              onClick={onVolumeClick}
            />
            <Settings 
              className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
              onClick={onSnipeClick}
            />
            <div className="flex items-center space-x-1 text-gray-400 cursor-pointer hover:text-white">
              <span className="text-xs">1</span>
              <List className="h-4 w-4" />
            </div>
            <Search 
              className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
              onClick={onSearchClick}
            />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between">
          {/* Left: Icons */}
          <div className="flex items-center space-x-2">
            <Menu 
              className="h-5 w-5 text-gray-400 cursor-pointer"
              onClick={onFilterClick}
            />
            <BarChart3 className="h-4 w-4 text-gray-400" />
            <Equal className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-400">0</span>
            <div className="h-3 w-3 rounded-full bg-green-500 flex items-center justify-center">
              <ChevronDown className="h-2 w-2 text-white" />
            </div>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>

          {/* Right: Paste CA and Search */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePasteCA}
              className="px-2 py-1 bg-[#25252b] border border-[#2a2a30] rounded text-xs text-white hover:bg-[#2a2a30] flex items-center space-x-1"
            >
              <Copy className="h-3 w-3" />
              <span>Paste CA</span>
            </button>
            <Search 
              className="h-5 w-5 text-gray-400"
              onClick={onSearchClick}
            />
            <Menu className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </header>

      {/* Paste CA Dialog */}
      <Dialog open={pasteCADialogOpen} onOpenChange={setPasteCADialogOpen}>
        <DialogContent className="bg-[#25252b] border-[#2a2a30] text-white">
          <DialogHeader>
            <DialogTitle>Paste Contract Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Enter contract address..."
              className="bg-[#1f1f24] border-[#2a2a30] text-white"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setPasteCADialogOpen(false)}
                className="bg-[#1f1f24] border-[#2a2a30] text-white hover:bg-[#2a2a30]"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePasteCASubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

