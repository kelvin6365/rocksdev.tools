"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clipboard, Download, RefreshCw, Trash, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useTool } from "../../../contexts/tool-context";
export function TextFormatter() {
  const t = useTranslations("text.text-formatter");
  const [input, setInput] = useState("");
  const [formatType, setFormatType] = useState("capitalize");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { incrementToolUsage } = useTool();

  const formatOptions = [
    {
      value: "uppercase",
      label: t("uppercase"),
      description: t("uppercase-description"),
    },
    {
      value: "lowercase",
      label: t("lowercase"),
      description: t("lowercase-description"),
    },
    {
      value: "capitalize",
      label: t("capitalize"),
      description: t("capitalize-description"),
    },
    {
      value: "sentence",
      label: t("sentence"),
      description: t("sentence-description"),
    },
    {
      value: "alternating",
      label: t("alternating"),
      description: t("alternating-description"),
    },
    {
      value: "trim",
      label: t("trim"),
      description: t("trim-description"),
    },
    {
      value: "remove-lines",
      label: t("remove-lines"),
      description: t("remove-lines-description"),
    },
  ];

  const getFormattedText = () => {
    if (!input.trim()) return "";

    switch (formatType) {
      case "uppercase":
        return input.toUpperCase();
      case "lowercase":
        return input.toLowerCase();
      case "capitalize":
        return input
          .split(" ")
          .map((word) =>
            word
              ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              : "",
          )
          .join(" ");
      case "sentence":
        return input
          .split(/([.!?]+)/)
          .map((sentence, i) => {
            if (i % 2 === 0) {
              const trimmed = sentence.trim();
              return trimmed
                ? trimmed.charAt(0).toUpperCase() +
                    trimmed.slice(1).toLowerCase()
                : "";
            }
            return sentence;
          })
          .join("");
      case "alternating":
        return input
          .split("")
          .map((char, i) =>
            i % 2 === 0 ? char.toLowerCase() : char.toUpperCase(),
          )
          .join("");
      case "trim":
        return input.replace(/\s+/g, " ").trim();
      case "remove-lines":
        return input.replace(/[\r\n]+/g, " ").trim();
      default:
        return input;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInput(content);
    };
    reader.readAsText(file);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(getFormattedText());
    toast.success(t("copy-success"));
    incrementToolUsage("text-formatter");
  };

  const handleDownload = () => {
    const blob = new Blob([getFormattedText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t("download-success"));
    incrementToolUsage("text-formatter");
  };

  const handleClear = () => {
    setInput("");
  };

  const getTextStats = () => {
    const text = input.trim();
    return {
      chars: input.length,
      words: text === "" ? 0 : text.split(/\s+/).length,
      lines: text === "" ? 0 : text.split(/\r\n|\r|\n/).length,
    };
  };

  const stats = getTextStats();

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <div className="flex flex-col space-y-6">
          {/* Format Selection Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-wrap">
            <Select value={formatType} onValueChange={setFormatType}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select format type" />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer hover:bg-accent"
                  >
                    <div className="flex flex-col py-2 text-left">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Main Content - Side by Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between flex-wrap">
                <h3 className="text-sm font-medium">{t("input-text")}</h3>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => inputFileRef.current?.click()}
                    className="h-8"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {t("upload")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="h-8"
                    disabled={!input}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    {t("clear")}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Textarea
                  placeholder={t("input-text-placeholder")}
                  className="min-h-[500px] font-mono resize-y p-4"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                  {t("stats.chars")} {stats.chars} · {t("stats.words")}{" "}
                  {stats.words} · {t("stats.lines")} {stats.lines}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setInput(getFormattedText())}
                  className="text-xs"
                  disabled={!input}
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  {t("apply-to-input")}
                </Button>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between flex-wrap">
                <h3 className="text-sm font-medium">{t("formatted-result")}</h3>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="h-8"
                    disabled={!input}
                  >
                    <Clipboard className="h-4 w-4 mr-2" />
                    {t("copy")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDownload}
                    className="h-8"
                    disabled={!input}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {t("download")}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Textarea
                  className="min-h-[500px] font-mono resize-y p-4 bg-muted/50"
                  value={getFormattedText()}
                  readOnly
                />
              </div>
              <div className="h-8 flex items-center justify-end">
                <span className="text-xs text-muted-foreground italic">
                  {t("read-only-result")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <input
        type="file"
        ref={inputFileRef}
        accept=".txt"
        className="hidden"
        onChange={handleFileUpload}
      />
    </Card>
  );
}

export default TextFormatter;
