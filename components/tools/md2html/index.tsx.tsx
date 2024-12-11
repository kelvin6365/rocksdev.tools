"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, FileCode2, HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { toast } from "sonner";
import { unified } from "unified";
import { useTool } from "../../../contexts/tool-context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const MarkdownConverter = () => {
  const t = useTranslations("converters.md2html");
  const [markdown, setMarkdown] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { incrementToolUsage } = useTool();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeTab, setActiveTab] = useState("preview");

  const getPreviewHTML = useCallback(
    () => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Markdown Preview</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css">
        <style>
          :root {
            color-scheme: light dark;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            padding: 1rem;
            margin: 0;
            color: #1a1a1a;
          }

          @media (prefers-color-scheme: dark) {
            body {
              color: #e1e1e1;
              background: #1a1a1a;
            }
          }

          /* Typography */
          h1, h2, h3, h4, h5, h6 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: 600;
            line-height: 1.25;
          }
          
          h1 { font-size: 2.25rem; }
          h2 { font-size: 1.8rem; border-bottom: 1px solid #eaeaea; padding-bottom: 0.3em; }
          h3 { font-size: 1.5rem; }
          
          /* Links */
          a {
            color: #0969da;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }

          /* Lists */
          ul, ol {
            padding-left: 2em;
            margin: 1em 0;
          }

          /* Blockquotes */
          blockquote {
            margin: 1em 0;
            padding: 0 1em;
            color: #656d76;
            border-left: 0.25em solid #d0d7de;
          }

          /* Code */
          code {
            padding: 0.2em 0.4em;
            background: rgba(175, 184, 193, 0.2);
            border-radius: 6px;
            font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace;
            font-size: 85%;
          }

          pre {
            padding: 1em;
            overflow: auto;
            background: rgba(175, 184, 193, 0.2);
            border-radius: 6px;
            font-size: 85%;
          }

          pre code {
            padding: 0;
            background: transparent;
          }

          /* Tables */
          table {
            border-spacing: 0;
            border-collapse: collapse;
            margin: 1em 0;
            width: 100%;
          }

          th, td {
            padding: 6px 13px;
            border: 1px solid #d0d7de;
          }

          th {
            font-weight: 600;
            background: rgba(175, 184, 193, 0.1);
          }

          /* Task Lists */
          .task-list-item {
            list-style-type: none;
          }

          .task-list-item input {
            margin: 0 0.5em 0 -1.3em;
            vertical-align: middle;
          }

          /* Dark Mode */
          @media (prefers-color-scheme: dark) {
            a { color: #58a6ff; }
            blockquote {
              color: #8b949e;
              border-left-color: #3b434b;
            }
            code { background: rgba(110, 118, 129, 0.4); }
            pre { background: rgba(110, 118, 129, 0.4); }
            th, td { border-color: #3b434b; }
            th { background: rgba(110, 118, 129, 0.1); }
          }
        </style>
      </head>
      <body>
        ${htmlOutput}
        <script>
          Prism.highlightAll();
        </script>
      </body>
    </html>
  `,
    [htmlOutput],
  );

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

  // Update iframe content when HTML output changes
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(getPreviewHTML());
        iframeDoc.close();
      }
    }
  }, [htmlOutput, activeTab, getPreviewHTML]);

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
            <div className="flex items-center justify-between">
              <Tabs
                defaultValue="preview"
                className="w-full"
                onValueChange={(value) => setActiveTab(value)}
              >
                <div className="flex items-center justify-between mb-2">
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 ml-2 text-muted-foreground hover:text-primary cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[300px]">
                        <p className="text-sm">{t("tooltip.preview")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <TabsContent value="code">
                  <textarea
                    className="w-full h-96 p-2 border rounded-md font-mono text-sm resize-none"
                    value={htmlOutput}
                    readOnly
                  />
                </TabsContent>
                <TabsContent value="preview">
                  <div className="border rounded-md h-96 overflow-hidden">
                    <iframe
                      ref={iframeRef}
                      className="w-full h-full"
                      title="Markdown Preview"
                      sandbox="allow-same-origin allow-scripts"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
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
