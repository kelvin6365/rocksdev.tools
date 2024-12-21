import { FuseResultMatch } from "fuse.js";

export interface MetaTagsData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  viewport: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterSite: string;
  twitterImage: string;
}

export interface FormProps {
  data: MetaTagsData;
  onChange: (data: MetaTagsData) => void;
}

export interface BaseTool {
  id: string;
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
