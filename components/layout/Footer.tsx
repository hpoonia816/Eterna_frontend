"use client";

import React from "react";
import { List, Folder, Bell, X, Globe } from "lucide-react";

interface FooterProps {
  onWalletClick?: () => void;
}

/**
 * Bottom status bar matching Axiom Trade design
 */
export function Footer({ onWalletClick }: FooterProps) {
  return (
    <footer className="hidden md:flex bg-[#1a1a1f] border-t border-[#2a2a30] px-4 py-2 items-center justify-between fixed bottom-0 left-0 right-0 z-50">
      {/* Left */}
      <div className="flex items-center space-x-3">
        <button className="text-white text-xs px-2 py-1 bg-[#25252b] rounded hover:bg-[#2a2a30]">
          PRESET 1
        </button>
        <div className="flex items-center space-x-1 text-gray-400">
          <span className="text-xs">1</span>
          <List className="h-3 w-3" />
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <span className="text-xs">0</span>
          <List className="h-3 w-3" />
        </div>
      </div>

      {/* Middle: Navigation */}
      <div className="flex items-center space-x-4 text-gray-400">
        <span 
          className="text-xs hover:text-white cursor-pointer"
          onClick={onWalletClick}
        >
          Wallet
        </span>
        <span className="text-xs hover:text-white cursor-pointer">Twitter</span>
        <span className="text-xs hover:text-white cursor-pointer">Discover</span>
        <span className="text-xs hover:text-white cursor-pointer">Pulse</span>
        <span className="text-xs hover:text-white cursor-pointer">PnL</span>
      </div>

      {/* Right: Stats and Controls */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 text-white text-xs">
          <span>$83.1K</span>
          <span>$2708</span>
          <span>$124.75</span>
          <span>$51.3K</span>
          <span>0.0222</span>
          <span>0.003</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-400 text-xs">Connection is stable</span>
          <div className="flex items-center space-x-1 text-gray-400">
            <Globe className="h-3 w-3" />
            <span className="text-xs">GLOBAL</span>
          </div>
          <Folder className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
          <Bell className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
          <X className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}

