import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useToolSearch } from "@/hooks/use-search-tools";
import { config } from "@/services/config";
import { SearchableTool, Tool } from "@/lib/search";
import { sendGAEvent } from "@next/third-parties/google";

interface SearchContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
  results: any[];
  recentTools: SearchableTool[];
  handleToolSelect: (tool: SearchableTool) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { query, setQuery, results, recentTools, addRecentTool } =
    useToolSearch(config.tools as Tool[]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleToolSelect = (tool: SearchableTool) => {
    setOpen(false);
    router.push(tool.href);
    addRecentTool(tool);
    setQuery("");
    sendGAEvent("event", "tool_search_clicked", {
      tool: tool.id,
    });
  };

  return (
    <SearchContext.Provider
      value={{
        open,
        setOpen,
        query,
        setQuery,
        results,
        recentTools,
        handleToolSelect,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
