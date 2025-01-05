"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTool } from "@/contexts/tool-context";
import { Copy, FileJson, Loader2, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { toast } from "sonner";

export function JsonValidator() {
  const t = useTranslations("json.validator");
  const [input, setInput] = React.useState("");
  const [isValid, setIsValid] = React.useState<boolean | null>(null);
  const [isValidating, setIsValidating] = React.useState(false);
  const [errorPosition, setErrorPosition] = React.useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { incrementToolUsage } = useTool();

  const validateJson = () => {
    if (!input.trim()) {
      toast.warning(t("error.empty"), {});
      return;
    }

    setIsValidating(true);
    try {
      JSON.parse(input);
      setIsValid(true);
      setErrorPosition(null);
      incrementToolUsage("json_validator");
    } catch (error) {
      setIsValid(false);
      if (error instanceof SyntaxError) {
        const match = error.message.match(/position (\d+)/);
        if (match) {
          setErrorPosition(parseInt(match[1], 10));
        }
      }
    } finally {
      setIsValidating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(input);
      toast.success(t("copied"), {});
    } catch (error) {
      toast.error(t("error.copy"), {});
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      toast.success(t("pasted"), {});
    } catch (error) {
      toast.error(t("error.paste"), {});
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

  const loadSample = () => {
    const sampleJson = {
      name: "John Doe",
      age: 30,
      isStudent: false,
      hobbies: ["reading", "gaming"],
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA",
      },
    };
    setInput(JSON.stringify(sampleJson, null, 2));
  };

  const reset = () => {
    setInput("");
    setIsValid(null);
    setErrorPosition(null);
  };

  return (
    <div className="flex flex-col">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2">
          <FileJson className="h-5 w-5" />
          {t("input")}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative px-0">
        <div className="flex gap-2 mb-2 flex-wrap md:flex-nowrap">
          <Button onClick={validateJson} disabled={isValidating}>
            {isValidating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("validate")}
          </Button>
          <Button variant="outline" onClick={copyToClipboard}>
            <Copy className="mr-2 h-4 w-4" />
            {t("copy")}
          </Button>
          <Button variant="outline" onClick={pasteFromClipboard}>
            {t("paste")}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            title={t("upload")}
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={loadSample}>
            {t("loadSample")}
          </Button>
          <Button variant="outline" onClick={reset}>
            {t("reset")}
          </Button>
        </div>
        <Textarea
          placeholder={t("placeholder")}
          className="min-h-[300px] font-mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {isValid !== null && (
          <div
            className={`mt-4 p-4 rounded-md ${
              isValid
                ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"
            }`}
          >
            {isValid ? t("valid") : t("invalid")}
            {errorPosition !== null && (
              <div className="mt-2">
                {t("errorPosition", { position: errorPosition })}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </div>
  );
}
