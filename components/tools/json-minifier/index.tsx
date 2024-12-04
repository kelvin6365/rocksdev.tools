"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToolUsage } from "@/contexts/tool-usage-context";
import { Clipboard, Download, Loader2, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { toast } from "sonner";

export function JsonMinifier() {
  const t = useTranslations("json.minifier");
  const { incrementToolUsage } = useToolUsage();
  const [input, setInput] = React.useState("");
  const [minifiedOutput, setMinifiedOutput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const minifyJson = (latestInput?: string) => {
    const _input = latestInput || input;
    if (!_input.trim()) {
      toast.warning(t("error.empty"));
      return;
    }

    setIsLoading(true);
    try {
      const json = JSON.parse(_input);
      const minified = JSON.stringify(json);
      setMinifiedOutput(minified);
      incrementToolUsage();
    } catch (error) {
      console.error(error);
      toast.error(t("error.invalid"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        setInput(content);
        minifyJson(content);
      } catch (error) {
        console.error(error);
        toast.error(t("error.invalid"));
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(minifiedOutput);
    toast.success(t("copied"));
  };

  const downloadMinifiedJson = () => {
    const blob = new Blob([minifiedOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t("message.success"));
  };

  return (
    <div className="space-y-6">
      <CardContent className="px-0 pb-0">
        <h3 className="font-medium">{t("title")}</h3>
        <div className="relative">
          <Textarea
            placeholder={t("placeholder")}
            className="h-[300px] font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute right-1 top-1"
            onClick={() => inputFileRef.current?.click()}
            title={t("upload")}
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
        <input
          type="file"
          ref={inputFileRef}
          accept=".json"
          className="hidden"
          onChange={handleFileUpload}
        />

        <div className="flex justify-center mt-4">
          <Button onClick={() => minifyJson(input)} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            {t("minify")}
          </Button>
        </div>
      </CardContent>
      {minifiedOutput && (
        <CardContent className="p-0">
          <h3 className="font-medium">{t("minifiedOutput")}</h3>
          <Textarea
            className="h-[300px] font-mono"
            value={minifiedOutput}
            readOnly
          />
          <div className="flex justify-between mt-4">
            <Button onClick={copyToClipboard} variant="outline">
              <Clipboard className="mr-2 h-4 w-4" />
              {t("copy")}
            </Button>
            <Button onClick={downloadMinifiedJson} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              {t("download")}
            </Button>
          </div>
        </CardContent>
      )}
    </div>
  );
}
