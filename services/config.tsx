import { DailyDevIcon } from "../components/icons/social";
import { Github, Instagram, MessageCircle, Twitter } from "lucide-react";
import { Tool } from "../types/tool";
import { XiaoHongShuIcon } from "../components/icons/social";

export const config = {
  name: "Rocks Dev",
  description: "A comprehensive collection of developer tools",
  github: "https://github.com/kelvin6365/rocksdev.tools",

  // Language configuration
  languages: [
    { label: "English", value: "en" },
    { label: "中文(简体)", value: "zh-CN" },
    { label: "中文(繁體)", value: "zh-HK" },
  ] as const,

  promos: [
    {
      id: "dock",
      text: {
        en: {
          title: "Rocks Dev Dock Released 🥳",
          description:
            "Press '+' inside the tool to add your favorite tools to your dock.",
          note: "No data collection when you use our tools, just tools.",
        },
        "zh-CN": {
          title: "Rocks Dev Dock 发布了 🥳",
          description: "在工具内按 '+' 将您喜欢的工具添加到您的 dock。",
          note: "使用我们的工具时不会收集数据，只是工具。",
        },
        "zh-HK": {
          title: "Rocks Dev Dock 發布了 🥳",
          description: "在工具內按 '+' 將您喜歡的工具添加到您的 dock。",
          note: "使用我們的工具時不會收集數據，只是工具。",
        },
      },
    },
  ] as {
    id: string;
    text: {
      [key: string]: { title: string; description: string; note: string };
    };
  }[],

  socialLinks: [
    {
      name: "github",
      url: "https://github.com/kelvin6365",
      icon: <Github className="h-4 w-4" />,
    },
    {
      name: "twitter",
      url: "https://x.com/tszhim_tech",
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      name: "threads",
      url: "https://www.threads.net/@tszhim_tech",
      icon: <MessageCircle className="h-4 w-4" />,
    },
    {
      name: "instagram",
      url: "https://www.instagram.com/tszhim_tech",
      icon: <Instagram className="h-4 w-4" />,
    },
    {
      name: "xiaohongshu",
      url: "https://www.xiaohongshu.com/user/profile/60e9c552000000000101ef5d",
      icon: <XiaoHongShuIcon className="h-4 w-4" />,
    },
    {
      name: "dailydev",
      url: "https://app.daily.dev/squads/rocksdev_tools",
      icon: <DailyDevIcon className="h-4 w-4" />,
    },
  ],

  // Tool categories and routes
  tools: [
    {
      label: "JSON Tools",
      value: "json",
      href: "/tools/json",
      description: "Format, validate, and transform JSON data",
      category: "json",
      subTools: [
        {
          label: "Formatter",
          value: "json.formatter",
          href: "/tools/json/formatter",
          description: "Format and beautify JSON data",
          icon: "🎨",
        },
        {
          label: "Validator",
          value: "json.validator",
          href: "/tools/json/validator",
          description: "Validate JSON structure and schema",
          icon: "✅",
        },
        {
          label: "Minifier",
          value: "json.minifier",
          href: "/tools/json/minifier",
          description: "Minify JSON data",
          icon: "🗜️",
        },
        {
          label: "Diff",
          value: "json.diff",
          href: "/tools/json/diff",
          description: "Compare JSON files",
          icon: "⚖️",
        },
      ],
    },
    {
      label: "SEO Tools",
      value: "seo",
      href: "/tools/seo",
      description: "Meta tags, robots.txt, and sitemap generators",
      category: "seo",
      subTools: [
        {
          label: "OG Image Generator",
          value: "seo.og-image",
          href: "/tools/seo/og-image",
          description: "Generate OG images for your website",
          icon: "🖼️",
        },
        {
          label: "Meta Tags Generator",
          value: "seo.meta-tags",
          href: "/tools/seo/meta-tags",
          description: "Generate meta tags for your website",
          icon: "🏷️",
        },
      ],
    },
    {
      label: "Converters",
      value: "converters",
      href: "/tools/converters",
      description: "Convert between different data formats",
      category: "converters",
      subTools: [
        {
          label: "Base64",
          value: "converters.base64",
          href: "/tools/converters/base64",
          description: "Convert between Base64 and other formats",
          icon: "🔄",
        },
        {
          label: "Markdown to HTML",
          value: "converters.md2html",
          href: "/tools/converters/md2html",
          description: "Convert Markdown to HTML",
          icon: "📝",
        },
      ],
    },
    {
      label: "Text Tools",
      value: "text",
      href: "/tools/text",
      description: "Text manipulation and formatting tools",
      category: "text",
      subTools: [
        {
          label: "Text Formatter",
          value: "text.text-formatter",
          href: "/tools/text/text-formatter",
          description: "Format text",
          icon: "🎨",
        },
      ],
    },
    {
      label: "Dev Tools",
      value: "dev",
      href: "/tools/dev",
      description: "Developer utilities and formatters",
      category: "dev",
      subTools: [
        {
          label: "Regex Tester",
          value: "dev.regex",
          href: "/tools/dev/regex",
          description: "Test regular expressions",
          icon: "🎯",
        },
        {
          label: "App Icon Generator",
          value: "dev.app-icon",
          href: "/tools/dev/app-icon",
          description: "Generate app icons for iOS and Android",
          icon: "🖼️",
        },
        {
          label: "AI SQL",
          value: "dev.ai-sql",
          href: "/tools/dev/ai-sql",
          description: "Generate SQL queries with AI",
          icon: "🤖",
          tags: ["ai"],
        },
      ],
    },
  ] as Tool[],
};
