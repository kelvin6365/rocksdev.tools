"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw, Info } from "lucide-react";
import { toast } from "react-hot-toast";
import { useTool } from "@/contexts/tool-context";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Match {
  text: string;
  index: number;
  length: number;
  groups?: { [key: string]: string };
}

interface RegexExplanation {
  pattern: string;
  parts: {
    part: string;
    meaning: string;
  }[];
  example?: RegexExample | null;
}

interface RegexExample {
  example: string;
  description?: string;
  pattern: string;
  basePattern: string;
}

interface RegexPattern {
  pattern: RegExp;
  example: string;
  description: string;
  basePattern: string;
}

function explainRegex(pattern: string): RegexExplanation | null {
  if (!pattern) return null;

  const explanations: { [key: string]: string } = {
    "\\d": "Any digit (0-9)",
    "\\w": "Any word character (letter, digit, underscore)",
    "\\s": "Any whitespace character (space, tab, newline)",
    "\\.": "Literal dot",
    "\\b": "Word boundary",
    "[a-z]": "Any lowercase letter",
    "[A-Z]": "Any uppercase letter",
    "[0-9]": "Any digit",
    "+": "One or more of the previous item",
    "*": "Zero or more of the previous item",
    "?": "Zero or one of the previous item",
    "{n}": "Exactly n of the previous item",
    "{n,}": "n or more of the previous item",
    "{n,m}": "Between n and m of the previous item",
    "^": "Start of line",
    $: "End of line",
    "|": "OR operator",
    "()": "Group",
    "(?:)": "Non-capturing group",
    "(?=)": "Positive lookahead",
    "(?!)": "Negative lookahead",
    "[^]": "Any character except those listed",
  };

  const parts: { part: string; meaning: string }[] = [];
  let currentIndex = 0;

  while (currentIndex < pattern.length) {
    let longestMatch = "";
    let longestMeaning = "";

    // Try to match the longest possible pattern
    for (const [key, meaning] of Object.entries(explanations)) {
      if (
        pattern.slice(currentIndex).startsWith(key) &&
        key.length > longestMatch.length
      ) {
        longestMatch = key;
        longestMeaning = meaning;
      }
    }

    if (longestMatch) {
      parts.push({ part: longestMatch, meaning: longestMeaning });
      currentIndex += longestMatch.length;
    } else {
      // Handle characters that don't have special meaning
      parts.push({
        part: pattern[currentIndex],
        meaning: "Literal character",
      });
      currentIndex++;
    }
  }

  return {
    pattern,
    parts,
    example: getExample(pattern),
  };
}

