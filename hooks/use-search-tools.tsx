"use client";

import {
  createSearchEngine,
  SearchResult,
  Tool,
  SearchableTool,
} from "@/lib/search";
import { useLocale } from "next-intl";
import { useEffect, useState, useMemo } from "react";

export function useToolSearch(tools: Tool[], initialQuery: string = "") {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const locale = useLocale();

  const searchEngine = useMemo(
    () => createSearchEngine(tools, locale),
    [tools, locale],
  );

  useEffect(() => {
    if (query) {
      setResults(searchEngine.search(query));
    } else {
      setResults([]);
    }
  }, [query, searchEngine]);

  const getRecentTools = (): SearchableTool[] => {
    if (typeof window === "undefined") return [];
    try {
      const recentTools = JSON.parse(
        localStorage.getItem("recentTools") || "[]",
      );
      return recentTools
        .map(({ id }: { id: string }) =>
          searchEngine.getTools().find((tool) => tool.id === id),
        )
        .filter(Boolean)
        .slice(0, 5);
    } catch {
      return [];
    }
  };
  const addRecentTool = (tool: SearchableTool) => {
    if (typeof window === "undefined") return;
    const recentTools = getRecentTools();
    if (recentTools.find((t) => t.id === tool.id)) return;
    recentTools.push(tool);
    localStorage.setItem("recentTools", JSON.stringify(recentTools));
  };

  return {
    query,
    setQuery,
    results,
    searchEngine,
    recentTools: getRecentTools(),
    allTags: searchEngine.getAllTags(),
    searchByTag: searchEngine.searchByTag,
    addRecentTool,
  };
}
