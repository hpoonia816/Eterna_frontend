"use client";

import { useEffect, useState } from "react";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { TokenTable } from "@/components/table/TokenTable";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DisplayModal } from "@/components/modals/DisplayModal";
import { HotkeysModal } from "@/components/modals/HotkeysModal";
import { WalletModal } from "@/components/modals/WalletModal";
import { SnipeModal } from "@/components/modals/SnipeModal";
import { HelpModal } from "@/components/modals/HelpModal";
import { FolderModal } from "@/components/modals/FolderModal";
import { GridModal } from "@/components/modals/GridModal";
import { VolumeModal } from "@/components/modals/VolumeModal";
import { FiltersModal } from "@/components/modals/FiltersModal";
import { SearchBar } from "@/components/search/SearchBar";
import { MobileNav } from "@/components/layout/MobileNav";
import { useTokens } from "@/hooks/useTokens";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { Token } from "@/types";

/**
 * Main page component for token discovery
 */
export default function Home() {
  const { tokens, isLoading, error, refetch } = useTokens();
  const shouldConnect = !isLoading && !error && tokens.length > 0;
  const { connect, disconnect } = useWebSocket("ws://localhost:8080", shouldConnect);
  
  const [displayModalOpen, setDisplayModalOpen] = useState(false);
  const [hotkeysModalOpen, setHotkeysModalOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [snipeModalOpen, setSnipeModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [gridModalOpen, setGridModalOpen] = useState(false);
  const [volumeModalOpen, setVolumeModalOpen] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<TokenCategory>("new-pairs");
  const [walletTokens, setWalletTokens] = useState<Token[]>([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [mobileNavTab, setMobileNavTab] = useState("pulse");
  const [viewMode, setViewMode] = useState<"grid-small" | "grid-large" | "list">("list");
  const [appliedFilters, setAppliedFilters] = useState<any>(null);

  useEffect(() => {
    if (shouldConnect) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [shouldConnect, connect, disconnect]);

  const handleTokenClick = (token: Token) => {
    console.log("Token clicked:", token);
    // Add custom click handler logic here
  };

  const handleAddToWallet = (token: Token) => {
    if (!walletTokens.find((t) => t.id === token.id)) {
      setWalletTokens([...walletTokens, token]);
    }
  };

  const handleRemoveFromWallet = (tokenId: string) => {
    setWalletTokens(walletTokens.filter((t) => t.id !== tokenId));
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#1a1a1f] flex flex-col pb-20 md:pb-0">
        <Header 
          onDisplayClick={() => setDisplayModalOpen(true)}
          onHotkeysClick={() => setHotkeysModalOpen(true)}
          onSnipeClick={() => setSnipeModalOpen(true)}
          onSearchClick={() => {
            setSearchBarOpen(!searchBarOpen);
            setShowSearchBar(!showSearchBar);
          }}
          onHelpClick={() => setHelpModalOpen(true)}
          onFolderClick={() => setFolderModalOpen(true)}
          onGridClick={() => setGridModalOpen(true)}
          onVolumeClick={() => setVolumeModalOpen(true)}
          onFilterClick={() => setFiltersModalOpen(true)}
        />
        {showSearchBar && (
          <div className="px-2 sm:px-4 py-2 border-b border-[#2a2a30]">
            <SearchBar 
              tokens={tokens} 
              onTokenSelect={handleAddToWallet}
              visible={true}
            />
          </div>
        )}
        <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <ErrorBoundary
            fallback={
              <div className="bg-[#25252b] rounded-lg shadow-sm border border-[#2a2a30] p-8">
                <p className="text-center text-gray-400">
                  Failed to load token table. Please refresh the page.
                </p>
              </div>
            }
          >
            <div className="flex-1 min-h-0 overflow-hidden">
              <TokenTable 
                onTokenClick={handleTokenClick}
                onAddToWallet={handleAddToWallet}
                viewMode={viewMode}
              />
            </div>
          </ErrorBoundary>
        </main>
        <Footer onWalletClick={() => setWalletModalOpen(true)} />
        <MobileNav activeTab={mobileNavTab} onTabChange={setMobileNavTab} />
        
        {/* Modals */}
        <DisplayModal 
          open={displayModalOpen} 
          onOpenChange={setDisplayModalOpen}
          showSearchBar={showSearchBar}
          onShowSearchBarChange={setShowSearchBar}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <HotkeysModal 
          open={hotkeysModalOpen} 
          onOpenChange={setHotkeysModalOpen}
        />
        <WalletModal
          open={walletModalOpen}
          onOpenChange={setWalletModalOpen}
          walletTokens={walletTokens}
          onRemoveToken={handleRemoveFromWallet}
        />
        <SnipeModal
          open={snipeModalOpen}
          onOpenChange={setSnipeModalOpen}
        />
        <HelpModal
          open={helpModalOpen}
          onOpenChange={setHelpModalOpen}
        />
        <FolderModal
          open={folderModalOpen}
          onOpenChange={setFolderModalOpen}
        />
        <GridModal
          open={gridModalOpen}
          onOpenChange={setGridModalOpen}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <VolumeModal
          open={volumeModalOpen}
          onOpenChange={setVolumeModalOpen}
        />
        <FiltersModal
          open={filtersModalOpen}
          onOpenChange={setFiltersModalOpen}
          activeTab={activeFilterTab}
          onTabChange={setActiveFilterTab}
          onApplyFilters={setAppliedFilters}
        />
      </div>
    </ErrorBoundary>
  );
}

