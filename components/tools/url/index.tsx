"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import * as React from "react";
import { toast } from "sonner";
import { useTool } from "@/contexts/tool-context";
import { Copy, Download } from "lucide-react";

export function UrlConverter() {
  const t = useTranslations("converters.url");
  const { incrementToolUsage } = useTool();
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  const encodeUrl = () => {
    try {
      if (!input) {
        setError(t("error.empty-input"));
        return;
      }

      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      setError("");
      incrementToolUsage("url");
    } catch (err) {
      setError(t("error.encoding-failed"));
      setOutput("");
    }
  };

  const decodeUrl = () => {
    try {
      if (!input) {
        setError(t("error.empty-input"));
        return;
      }

      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      setError("");
      incrementToolUsage("url");
    } catch (err) {
      setError(t("error.decoding-failed"));
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    if (!output) {
      toast.warning(t("error.empty-output"));
      return;
    }

    navigator.clipboard.writeText(output);
    toast.success(t("message.copied"));
  };

  const downloadResult = () => {
    if (!output) {
      toast.warning(t("error.empty-output"));
      return;
    }

    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "url-result.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t("message.downloaded"));
  };

  const clearFields = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const loadSample = () => {
    setInput("https://example.com/search?q=hello world&lang=en");
  };

  return (
    <div className="space-y-6">
      <CardHeader className="p-0">
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t("input")}</label>
          <Textarea
            placeholder={t("placeholder.input")}
            className="h-[120px] font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-sm text-red-500 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">{t("output")}</label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="mr-1 h-4 w-4" />
                  {t("copy")}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadResult}>
                  <Download className="mr-1 h-4 w-4" />
                  {t("download")}
                </Button>
              </div>
            </div>
            <Textarea className="h-[120px] font-mono" value={output} readOnly />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button onClick={encodeUrl}>{t("encode")}</Button>
          <Button onClick={decodeUrl}>{t("decode")}</Button>
          <Button variant="outline" onClick={loadSample}>
            {t("load-sample")}
          </Button>
          <Button variant="outline" onClick={clearFields}>
            {t("clear")}
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
