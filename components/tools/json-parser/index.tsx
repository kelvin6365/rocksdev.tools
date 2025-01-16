"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, FileJson, RefreshCw, ArrowRightLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JsonParser = () => {
  const t = useTranslations("json.parser");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"parse" | "stringify">("parse");
  const [indentSize, setIndentSize] = useState("2");
  const [isGenerating, setIsGenerating] = useState(false);
  const [escapeUnicode, setEscapeUnicode] = useState(false);
  const [removeWhitespace, setRemoveWhitespace] = useState(true);

  const sampleJsonString = `{"name":"John Doe","age":30,"isStudent":false,"hobbies":["reading","gaming"],"address":{"city":"New York","country":"USA"}}`;
  const sampleJsonObject = {
    name: "John Doe",
    age: 30,
    isStudent: false,
    hobbies: ["reading", "gaming"],
    address: {
      city: "New York",
      country: "USA",
    },
  };

  const loadExample = () => {
    setInput(
      mode === "parse"
        ? sampleJsonString
        : JSON.stringify(sampleJsonObject, null, 2),
    );
    setError("");
  };

  const handleProcess = () => {
    try {
      setIsGenerating(true);
      setError("");

      if (mode === "parse") {
        const unescapedInput = input
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, "\\")
          .replace(/\\n/g, "\n");
        const parsed = JSON.parse(unescapedInput);
        setOutput(
          JSON.stringify(
            parsed,
            null,
            removeWhitespace ? 0 : Number(indentSize),
          ),
        );
      } else {
        // For stringify mode, first try to evaluate the input as a JavaScript object
        let inputObj;
        try {
          // Using Function to safely evaluate the input as an object
          // This allows users to input JavaScript object notation
          inputObj = new Function("return " + input)();
        } catch {
          throw new Error(t("errors.invalid-object"));
        }

        // First stringify with indentation
        let stringified = JSON.stringify(
          inputObj,
          (key, value) => {
            if (typeof value === "undefined") return "undefined";
            return value;
          },
          removeWhitespace ? 0 : Number(indentSize),
        );

        // Then escape the entire string for display
        stringified = JSON.stringify(stringified)
          // Remove the surrounding quotes that JSON.stringify adds
          .slice(1, -1)
          // Unescape the already escaped quotes to avoid double escaping
          .replace(/\\"/g, '"')
          // Now escape all quotes
          .replace(/"/g, '\\"');

        setOutput(stringified);
      }
    } catch (err) {
      setError(
        mode === "parse"
          ? t("errors.invalid-json")
          : t("errors.invalid-object"),
      );
      setOutput("");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleMode = () => {
    setMode(mode === "parse" ? "stringify" : "parse");
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <CardContent className="px-0 pb-0 flex flex-col gap-6">
        {/* Configuration Section */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label>{t("config.mode")}</Label>
              <Button variant="outline" size="sm" onClick={toggleMode}>
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                {mode === "parse"
                  ? t("config.modes.parse")
                  : t("config.modes.stringify")}
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label>{t("config.indent")}</Label>
                <Select
                  value={indentSize}
                  onValueChange={setIndentSize}
                  disabled={removeWhitespace}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={removeWhitespace}
                  onCheckedChange={setRemoveWhitespace}
                />
                <Label>{t("config.remove-whitespace")}</Label>
              </div>
              {mode === "stringify" && (
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={escapeUnicode}
                    onCheckedChange={setEscapeUnicode}
                  />
                  <Label>{t("config.escape-unicode")}</Label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>{t("input.title")}</Label>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={loadExample}>
                <FileJson className="h-4 w-4 mr-2" />
                {t("input.load-example")}
              </Button>
            </div>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "parse"
                ? t("input.parse-placeholder")
                : t("input.stringify-placeholder")
            }
            className="font-mono h-48"
          />
        </div>

        <Button
          onClick={handleProcess}
          className="w-full"
          disabled={isGenerating}
        >
          <FileJson className="h-4 w-4 mr-2" />
          {isGenerating ? t("processing") : t("process")}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Output Section */}
        {output && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>{t("output.title")}</Label>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                {t("output.copy")}
              </Button>
            </div>
            <Textarea value={output} readOnly className="font-mono h-48" />
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default JsonParser;
