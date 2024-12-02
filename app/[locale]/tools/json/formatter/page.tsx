"use client";

import { ToolLayout } from "@/components/layouts/tool-layout";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, FileJson, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { JsonEditor, UpdateFunction } from "json-edit-react";

export default function JsonFormatterPage() {
  const t = useTranslations("json.formatter");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isJsonValid, setIsJsonValid] = React.useState(false);

  const formatJson = () => {
    if (!input.trim()) {
      toast.warning(t("error.empty"), {});
      return;
    }

    setIsLoading(true);
    try {
      const parsed = JSON.parse(input);
      setOutput(parsed);
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

  return (
    <ToolLayout translationKey="json.formatter">
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
              className={`h-full font-mono ${!isJsonValid && input ? "border-red-500" : ""}`}
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
            <div className="absolute right-1 top-1 z-10">
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
            <div className="absolute right-1 top-1 z-10">
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
            <div className="h-full rounded-md border bg-muted overflow-y-auto">
              <JsonEditor
                className="!w-full !max-w-full !min-w-min h-full"
                data={output}
                setData={(newValue) => {
                  setOutput(newValue);
                }}
                rootName={"data"}
              />
            </div>
          </CardContent>
        </div>
      </div>
    </ToolLayout>
  );
}
