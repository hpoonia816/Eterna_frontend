"use client";

import React, { useState } from "react";
import { X, Search, Hash, Eye, EyeOff, Square, RefreshCw, Grid, HelpCircle, List } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewMode = "grid-small" | "grid-large" | "list";

interface DisplayModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showSearchBar?: boolean;
  onShowSearchBarChange?: (show: boolean) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

type TabType = "layout" | "metrics" | "row" | "extras";
type MetricSize = "small" | "large";
type QuickBuySize = "small" | "large" | "mega" | "ultra";

export function DisplayModal({ 
  open, 
  onOpenChange, 
  showSearchBar: externalShowSearchBar, 
  onShowSearchBarChange,
  viewMode: externalViewMode,
  onViewModeChange
}: DisplayModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("layout");
  const [metricSize, setMetricSize] = useState<MetricSize>("large");
  const [quickBuySize, setQuickBuySize] = useState<QuickBuySize>("small");
  const [showSearchBar, setShowSearchBar] = useState(externalShowSearchBar ?? true);
  const [viewMode, setViewMode] = useState<ViewMode>(externalViewMode ?? "list");
  const [noDecimals, setNoDecimals] = useState(false);
  const [showHiddenTokens, setShowHiddenTokens] = useState(true);
  const [unhideOnMigrated, setUnhideOnMigrated] = useState(true);
  const [circleImages, setCircleImages] = useState(false);
  const [progressBar, setProgressBar] = useState(false);
  const [spacedTables, setSpacedTables] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#25252b] border-[#2a2a30] text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-4 w-4 text-gray-400" />
              <List className="h-4 w-4 text-gray-400" />
              <DialogTitle className="text-white">Display</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Metrics Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Metrics</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setMetricSize("small")}
                className={cn(
                  "flex-1 px-4 py-3 rounded text-sm font-medium transition-colors",
                  metricSize === "small"
                    ? "bg-[#1f1f24] text-white border border-blue-500"
                    : "bg-[#1f1f24] text-gray-400 border border-[#2a2a30] hover:border-[#3a3a40]"
                )}
              >
                MC 77K Small
              </button>
              <button
                onClick={() => setMetricSize("large")}
                className={cn(
                  "flex-1 px-4 py-3 rounded text-sm font-medium transition-colors",
                  metricSize === "large"
                    ? "bg-[#1f1f24] text-white border border-blue-500"
                    : "bg-[#1f1f24] text-gray-400 border border-[#2a2a30] hover:border-[#3a3a40]"
                )}
              >
                MC 77K Large
              </button>
            </div>
          </div>

          {/* View Mode Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">View Mode</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setViewMode("list");
                  onViewModeChange?.("list");
                }}
                className={cn(
                  "flex-1 px-4 py-3 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-2",
                  viewMode === "list"
                    ? "bg-[#1f1f24] text-white border border-blue-500"
                    : "bg-[#1f1f24] text-gray-400 border border-[#2a2a30] hover:border-[#3a3a40]"
                )}
              >
                <List className="h-4 w-4" />
                <span>List</span>
              </button>
              <button
                onClick={() => {
                  setViewMode("grid-small");
                  onViewModeChange?.("grid-small");
                }}
                className={cn(
                  "flex-1 px-4 py-3 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-2",
                  viewMode === "grid-small"
                    ? "bg-[#1f1f24] text-white border border-blue-500"
                    : "bg-[#1f1f24] text-gray-400 border border-[#2a2a30] hover:border-[#3a3a40]"
                )}
              >
                <Grid className="h-4 w-4" />
                <span>Grid Small</span>
              </button>
              <button
                onClick={() => {
                  setViewMode("grid-large");
                  onViewModeChange?.("grid-large");
                }}
                className={cn(
                  "flex-1 px-4 py-3 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-2",
                  viewMode === "grid-large"
                    ? "bg-[#1f1f24] text-white border border-blue-500"
                    : "bg-[#1f1f24] text-gray-400 border border-[#2a2a30] hover:border-[#3a3a40]"
                )}
              >
                <Grid className="h-4 w-4" />
                <span>Grid Large</span>
              </button>
            </div>
          </div>

          {/* Quick Buy Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Quick Buy</h3>
            <div className="grid grid-cols-4 gap-2">
              {(["small", "large", "mega", "ultra"] as QuickBuySize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setQuickBuySize(size)}
                  className={cn(
                    "px-3 py-2 rounded text-xs font-medium transition-colors flex items-center justify-center space-x-1",
                    quickBuySize === size
                      ? "bg-[#1f1f24] text-white border border-blue-500"
                      : "bg-[#1f1f24] text-gray-400 border border-[#2a2a30] hover:border-[#3a3a40]"
                  )}
                >
                  <span className="text-xs">⚡</span>
                  <span className="capitalize">{size}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="flex items-center space-x-2">
            <span className="text-lg">☀️</span>
            <span className="text-sm text-gray-300">Grey</span>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 border-b border-[#2a2a30]">
            {(["layout", "metrics", "row", "extras"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors border-b-2",
                  activeTab === tab
                    ? "text-white border-blue-500"
                    : "text-gray-400 border-transparent hover:text-gray-300"
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-3">
            {activeTab === "layout" && (
              <>
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Show Search Bar</span>
                  </div>
                  <button
                    onClick={() => {
                      const newValue = !showSearchBar;
                      setShowSearchBar(newValue);
                      onShowSearchBarChange?.(newValue);
                    }}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors relative",
                      showSearchBar ? "bg-blue-500" : "bg-[#2a2a30]"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                        showSearchBar ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300"># No Decimals</span>
                  </div>
                  <button
                    onClick={() => setNoDecimals(!noDecimals)}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors relative",
                      noDecimals ? "bg-blue-500" : "bg-[#2a2a30]"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                        noDecimals ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Show Hidden Tokens</span>
                  </div>
                  <button
                    onClick={() => setShowHiddenTokens(!showHiddenTokens)}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors relative",
                      showHiddenTokens ? "bg-blue-500" : "bg-[#2a2a30]"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                        showHiddenTokens ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <EyeOff className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Unhide on Migrated</span>
                  </div>
                  <button
                    onClick={() => setUnhideOnMigrated(!unhideOnMigrated)}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors relative",
                      unhideOnMigrated ? "bg-blue-500" : "bg-[#2a2a30]"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                        unhideOnMigrated ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Square className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Circle Images</span>
                  </div>
                  <button
                    onClick={() => setCircleImages(!circleImages)}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors relative",
                      circleImages ? "bg-blue-500" : "bg-[#2a2a30]"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                        circleImages ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Progress Bar</span>
                  </div>
                  <button
                    onClick={() => setProgressBar(!progressBar)}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors relative",
                      progressBar ? "bg-blue-500" : "bg-[#2a2a30]"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                        progressBar ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Grid className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Spaced Tables</span>
                  </div>
                  <button
                    onClick={() => setSpacedTables(!spacedTables)}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors relative",
                      spacedTables ? "bg-blue-500" : "bg-[#2a2a30]"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                        spacedTables ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </label>
              </>
            )}

            {activeTab === "metrics" && (
              <div className="text-sm text-gray-400">Metrics settings coming soon...</div>
            )}

            {activeTab === "row" && (
              <div className="text-sm text-gray-400">Row settings coming soon...</div>
            )}

            {activeTab === "extras" && (
              <div className="text-sm text-gray-400">Extra settings coming soon...</div>
            )}
          </div>

          <div className="pt-4 border-t border-[#2a2a30]">
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
              Customize rows
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

