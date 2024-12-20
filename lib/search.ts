"use client";

import Fuse, { FuseResultMatch } from "fuse.js";

// Types
export interface BaseTool {
  label: string;
  value: string;
  href: string;
  description: string;
  category: string;
  icon?: string;
}

export interface Tool extends BaseTool {
  subTools?: SubTool[];
}

export interface SubTool extends BaseTool {}

export interface SearchableTool {
  id: string;
  href: string;
  icon?: string;
  category: string;
  parentId?: string;
  translations: {
    [key: string]: {
      label: string;
      description: string;
      tags: string[];
      searchableText: string;
    };
  };
}

export interface SearchResult {
  item: SearchableTool;
  matches: FuseResultMatch[];
}

export function createSearchEngine(tools: Tool[], locale: string = "en") {
  const processTools = (tools: Tool[]): SearchableTool[] => {
    const processedTools: SearchableTool[] = [];
    const generateTags = (tool: BaseTool): string[] => {
      const tags = new Set<string>();
      tags.add(tool.category);
      tool.value.split(".").forEach((part) => tags.add(part));
      return Array.from(tags);
    };

    const processTool = (tool: Tool, parentId?: string) => {
      const tags = generateTags(tool);
      const searchableTool: SearchableTool = {
        id: tool.value,
        href: tool.href,
        icon: tool.icon,
        category: tool.category,
        parentId,
        translations: {
          [locale]: {
            label: tool.label,
            description: tool.description,
            tags,
            searchableText:
              `${tool.label} ${tool.description} ${tags.join(" ")}`.toLowerCase(),
          },
        },
      };
      processedTools.push(searchableTool);
    };

    tools.forEach((tool) => {
      processTool(tool);
      tool.subTools?.forEach((subTool) => processTool(subTool, tool.value));
    });

    return processedTools;
  };

  const processedTools = processTools(tools);
  const fuse = new Fuse(processedTools, {
    keys: [
      { name: `translations.${locale}.label`, weight: 3 },
      { name: `translations.${locale}.description`, weight: 2 },
      { name: `translations.${locale}.tags`, weight: 1.5 },
      { name: `translations.${locale}.searchableText`, weight: 1 },
    ],
    threshold: 0.3,
    includeMatches: true,
    ignoreLocation: true,
  });

  return {
    search: (query: string): SearchResult[] => {
      if (!query.trim()) return [];
      return fuse.search(query).map((result) => ({
        item: result.item,
        matches: result.matches || [],
      })) as SearchResult[];
    },
    searchByTag: (tag: string): SearchableTool[] => {
      return processedTools.filter((tool) =>
        tool.translations[locale].tags.includes(tag),
      );
    },
    getAllTags: (): string[] => {
      const tagSet = new Set<string>();
      processedTools.forEach((tool) => {
        tool.translations[locale].tags.forEach((tag) => tagSet.add(tag));
      });
      return Array.from(tagSet);
    },
    getTools: (): SearchableTool[] => processedTools,
  };
}
