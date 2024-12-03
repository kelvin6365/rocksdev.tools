"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Download, Clipboard, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { toast } from "sonner";

export function Base64Converter() {
  const t = useTranslations("converters.base64");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        setInput(content);
      } catch (error) {
        toast.error(t("error.invalid"));
      }
    };
    reader.readAsText(file);
  };

  const encodeBase64 = () => {
    if (!input.trim()) {
      toast.warning(t("error.empty"));
      return;
    }

    setIsLoading(true);
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      toast.error(t("error.invalid"));
    } finally {
      setIsLoading(false);
    }
  };

  const decodeBase64 = () => {
    if (!input.trim()) {
      toast.warning(t("error.empty"));
      return;
    }

    setIsLoading(true);
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      toast.error(t("error.invalid"));
    } finally {
      setIsLoading(false);
    }
  };

  const clearFields = () => {
    setInput("");
    setOutput("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success(t("message.success"));
  };

  return (
    <div className="space-y-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Textarea
          placeholder={t("placeholder")}
          className="h-[300px] font-mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="file"
          ref={inputFileRef}
          accept=".txt"
          className="hidden"
          onChange={handleFileUpload}
        />
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => inputFileRef.current?.click()}
            variant="outline"
          >
            <Upload className="mr-2 h-4 w-4" />
            {t("upload")}
          </Button>
          <div className="flex gap-2">
            <Button onClick={encodeBase64} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
              {t("encode")}
            </Button>
            <Button onClick={decodeBase64} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
              {t("decode")}
            </Button>
          </div>
          <Button onClick={clearFields} variant="outline">
            {t("clear")}
          </Button>
        </div>
      </CardContent>
      {output && (
        <CardContent className="px-0">
          <h3 className="font-medium">{t("output")}</h3>
          <Textarea className="h-[300px] font-mono" value={output} readOnly />
          <div className="flex justify-between mt-4">
            <Button onClick={copyToClipboard} variant="outline">
              <Clipboard className="mr-2 h-4 w-4" />
              {t("copy")}
            </Button>
            <Button
              onClick={() => {
                const blob = new Blob([output], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "output.txt";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                toast.success(t("message.download"));
              }}
              variant="outline"
            >
              <Download className="mr-2 h-4 w-4" />
              {t("download")}
            </Button>
          </div>
        </CardContent>
      )}
    </div>
  );
}
