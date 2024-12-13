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
    images?: string[];
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
    title: "RocksDev Tools | A comprehensive collection of developer tools",
    description: "A comprehensive collection of developer tools",
    keywords: [
      // Primary keywords
      "developer tools",
      "online developer tools",
      "free developer tools",
      "web development tools",

      // Tool-specific keywords
      "json tools",
      "json formatter",
      "json validator",
      "base64 converter",
      "regex tester",

      // Feature keywords
      "code formatter",
      "online code tools",
      "web tools",

      // User intent keywords
      "format json online",
      "validate json online",
      "test regex online",
      "convert base64 online",

      // Characteristics
      "free tools",
      "no signup required",
      "instant tools",
    ],
    openGraph: {
      type: "website",
      siteName: "RocksDev Tools",
      images: [`/api/og`],
      url: process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools",
    },
    twitter: {
      card: "summary_large_image",
      site: "@rocksdevtools",
      creator: "@teshim_tech",
    },
    additionalMetaTags: [
      {
        name: "theme-color",
        content: "#000000",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      {
        name: "application-name",
        content: "RocksDev Tools",
      },
      {
        name: "mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "format-detection",
        content: "telephone=no",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "default",
      },
    ],
  },
  "zh-CN": {
    title: "RocksDev 工具集 | 全面的开发者工具集合",
    description: "全面的开发者工具集合",
    keywords: [
      // Primary keywords
      "开发工具",
      "在线开发工具",
      "免费开发工具",
      "网页开发工具",

      // Tool-specific keywords
      "JSON工具",
      "JSON格式化工具",
      "JSON验证器",
      "Base64转换器",
      "正则表达式测试器",

      // Feature keywords
      "代码格式化",
      "在线代码工具",
      "网页工具",

      // User intent keywords
      "在线格式化JSON",
      "在线验证JSON",
      "在线测试正则表达式",
      "在线转换Base64",

      // Characteristics
      "免费工具",
      "无需注册",
      "即时工具",
    ],

    openGraph: {
      type: "website",
      siteName: "RocksDev 工具集",
      images: [`/api/og`],
      url: process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools",
    },
    twitter: {
      card: "summary_large_image",
      site: "@rocksdevtools",
      creator: "@teshim_tech",
    },
    additionalMetaTags: [
      {
        name: "theme-color",
        content: "#000000",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      {
        name: "application-name",
        content: "RocksDev 工具集",
      },
      {
        name: "format-detection",
        content: "telephone=no",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "default",
      },
    ],
  },
  "zh-HK": {
    title: "RocksDev 工具集 | 全面的开发者工具集合",
    description: "全面的開發者工具集合",
    keywords: [
      // Primary keywords
      "開發工具",
      "在線開發工具",
      "免費開發工具",
      "網頁開發工具",

      // Tool-specific keywords
      "JSON工具",
      "JSON格式化工具",
      "JSON驗證器",
      "Base64轉換器",
      "Regex測試器",

      // Feature keywords
      "代碼格式化",
      "在線代碼工具",
      "網頁工具",

      // User intent keywords
      "在線格式化JSON",
      "在線驗證JSON",
      "在線測試Regex",
      "在線轉換Base64",

      // Characteristics
      "免費工具",
      "無需註冊",
      "即時工具",
    ],

    openGraph: {
      type: "website",
      siteName: "RocksDev 工具集",
      images: [`/api/og`],
      url: process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools",
    },
    twitter: {
      card: "summary_large_image",
      site: "@tszhim_tech",
    },
    additionalMetaTags: [
      {
        name: "theme-color",
        content: "#000000",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      {
        name: "application-name",
        content: "RocksDev 工具集",
      },
      {
        name: "format-detection",
        content: "telephone=no",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "default",
      },
    ],
  },
};

export function getStructuredData(locale: string = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: defaultSEO[locale].title,
    description: defaultSEO[locale].description,
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    inLanguage: locale,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    availableLanguage: [
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
      {
        "@type": "Language",
        name: "简体中文",
        alternateName: "zh-CN",
      },
      {
        "@type": "Language",
        name: "繁體中文",
        alternateName: "zh-HK",
      },
    ],
    potentialAction: {
      "@type": "UseAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools"}${locale !== "en" ? `/${locale}` : ""}`,
        inLanguage: locale,
      },
    },
  };
}

// Add utility to generate tool-specific structured data
export function getToolStructuredData(toolPath: string, locale: string = "en") {
  const toolSEO = toolsSEO[toolPath]?.[locale];

  if (!toolSEO) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: toolSEO.title,
    description: toolSEO.description,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools"}${locale !== "en" ? `/${locale}` : ""}/tools/${toolPath}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    inLanguage: locale,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    availableLanguage: [
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
      {
        "@type": "Language",
        name: "简体中文",
        alternateName: "zh-CN",
      },
      {
        "@type": "Language",
        name: "繁體中文",
        alternateName: "zh-HK",
      },
    ],
    keywords: toolSEO.keywords?.join(", "),
    images: toolSEO.openGraph?.images,
    potentialAction: {
      "@type": "UseAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools"}${locale !== "en" ? `/${locale}` : ""}/tools/${toolPath}`,
        inLanguage: locale,
      },
    },
  };
}

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
      title: "JSON Formatter | RocksDev Tools",
      description:
        "Format, validate and beautify your JSON with our powerful online JSON formatter tool. Features include syntax highlighting, error detection, and more.",
      keywords: [
        // Primary keywords
        "json formatter",
        "json beautifier",
        "json validator",

        // Feature keywords
        "format json online",
        "beautify json",
        "pretty print json",
        "json pretty printer",

        // Technical keywords
        "json syntax highlighter",
        "json editor",
        "json parser",

        // User intent keywords
        "validate json format",
        "check json format",
        "clean json format",

        // Characteristics
        "free json formatter",
        "online json tool",
        "instant json formatting",
      ],
      openGraph: {
        type: "website",
        title: "JSON Formatter",
        description: "Format your JSON online",
        images: [`/api/og?title=JSON%20Formatter`],
      },
    },
    "zh-CN": {
      title: "JSON 格式化工具 | RocksDev 工具集",
      description:
        "使用我们强大的在线 JSON 格式化工具来格式化、验证和美化您的 JSON。包括语法高亮、错误检测等功能。",
      keywords: [
        "JSON格式化",
        "JSON美化器",
        "JSON验证器",
        "在线JSON格式化",
        "JSON格式化工具",
        "JSON编辑器",
        "JSON解析器",
        "JSON语法高亮",
        "免费JSON工具",
        "在线JSON美化",
        "JSON校验工具",
        "即时JSON格式化",
      ],
      openGraph: {
        type: "website",
        title: "JSON 格式化工具",
        description: "在线格式化和验证您的 JSON",
        images: [`/api/og?title=JSON%20Formatter`],
      },
    },
    "zh-HK": {
      title: "JSON 格式化工具 | RocksDev 工具集",
      description:
        "使用我們強大的在線 JSON 格式化工具來格式化、驗證和美化您的 JSON。包括語法高亮、錯誤檢測等功能。",
      keywords: [
        "JSON格式化",
        "JSON美化器",
        "JSON驗證器",
        "在線JSON格式化",
        "JSON格式化工具",
        "JSON編輯器",
        "JSON解析器",
        "JSON語法高亮",
        "免費JSON工具",
        "在線JSON美化",
        "JSON校驗工具",
        "即時JSON格式化",
      ],
      openGraph: {
        type: "website",
        title: "JSON 格式化工具",
        description: "在線格式化和驗證您的 JSON",
        images: [`/api/og?title=JSON%20Formatter`],
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
        images: [`/api/og?title=JSON%20Validator`],
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
        images: [`/api/og?title=JSON%20Validator`],
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
        images: [`/api/og?title=JSON%20Validator`],
      },
    },
  },
  "json.diff": {
    en: {
      title: "JSON Diff | RocksDev Tools",
      description:
        "Compare two JSON objects and find their differences with our powerful online JSON diff tool. Easily spot changes, additions, and deletions between JSON files.",
      keywords: [
        // Primary keywords
        "json diff",
        "json compare",
        "json difference",
        "json comparison tool",

        // Feature keywords
        "compare json files",
        "compare json objects",
        "json diff checker",
        "json difference finder",
        "json file comparison",

        // Technical keywords
        "json diff viewer",
        "json delta",
        "json comparison viewer",
        "side by side json compare",

        // User intent keywords
        "find differences in json",
        "check json changes",
        "spot json differences",
        "compare json online",

        // Action keywords
        "visualize json differences",
        "highlight json changes",
        "detect json modifications",

        // Characteristics
        "free json diff tool",
        "online json comparison",
        "instant json diff",
      ],
      openGraph: {
        type: "website",
        title: "JSON Diff - Compare JSON Files Online",
        description:
          "Compare two JSON objects and find their differences instantly. Visual comparison tool with side-by-side view and difference highlighting.",
        images: [`/api/og?title=JSON%20Diff`],
      },
    },
    "zh-CN": {
      title: "JSON 差异对比工具 | RocksDev 工具集",
      description:
        "使用我们强大的在线 JSON 差异对比工具比较两个 JSON 对象并找出它们的差异。轻松发现 JSON 文件之间的更改、添加和删除。",
      keywords: [
        // Primary keywords
        "json差异",
        "json对比",
        "json比较",
        "json差异工具",

        // Feature keywords
        "json文件对比",
        "json对象比较",
        "json差异检查器",
        "json文件比较",

        // Technical keywords
        "json差异查看器",
        "json对比工具",
        "并排json比较",

        // User intent keywords
        "查找json差异",
        "检查json变化",
        "发现json不同",
        "在线比较json",

        // Action keywords
        "可视化json差异",
        "高亮json变化",
        "检测json修改",

        // Characteristics
        "免费json对比工具",
        "在线json比较",
        "即时json差异",
      ],
      openGraph: {
        type: "website",
        title: "JSON 差异对比工具 - 在线比较 JSON 文件",
        description:
          "即时比较两个 JSON 对象并找出它们的差异。提供并排视图和差异高亮的可视化比较工具。",
        images: [`/api/og?title=JSON%20Diff`],
      },
    },
    "zh-HK": {
      title: "JSON 差異對比工具 | RocksDev 工具集",
      description:
        "使用我們強大的在線 JSON 差異對比工具比較兩個 JSON 對象並找出它們的差異。輕鬆發現 JSON 文件之間的更改、添加和刪除。",
      keywords: [
        // Primary keywords
        "json差異",
        "json對比",
        "json比較",
        "json差異工具",

        // Feature keywords
        "json文件對比",
        "json對象比較",
        "json差異檢查器",
        "json文件比較",

        // Technical keywords
        "json差異查看器",
        "json對比工具",
        "並排json比較",

        // User intent keywords
        "查找json差異",
        "檢查json變化",
        "發現json不同",
        "在線比較json",

        // Action keywords
        "可視化json差異",
        "高亮json變化",
        "檢測json修改",

        // Characteristics
        "免費json對比工具",
        "在線json比較",
        "即時json差異",
      ],
      openGraph: {
        type: "website",
        title: "JSON 差異對比工具 - 在線比較 JSON 文件",
        description:
          "即時比較兩個 JSON 對象並找出它們的差異。提供並排視圖和差異高亮的可視化比較工具。",
        images: [`/api/og?title=JSON%20Diff`],
      },
    },
  },
  "json.minifier": {
    en: {
      title: "JSON Minifier | RocksDev Tools",
      description:
        "Minify and compress JSON data instantly with our powerful online JSON minifier tool. Reduce file size while maintaining data integrity, perfect for optimization and deployment.",
      keywords: [
        // Primary keywords
        "json minifier",
        "json minify",
        "json compressor",
        "json compression tool",

        // Feature keywords
        "minify json online",
        "compress json",
        "reduce json size",
        "json size optimizer",

        // Technical keywords
        "json minification",
        "json optimizer",
        "compact json",
        "minimize json",
        "json shrinking tool",

        // User intent keywords
        "make json smaller",
        "reduce json file size",
        "optimize json format",
        "clean json whitespace",

        // Action keywords
        "remove json whitespace",
        "compress json data",
        "optimize json code",

        // Characteristics
        "free json minifier",
        "online json compression",
        "instant json minifying",
        "bulk json minification",
      ],
      openGraph: {
        type: "website",
        title: "JSON Minifier - Compress JSON Data Online",
        description:
          "Free online JSON minifier to compress and optimize your JSON data. Remove whitespace and reduce file size while maintaining data integrity.",
        images: [`/api/og?title=JSON%20Minifier`],
      },
    },
    "zh-CN": {
      title: "JSON 压缩工具 | RocksDev 工具集",
      description:
        "使用我们强大的在线 JSON 压缩工具立即压缩您的 JSON 数据。在保持数据完整性的同时减小文件大小，完美用于优化和部署。",
      keywords: [
        // Primary keywords
        "json压缩工具",
        "json压缩器",
        "json最小化",
        "json文件压缩",

        // Feature keywords
        "在线压缩json",
        "json文件优化",
        "减小json大小",
        "json大小优化器",

        // Technical keywords
        "json压缩",
        "json优化器",
        "json紧凑化",
        "json最小化工具",

        // User intent keywords
        "缩小json文件",
        "减少json体积",
        "优化json格式",
        "清理json空白",

        // Action keywords
        "删除json空格",
        "压缩json数据",
        "优化json代码",

        // Characteristics
        "免费json压缩",
        "在线json压缩",
        "即时json压缩",
        "批量json压缩",
      ],
      openGraph: {
        type: "website",
        title: "JSON 压缩工具 - 在线压缩 JSON 数据",
        description:
          "免费的在线 JSON 压缩工具，压缩和优化您的 JSON 数据。删除空白并减小文件大小，同时保持数据完整性。",
        images: [`/api/og?title=JSON%20Minifier`],
      },
    },
    "zh-HK": {
      title: "JSON 壓縮工具 | RocksDev 工具集",
      description:
        "使用我們強大的在線 JSON 壓縮工具立即壓縮您的 JSON 數據。在保持數據完整性的同時減小文件大小，完美用於優化和部署。",
      keywords: [
        // Primary keywords
        "json壓縮工具",
        "json壓縮器",
        "json最小化",
        "json文件壓縮",

        // Feature keywords
        "在線壓縮json",
        "json文件優化",
        "減小json大小",
        "json大小優化器",

        // Technical keywords
        "json壓縮",
        "json優化器",
        "json緊湊化",
        "json最小化工具",

        // User intent keywords
        "縮小json文件",
        "減少json體積",
        "優化json格式",
        "清理json空白",

        // Action keywords
        "刪除json空格",
        "壓縮json數據",
        "優化json代碼",

        // Characteristics
        "免費json壓縮",
        "在線json壓縮",
        "即時json壓縮",
        "批量json壓縮",
      ],
      openGraph: {
        type: "website",
        title: "JSON 壓縮工具 - 在線壓縮 JSON 數據",
        description:
          "免費的在線 JSON 壓縮工具，壓縮和優化您的 JSON 數據。刪除空白並減小文件大小，同時保持數據完整性。",
        images: [`/api/og?title=JSON%20Minifier`],
      },
    },
  },
  "converters.base64": {
    en: {
      title: "Base64 Converter | RocksDev Tools",
      description:
        "Convert between Base64 and other formats with our powerful online Base64 converter tool.",
      keywords: [
        "base64 converter",
        "base64 tools",
        "base64 encoding",
        "base64 decoding",
        "file base64",
      ],
      openGraph: {
        type: "website",
        title: "Base64 Converter",
        description: "Convert between Base64 and other formats",
        images: [`/api/og?title=Base64%20Converter`],
      },
    },
    "zh-CN": {
      title: "Base64 轉換器 | RocksDev 工具集",
      description:
        "使用我們強大的在線 Base64 轉換器工具在 Base64 和其他格式之間轉換。",
      keywords: [
        "base64轉換器",
        "base64工具",
        "base64編碼",
        "base64解碼",
        "文件base64",
      ],
      openGraph: {
        type: "website",
        title: "Base64 轉換器",
        description: "在 Base64 和其他格式之間轉換",
        images: [`/api/og?title=Base64%20Converter`],
      },
    },
    "zh-HK": {
      title: "Base64 轉換器 | RocksDev 工具集",
      description:
        "使用我們強大的在線 Base64 轉換器工具在 Base64 和其他格式之間轉換。",
      keywords: [
        "base64轉換器",
        "base64工具",
        "base64編碼",
        "base64解碼",
        "文件base64",
      ],
      openGraph: {
        type: "website",
        title: "Base64 轉換器",
        description: "在 Base64 和其他格式之間轉換",
        images: [`/api/og?title=Base64%20Converter`],
      },
    },
  },
  "dev.regex": {
    en: {
      title: "Regex Tester | RocksDev Tools",
      description: "Test and validate regular expressions",
      keywords: ["regex tester", "regex validator", "regex tools"],
      openGraph: {
        type: "website",
        title: "Regex Tester",
        description: "Test and validate regular expressions",
        images: [`/api/og?title=Regex%20Tester`],
      },
    },
    "zh-CN": {
      title: "Regex測試工具 | RocksDev 工具集",
      description: "測試和驗證Regex",
      keywords: ["Regex測試器", "Regex驗證器", "Regex工具"],
      openGraph: {
        type: "website",
        title: "Regex測試工具",
        description: "測試和驗證Regex",
        images: [`/api/og?title=Regex%20Tester`],
      },
    },
    "zh-HK": {
      title: "Regex測試工具 | RocksDev 工具集",
      description: "測試和驗證Regex",
      keywords: ["Regex測試器", "Regex驗證器", "Regex工具"],
      openGraph: {
        type: "website",
        title: "Regex測試工具",
        description: "測試和驗證Regex",
        images: [`/api/og?title=Regex%20Tester`],
      },
    },
  },
  "seo.og-image": {
    en: {
      title:
        "OG Image Generator | Create Social Media Preview Images | RocksDev Tools",
      description:
        "Create professional Open Graph (OG) images for social media previews. Free online tool to generate, crop, and optimize social card images for Facebook, Twitter, LinkedIn, and more.",
      keywords: [
        // Primary keywords
        "og image generator",
        "open graph image creator",
        "social media preview generator",
        "social card generator",

        // Platform-specific
        "facebook preview image",
        "twitter card generator",
        "linkedin post image",
        "social media image creator",

        // Feature keywords
        "custom og image",
        "og image editor",
        "social preview tool",
        "image crop tool",
        "social media image size",
        "og image dimensions",

        // Technical keywords
        "1200x630 image generator",
        "social meta image",
        "open graph protocol",
        "meta tags image",

        // User intent keywords
        "create og image online",
        "generate social preview",
        "make social card image",
        "optimize social images",

        // Action keywords
        "resize for social media",
        "crop social images",
        "customize og images",
        "edit preview images",

        // Characteristics
        "free og image tool",
        "online image generator",
        "instant preview generator",
        "bulk og image creator",
      ],
      openGraph: {
        type: "website",
        title: "OG Image Generator - Create Social Media Preview Images",
        description:
          "Free online tool to create and optimize social media preview images. Generate perfect Open Graph images for Facebook, Twitter, LinkedIn and more.",
        images: [`/api/og?title=OG%20Image%20Generator`],
        siteName: "RocksDev Tools",
      },
      twitter: {
        card: "summary_large_image",
        site: "@rocksdevtools",
        creator: "@teshim_tech",
      },
    },
    "zh-CN": {
      title: "OG图像生成器 | 社交媒体预览图片生成工具 | RocksDev工具集",
      description:
        "创建专业的Open Graph（OG）图像，用于社交媒体预览。免费在线工具，可生成、裁剪和优化Facebook、Twitter、LinkedIn等社交卡片图像。",
      keywords: [
        // Primary keywords
        "og图像生成器",
        "社交媒体预览生成器",
        "社交卡片生成器",
        "开放图谱图像创建器",

        // Platform-specific
        "Facebook预览图片",
        "Twitter卡片生成器",
        "领英帖子图片",
        "社交媒体图片创建器",

        // Feature keywords
        "自定义og图像",
        "og图像编辑器",
        "社交预览工具",
        "图片裁剪工具",
        "社交媒体图片尺寸",

        // Technical keywords
        "1200x630图片生成器",
        "社交元图像",
        "开放图谱协议",
        "元标签图像",

        // User intent keywords
        "在线创建og图像",
        "生成社交预览",
        "制作社交卡片图片",
        "优化社交图片",

        // Action keywords
        "社交媒体图片调整",
        "裁剪社交图片",
        "自定义og图片",
        "编辑预览图片",

        // Characteristics
        "免费og图片工具",
        "在线图片生成器",
        "即时预览生成器",
        "批量og图片创建",
      ],
      openGraph: {
        type: "website",
        title: "OG图像生成器 - 创建社交媒体预览图片",
        description:
          "免费在线工具，创建和优化社交媒体预览图片。为Facebook、Twitter、LinkedIn等生成完美的Open Graph图像。",
        images: [`/api/og?title=OG%20Image%20Generator`],
        siteName: "RocksDev工具集",
      },
      twitter: {
        card: "summary_large_image",
        site: "@rocksdevtools",
        creator: "@teshim_tech",
      },
    },
    "zh-HK": {
      title: "OG圖像生成器 | 社交媒體預覽圖片生成工具 | RocksDev工具集",
      description:
        "創建專業的Open Graph（OG）圖像，用於社交媒體預覽。免費在線工具，可生成、裁剪和優化Facebook、Twitter、LinkedIn等社交卡片圖像。",
      keywords: [
        // Primary keywords
        "og圖像生成器",
        "社交媒體預覽生成器",
        "社交卡片生成器",
        "開放圖譜圖像創建器",

        // Platform-specific
        "Facebook預覽圖片",
        "Twitter卡片生成器",
        "LinkedIn帖子圖片",
        "社交媒體圖片創建器",

        // Feature keywords
        "自定義og圖像",
        "og圖像編輯器",
        "社交預覽工具",
        "圖片裁剪工具",
        "社交媒體圖片尺寸",

        // Technical keywords
        "1200x630圖片生成器",
        "社交元圖像",
        "開放圖譜協議",
        "元標籤圖像",

        // User intent keywords
        "在線創建og圖像",
        "生成社交預覽",
        "製作社交卡片圖片",
        "優化社交圖片",

        // Action keywords
        "社交媒體圖片調整",
        "裁剪社交圖片",
        "自定義og圖片",
        "編輯預覽圖片",

        // Characteristics
        "免費og圖片工具",
        "在線圖片生成器",
        "即時預覽生成器",
        "批量og圖片創建",
      ],
      openGraph: {
        type: "website",
        title: "OG圖像生成器 - 創建社交媒體預覽圖片",
        description:
          "免費在線工具，創建和優化社交媒體預覽圖片。為Facebook、Twitter、LinkedIn等生成完美的Open Graph圖像。",
        images: [`/api/og?title=OG%20Image%20Generator`],
        siteName: "RocksDev工具集",
      },
      twitter: {
        card: "summary_large_image",
        site: "@rocksdevtools",
        creator: "@teshim_tech",
      },
    },
  },
  "text.text-formatter": {
    en: {
      title: "Text Formatter | RocksDev Tools",
      description: "Format and manipulate your text with advanced tools",
      keywords: ["text formatter", "text tools", "text formatting"],
      openGraph: {
        type: "website",
        title: "Text Formatter",
        description: "Format and manipulate your text with advanced tools",
        images: [`/api/og?title=Text%20Formatter`],
      },
    },
    "zh-CN": {
      title: "文本格式化器 | RocksDev 工具集",
      description: "使用高级工具格式化和操作您的文本",
      keywords: ["文本格式化器", "文本工具", "文本格式化"],
      openGraph: {
        type: "website",
        title: "文本格式化器",
        description: "使用高级工具格式化和操作您的文本",
        images: [`/api/og?title=Text%20Formatter`],
      },
    },
    "zh-HK": {
      title: "文本格式化器 | RocksDev 工具集",
      description: "使用高级工具格式化和操作您的文本",
      keywords: ["文本格式化器", "文本工具", "文本格式化"],
      openGraph: {
        type: "website",
        title: "文本格式化器",
        description: "使用高级工具格式化和操作您的文本",
        images: [`/api/og?title=Text%20Formatter`],
      },
    },
  },
};
