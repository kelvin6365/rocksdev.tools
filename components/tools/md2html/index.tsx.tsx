"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, FileCode2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { toast } from "sonner";
import { unified } from "unified";
import { useTool } from "../../../contexts/tool-context";

const MarkdownConverter = () => {
  const t = useTranslations("converters.md2html");
  const [markdown, setMarkdown] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { incrementToolUsage } = useTool();

  const handleConvert = async () => {
    try {
      setIsConverting(true);
      setError(null);

      const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify)
        .use(rehypeRaw)
        .process(markdown);

      setHtmlOutput(String(file));
      toast.success(t("toast.converted"));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during conversion",
      );
    } finally {
      setIsConverting(false);
      incrementToolUsage("md2html");
    }
  };

  const loadSample = () => {
    setMarkdown(`# Welcome to Markdown

## Basic Syntax Example

Here's **bold** and *italic* text examples.

### Links and Lists

Here's [a link](https://example.com)

Unordered list:
* Item 1
* Item 2
* Item 3

Ordered list:
1. First item
2. Second item
3. Third item

### Code Example

Inline \`code\` example.

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`
`);
  };

  return (
    <div className="space-y-6">
      <CardHeader className="p-0">
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{t("input.title")}</h3>
              <div className="flex gap-2 py-[2px]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMarkdown("")}
                >
                  {t("actions.clear")}
                </Button>
                <Button variant="outline" size="sm" onClick={loadSample}>
                  {t("actions.loadSample")}
                </Button>
              </div>
            </div>
            <textarea
              className="w-full h-96 p-2 border rounded-md font-mono text-sm resize-none"
              placeholder="Enter your markdown here..."
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>

          {/* Output Section */}
          <div className="space-y-2">
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="code" className="flex gap-2">
                  <FileCode2 className="w-4 h-4" />
                  {t("output.html")}
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex gap-2">
                  <Eye className="w-4 h-4" />
                  {t("output.preview")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="code">
                <textarea
                  className="w-full h-96 p-2 border rounded-md font-mono text-sm resize-none"
                  value={htmlOutput}
                  readOnly
                />
              </TabsContent>
              <TabsContent value="preview">
                <div
                  className="prose prose-sm dark:prose-invert max-w-none border rounded-md h-96 overflow-auto w-full"
                  dangerouslySetInnerHTML={{ __html: htmlOutput }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Button onClick={handleConvert} disabled={isConverting}>
            {isConverting ? t("converting") : t("actions.convert")}
          </Button>
          <Button
            variant="outline"
            disabled={!htmlOutput}
            onClick={() => {
              navigator.clipboard.writeText(htmlOutput);
              toast.success(t("toast.copied"));
            }}
          >
            {t("actions.copy")}
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default MarkdownConverter;
