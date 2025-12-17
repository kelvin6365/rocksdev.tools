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
  const _privacyPolicySEO =
    path === "privacy-policy" ? privacyPolicySEO[locale] : undefined;
  const _contactUsSEO =
    path === "contact-us" ? contactUsSEO[locale] : undefined;
  const _termsSEO = path === "terms" ? termsSEO[locale] : undefined;
  const _changelogSEO = path === "changelog" ? changelogSEO[locale] : undefined;
  const _textToolsSEO = path === "text" ? textToolsSEO[locale] : undefined;
  const _seoToolsSEO = path === "seo" ? seoToolsSEO[locale] : undefined;
  const _convertersSEO =
    path === "converters" ? convertersSEO[locale] : undefined;
  const _jsonToolsSEO = path === "json" ? jsonToolsSEO[locale] : undefined;
  const _devToolsSEO = path === "dev" ? devToolsSEO[locale] : undefined;

  // Merge configurations in order of priority: default < tool-specific < page-specific
  const mergedConfig = {
    ...defaultSEO[locale],
    ...(path === "not-found" ? notFoundSEO[locale] : {}),
    ...toolSEO,
    ...config,
    ..._privacyPolicySEO,
    ..._contactUsSEO,
    ..._termsSEO,
    ..._changelogSEO,
    ..._textToolsSEO,
    ..._seoToolsSEO,
    ..._convertersSEO,
    ..._jsonToolsSEO,
    ..._devToolsSEO,
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
    title:
      "RocksDev Tools - Free Online Developer Tools for JSON, SEO, Code & More",
    description:
      "Free online developer tools including JSON formatter, validator, minifier, diff, Base64 converter, regex tester, SEO tools, and more. No signup required, instant access.",
    keywords: [
      // Primary keywords
      "developer tools",
      "online developer tools",
      "free developer tools",
      "web development tools",
      "coding tools",
      "programming tools",
      "software development tools",

      // JSON tools
      "json tools",
      "json formatter",
      "json validator",
      "json minifier",
      "json diff",
      "json parser",
      "format json online",
      "validate json online",
      "minify json online",
      "compare json files",
      "parse json string",

      // Conversion tools
      "base64 converter",
      "base64 encoder",
      "base64 decoder",
      "convert base64 online",
      "markdown to html converter",
      "json to java bean converter",

      // Developer tools
      "regex tester",
      "regex validator",
      "test regex online",
      "app icon generator",
      "ai sql generator",

      // SEO tools
      "seo tools",
      "meta tags generator",
      "og image generator",
      "open graph generator",
      "social media preview generator",

      // Text tools
      "text formatter",
      "text processing tools",

      // Feature keywords
      "code formatter",
      "online code tools",
      "web tools",
      "browser-based tools",

      // User intent keywords
      "format json online",
      "validate json online",
      "test regex online",
      "convert base64 online",
      "generate og images",
      "create meta tags",

      // Characteristics
      "free tools",
      "no signup required",
      "instant tools",
      "privacy focused",
      "client-side processing",
      "open source tools",
      "developer utilities",
    ],
    openGraph: {
      type: "website",
      siteName: "RocksDev Tools",
      title:
        "RocksDev Tools - Free Online Developer Tools for JSON, SEO, Code & More",
      description:
        "Free online developer tools including JSON formatter, validator, minifier, diff, Base64 converter, regex tester, SEO tools, and more. No signup required, instant access.",
      images: [`/api/og`],
      url: process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools",
    },
    twitter: {
      card: "summary_large_image",
      site: "@rocksdevtools",
      creator: "@tszhim_tech",
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
      {
        name: "robots",
        content: "index, follow",
      },
      {
        name: "googlebot",
        content: "index, follow",
      },
      {
        property: "og:locale",
        content: "en_US",
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
  },
  "zh-CN": {
    title: "RocksDev.Tools - 免费在线开发者工具，JSON、SEO、代码处理等",
    description:
      "免费在线开发者工具，包括JSON格式化器、验证器、压缩器、差异比较工具、Base64转换器、正则表达式测试器、SEO工具等。无需注册，即时访问。",
    keywords: [
      // Primary keywords
      "开发工具",
      "在线开发工具",
      "免费开发工具",
      "网页开发工具",
      "编程工具",
      "软件开发工具",

      // JSON tools
      "JSON工具",
      "JSON格式化工具",
      "JSON验证器",
      "JSON压缩器",
      "JSON差异比较",
      "JSON解析器",
      "在线格式化JSON",
      "在线验证JSON",
      "在线压缩JSON",
      "比较JSON文件",
      "解析JSON字符串",

      // Conversion tools
      "Base64转换器",
      "Base64编码器",
      "Base64解码器",
      "在线转换Base64",
      "Markdown转HTML转换器",
      "JSON转Java Bean转换器",

      // Developer tools
      "正则表达式测试器",
      "正则表达式验证器",
      "在线测试正则表达式",
      "应用图标生成器",
      "AI SQL生成器",

      // SEO tools
      "SEO工具",
      "元标签生成器",
      "OG图像生成器",
      "开放图谱生成器",
      "社交媒体预览生成器",

      // Text tools
      "文本格式化器",
      "文本处理工具",

      // Feature keywords
      "代码格式化",
      "在线代码工具",
      "网页工具",
      "浏览器端工具",

      // User intent keywords
      "在线格式化JSON",
      "在线验证JSON",
      "在线测试正则表达式",
      "在线转换Base64",
      "生成OG图像",
      "创建元标签",

      // Characteristics
      "免费工具",
      "无需注册",
      "即时工具",
      "注重隐私",
      "客户端处理",
      "开源工具",
      "开发者实用程序",
    ],

    openGraph: {
      type: "website",
      siteName: "RocksDev.Tools",
      title: "RocksDev.Tools - 免費在線開發者工具，JSON、SEO、代碼處理等",
      description:
        "免費在線開發者工具，包括JSON格式化器、驗證器、壓縮器、差異比較工具、Base64轉換器、Regex測試器、SEO工具等。無需註冊，即時訪問。",
      images: [`/api/og`],
      url: process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools",
    },
    twitter: {
      card: "summary_large_image",
      site: "@rocksdevtools",
      creator: "@tszhim_tech",
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
        content: "RocksDev.Tools",
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
    title: "RocksDev.Tools - 免費在線開發者工具，JSON、SEO、代碼處理等",
    description:
      "免費在線開發者工具，包括JSON格式化器、驗證器、壓縮器、差異比較工具、Base64轉換器、Regex測試器、SEO工具等。無需註冊，即時訪問。",
    keywords: [
      // Primary keywords
      "開發工具",
      "在線開發工具",
      "免費開發工具",
      "網頁開發工具",
      "編程工具",
      "軟件開發工具",

      // JSON tools
      "JSON工具",
      "JSON格式化工具",
      "JSON驗證器",
      "JSON壓縮器",
      "JSON差異比較",
      "JSON解析器",
      "在線格式化JSON",
      "在線驗證JSON",
      "在線壓縮JSON",
      "比較JSON文件",
      "解析JSON字符串",

      // Conversion tools
      "Base64轉換器",
      "Base64編碼器",
      "Base64解碼器",
      "在線轉換Base64",
      "Markdown轉HTML轉換器",
      "JSON轉Java Bean轉換器",

      // Developer tools
      "Regex測試器",
      "Regex驗證器",
      "在線測試Regex",
      "應用圖標生成器",
      "AI SQL生成器",

      // SEO tools
      "SEO工具",
      "元標籤生成器",
      "OG圖像生成器",
      "開放圖譜生成器",
      "社交媒體預覽生成器",

      // Text tools
      "文本格式化器",
      "文本處理工具",

      // Feature keywords
      "代碼格式化",
      "在線代碼工具",
      "網頁工具",
      "瀏覽器端工具",

      // User intent keywords
      "在線格式化JSON",
      "在線驗證JSON",
      "在線測試Regex",
      "在線轉換Base64",
      "生成OG圖像",
      "創建元標籤",

      // Characteristics
      "免費工具",
      "無需註冊",
      "即時工具",
      "注重隱私",
      "客戶端處理",
      "開源工具",
      "開發者實用程序",
    ],

    openGraph: {
      type: "website",
      siteName: "RocksDev.Tools",
      title: "RocksDev.Tools - 免費在線開發者工具，JSON、SEO、代碼處理等",
      description:
        "免費在線開發者工具，包括JSON格式化器、驗證器、壓縮器、差異比較工具、Base64轉換器、Regex測試器、SEO工具等。無需註冊，即時訪問。",
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
        content: "RocksDev.Tools",
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
    keywords: defaultSEO[locale].keywords?.join(", "),
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
    softwareHelp: {
      "@type": "CreativeWork",
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools"}/${locale !== "en" ? `${locale}/` : ""}help`,
    },
    softwareVersion: "1.0.0",
    potentialAction: {
      "@type": "UseAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || "https://rocksdev.tools"}${locale !== "en" ? `/${locale}` : ""}`,
        inLanguage: locale,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
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
    title: "页面未找到 | RocksDev.Tools",
    description: "您正在寻找的页面可能已被删除、名称已更改或暂时不可用。",
  },
  "zh-HK": {
    title: "頁面未找到 | RocksDev.Tools",
    description: "您正在尋找的頁面可能已被刪除、名稱已更改或暫時不可用。",
  },
};

export const privacyPolicySEO: Record<string, SEOConfig> = {
  en: {
    title: "Privacy Policy | RocksDev Tools",
    description:
      "Learn how RocksDev Tools protects your privacy and personal data.",
  },
  "zh-CN": {
    title: "隐私政策 | RocksDev.Tools",
    description: "了解 RocksDev 工具如何保护您的隐私和个人数据。",
  },
  "zh-HK": {
    title: "隱私政策 | RocksDev.Tools",
    description: "了解 RocksDev 工具如何保護您的隱私和個人資料。",
  },
};

export const contactUsSEO: Record<string, SEOConfig> = {
  en: {
    title: "Contact Us | RocksDev Tools",
    description: "Contact RocksDev Tools for any questions or suggestions.",
  },
  "zh-CN": {
    title: "联系我们 | RocksDev.Tools",
    description: "联系 RocksDev.Tools以提出任何问题或建议。",
  },
  "zh-HK": {
    title: "聯絡我們 | RocksDev.Tools",
    description: "聯絡 RocksDev.Tools以提出任何問題或建議。",
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
      title: "JSON 格式化工具 | RocksDev.Tools",
      description:
        "使用我们强大的在线 JSON 格式化工具来格式化、验证和美化您的 JSON。包括语法高亮、错误检测等功能。",
      keywords: [
        "JSON格式化",
        "JSON美化器",
        "JSON验证器",
        "在线JSON格式化",
        "JSON格式化工具",
        "JSON编辑器",
        "JSON stringify",
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
      title: "JSON 格式化工具 | RocksDev.Tools",
      description:
        "使用我們強大的在線 JSON 格式化工具來格式化、驗證和美化您的 JSON。包括語法高亮、錯誤檢測等功能。",
      keywords: [
        "JSON格式化",
        "JSON美化器",
        "JSON驗證器",
        "在線JSON格式化",
        "JSON格式化工具",
        "JSON編輯器",
        "JSON stringify",
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
      title: "JSON 验证工具 | RocksDev.Tools",
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
      title: "JSON 驗證工具 | RocksDev.Tools",
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
      title: "JSON Diff Tool - Compare JSON Objects Online | RocksDev Tools",
      description:
        "Free online JSON comparison tool. Compare two JSON objects, find differences, track changes, and analyze JSON data structures. Features include visual diff highlighting, nested object comparison, and export options.",
      keywords: [
        "json diff",
        "json compare",
        "json difference checker",
        "json comparison tool",
        "compare json objects",
        "json diff viewer",
        "online json diff",
        "json structure comparison",
        "json change tracker",
        "nested json comparison",
      ],
      openGraph: {
        title: "JSON Diff - Visual JSON Comparison Tool",
        description:
          "Compare JSON objects and visualize differences with our free online JSON diff tool. Perfect for developers tracking changes in JSON data.",
        type: "website",
        images: [`/api/og?title=JSON%20Diff`],
      },
      additionalMetaTags: [
        {
          name: "application-name",
          content: "RocksDev JSON Diff",
        },
        {
          name: "format-detection",
          content: "telephone=no",
        },
        {
          property: "article:tag",
          content: "JSON, Development Tools, Code Comparison",
        },
      ],
    },
    "zh-CN": {
      title: "JSON 差异对比工具 - 在线比较 JSON 对象 | RocksDev Tools",
      description:
        "免费的在线 JSON 比较工具。对比两个 JSON 对象，查找差异，跟踪更改，分析 JSON 数据结构。功能包括可视化差异突出显示，嵌套对象比较和导出选项。",
      keywords: [
        "json比较",
        "json对比",
        "json差异检查器",
        "json比较工具",
        "比较json对象",
        "json差异查看器",
        "在线json比较",
        "json结构比较",
        "json变更跟踪",
        "嵌套json比较",
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
      title: "JSON 差異對比工具 | RocksDev.Tools",
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
      title: "JSON 压缩工具 | RocksDev.Tools",
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
      title: "JSON Minifier | RocksDev.Tools",
      description:
        "使用我們強大的在線 JSON 壓縮工具立即壓縮您的 JSON 數據。在保持數據完整性的同時減小文件大小，完美用於優化和部署。",
      keywords: [
        // Primary keywords
        "json壓縮工具",
        "json壓縮器",
        "json最小化",
        "json文件壓縮",
        "json minifier",

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
        title: "JSON Minifier - 在線壓縮 JSON 數據",
        description:
          "免費的在線 JSON Minifier，壓縮和優化您的 JSON 數據。刪除空白並減小文件大小，同時保持數據完整性。",
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
      title: "Base64 轉換器 | RocksDev.Tools",
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
      title: "Base64 轉換器 | RocksDev.Tools",
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
      title: "Regex測試工具 | RocksDev.Tools",
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
      title: "Regex測試工具 | RocksDev.Tools",
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
        creator: "@tszhim_tech",
      },
    },
    "zh-CN": {
      title: "OG图像生成器 | 社交媒体预览图片生成工具 | RocksDev.Tools",
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
        siteName: "RocksDev.Tools",
      },
      twitter: {
        card: "summary_large_image",
        site: "@rocksdevtools",
        creator: "@tszhim_tech",
      },
    },
    "zh-HK": {
      title: "OG圖像生成器 | 社交媒體預覽圖片生成工具 | RocksDev.Tools",
      description:
        "創建專業的Open Graph（OG）圖像，用於社會媒體預覽。免費在線工具，可生成、裁剪和優化Facebook、Twitter、LinkedIn等社交卡片圖像。",
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
        siteName: "RocksDev.Tools",
      },
      twitter: {
        card: "summary_large_image",
        site: "@rocksdevtools",
        creator: "@tszhim_tech",
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
      title: "文本格式化器 | RocksDev.Tools",
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
      title: "文本格式化器 | RocksDev.Tools",
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
  "seo.meta-tags": {
    en: {
      title:
        "Meta Tags Generator | Create SEO & Social Media Tags | RocksDev Tools",
      description:
        "Free online Meta Tags Generator for SEO optimization. Create perfect meta tags for search engines (Google, Bing) and social media (Facebook, Twitter, LinkedIn). Features include title tag optimization, meta descriptions, Open Graph tags, Twitter Cards, and real-time preview.",
      keywords: [
        // Primary keywords
        "meta tags generator",
        "meta tag creator",
        "seo meta tags",
        "social media tags",

        // Feature keywords
        "open graph generator",
        "twitter card generator",
        "meta description generator",
        "title tag optimizer",

        // Platform-specific
        "facebook meta tags",
        "twitter meta tags",
        "google meta tags",
        "linkedin meta tags",

        // Technical keywords
        "html meta tags",
        "meta tag optimization",
        "seo tags",
        "og tags generator",

        // User intent keywords
        "create meta tags",
        "generate meta tags",
        "optimize meta tags",
        "meta tags for seo",

        // Action keywords
        "improve seo ranking",
        "boost social sharing",
        "enhance search visibility",
        "optimize website metadata",

        // Characteristics
        "free meta tags tool",
        "online meta generator",
        "instant meta preview",
        "meta tags best practices",
      ],
      openGraph: {
        type: "website",
        title: "Meta Tags Generator - Create SEO & Social Media Tags",
        description:
          "Free online tool to generate and optimize meta tags for SEO and social media. Create perfect meta tags for Google, Facebook, Twitter, and LinkedIn with real-time preview.",
        images: [`/api/og?title=Meta%20Tags%20Generator`],
      },
    },
    "zh-CN": {
      title: "Meta标签生成器 | SEO和社交媒体标签生成工具 | RocksDev.Tools",
      description:
        "专业的在线Meta标签生成工具，为搜索引擎（百度、Google）和社交媒体（微信、微博、知乎）优化您的网站。支持标题标签优化、Meta描述、Open Graph标签、Twitter卡片，并提供实时预览功能。",
      keywords: [
        // Primary keywords
        "meta标签生成器",
        "meta标签制作",
        "SEO标签生成器",
        "社交媒体标签",

        // Feature keywords
        "Open Graph生成器",
        "Twitter卡片生成器",
        "meta描述生成器",
        "标题标签优化",

        // Platform-specific
        "百度meta标签",
        "微信分享标签",
        "微博meta标签",
        "知乎meta标签",

        // Technical keywords
        "HTML meta标签",
        "meta标签优化",
        "SEO标签",
        "OG标签生成器",

        // User intent keywords
        "创建meta标签",
        "生成meta标签",
        "优化meta标签",
        "SEO元标签",

        // Action keywords
        "提升搜索排名",
        "优化社交分享",
        "提高搜索可见度",
        "优化网站元数据",

        // Characteristics
        "免费meta标签工具",
        "在线meta生成器",
        "即时meta预览",
        "meta标签最佳实践",
      ],
      openGraph: {
        type: "website",
        title: "Meta标签生成器 - 创建SEO和社交媒体标签",
        description:
          "免费在线工具，生成和优化用于SEO和社交媒体的Meta标签。为百度、Google、微信、微博创建完美的Meta标签，支持实时预览。",
        images: [`/api/og?title=Meta%20Tags%20Generator`],
      },
    },
    "zh-HK": {
      title: "Meta標籤生成器 | SEO和社交媒體標籤生成工具 | RocksDev.Tools",
      description:
        "專業的在線Meta標籤生成工具，為搜尋引擎（Google、Bing）和社交媒體（Facebook、Twitter、LinkedIn）優化您的網站。支援標題標籤優化、Meta描述、Open Graph標籤、Twitter卡片，並提供實時預覽功能。",
      keywords: [
        // Primary keywords
        "meta標籤生成器",
        "meta標籤製作",
        "SEO標籤生成器",
        "社交媒體標籤",

        // Feature keywords
        "Open Graph生成器",
        "Twitter卡片生成器",
        "meta描述生成器",
        "標題標籤優化",

        // Platform-specific
        "Google meta標籤",
        "Facebook分享標籤",
        "Twitter meta標籤",
        "LinkedIn meta標籤",

        // Technical keywords
        "HTML meta標籤",
        "meta標籤優化",
        "SEO標籤",
        "OG標籤生成器",

        // User intent keywords
        "創建meta標籤",
        "生成meta標籤",
        "優化meta標籤",
        "SEO元標籤",

        // Action keywords
        "提升搜尋排名",
        "優化社交分享",
        "提高搜尋可見度",
        "優化網站元數據",

        // Characteristics
        "免費meta標籤工具",
        "在線meta生成器",
        "即時meta預覽",
        "meta標籤最佳實踐",
      ],
      openGraph: {
        type: "website",
        title: "Meta標籤生成器 - 創建SEO和社交媒體標籤",
        description:
          "免費在線工具，生成和優化用於SEO和社交媒體的Meta標籤。為Google、Facebook、Twitter、LinkedIn創建完美的Meta標籤，支援實時預覽。",
        images: [`/api/og?title=Meta%20Tags%20Generator`],
      },
    },
  },
  "dev.app-icon": {
    en: {
      title:
        "Free App Icon Generator | Create iOS & Android Icons Effortlessly",
      description:
        "Easily generate app icons for iOS and Android with our free online tool. Resize, export, and create icons in all required sizes for App Store and Play Store submissions.",
      keywords: [
        "app icon generator",
        "free app icon maker",
        "ios app icon creator",
        "android app icon generator",
        "resize app icons online",
        "app icon design tool",
        "app store icon sizes",
        "play store icon sizes",
        "how to create app icons",
        "app icon dimensions guide",
        "icon format converter",
        "easy online icon maker",
      ],
      openGraph: {
        type: "website",
        title: "Free App Icon Generator - Create iOS & Android Icons Online",
        description:
          "Generate and resize app icons for iOS and Android quickly and easily. Perfect for App Store and Play Store submissions.",
        images: [`/api/og?title=App%20Icon%20Generator`],
      },
    },
    "zh-CN": {
      title: "免费APP图标生成器 | 轻松制作iOS和安卓图标",
      description:
        "使用我们的免费在线工具，轻松生成iOS和安卓应用图标。支持所有尺寸，完美符合App Store和Play Store的要求。",
      keywords: [
        "免费图标生成器",
        "iOS应用图标制作",
        "安卓应用图标生成",
        "在线图标设计工具",
        "图标尺寸调整工具",
        "应用商店图标规范",
        "如何制作应用图标",
        "图标格式转换器",
      ],
      openGraph: {
        type: "website",
        title: "免费APP图标生成器 - 在线制作iOS和安卓应用图标",
        description:
          "快速生成和调整iOS和安卓应用图标，完美支持App Store和Play Store发布要求。",
        images: [`/api/og?title=App%20Icon%20Generator`],
      },
    },
    "zh-HK": {
      title: "免費APP圖示產生器 | 輕鬆製作iOS和安卓圖示",
      description:
        "使用我們的免費線上工具，輕鬆製作iOS和安卓應用圖示。支持所有尺寸，完全符合App Store和Play Store的要求。",
      keywords: [
        "免費圖示產生器",
        "iOS應用圖示製作",
        "安卓應用圖示生成",
        "在線圖示設計工具",
        "圖示尺寸調整工具",
        "應用商店圖示規範",
      ],
      openGraph: {
        type: "website",
        title: "免費APP圖示產生器 - 線上製作iOS和安卓應用圖示",
        description:
          "快速生成和調整iOS及安卓應用圖示，完美支持App Store及Play Store發布要求。",
        images: [`/api/og?title=App%20Icon%20Generator`],
      },
    },
  },
  "dev.ai-sql": {
    en: {
      title: "AI SQL Generator | Smart Database Query Builder | RocksDev Tools",
      description:
        "Transform natural language and code into optimized SQL queries with our advanced AI-powered SQL generator. Features include multi-dialect support (MySQL, PostgreSQL, SQLite), intelligent query optimization, and real-time syntax validation. Perfect for developers, database administrators, and data analysts.",
      keywords: [
        // Primary keywords
        "ai sql generator",
        "sql query builder",
        "code to sql converter",
        "database query generator",

        // Technical features
        "mysql query generator",
        "postgresql query builder",
        "sqlite query creator",
        "sql optimization tool",

        // Use cases
        "database schema to sql",
        "entity relationship to sql",
        "typescript to sql converter",
        "json to sql transformation",

        // User roles
        "developer sql tool",
        "dba query builder",
        "data analyst sql helper",

        // Benefits
        "automated sql generation",
        "sql query optimization",
        "database performance tuning",
        "sql syntax validation",

        // Features
        "real-time sql preview",
        "multi dialect support",
        "query history tracking",
        "collaborative sql editing",
      ],
      openGraph: {
        type: "website",
        title: "AI SQL Generator - Transform Code to Optimized SQL Queries",
        description:
          "Convert code and natural language into efficient SQL queries with our AI-powered tool. Support for MySQL, PostgreSQL, SQLite, and more.",
        images: [`/api/og?title=AI%20SQL%20Generator`],
      },
      twitter: {
        card: "summary_large_image",
        site: "@rocksdevtools",
        creator: "@tszhim_tech",
        image: `/api/og?title=AI%20SQL%20Generator`,
      },
      additionalMetaTags: [
        {
          name: "application-name",
          content: "RocksDev AI SQL Generator",
        },
        {
          name: "format-detection",
          content: "telephone=no",
        },
        {
          property: "article:tag",
          content:
            "SQL Generation, Database Tools, AI Tools, Developer Utilities, AI SQL Generator",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "AI SQL Generator",
        },
      ],
    },
    "zh-CN": {
      title: "轻松将代码转换为SQL - AI SQL生成器",
      description:
        "使用我们的AI SQL生成器，轻松将代码转换为高效的SQL查询，节省时间，提高工作效率。",
      keywords: [
        "ai sql生成器",
        "代码转sql工具",
        "自动化sql生成",
        "ai代码转换器",
        "在线sql生成器",
        "ai sql工具",
      ],
      openGraph: {
        type: "website",
        title: "轻松将代码转换为SQL - AI SQL生成器",
        description: "使用我们的AI SQL生成器，轻松将代码转换为高效的SQL查询。",
        images: ["/api/og?title=AI%20SQL%20生成器"],
      },
    },
    "zh-HK": {
      title: "輕鬆將代碼轉換為SQL - AI SQL生成器",
      description:
        "使用我們的AI SQL生成器，輕鬆將代碼轉換為高效的SQL查詢，節省時間，提高工作效率。",
      keywords: [
        "ai sql生成器",
        "代碼轉sql工具",
        "自動化sql生成",
        "ai代碼轉換器",
        "在線sql生成器",
      ],
      openGraph: {
        type: "website",
        title: "輕鬆將代碼轉換為SQL - AI SQL生成器",
        description: "使用我們的AI SQL生成器，輕鬆將代碼轉換為高效的SQL查詢。",
        images: ["/api/og?title=AI%20SQL%20生成器"],
      },
    },
  },
  "converters.json-to-java-bean": {
    en: {
      title: "JSON to Java Bean Converter | RocksDev Tools",
      description:
        "Convert JSON to Java Bean with our free online tool. Supports Lombok and custom class names.",
      keywords: [
        "json to java bean converter",
        "json to java",
        "json to pojo",
        "json to lombok",
      ],
      openGraph: {
        type: "website",
        title: "JSON to Java Bean Converter - RocksDev Tools",
        description:
          "Convert JSON to Java Bean with our free online tool. Supports Lombok and custom class names.",
        images: [`/api/og?title=JSON%20to%20Java%20Bean%20Converter`],
      },
    },
    "zh-CN": {
      title: "JSON转Java Bean转换器 | RocksDev.Tools",
      description:
        "使用我们的免费在线工具，将JSON转换为Java Bean。支持Lombok和自定义类名。",
      keywords: [
        "json转java bean转换器",
        "json转java",
        "json转pojo",
        "json转lombok",
      ],
      openGraph: {
        type: "website",
        title: "JSON转Java Bean转换器 - RocksDev.Tools",
        description:
          "使用我们的免费在线工具，将JSON转换为Java Bean。支持Lombok和自定义类名。",
        images: [`/api/og?title=JSON%20to%20Java%20Bean%20Converter`],
      },
    },
    "zh-HK": {
      title: "JSON轉Java Bean轉換器 | RocksDev.Tools",
      description:
        "使用我們的免費線上工具，將JSON轉換為Java Bean。支持Lombok和自定義類名。",
      keywords: [
        "json轉java bean轉換器",
        "json轉java",
        "json轉pojo",
        "json轉lombok",
      ],
      openGraph: {
        type: "website",
        title: "JSON轉Java Bean轉換器 - RocksDev.Tools",
        description:
          "使用我們的免費線上工具，將JSON轉換為Java Bean。支持Lombok和自定義類名。",
        images: [`/api/og?title=JSON%20to%20Java%20Bean%20Converter`],
      },
    },
  },
  "json.parser": {
    en: {
      title:
        "JSON Parser & Stringify Tool | Convert JSON Online | RocksDev Tools",
      description:
        "Free online JSON Parser and Stringify tool. Convert between JSON strings and JavaScript objects, with support for minification, pretty printing, and Unicode escaping. Perfect for developers working with JSON data.",
      keywords: [
        // Primary keywords
        "json parser",
        "json stringify",
        "json converter",
        "json string converter",

        // Feature keywords
        "parse json online",
        "stringify json",
        "json pretty print",
        "json minify",
        "json escape unicode",

        // Technical keywords
        "json to object converter",
        "object to json converter",
        "json string formatter",
        "json whitespace remover",

        // User intent keywords
        "convert json to object",
        "convert object to json",
        "format json string",
        "minify json string",

        // Action keywords
        "parse json string",
        "stringify javascript object",
        "escape json quotes",
        "remove json whitespace",

        // Characteristics
        "free json parser",
        "online json tool",
        "instant json conversion",
        "json string manipulation",
      ],
      openGraph: {
        type: "website",
        title: "JSON Parser & Stringify - Convert JSON Online",
        description:
          "Free online tool to parse JSON strings into objects and stringify JavaScript objects into JSON format. Features include minification, pretty printing, and Unicode escaping.",
        images: [`/api/og?title=JSON%20Parser%20%26%20Stringify`],
      },
    },
    "zh-CN": {
      title:
        "JSON stringify 和 JSON parse 工具 | 在线转换 JSON | RocksDev.Tools",
      description:
        "免费的在线 JSON stringify和字符串化工具。在 JSON 字符串和 JSON 对象之间转换，支持压缩、美化和 Unicode 转义。为开发者处理 JSON 数据提供完美解决方案。",
      keywords: [
        // Primary keywords
        "json stringify",
        "json字符串化",
        "json转换器",
        "json字符串转换",

        // Feature keywords
        "在线解析json",
        "json字符串化",
        "json美化",
        "json压缩",
        "json unicode转义",

        // Technical keywords
        "json转对象",
        "对象转json",
        "json字符串格式化",
        "json空格移除",

        // User intent keywords
        "json转换对象",
        "对象转换json",
        "格式化json字符串",
        "压缩json字符串",

        // Action keywords
        "解析json字符串",
        "字符串化javascript对象",
        "转义json引号",
        "移除json空格",

        // Characteristics
        "免费json stringify",
        "在线json工具",
        "即时json转换",
        "json字符串处理",
      ],
      openGraph: {
        type: "website",
        title: "JSON stringify 和 JSON parse - 在线转换 JSON",
        description:
          "免费在线工具，将 JSON 字符串解析为对象，并将 JSON 对象字符串化为 JSON 格式。功能包括压缩、美化和 Unicode 转义。",
        images: [`/api/og?title=JSON%20Parser%20%26%20Stringify`],
      },
    },
    "zh-HK": {
      title:
        "JSON stringify 和 JSON parse 工具 | 在線轉換 JSON | RocksDev.Tools",
      description:
        "免費的在線 JSON stringify 和 JSON parse 工具。在 JSON 字串和 JSON 物件之間轉換，支援壓縮、美化和 Unicode 轉義。為開發者處理 JSON 數據提供完美解決方案。",
      keywords: [
        // Primary keywords
        "json stringify",
        "json字串化",
        "json轉換器",
        "json字串轉換",

        // Feature keywords
        "在線解析json",
        "json字串化",
        "json美化",
        "json壓縮",
        "json unicode轉義",

        // Technical keywords
        "json轉物件",
        "物件轉json",
        "json字串格式化",
        "json空白移除",

        // User intent keywords
        "json轉換物件",
        "物件轉換json",
        "格式化json字串",
        "壓縮json字串",

        // Action keywords
        "解析json字串",
        "字串化javascript物件",
        "轉義json引號",
        "移除json空白",

        // Characteristics
        "免費json stringify",
        "在線json工具",
        "即時json轉換",
        "json字串處理",
      ],
      openGraph: {
        type: "website",
        title: "JSON stringify 和 JSON parse - 在線轉換 JSON",
        description:
          "免費在線工具，將 JSON 字串解析為物件，並將 JSON 物件字串化為 JSON 格式。功能包括壓縮、美化和 Unicode 轉義。",
        images: [`/api/og?title=JSON%20Parser%20%26%20Stringify`],
      },
    },
  },
  "dev.jwt": {
    en: {
      title: "JWT Decoder/Encoder | Secure Token Processing | RocksDev Tools",
      description:
        "Free online JWT Decoder and Encoder tool. Decode JWT tokens to view header and payload, or encode your own JWT tokens with custom secrets. Supports HS256, HS384, and HS512 algorithms.",
      keywords: [
        // Primary keywords
        "jwt decoder",
        "jwt encoder",
        "jwt token decoder",
        "jwt token encoder",
        "jwt converter",

        // Feature keywords
        "decode jwt online",
        "encode jwt online",
        "jwt header decoder",
        "jwt payload decoder",
        "jwt signature verifier",

        // Technical keywords
        "jwt token parser",
        "jwt token generator",
        "hs256 jwt",
        "hs384 jwt",
        "hs512 jwt",
        "json web token",

        // Security keywords
        "jwt security",
        "token encryption",
        "jwt authentication",
        "oauth jwt",

        // User intent keywords
        "view jwt token contents",
        "create jwt token",
        "inspect jwt header",
        "inspect jwt payload",

        // Action keywords
        "parse jwt token",
        "generate jwt token",
        "verify jwt signature",
        "extract jwt claims",

        // Characteristics
        "free jwt tool",
        "online jwt decoder",
        "instant jwt processing",
        "client-side jwt tool",
      ],
      openGraph: {
        type: "website",
        title: "JWT Decoder/Encoder - Process JSON Web Tokens Online",
        description:
          "Free online tool to decode and encode JWT tokens. View token headers and payloads or create your own JWT tokens with custom secrets.",
        images: [`/api/og?title=JWT%20Decoder%2FEncoder`],
      },
    },
    "zh-CN": {
      title: "JWT 解码器/编码器 | 安全令牌处理 | RocksDev.Tools",
      description:
        "免费的在线 JWT 解码器和编码器工具。解码 JWT 令牌以查看头部和载荷，或使用自定义密钥编码您自己的 JWT 令牌。支持 HS256、HS384 和 HS512 算法。",
      keywords: [
        // Primary keywords
        "jwt解码器",
        "jwt编码器",
        "jwt令牌解码器",
        "jwt令牌编码器",
        "jwt转换器",

        // Feature keywords
        "在线解码jwt",
        "在线编码jwt",
        "jwt头部解码器",
        "jwt载荷解码器",
        "jwt签名验证器",

        // Technical keywords
        "jwt令牌解析器",
        "jwt令牌生成器",
        "hs256 jwt",
        "hs384 jwt",
        "hs512 jwt",
        "json网络令牌",

        // Security keywords
        "jwt安全",
        "令牌加密",
        "jwt认证",
        "oauth jwt",

        // User intent keywords
        "查看jwt令牌内容",
        "创建jwt令牌",
        "检查jwt头部",
        "检查jwt载荷",

        // Action keywords
        "解析jwt令牌",
        "生成jwt令牌",
        "验证jwt签名",
        "提取jwt声明",

        // Characteristics
        "免费jwt工具",
        "在线jwt解码器",
        "即时jwt处理",
        "客户端jwt工具",
      ],
      openGraph: {
        type: "website",
        title: "JWT 解码器/编码器 - 在线处理 JSON Web 令牌",
        description:
          "免费在线工具，用于解码和编码 JWT 令牌。查看令牌头部和载荷，或使用自定义密钥创建您自己的 JWT 令牌。",
        images: [`/api/og?title=JWT%20Decoder%2FEncoder`],
      },
    },
    "zh-HK": {
      title: "JWT 解碼器/編碼器 | 安全令牌處理 | RocksDev.Tools",
      description:
        "免費的在線 JWT 解碼器和編碼器工具。解碼 JWT 令牌以查看頭部和載荷，或使用自定義金鑰編碼您自己的 JWT 令牌。支持 HS256、HS384 和 HS512 算法。",
      keywords: [
        // Primary keywords
        "jwt解碼器",
        "jwt編碼器",
        "jwt令牌解碼器",
        "jwt令牌編碼器",
        "jwt轉換器",

        // Feature keywords
        "在線解碼jwt",
        "在線編碼jwt",
        "jwt頭部解碼器",
        "jwt載荷解碼器",
        "jwt簽名驗證器",

        // Technical keywords
        "jwt令牌解析器",
        "jwt令牌生成器",
        "hs256 jwt",
        "hs384 jwt",
        "hs512 jwt",
        "json網絡令牌",

        // Security keywords
        "jwt安全",
        "令牌加密",
        "jwt認證",
        "oauth jwt",

        // User intent keywords
        "查看jwt令牌內容",
        "創建jwt令牌",
        "檢查jwt頭部",
        "檢查jwt載荷",

        // Action keywords
        "解析jwt令牌",
        "生成jwt令牌",
        "驗證jwt簽名",
        "提取jwt聲明",

        // Characteristics
        "免費jwt工具",
        "在線jwt解碼器",
        "即時jwt處理",
        "客戶端jwt工具",
      ],
      openGraph: {
        type: "website",
        title: "JWT 解碼器/編碼器 - 在線處理 JSON Web 令牌",
        description:
          "免費在線工具，用於解碼和編碼 JWT 令牌。查看令牌頭部和載荷，或使用自定義金鑰創建您自己的 JWT 令牌。",
        images: [`/api/og?title=JWT%20Decoder%2FEncoder`],
      },
    },
  },
};

export const termsSEO: Record<string, SEOConfig> = {
  en: {
    title: "Terms of Service | RocksDev Tools",
    description:
      "Read our Terms of Service to understand your rights and responsibilities when using RocksDev Tools. Our terms outline usage conditions, privacy practices, and legal requirements.",
    keywords: [
      "terms of service",
      "legal terms",
      "user agreement",
      "service conditions",
      "privacy terms",
      "developer tools terms",
      "usage policy",
      "legal agreement",
      "service terms",
      "user rights",
      "user responsibilities",
    ],
    openGraph: {
      type: "website",
      title: "Terms of Service - RocksDev Tools",
      description:
        "Read our Terms of Service to understand your rights and responsibilities when using RocksDev Tools.",
      images: [`/api/og?title=Terms%20of%20Service`],
    },
  },
  "zh-CN": {
    title: "服务条款 | RocksDev.Tools",
    description:
      "阅读我们的服务条款，了解使用 RocksDev 工具时的权利和责任。我们的条款概述了使用条件、隐私实践和法律要求。",
    keywords: [
      "服务条款",
      "法律条款",
      "用户协议",
      "服务条件",
      "隐私条款",
      "开发者工具条款",
      "使用政策",
      "法律协议",
      "服务条款",
      "用户权利",
      "用户责任",
    ],
    openGraph: {
      type: "website",
      title: "服务条款 - RocksDev.Tools",
      description: "阅读我们的服务条款，了解使用 RocksDev 工具时的权利和责任。",
      images: [`/api/og?title=Terms%20of%20Service`],
    },
  },
  "zh-HK": {
    title: "服務條款 | RocksDev.Tools",
    description:
      "閱讀我們的服務條款，了解使用 RocksDev 工具時的權利和責任。我們的條款概述了使用條件、隱私實踐和法律要求。",
    keywords: [
      "服務條款",
      "法律條款",
      "用戶協議",
      "服務條件",
      "隱私條款",
      "開發者工具條款",
      "使用政策",
      "法律協議",
      "服務條款",
      "用戶權利",
      "用戶責任",
    ],
    openGraph: {
      type: "website",
      title: "服務條款 - RocksDev.Tools",
      description: "閱讀我們的服務條款，了解使用 RocksDev 工具時的權利和責任。",
      images: [`/api/og?title=Terms%20of%20Service`],
    },
  },
};

export const changelogSEO: Record<string, SEOConfig> = {
  en: {
    title: "Changelog | RocksDev.Tools",
    description:
      "Stay up to date with the latest updates and improvements to RocksDev Tools. View our changelog to see new features, bug fixes, and enhancements.",
    keywords: [
      "changelog",
      "updates",
      "release notes",
      "version history",
      "new features",
      "improvements",
      "bug fixes",
      "developer tools updates",
      "software changes",
      "product updates",
    ],
    openGraph: {
      type: "website",
      title: "Changelog - RocksDev.Tools",
      description:
        "Stay up to date with the latest updates and improvements to RocksDev.Tools.",
      images: [`/api/og?title=Changelog`],
    },
  },
  "zh-CN": {
    title: "更新日志 | RocksDev.Tools",
    description:
      "了解 RocksDev Tools 的最新更新和改进。查看我们的更新日志以了解新功能、错误修复和增强功能。",
    keywords: [
      "更新日志",
      "更新",
      "发布说明",
      "版本历史",
      "新功能",
      "改进",
      "错误修复",
      "开发者工具更新",
      "软件变更",
      "产品更新",
    ],
    openGraph: {
      type: "website",
      title: "更新日志 - RocksDev.Tools",
      description: "了解 RocksDev Tools 的最新更新和改进。",
      images: [`/api/og?title=Changelog`],
    },
  },
  "zh-HK": {
    title: "更新日誌 | RocksDev.Tools",
    description:
      "了解 RocksDev Tools 的最新更新和改進。查看我們的更新日誌以了解新功能、錯誤修復和增強功能。",
    keywords: [
      "更新日誌",
      "更新",
      "發布說明",
      "版本歷史",
      "新功能",
      "改進",
      "錯誤修復",
      "開發者工具更新",
      "軟件變更",
      "產品更新",
    ],
    openGraph: {
      type: "website",
      title: "更新日誌 - RocksDev.Tools",
      description: "了解 RocksDev Tools 的最新更新和改進。",
      images: [`/api/og?title=Changelog`],
    },
  },
};

export const textToolsSEO: Record<string, SEOConfig> = {
  en: {
    title:
      "Text Tools Online - Formatter, Case Converter & More | RocksDev Tools",
    description:
      "Free online text tools including text formatter, case converter, and character counter. Process and manipulate text efficiently with no signup required.",
    keywords: [
      "text tools",
      "text processing",
      "text formatter",
      "case converter",
      "character counter",
      "text manipulation",
      "string manipulation",
      "text utilities",
      "content processing",
      "text editing tools",
      "free text tools",
      "online text processor",
    ],
    openGraph: {
      type: "website",
      title:
        "Text Tools Online - Formatter, Case Converter & More | RocksDev Tools",
      description:
        "Free online text tools including text formatter, case converter, and character counter. Process and manipulate text efficiently with no signup required.",
      images: [`/api/og?title=Text%20Tools`],
    },
  },
  "zh-CN": {
    title: "文本工具 | RocksDev.Tools",
    description:
      "探索我们的文本工具集，用于高效文本处理。从字符计数到文本格式化，我们的工具帮助您轻松管理文本。",
    keywords: ["文本工具", "文本处理", "字符计数", "文本格式化", "文本操作"],
    openGraph: {
      type: "website",
      title: "文本工具 - RocksDev.Tools",
      description:
        "探索我们的文本工具集，用于高效文本处理。从字符计数到文本格式化，我们的工具帮助您轻松管理文本。",
      images: [`/api/og?title=Text%20Tools`],
    },
  },
  "zh-HK": {
    title: "文本工具 | RocksDev.Tools",
    description:
      "探索我們的文本工具集，用於高效文本處理。從字符計數到文本格式化，我們的工具幫助您輕鬆管理文本。",
    keywords: ["文本工具", "文本處理", "字符計數", "文本格式化", "文本操作"],
    openGraph: {
      type: "website",
      title: "文本工具 - RocksDev.Tools",
      description:
        "探索我們的文本工具集，用於高效文本處理。從字符計數到文本格式化，我們的工具幫助您輕鬆管理文本。",
      images: [`/api/og?title=Text%20Tools`],
    },
  },
};

export const seoToolsSEO: Record<string, SEOConfig> = {
  en: {
    title:
      "SEO Tools Online - Meta Tags Generator, OG Image Creator | RocksDev Tools",
    description:
      "Free online SEO tools including meta tags generator and OG image generator. Optimize your website for search engines and social media with instant results.",
    keywords: [
      "seo tools",
      "seo optimization tools",
      "meta tags generator",
      "og image generator",
      "open graph generator",
      "social media preview generator",
      "search engine optimization",
      "website optimization",
      "meta description generator",
      "title tag optimizer",
      "twitter card generator",
      "facebook meta tags",
      "linkedin meta tags",
      "free seo tools",
      "online seo tools",
    ],
    openGraph: {
      type: "website",
      title:
        "SEO Tools Online - Meta Tags Generator, OG Image Creator | RocksDev Tools",
      description:
        "Free online SEO tools including meta tags generator and OG image generator. Optimize your website for search engines and social media with instant results.",
      images: [`/api/og?title=SEO%20Tools`],
    },
  },
  "zh-CN": {
    title: "SEO工具 | RocksDev.Tools",
    description:
      "探索我们的SEO工具集，用于高效SEO处理。从关键词分析到内容优化，我们的工具帮助您轻松管理SEO。",
    keywords: ["seo工具", "seo处理", "关键词分析", "内容优化", "seo工具"],
    openGraph: {
      type: "website",
      title: "SEO Tools - RocksDev.Tools",
      description:
        "探索我们的SEO工具集，用于高效SEO处理。从关键词分析到内容优化，我们的工具帮助您轻松管理SEO。",
      images: [`/api/og?title=SEO%20Tools`],
    },
  },
  "zh-HK": {
    title: "SEO工具 | RocksDev.Tools",
    description:
      "探索我們的SEO工具集，用於高效SEO處理。從關鍵詞分析到內容優化，我們的工具幫助您輕鬆管理SEO。",
    keywords: ["seo工具", "seo處理", "關鍵詞分析", "內容優化", "seo工具"],
    openGraph: {
      type: "website",
      title: "SEO Tools - RocksDev.Tools",
      description:
        "探索我們的SEO工具集，用於高效SEO處理。從關鍵詞分析到內容優化，我們的工具幫助您輕鬆管理SEO。",
      images: [`/api/og?title=SEO%20Tools`],
    },
  },
};

export const convertersSEO: Record<string, SEOConfig> = {
  en: {
    title:
      "Online Converters - Base64, JSON to Java, Markdown | RocksDev Tools",
    description:
      "Free online conversion tools including Base64 encoder/decoder, JSON to Java Bean converter, and Markdown to HTML converter. Instant conversions with no signup required.",
    keywords: [
      "converters",
      "conversion tools",
      "base64 converter",
      "base64 encoder",
      "base64 decoder",
      "json to java bean converter",
      "markdown to html converter",
      "text converter",
      "file converter",
      "data converter",
      "encoding tools",
      "decoding tools",
      "free conversion tools",
      "online converters",
    ],
    openGraph: {
      type: "website",
      title:
        "Online Converters - Base64, JSON to Java, Markdown | RocksDev Tools",
      description:
        "Free online conversion tools including Base64 encoder/decoder, JSON to Java Bean converter, and Markdown to HTML converter. Instant conversions with no signup required.",
      images: [`/api/og?title=Converters`],
    },
  },
  "zh-CN": {
    title: "转换器 | RocksDev.Tools",
    description:
      "探索我们的转换器工具集，用于高效转换任务。从文本到JSON，我们的工具帮助您轻松管理转换。",
    keywords: ["转换器", "转换工具", "文本到JSON", "文本到CSV", "文本到XML"],
    openGraph: {
      type: "website",
      title: "转换器 - RocksDev.Tools",
      description:
        "探索我们的转换器工具集，用于高效转换任务。从文本到JSON，我们的工具帮助您轻松管理转换。",
      images: [`/api/og?title=Converters`],
    },
  },
  "zh-HK": {
    title: "轉換器 | RocksDev.Tools",
    description:
      "探索我們的轉換器工具集，用於高效轉換任務。從文本到JSON，我們的工具幫助您輕鬆管理轉換。",
    keywords: ["轉換器", "轉換工具", "文本到JSON", "文本到CSV", "文本到XML"],
    openGraph: {
      type: "website",
      title: "轉換器 - RocksDev.Tools",
      description:
        "探索我們的轉換器工具集，用於高效轉換任務。從文本到JSON，我們的工具幫助您輕鬆管理轉換。",
      images: [`/api/og?title=Converters`],
    },
  },
};

export const jsonToolsSEO: Record<string, SEOConfig> = {
  en: {
    title:
      "JSON Tools Online - Formatter, Validator, Minifier & Diff | RocksDev Tools",
    description:
      "Free online JSON tools including formatter, validator, minifier, diff, and parser. Format, validate, compress, and compare JSON data instantly with no signup required.",
    keywords: [
      "json tools",
      "json processing",
      "json formatter",
      "json validator",
      "json minifier",
      "json diff",
      "json parser",
      "json stringify",
      "format json online",
      "validate json online",
      "minify json online",
      "compare json files",
      "parse json string",
      "json beautifier",
      "json syntax highlighter",
      "json editor",
      "json checker",
      "json analyzer",
      "free json tools",
      "online json processor",
    ],
    openGraph: {
      type: "website",
      title:
        "JSON Tools Online - Formatter, Validator, Minifier & Diff | RocksDev Tools",
      description:
        "Free online JSON tools including formatter, validator, minifier, diff, and parser. Format, validate, compress, and compare JSON data instantly with no signup required.",
      images: [`/api/og?title=JSON%20Tools`],
    },
  },
  "zh-CN": {
    title: "JSON工具 | RocksDev.Tools",
    description:
      "探索我们的JSON工具集，用于高效JSON处理。从JSON到CSV，我们的工具帮助您轻松管理JSON。",
    keywords: ["json工具", "json处理", "json到csv", "json到xml", "json到json"],
    openGraph: {
      type: "website",
      title: "JSON Tools - RocksDev.Tools",
      description:
        "探索我们的JSON工具集，用于高效JSON处理。从JSON到CSV，我们的工具帮助您轻松管理JSON。",
      images: [`/api/og?title=JSON%20Tools`],
    },
  },
  "zh-HK": {
    title: "JSON工具 | RocksDev.Tools",
    description:
      "探索我們的JSON工具集，用於高效JSON處理。從JSON到CSV，我們的工具幫助您輕鬆管理JSON。",
    keywords: ["json工具", "json处理", "json到csv", "json到xml", "json到json"],
    openGraph: {
      type: "website",
      title: "JSON Tools - RocksDev.Tools",
      description:
        "探索我們的JSON工具集，用於高效JSON處理。從JSON到CSV，我們的工具幫助您輕鬆管理JSON。",
      images: [`/api/og?title=JSON%20Tools`],
    },
  },
};

export const devToolsSEO: Record<string, SEOConfig> = {
  en: {
    title:
      "Developer Tools Online - Regex Tester, AI SQL, Icon Generator | RocksDev Tools",
    description:
      "Free online developer tools including regex tester, AI SQL generator, and app icon generator. Essential utilities for developers with no signup required.",
    keywords: [
      "developer tools",
      "development tools",
      "regex tester",
      "regex validator",
      "test regex online",
      "ai sql generator",
      "code to sql converter",
      "app icon generator",
      "ios app icon creator",
      "android app icon generator",
      "essential developer utilities",
      "programming tools",
      "coding utilities",
      "free developer tools",
      "online development tools",
    ],
    openGraph: {
      type: "website",
      title:
        "Developer Tools Online - Regex Tester, AI SQL, Icon Generator | RocksDev Tools",
      description:
        "Free online developer tools including regex tester, AI SQL generator, and app icon generator. Essential utilities for developers with no signup required.",
      images: [`/api/og?title=Developer%20Tools`],
    },
  },
  "zh-CN": {
    title: "开发者工具 | RocksDev.Tools",
    description: "探索我们的开发者工具集，用于高效开发。",
    keywords: ["开发者工具", "开发工具", "开发者工具", "开发工具"],
    openGraph: {
      type: "website",
      title: "开发者工具 - RocksDev.Tools",
      description: "探索我们的开发者工具集，用于高效开发。",
      images: [`/api/og?title=Developer%20Tools`],
    },
  },
  "zh-HK": {
    title: "開發者工具 | RocksDev.Tools",
    description: "探索我們的開發者工具集，用於高效開發。",
    keywords: ["開發者工具", "開發工具", "開發者工具", "開發工具"],
    openGraph: {
      type: "website",
      title: "開發者工具 - RocksDev.Tools",
      description: "探索我們的開發者工具集，用於高效開發。",
      images: [`/api/og?title=Developer%20Tools`],
    },
  },
};
