"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import {
  Copy,
  CheckCircle2,
  XCircle,
  FileJson,
  RotateCcw,
  Clipboard,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTool } from "@/contexts/tool-context.tsx";

export function JsonValidator() {
  const t = useTranslations("json.validator");
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { incrementToolUsage } = useTool();

  const validateJson = () => {
    if (!input.trim()) {
      toast.warning(t("error.empty"));
      return;
    }

    setIsLoading(true);
    try {
      JSON.parse(input);
      setIsValid(true);
      setErrorMessage("");
      toast.success(t("valid"));
      incrementToolUsage();
    } catch (error) {
      setIsValid(false);
      setErrorMessage((error as Error).message);
      toast.error(t("error.invalid"));
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorPosition = (message: string): number | null => {
    const match = message.match(/position (\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      toast.success(t("pasted"));
    } catch (error) {
      toast.error(t("error.paste"));
    }
  };

  const loadSampleJson = () => {
    const sample = {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      isActive: true,
      hobbies: ["reading", "music"],
      address: {
        street: "123 Main St",
        city: "Boston",
        country: "USA",
      },
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  const resetValidator = () => {
    setInput("");
    setIsValid(null);
    setErrorMessage("");
    toast.info(t("reset"));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(input);
      toast.success(t("copied"));
    } catch (error) {
      toast.error(t("error.copy"));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handlePaste} size="sm">
          <Clipboard className="w-4 h-4 mr-1" />
          {t("paste")}
        </Button>
        <Button variant="outline" onClick={loadSampleJson} size="sm">
          <FileJson className="w-4 h-4 mr-1" />
          {t("loadSample")}
        </Button>
        <Button
          variant="outline"
          onClick={handleCopy}
          size="sm"
          disabled={!input}
        >
          <Copy className="w-4 h-4 mr-1" />
          {t("copy")}
        </Button>
        <Button
          variant="outline"
          onClick={resetValidator}
          size="sm"
          disabled={!input}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          {t("reset")}
        </Button>
      </div>

      <Textarea
        placeholder={t("input")}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-[300px] font-mono"
      />

      <div className="flex justify-end">
        <Button onClick={validateJson} disabled={isLoading}>
          {isLoading ? t("validating") : t("validate")}
        </Button>
      </div>

      {isValid !== null && (
        <Card>
          <CardContent className="pt-6">
            {isValid ? (
              <div className="flex items-center text-green-600 gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{t("valid")}</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center text-red-600 gap-2">
                  <XCircle className="w-5 h-5" />
                  <span>{t("invalid")}</span>
                </div>
                <div className="bg-red-50 p-4 rounded-md text-red-800 font-mono text-sm">
                  {errorMessage}
                  {getErrorPosition(errorMessage) && (
                    <div className="mt-2 text-red-600">
                      {t("errorPosition", {
                        position: getErrorPosition(errorMessage),
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
