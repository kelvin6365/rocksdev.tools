"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Download, Clipboard, Upload, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToolUsage } from "@/contexts/tool-usage-context";

export function Base64Converter() {
  const t = useTranslations("converters.base64");
  const { incrementToolUsage } = useToolUsage();
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUrlSafe, setIsUrlSafe] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as ArrayBuffer;
        const binaryString = new Uint8Array(content).reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, "");
        const base64String = btoa(binaryString);
        setOutput(base64String);
      } catch (error) {
        toast.error(t("error.invalid"));
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadEncodedFile = () => {
    if (!output) {
      toast.warning(t("error.empty"));
      return;
    }

    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "encoded.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t("message.download"));
    incrementToolUsage();
  };

  const decodeBase64 = () => {
    if (!uploadedFile) {
      toast.warning(t("error.empty"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const decoded = atob(
          isUrlSafe ? content.replace(/-/g, "+").replace(/_/g, "/") : content,
        );
        const byteNumbers = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) {
          byteNumbers[i] = decoded.charCodeAt(i);
        }

        const mimeType = getMimeType(content);
        const blob = new Blob([byteNumbers], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "decoded_file" + getFileExtension(mimeType);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success(t("message.download"));
        incrementToolUsage();
      } catch (error) {
        toast.error(t("error.invalid"));
      }
    };
    reader.readAsText(uploadedFile);
  };

  const getMimeType = (base64String: string) => {
    if (base64String.startsWith("iVBORw0KGgo")) {
      return "image/png";
    } else if (base64String.startsWith("/9j/")) {
      return "image/jpeg";
    } else if (base64String.startsWith("JVBERi0")) {
      return "application/pdf";
    } else if (base64String.startsWith("UEsDBBQAAAAIAI")) {
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }
    return "application/octet-stream";
  };

  const getFileExtension = (mimeType: string) => {
    const mimeTypes: { [key: string]: string } = {
      "image/png": ".png",
      "image/jpeg": ".jpg",
      "application/pdf": ".pdf",
      "text/plain": ".txt",
      "application/octet-stream": ".bin",
    };
    return mimeTypes[mimeType] || "";
  };

  const clearFields = () => {
    setInput("");
    setOutput("");
    setUploadedFile(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success(t("message.success"));
  };

  const encodeString = () => {
    try {
      if (!input) {
        toast.warning(t("error.empty"));
        return;
      }
      setIsLoading(true);
      const encoded = isUrlSafe
        ? btoa(input).replace(/\+/g, "-").replace(/\//g, "_")
        : btoa(input);
      setOutput(encoded);
      incrementToolUsage();
    } catch (error) {
      toast.error(t("error.invalid"));
    } finally {
      setIsLoading(false);
    }
  };

  const decodeString = () => {
    try {
      if (!input) {
        toast.warning(t("error.empty"));
        return;
      }
      setIsLoading(true);
      const decoded = atob(
        isUrlSafe ? input.replace(/-/g, "+").replace(/_/g, "/") : input,
      );
      setOutput(decoded);
      incrementToolUsage();
    } catch (error) {
      toast.error(t("error.invalid"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <CardHeader className="p-0">
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <Tabs defaultValue="string" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="string">{t("stringConversion")}</TabsTrigger>
          <TabsTrigger value="file">{t("fileConversion")}</TabsTrigger>
        </TabsList>
        <TabsContent value="string">
          <CardContent className="p-0 space-y-4">
            <Textarea
              placeholder={t("placeholder")}
              className="h-[200px] font-mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button onClick={encodeString} disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("encode")}
                </Button>
                <Button onClick={decodeString} disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("decode")}
                </Button>
              </div>
              <Button onClick={clearFields} variant="outline">
                {t("clear")}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="urlSafe"
                checked={isUrlSafe}
                onChange={() => setIsUrlSafe(!isUrlSafe)}
                className="h-4 w-4"
              />
              <label htmlFor="urlSafe" className="text-sm">
                {t("urlSafe")}
              </label>
            </div>
            {output && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{t("output")}</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      variant="outline"
                    >
                      <Clipboard className="mr-2 h-4 w-4" />
                      {t("copy")}
                    </Button>
                    <Button
                      onClick={downloadEncodedFile}
                      size="sm"
                      variant="outline"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t("download")}
                    </Button>
                  </div>
                </div>
                <Textarea
                  className="h-[200px] font-mono"
                  value={output}
                  readOnly
                />
              </div>
            )}
          </CardContent>
        </TabsContent>
        <TabsContent value="file">
          <CardContent className="p-0">
            {uploadedFile ? (
              <div className="flex items-center p-4 border rounded-md">
                <FileText className="mr-2 h-6 w-6" />
                <span>{uploadedFile.name}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[100px] border-2 border-dashed rounded-md">
                <span className="text-muted-foreground">{t("uploadFile")}</span>
              </div>
            )}
            <input
              type="file"
              ref={inputFileRef}
              accept="*/*"
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
                <Button onClick={downloadEncodedFile} disabled={!output}>
                  {t("encode")}
                </Button>
                <Button onClick={decodeBase64} disabled={!uploadedFile}>
                  {t("decode")}
                </Button>
              </div>
              <Button onClick={clearFields} variant="outline">
                {t("clear")}
              </Button>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </div>
  );
}
