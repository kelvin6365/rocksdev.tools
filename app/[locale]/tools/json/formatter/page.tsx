"use client";

import { ToolLayout } from "@/components/layouts/tool-layout";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, FileJson, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

export default function JsonFormatterPage() {
  const t = useTranslations("json.formatter");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const formatJson = () => {
    if (!input.trim()) {
      toast.warning(t("error.empty"), {});
      return;
    }

    setIsLoading(true);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (error) {
      toast.error(t("error.invalid"), {});
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast.success(t("copied"), {});
  };

  return (
    <ToolLayout translationKey="json.formatter">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              {t("input")}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Textarea
              placeholder={t("placeholder")}
              className="min-h-[300px] font-mono"
              value={input}
              onChange={(e) => {
                //auto format on change if is valid json
                try {
                  const parsed = JSON.parse(e.target.value);
                  setOutput(JSON.stringify(parsed, null, 2));
                } catch (error) {
                } finally {
                  setInput(e.target.value);
                }
              }}
            />
            <Button onClick={formatJson} className="mt-4" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("format")}
            </Button>
          </CardContent>
        </div>

        <div>
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              {t("output")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative px-0">
            <div className="absolute right-1 top-1">
              <Button
                variant="outline"
                size="icon"
                disabled={!output}
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">{t("copy")}</span>
              </Button>
            </div>
            <pre className="min-h-[300px] rounded-md border bg-muted p-4">
              <code className="text-sm">{output}</code>
            </pre>
          </CardContent>
        </div>
      </div>
    </ToolLayout>
  );
}
