import { Metadata } from "next";

interface SEOProps {
  path?: string;
  config?: Partial<SEOConfig>;
  locale?: string;
}

export function getMetadata({
  path,
  config,
  locale = "en",
}: SEOProps): Metadata {
  // Get tool-specific SEO if path matches a tool
  const toolSEO = path ? toolsSEO[path]?.[locale] : undefined;

  // Merge configurations in order of priority: default < tool-specific < page-specific
  const mergedConfig = {
    ...defaultSEO[locale],
    ...(path === "not-found" ? notFoundSEO[locale] : {}),
    ...toolSEO,
    ...config,
  };

  const {
    title,
    description,
    keywords,
    openGraph,
    twitter,
    additionalMetaTags,
  } = mergedConfig;

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools",
    ),
    openGraph: {
      ...openGraph,
      url: openGraph?.url || `${process.env.NEXT_PUBLIC_BASE_URL}${path || ""}`,
    },
    twitter,
    other: additionalMetaTags?.reduce(
      (acc, tag) => ({
        ...acc,
        [tag.name || tag.property || ""]: tag.content,
      }),
      {},
    ),
  };
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    image?: string;
    siteName?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    image?: string;
  };
  additionalMetaTags?: Array<{
    name?: string;
    content?: string;
    property?: string;
  }>;
}

export const defaultSEO: Record<string, SEOConfig> = {
  en: {
    title: "RocksDev Tools",
    description: "A comprehensive collection of developer tools",
    keywords: ["developer tools", "web tools", "online tools", "dev tools"],
    openGraph: {
      type: "website",
      siteName: "RocksDev Tools",
      image: "/og-image.png",
    },
    twitter: {
      card: "summary_large_image",
      site: "@rocksdevtools",
      creator: "@rocksdevtools",
    },
    additionalMetaTags: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "application-name",
        content: "RocksDev Tools",
      },
    ],
  },
  "zh-CN": {
    title: "RocksDev 工具集",
    description: "全面的开发者工具集合",
    keywords: ["开发工具", "网页工具", "在线工具", "开发者工具"],
    openGraph: {
      type: "website",
      siteName: "RocksDev 工具集",
      image: "/og-image.png",
    },
    twitter: {
      card: "summary_large_image",
      site: "@rocksdevtools",
      creator: "@rocksdevtools",
    },
    additionalMetaTags: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "application-name",
        content: "RocksDev 工具集",
      },
    ],
  },
  "zh-HK": {
    title: "RocksDev 工具集",
    description: "全面的開發者工具集合",
    keywords: ["開發工具", "網頁工具", "在線工具", "開發者工具"],
    openGraph: {
      type: "website",
      siteName: "RocksDev 工具集",
      image: "/og-image.png",
    },
    twitter: {
      card: "summary_large_image",
      site: "@rocksdevtools",
      creator: "@rocksdevtools",
    },
    additionalMetaTags: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "application-name",
        content: "RocksDev 工具集",
      },
    ],
  },
};

export const notFoundSEO: Record<string, SEOConfig> = {
  en: {
    title: "Page Not Found | RocksDev Tools",
    description:
      "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  },
  "zh-CN": {
    title: "页面未找到 | RocksDev 工具集",
    description: "您正在寻找的页面可能已被删除、名称已更改或暂时不可用。",
  },
  "zh-HK": {
    title: "頁面未找到 | RocksDev 工具集",
    description: "您正在尋找的頁面可能已被刪除、名稱已更改或暫時不可用。",
  },
};

export const toolsSEO: Record<string, Record<string, SEOConfig>> = {
  "json.formatter": {
    en: {
      title: "JSON Formatter & Validator | RocksDev Tools",
      description:
        "Format, validate and beautify your JSON with our powerful online JSON formatter tool. Features include syntax highlighting, error detection, and more.",
      keywords: [
        "json formatter",
        "json validator",
        "json beautifier",
        "json tools",
      ],
      openGraph: {
        type: "website",
        title: "JSON Formatter & Validator",
        description: "Format and validate your JSON online",
        image: "/tools/json-formatter-og.png",
      },
    },
    "zh-CN": {
      title: "JSON 格式化工具 | RocksDev 工具集",
      description:
        "使用我们强大的在线 JSON 格式化工具来格式化、验证和美化您的 JSON。包括语法高亮、错误检测等功能。",
      keywords: ["json格式化", "json验证器", "json美化", "json工具"],
      openGraph: {
        type: "website",
        title: "JSON 格式化工具",
        description: "在线格式化和验证您的 JSON",
        image: "/tools/json-formatter-og.png",
      },
    },
    "zh-HK": {
      title: "JSON 格式化工具 | RocksDev 工具集",
      description:
        "使用我們強大的在線 JSON 格式化工具來格式化、驗證和美化您的 JSON。包括語法高亮、錯誤檢測等功能。",
      keywords: ["json格式化", "json驗證器", "json美化", "json工具"],
      openGraph: {
        type: "website",
        title: "JSON 格式化工具",
        description: "在線格式化和驗證您的 JSON",
        image: "/tools/json-formatter-og.png",
      },
    },
  },
  "json.validator": {
    en: {
      title: "JSON Validator | RocksDev Tools",
      description:
        "Validate your JSON data with our powerful online JSON validator tool.",
      keywords: ["json validator", "json validation", "json tools"],
      openGraph: {
        type: "website",
        title: "JSON Validator",
        description: "Validate your JSON data online",
        image: "/tools/json-validator-og.png",
      },
    },
    "zh-CN": {
      title: "JSON 验证工具 | RocksDev 工具集",
      description: "使用我们强大的在线 JSON 验证工具验证您的 JSON 数据。",
      keywords: ["json验证器", "json验证", "json工具"],
      openGraph: {
        type: "website",
        title: "JSON 验证工具",
        description: "在线验证您的 JSON 数据",
        image: "/tools/json-validator-og.png",
      },
    },
    "zh-HK": {
      title: "JSON 驗證工具 | RocksDev 工具集",
      description: "使用我們強大的在線 JSON 驗證工具驗證您的 JSON 數據。",
      keywords: ["json驗證器", "json驗證", "json工具"],
      openGraph: {
        type: "website",
        title: "JSON 驗證工具",
        description: "在線驗證您的 JSON 數據",
        image: "/tools/json-validator-og.png",
      },
    },
  },
};