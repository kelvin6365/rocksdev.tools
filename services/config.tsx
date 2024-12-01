import { Code, Zap, FileText, Layout } from "lucide-react";

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
        },
        {
          label: "Validator",
          value: "json.validator",
          href: "/tools/json/validator",
          description: "Validate JSON structure and schema",
        },
        {
          label: "Minifier",
          value: "json.minifier",
          href: "/tools/json/minifier",
          description: "Minify JSON data",
        },
        {
          label: "Diff",
          value: "json.diff",
          href: "/tools/json/diff",
          description: "Compare JSON files",
        },
      ],
    },
    {
      label: "SEO Tools",
      value: "seo",
      href: "/tools/seo",
      description: "Meta tags, robots.txt, and sitemap generators",
      category: "seo",
    },
    {
      label: "Converters",
      value: "converters",
      href: "/tools/converters",
      description: "Convert between different data formats",
      category: "converters",
    },
    {
      label: "Text Tools",
      value: "text",
      href: "/tools/text",
      description: "Text manipulation and formatting tools",
      category: "text",
    },
    {
      label: "Dev Tools",
      value: "dev",
      href: "/tools/dev",
      description: "Developer utilities and formatters",
      category: "dev",
    },
  ],
};
