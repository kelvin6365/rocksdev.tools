"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useTool } from "@/contexts/tool-context";
import { Copy, Download, FileJson, Loader2, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import * as React from "react";
import { toast } from "sonner";

const JsonEditorWrapper = dynamic(
  () => import("@/components/json-editor-wrapper"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[500px] w-full" />,
  },
);

export function JsonFormatter() {
  const t = useTranslations("json.formatter");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isJsonValid, setIsJsonValid] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { incrementToolUsage } = useTool();

  const formatJson = () => {
    if (!input.trim()) {
      toast.warning(t("error.empty"), {});
      return;
    }

    setIsLoading(true);
    try {
      const parsed = JSON.parse(input);
      setOutput(parsed);
      incrementToolUsage();
    } catch (error) {
      toast.error(t("error.invalid"), {});
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    toast.success(t("copied"), {});
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        setInput(content);
        const parsed = JSON.parse(content);
        setOutput(parsed);
        setIsJsonValid(true);
      } catch (error) {
        toast.error(t("error.invalid"), {});
      }
    };
    reader.readAsText(file);
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([JSON.stringify(output, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-6 flex-wrap md:flex-nowrap">
      <div className="w-full flex flex-col">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            {t("input")}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative px-0 h-[500px] overflow-y-auto">
          <Textarea
            placeholder={t("placeholder")}
            className={`h-full font-mono focus-visible:outline-none focus-visible:ring-0 ${
              !isJsonValid && input ? "border-red-500" : ""
            }`}
            value={input}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setOutput(parsed);
                setIsJsonValid(true);
              } catch (error) {
                setIsJsonValid(false);
              } finally {
                setInput(e.target.value);
              }
            }}
          />
          <div className="absolute right-1 top-1 z-10 flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              title={t("upload")}
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button onClick={formatJson} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("format")}
            </Button>
          </div>
        </CardContent>
      </div>

      <div className="w-full flex flex-col">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            {t("output")}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative px-0 h-[500px]">
          <div className="absolute right-1 top-1 z-10 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={!output}
              onClick={copyToClipboard}
              title={t("copy")}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={!output}
              onClick={downloadJson}
              title={t("download")}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-full rounded-md border bg-muted overflow-y-auto">
            <JsonEditorWrapper
              data={output}
              setData={(newValue) => {
                setOutput(newValue);
              }}
            />
          </div>
        </CardContent>
      </div>
    </div>
  );
}