function getExample(pattern: string): RegexExample | null {
  // Common regex patterns with examples and descriptions
  const patterns: Array<{
    pattern: RegExp | string;
    example: string;
    description: string;
    basePattern: string;
  }> = [
    // Email Patterns
    {
      pattern: /\\w+@\\w+\\.\\w+/,
      example: "email@domain.com",
      description: "Basic email pattern",
      basePattern: "^\\w+@\\w+\\.\\w+$",
    },
    {
      pattern: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
      example: "user.name+tag@example.co.uk",
      description: "Advanced email pattern",
      basePattern: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}",
    },

    // Phone Number Patterns
    {
      pattern: /\\d{3}[-.]?\\d{3}[-.]?\\d{4}/,
      example: "123-456-7890",
      description: "US phone number",
      basePattern: "\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b",
    },
    {
      pattern: /\\+?\\d{1,4}[-.]?\\d{3,4}[-.]?\\d{3,4}/,
      example: "+1-234-567-8900",
      description: "International phone number",
      basePattern: "\\+?\\d{1,4}[-.]?\\d{3,4}[-.]?\\d{3,4}",
    },

    // Date and Time Patterns
    {
      pattern: /\\d{4}[-.]?\\d{2}[-.]?\\d{2}/,
      example: "2024-01-01",
      description: "Date (YYYY-MM-DD)",
      basePattern: "\\b\\d{4}[-.]?\\d{2}[-.]?\\d{2}\\b",
    },
    {
      pattern: `/\\d{2}\\/\\d{2}\\/\\d{4}/`,
      example: "01/31/2024",
      description: "Date (MM/DD/YYYY)",
      basePattern: "\\b\\d{2}\\/\\d{2}\\/\\d{4}\\b",
    },
    {
      pattern: /\\d{2}[:.]\\d{2}[:.]\\d{2}/,
      example: "12:34:56",
      description: "Time (HH:MM:SS)",
      basePattern: "\\b\\d{2}[:.]\\d{2}[:.]\\d{2}\\b",
    },
    {
      pattern: /\\d{2}[:.]\\d{2}/,
      example: "12:34",
      description: "Time (HH:MM)",
      basePattern: "\\b\\d{2}[:.]\\d{2}\\b",
    },
    {
      pattern: /\\d{4}[-.]?\\d{2}[-.]?\\d{2}[T ]\\d{2}[:.]\\d{2}[:.]\\d{2}/,
      example: "2024-01-01T12:34:56",
      description: "ISO DateTime",
      basePattern: "\\d{4}[-.]?\\d{2}[-.]?\\d{2}[T ]\\d{2}[:.]\\d{2}[:.]\\d{2}",
    },

    // URL and Web Patterns
    {
      pattern: `/https?:\\/\\/[\\w\\d.-]+\\.\\w{2,}/`,
      example: "https://example.com",
      description: "Basic URL",
      basePattern: "https?:\\/\\/[\\w\\d.-]+\\.\\w{2,}",
    },
    {
      pattern: `/https?:\\/\\/(?:www\\.)?[\\w\\d.-]+\\.\\w{2,}(?:\\/[\\w\\d.-]*)*\\/?/`,
      example: "https://www.example.com/path/to/page",
      description: "Full URL with path",
      basePattern:
        "https?:\\/\\/(?:www\\.)?[\\w\\d.-]+\\.\\w{2,}(?:\\/[\\w\\d.-]*)*\\/?",
    },
    {
      pattern:
        /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
      example: "sub.example.domain.com",
      description: "Domain name",
      basePattern:
        "(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]",
    },

    // Name and Text Patterns
    {
      pattern: /[A-Z][a-z]+/,
      example: "John",
      description: "Capitalized word",
      basePattern: "^[A-Z][a-z]+$",
    },
    {
      pattern: /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/,
      example: "John Doe Smith",
      description: "Full name (capitalized)",
      basePattern: "^[A-Z][a-z]+(?: [A-Z][a-z]+)*$",
    },
    {
      pattern: /\\b[A-Z]{2,}\\b/,
      example: "NASA",
      description: "Uppercase word (acronym)",
      basePattern: "\\b[A-Z]{2,}\\b",
    },

    // Number Patterns
    {
      pattern: /[-+]?\\d*\\.?\\d+/,
      example: "-123.456",
      description: "Decimal number",
      basePattern: "[-+]?\\d*\\.?\\d+",
    },
    {
      pattern: /\\d+(\\.\\d{2})?/,
      example: "123.45",
      description: "Currency amount",
      basePattern: "\\b\\d+(\\.\\d{2})?\\b",
    },
    {
      pattern: /(?:\\d{1,3},)*\\d{1,3}(?:\\.\\d{2})?/,
      example: "1,234,567.89",
      description: "Formatted number with commas",
      basePattern: "(?:\\d{1,3},)*\\d{1,3}(?:\\.\\d{2})?",
    },

    // Color and Code Patterns
    {
      pattern: /#[0-9A-Fa-f]{6}/,
      example: "#FF4500",
      description: "Hex color code",
      basePattern: "#[0-9A-Fa-f]{6}",
    },
    {
      pattern: /rgb\\(\\d{1,3},\\s*\\d{1,3},\\s*\\d{1,3}\\)/,
      example: "rgb(255, 69, 0)",
      description: "RGB color",
      basePattern: "rgb\\(\\d{1,3},\\s*\\d{1,3},\\s*\\d{1,3}\\)",
    },

    // Password Validation
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/,
      example: "Pass123word",
      description: "Basic password (8+ chars, letters and numbers)",
      basePattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
    },
    {
      pattern:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/,
      example: "Pass123!word",
      description:
        "Strong password (8+ chars, uppercase, lowercase, number, special)",
      basePattern:
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    },

    // File Paths and Names
    {
      pattern: /[\\w-]+\\.[A-Za-z]{2,4}$/,
      example: "document.pdf",
      description: "File name with extension",
      basePattern: "[\\w-]+\\.[A-Za-z]{2,4}$",
    },
    {
      pattern: `/\\(?:[\\w-]+\\/\\)*[\\w-]+\\.[A-Za-z]{2,4}$/`,
      example: "path/to/document.pdf",
      description: "File path",
      basePattern: "(?:[\\w-]+\\/)*[\\w-]+\\.[A-Za-z]{2,4}$",
    },

    // Social Media and Web
    {
      pattern: /@[\\w\\d_]+/,
      example: "@username",
      description: "Social media handle",
      basePattern: "@[\\w\\d_]+",
    },
    {
      pattern: /#[\\w\\d]+/,
      example: "#hashtag",
      description: "Hashtag",
      basePattern: "#[\\w\\d]+",
    },
    {
      pattern: /\\b\\w+@[\\w.-]+\\.\\w{2,}\\b/,
      example: "user@sub.domain.com",
      description: "Email with subdomains",
      basePattern: "\\b\\w+@[\\w.-]+\\.\\w{2,}\\b",
    },

    // IP Addresses
    {
      pattern: /\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b/,
      example: "192.168.1.1",
      description: "IPv4 address",
      basePattern: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b",
    },
    {
      pattern: /[0-9a-fA-F:]{2,}(?::[0-9a-fA-F:]*)?/,
      example: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      description: "IPv6 address",
      basePattern: "[0-9a-fA-F:]{2,}(?::[0-9a-fA-F:]*)?",
    },
  ];

  // Try exact match first
  const exactMatch = patterns.find((p) => p.basePattern === pattern);
  if (exactMatch) {
    return {
      example: exactMatch.example,
      description: exactMatch.description,
      pattern: exactMatch.pattern.toString(),
      basePattern: exactMatch.basePattern,
    };
  }

  // Try to find similar patterns
  try {
    const patternRegex = new RegExp(pattern);
    const matchingPatterns = patterns.filter((p) => {
      try {
        return (
          (p.pattern as RegExp).test(pattern) ||
          patternRegex.test(p.basePattern)
        );
      } catch {
        return false;
      }
    });

    if (matchingPatterns.length > 0) {
      // Return the first matching pattern
      return {
        example: matchingPatterns[0].example,
        description: matchingPatterns[0].description,
        pattern: matchingPatterns[0].pattern.toString(),
        basePattern: matchingPatterns[0].basePattern,
      };
    }

    // Check for common regex components
    const components = [
      { pattern: /\\d/, example: "123", description: "Contains digits" },
      {
        pattern: /\\w/,
        example: "abc123",
        description: "Contains word characters",
      },
      {
        pattern: /\\s/,
        example: "text with spaces",
        description: "Contains whitespace",
      },
      {
        pattern: /[A-Z]/,
        example: "ABC",
        description: "Contains uppercase letters",
      },
      {
        pattern: /[a-z]/,
        example: "abc",
        description: "Contains lowercase letters",
      },
      { pattern: /[0-9]/, example: "123", description: "Contains numbers" },
    ];

    for (const comp of components) {
      if (comp.pattern.test(pattern)) {
        return {
          example: comp.example,
          description: comp.description,
          pattern: comp.pattern.toString(),
          basePattern: comp.pattern.toString(),
        };
      }
    }
  } catch {
    // If regex is invalid, return default
  }

  // Default response
  return {
    example: "No exact match found",
    description: "Try one of the common patterns below",
    pattern: "",
    basePattern: "",
  };
}

