"use client";

import React from "react";
import { Flame, TrendingUp, Zap, RefreshCw, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

/**
 * Bottom navigation bar for mobile view
 */
export function MobileNav({ activeTab = "pulse", onTabChange }: MobileNavProps) {
  const tabs = [
    { id: "trending", label: "Trending", icon: Flame },
    { id: "track", label: "Track", icon: TrendingUp },
    { id: "pulse", label: "Pulse", icon: Zap },
    { id: "perpetuals", label: "Perpetuals", icon: RefreshCw },
    { id: "account", label: "Account", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a1f] border-t border-[#2a2a30] z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 transition-colors",
                isActive ? "text-blue-500" : "text-gray-400"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-blue-500")} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="text-center py-1 text-xs text-gray-500 border-t border-[#2a2a30]">
        Install WebApp
      </div>
    </nav>
  );
}

