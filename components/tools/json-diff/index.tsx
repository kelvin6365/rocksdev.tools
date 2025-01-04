"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useTool } from "@/contexts/tool-context";
import { ArrowRight, Download, FileJson, Loader2, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { toast } from "sonner";

export function JsonDiff() {
  const t = useTranslations("json.diff");
  const { incrementToolUsage } = useTool();
  const [leftInput, setLeftInput] = React.useState("");
  const [rightInput, setRightInput] = React.useState("");
  const [diffResult, setDiffResult] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const leftFileInputRef = React.useRef<HTMLInputElement>(null);
  const rightFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setSide: (value: string) => void,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        setSide(content);
      } catch (error) {
        toast.error(t("error.invalid"));
      }
    };
    reader.readAsText(file);
  };

  const compareJson = () => {
    if (!leftInput.trim() || !rightInput.trim()) {
      toast.warning(t("error.empty"));
      return;
    }

    setIsLoading(true);
    try {
      const leftObj = JSON.parse(leftInput);
      const rightObj = JSON.parse(rightInput);

      // Calculate differences
      const diff = {
        added: findDifferences(rightObj, leftObj),
        removed: findDifferences(leftObj, rightObj),
        modified: findModified(leftObj, rightObj),
      };

      setDiffResult(diff);
    } catch (error) {
      toast.error(t("error.invalid"));
    } finally {
      setIsLoading(false);
      incrementToolUsage("json_diff");
    }
  };

  const handleExport = (format: "json" | "csv") => {
    if (!diffResult) return;

    let content: string;
    let fileName: string;
    let mimeType: string;

    if (format === "json") {
      content = JSON.stringify(diffResult, null, 2);
      fileName = "diff-result.json";
      mimeType = "application/json";
    } else {
      content = convertDiffToCsv(diffResult);
      fileName = "diff-result.csv";
      mimeType = "text/csv";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(t("exported", { format: format.toUpperCase() }));
  };

  return (
    <div className="space-y-6">
      {/* Desktop View */}
      <div className="hidden md:flex gap-6">
        {/* Left Input */}
        <div className="w-full flex flex-col">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              {t("leftInput")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative px-0 h-[300px] max-w-[479px]">
            <Textarea
              placeholder={t("placeholder")}
              className="h-full font-mono"
              value={leftInput}
              onChange={(e) => setLeftInput(e.target.value)}
            />
            <input
              type="file"
              ref={leftFileInputRef}
              accept=".json"
              className="hidden"
              onChange={(e) => handleFileUpload(e, setLeftInput)}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute right-1 top-1"
              onClick={() => leftFileInputRef.current?.click()}
              title={t("upload")}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </CardContent>
        </div>

        {/* Right Input */}
        <div className="w-full flex flex-col">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              {t("rightInput")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative px-0 h-[300px] max-w-[479px]">
            <Textarea
              placeholder={t("placeholder")}
              className="h-full font-mono"
              value={rightInput}
              onChange={(e) => setRightInput(e.target.value)}
            />
            <input
              type="file"
              ref={rightFileInputRef}
              accept=".json"
              className="hidden"
              onChange={(e) => handleFileUpload(e, setRightInput)}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute right-1 top-1"
              onClick={() => rightFileInputRef.current?.click()}
              title={t("upload")}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </CardContent>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <Tabs defaultValue="left" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="left" className="flex items-center gap-2">
              <FileJson className="h-4 w-4" />
              {t("leftInput")}
            </TabsTrigger>
            <TabsTrigger value="right" className="flex items-center gap-2">
              <FileJson className="h-4 w-4" />
              {t("rightInput")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="left" className="mt-2">
            <CardContent className="relative px-0 h-[300px]">
              <Textarea
                placeholder={t("placeholder")}
                className="h-full font-mono"
                value={leftInput}
                onChange={(e) => setLeftInput(e.target.value)}
              />
              <input
                type="file"
                ref={leftFileInputRef}
                accept=".json"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setLeftInput)}
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute right-1 top-1"
                onClick={() => leftFileInputRef.current?.click()}
                title={t("upload")}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </CardContent>
          </TabsContent>
          <TabsContent value="right" className="mt-2">
            <CardContent className="relative px-0 h-[300px]">
              <Textarea
                placeholder={t("placeholder")}
                className="h-full font-mono"
                value={rightInput}
                onChange={(e) => setRightInput(e.target.value)}
              />
              <input
                type="file"
                ref={rightFileInputRef}
                accept=".json"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setRightInput)}
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute right-1 top-1"
                onClick={() => rightFileInputRef.current?.click()}
                title={t("upload")}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </CardContent>
          </TabsContent>
        </Tabs>
      </div>

      {/* Compare Button */}
      <div className="flex justify-center gap-2">
        <Button onClick={compareJson} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
          <ArrowRight className="mr-1 h-4 w-4" />
          {t("compare")}
        </Button>
      </div>

      {/* Results Section */}
      {diffResult && (
        <div className="w-full space-y-4">
          <CardHeader className="px-0 pt-0">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="flex items-center gap-2">
                <FileJson className="h-5 w-5" />
                {t("differences")}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="mr-1 h-4 w-4" />
                    {t("exportResult")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport("json")}>
                    {t("exportAsJson")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("csv")}>
                    {t("exportAsCsv")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="px-0">
            <div className="grid gap-4">
              {/* Summary Section */}
              <div className="flex gap-2 flex-wrap">
                <Badge
                  variant="default"
                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                >
                  {diffResult.added.length} {t("added")}
                </Badge>
                <Badge
                  variant="default"
                  className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                >
                  {diffResult.removed.length} {t("removed")}
                </Badge>
                <Badge
                  variant="default"
                  className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                >
                  {diffResult.modified.length} {t("modified")}
                </Badge>
              </div>

              {/* Tables Container */}
              <div className="space-y-4 overflow-auto">
                {/* Added Properties */}
                {diffResult.added.length > 0 && (
                  <div className="border rounded-lg">
                    <div className="bg-green-500/5 px-4 py-2 border-b">
                      <h3 className="font-medium text-green-600">
                        {t("addedProperties")}
                      </h3>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">
                            {t("path")}
                          </TableHead>
                          <TableHead>{t("value")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {diffResult.added.map((item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-mono whitespace-nowrap">
                              {item.path}
                            </TableCell>
                            <TableCell className="font-mono text-wrap">
                              <pre className="whitespace-pre-wrap break-words text-sm">
                                {typeof item.value === "object"
                                  ? JSON.stringify(item.value, null, 2)
                                  : String(item.value)}
                              </pre>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                {/* Removed Properties - Similar structure */}
                {diffResult.removed.length > 0 && (
                  <div className="border rounded-lg overflow-x-auto">
                    <div className="bg-red-500/5 px-4 py-2 border-b">
                      <h3 className="font-medium text-red-600">
                        {t("removedProperties")}
                      </h3>
                    </div>
                    <div className="w-full overflow-hidden">
                      <Table className="min-w-full">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">
                              {t("path")}
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {diffResult.removed.map(
                            (item: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell className="font-mono text-wrap">
                                  {item.path}
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
                {/* Modified Properties */}
                {diffResult.modified.length > 0 && (
                  <div className="border rounded-lg overflow-x-auto">
                    <div className="bg-yellow-500/5 px-4 py-2 border-b">
                      <h3 className="font-medium text-yellow-600">
                        {t("modifiedProperties")}
                      </h3>
                    </div>
                    <div className="w-full overflow-hidden">
                      <Table className="min-w-full">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">
                              {t("path")}
                            </TableHead>
                            <TableHead>{t("oldValue")}</TableHead>
                            <TableHead>{t("newValue")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {diffResult.modified.map(
                            (item: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell className="font-mono whitespace-nowrap">
                                  {item.path}
                                </TableCell>
                                <TableCell className="font-mono bg-red-50">
                                  <pre className="whitespace-pre-wrap break-words text-sm">
                                    {typeof item.oldValue === "object"
                                      ? JSON.stringify(item.oldValue, null, 2)
                                      : String(item.oldValue)}
                                  </pre>
                                </TableCell>
                                <TableCell className="font-mono bg-green-50">
                                  <pre className="whitespace-pre-wrap break-words text-sm">
                                    {typeof item.newValue === "object"
                                      ? JSON.stringify(item.newValue, null, 2)
                                      : String(item.newValue)}
                                  </pre>
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      )}
    </div>
  );
}

// Utility functions for finding differences
function findDifferences(obj1: any, obj2: any, path: string[] = []): any[] {
  const differences: any[] = [];

  Object.keys(obj1).forEach((key) => {
    const currentPath = [...path, key];
    if (!(key in obj2)) {
      differences.push({
        path: currentPath.join("."),
        value: obj1[key],
      });
    } else if (
      typeof obj1[key] === "object" &&
      obj1[key] !== null &&
      typeof obj2[key] === "object" &&
      obj2[key] !== null
    ) {
      differences.push(...findDifferences(obj1[key], obj2[key], currentPath));
    }
  });

  return differences;
}

function findModified(obj1: any, obj2: any, path: string[] = []): any[] {
  const modifications: any[] = [];

  Object.keys(obj1).forEach((key) => {
    const currentPath = [...path, key];
    if (key in obj2) {
      if (
        typeof obj1[key] === "object" &&
        obj1[key] !== null &&
        typeof obj2[key] === "object" &&
        obj2[key] !== null
      ) {
        modifications.push(...findModified(obj1[key], obj2[key], currentPath));
      } else if (obj1[key] !== obj2[key]) {
        modifications.push({
          path: currentPath.join("."),
          oldValue: obj1[key],
          newValue: obj2[key],
        });
      }
    }
  });

  return modifications;
}

function convertDiffToCsv(diffResult: any): string {
  const rows: string[] = ["Type,Path,Old Value,New Value\n"];

  // Added properties
  diffResult.added.forEach((item: any) => {
    rows.push(`Added,${item.path},"${String(item.value)}",""\n`);
  });

  // Removed properties
  diffResult.removed.forEach((item: any) => {
    rows.push(`Removed,${item.path},"${String(item.value)}",""\n`);
  });

  // Modified properties
  diffResult.modified.forEach((item: any) => {
    rows.push(
      `Modified,${item.path},"${String(item.oldValue)}","${String(item.newValue)}"\n`,
    );
  });

  return rows.join("");
}