export function RegexTester() {
  const t = useTranslations("dev.regex");
  const { incrementToolUsage } = useTool();

  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [matchCount, setMatchCount] = useState(0);
  const [highlightedText, setHighlightedText] = useState("");

  const patterns: RegexPattern[] = [
    // Email Patterns
    {
      pattern: /\w+@\w+\.\w+/,
      example: "email@domain.com",
      description: "Basic email pattern",
      basePattern: "^\\w+@\\w+\\.\\w+$",
    },
    {
      pattern: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
      example: "user.name+tag@example.co.uk",
      description: "Advanced email pattern",
      basePattern: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}",
    },

    // Phone Number Patterns
    {
      pattern: /\d{3}[-.]?\d{3}[-.]?\d{4}/,
      example: "123-456-7890",
      description: "US phone number",
      basePattern: "\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b",
    },
    {
      pattern: /\+?\d{1,4}[-.]?\d{3,4}[-.]?\d{3,4}/,
      example: "+1-234-567-8900",
      description: "International phone number",
      basePattern: "\\+?\\d{1,4}[-.]?\\d{3,4}[-.]?\\d{3,4}",
    },

    // Date and Time Patterns
    {
      pattern: /\d{4}[-.]?\d{2}[-.]?\d{2}/,
      example: "2024-01-01",
      description: "Date (YYYY-MM-DD)",
      basePattern: "\\b\\d{4}[-.]?\\d{2}[-.]?\\d{2}\\b",
    },
    {
      pattern: /\d{2}\/\d{2}\/\d{4}/,
      example: "01/31/2024",
      description: "Date (MM/DD/YYYY)",
      basePattern: "\\b\\d{2}\\/\\d{2}\\/\\d{4}\\b",
    },
    {
      pattern: /\d{2}[:.]\d{2}[:.]\d{2}/,
      example: "12:34:56",
      description: "Time (HH:MM:SS)",
      basePattern: "\\b\\d{2}[:.]\\d{2}[:.]\\d{2}\\b",
    },
    {
      pattern: /\d{2}[:.]\d{2}/,
      example: "12:34",
      description: "Time (HH:MM)",
      basePattern: "\\b\\d{2}[:.]\\d{2}\\b",
    },

    // URL and Web Patterns
    {
      pattern: /https?:\/\/[\w\d.-]+\.\w{2,}/,
      example: "https://example.com",
      description: "Basic URL",
      basePattern: "https?:\\/\\/[\\w\\d.-]+\\.\\w{2,}",
    },
    {
      pattern: /https?:\/\/(?:www\.)?[\w\d.-]+\.\w{2,}(?:\/[\w\d.-]*)*\/?/,
      example: "https://www.example.com/path/to/page",
      description: "Full URL with path",
      basePattern:
        "https?:\\/\\/(?:www\\.)?[\\w\\d.-]+\\.\\w{2,}(?:\\/[\\w\\d.-]*)*\\/?",
    },

    // Name and Text Patterns
    {
      pattern: /[A-Z][a-z]+/,
      example: "John",
      description: "Capitalized word",
      basePattern: "^[A-Z][a-z]+$",
    },
    {
      pattern: /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/,
      example: "John Doe Smith",
      description: "Full name (capitalized)",
      basePattern: "^[A-Z][a-z]+(?: [A-Z][a-z]+)*$",
    },

    // Number Patterns
    {
      pattern: /[-+]?\d*\.?\d+/,
      example: "-123.456",
      description: "Decimal number",
      basePattern: "[-+]?\\d*\\.?\\d+",
    },
    {
      pattern: /\d+(\.\d{2})?/,
      example: "123.45",
      description: "Currency amount",
      basePattern: "\\b\\d+(\\.\\d{2})?\\b",
    },

    // Color and Code Patterns
    {
      pattern: /#[0-9A-Fa-f]{6}/,
      example: "#FF4500",
      description: "Hex color code",
      basePattern: "#[0-9A-Fa-f]{6}",
    },
    {
      pattern: /rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)/,
      example: "rgb(255, 69, 0)",
      description: "RGB color",
      basePattern: "rgb\\(\\d{1,3},\\s*\\d{1,3},\\s*\\d{1,3}\\)",
    },

    // Password Validation
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      example: "Pass123word",
      description: "Basic password (8+ chars, letters and numbers)",
      basePattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
    },
    {
      pattern:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      example: "Pass123!word",
      description:
        "Strong password (8+ chars, uppercase, lowercase, number, special)",
      basePattern:
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    },
  ];

  // Flags toggles
  const [globalFlag, setGlobalFlag] = useState(true);
  const [multilineFlag, setMultilineFlag] = useState(false);
  const [caseInsensitiveFlag, setCaseInsensitiveFlag] = useState(false);
  const [unicodeFlag, setUnicodeFlag] = useState(false);
  const [stickyFlag, setStickyFlag] = useState(false);
  const [dotAllFlag, setDotAllFlag] = useState(false);

  // Update flags when toggles change
  useEffect(() => {
    const newFlags = [
      globalFlag && "g",
      multilineFlag && "m",
      caseInsensitiveFlag && "i",
      unicodeFlag && "u",
      stickyFlag && "y",
      dotAllFlag && "s",
    ]
      .filter(Boolean)
      .join("");
    setFlags(newFlags);
  }, [
    globalFlag,
    multilineFlag,
    caseInsensitiveFlag,
    unicodeFlag,
    stickyFlag,
    dotAllFlag,
  ]);

  // Auto-check effect
  useEffect(() => {
    if (pattern) {
      testRegex();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pattern, flags, testString]);

  const highlightMatches = (str: string, matches: Match[]): string => {
    if (!str || matches.length === 0) return str;

    let result = "";
    let lastIndex = 0;

    // Sort matches by index to process them in order
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

    sortedMatches.forEach((match) => {
      // Escape HTML in non-matching text
      const beforeMatch = str
        .slice(lastIndex, match.index)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Escape HTML in matching text
      const matchText = match.text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      result += `<span class="text-transparent">${beforeMatch}</span>`;
      result += `<mark class="bg-green-200/40 dark:bg-green-900/40 rounded text-transparent">${matchText}</mark>`;
      lastIndex = match.index + match.length;
    });

    // Add remaining text with HTML escaping
    result += `<span class="text-transparent">${str
      .slice(lastIndex)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</span>`;

    return result;
  };

  const testRegex = () => {
    setError(null);
    setMatches([]);
    setMatchCount(0);
    setHighlightedText(testString);

    if (!pattern) return;

    try {
      const regex = new RegExp(pattern, flags);
      const results: Match[] = [];
      let match;
      let count = 0;

      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          results.push({
            text: match[0],
            index: match.index,
            length: match[0].length,
            groups: match.groups,
          });
          count++;
          // Prevent infinite loops for zero-length matches
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          results.push({
            text: match[0],
            index: match.index,
            length: match[0].length,
            groups: match.groups,
          });
          count = 1;
        }
      }

      setMatches(results);
      setMatchCount(count);
      setHighlightedText(highlightMatches(testString, results));
      if (count > 0) incrementToolUsage();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pattern);
      toast.success(t("copied"));
    } catch {
      toast.error(t("error.copy"));
    }
  };

  const reset = () => {
    setPattern("");
    setTestString("");
    setMatches([]);
    setError(null);
    setMatchCount(0);
    setHighlightedText("");
    setGlobalFlag(true);
    setMultilineFlag(false);
    setCaseInsensitiveFlag(false);
    setUnicodeFlag(false);
    setStickyFlag(false);
    setDotAllFlag(false);
  };

  const explanation = useMemo(() => explainRegex(pattern), [pattern]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t("pattern")}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder={t("patternPlaceholder")}
              className="font-mono"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="global"
                  checked={globalFlag}
                  onCheckedChange={setGlobalFlag}
                />
                <Label htmlFor="global">{t("global")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="multiline"
                  checked={multilineFlag}
                  onCheckedChange={setMultilineFlag}
                />
                <Label htmlFor="multiline">{t("multiline")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="caseInsensitive"
                  checked={caseInsensitiveFlag}
                  onCheckedChange={setCaseInsensitiveFlag}
                />
                <Label htmlFor="caseInsensitive">{t("caseInsensitive")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="unicode"
                  checked={unicodeFlag}
                  onCheckedChange={setUnicodeFlag}
                />
                <Label htmlFor="unicode">{t("unicode")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="sticky"
                  checked={stickyFlag}
                  onCheckedChange={setStickyFlag}
                />
                <Label htmlFor="sticky">{t("sticky")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="dotAll"
                  checked={dotAllFlag}
                  onCheckedChange={setDotAllFlag}
                />
                <Label htmlFor="dotAll">{t("dotAll")}</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {explanation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              {t("explanation")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="explanation">
                <AccordionTrigger>{t("patternBreakdown")}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      {explanation.parts.map((part, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-[auto,1fr] gap-4 items-center"
                        >
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            {part.part}
                          </code>
                          <span className="text-sm text-muted-foreground">
                            {part.meaning}
                          </span>
                        </div>
                      ))}
                    </div>
                    {explanation.example && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">
                            {t("pattern")}:
                          </p>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                {t("basePattern")}:
                              </p>
                              <code className="block bg-muted px-2 py-1 rounded text-sm">
                                {explanation.example.basePattern}
                              </code>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                {t("regexPattern")}:
                              </p>
                              <code className="block bg-muted px-2 py-1 rounded text-sm">
                                {explanation.example.pattern}
                              </code>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">
                            {t("example")}:
                          </p>
                          <div className="space-y-1">
                            <code className="block bg-muted px-2 py-1 rounded text-sm">
                              {explanation.example.example}
                            </code>
                            {explanation.example.description && (
                              <p className="text-sm text-muted-foreground">
                                {explanation.example.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="common-patterns">
                <AccordionTrigger>{t("commonPatterns")}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4">
                    {patterns.map((p, index) => (
                      <div
                        key={index}
                        className="space-y-2 p-3 rounded-lg border bg-card"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <p className="font-medium">{p.description}</p>
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  {t("basePattern")}:
                                </p>
                                <code className="block text-sm bg-muted px-2 py-1 rounded">
                                  {p.basePattern}
                                </code>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  {t("regexPattern")}:
                                </p>
                                <code className="block text-sm bg-muted px-2 py-1 rounded">
                                  {p.pattern.toString()}
                                </code>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {t("example")}:{" "}
                                <code className="bg-muted px-1 rounded">
                                  {p.example}
                                </code>
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPattern(p.basePattern)}
                          >
                            {t("use")}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t("testString")}</span>
            {error ? (
              <Badge variant="destructive" className="h-6">
                {error}
              </Badge>
            ) : (
              matchCount > 0 && (
                <Badge variant="default" className="h-6">
                  {t("matchCount", { count: matchCount })}
                </Badge>
              )
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative min-h-[200px] font-mono rounded-md border">
            <div
              className="absolute inset-0 p-3 whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder={t("testStringPlaceholder")}
              className="relative w-full min-h-[200px] font-mono bg-transparent resize-none p-3 caret-foreground selection:bg-foreground/30"
              style={{ caretColor: "currentcolor" }}
            />
          </div>
        </CardContent>
      </Card>

      {matches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("matches")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matches.map((match, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg space-y-2 bg-muted/50"
                >
                  <div className="flex justify-between">
                    <Badge variant="outline">
                      {t("match", { index: index + 1 })}
                    </Badge>
                    <Badge variant="outline">
                      {t("indexLength", {
                        index: match.index,
                        length: match.length,
                      })}
                    </Badge>
                  </div>
                  <pre className="bg-background p-2 rounded overflow-x-auto">
                    {match.text}
                  </pre>
                  {match.groups && Object.keys(match.groups).length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold mb-2">
                        {t("groups")}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(match.groups).map(([name, value]) => (
                          <div
                            key={name}
                            className="flex justify-between p-2 bg-background rounded"
                          >
                            <span className="font-mono text-sm">{name}:</span>
                            <span className="font-mono text-sm">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
