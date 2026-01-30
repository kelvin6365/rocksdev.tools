"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useTranslations } from "next-intl";
import { useTool } from "@/contexts/tool-context";
import React, { useEffect, useRef, useState } from "react";
import { compressImage } from "./image-processor";
import {
  ImageFile,
  OptimizationResult,
  OptimizationSettings,
  ToolError,
} from "./types";

export default function AdvancedImageOptimizer() {
  const t = useTranslations("converters.advanced-image-optimization");
  const { incrementToolUsage } = useTool();
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<OptimizationSettings>({
    quality: 80,
    format: "jpeg",
    maxWidth: null,
    maxHeight: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<OptimizationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
        if (file.optimizedUrl) URL.revokeObjectURL(file.optimizedUrl);
      });
    };
  }, [files]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: ImageFile[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Validate file type
      if (!file.type.match("image/(jpeg|png|webp|gif)")) {
        setError(t("errors.invalid-file-type"));
        continue;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError(t("errors.file-too-large"));
        continue;
      }

      const previewUrl = URL.createObjectURL(file);

      newFiles.push({
        id: `${Date.now()}-${i}`,
        file,
        previewUrl,
        originalSize: file.size,
        status: "pending",
      });
    }

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);
      setError(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = event.dataTransfer.files;
    if (!droppedFiles || droppedFiles.length === 0) return;

    const fakeEvent = {
      target: { files: droppedFiles },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleFileChange(fakeEvent);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        if (fileToRemove.previewUrl)
          URL.revokeObjectURL(fileToRemove.previewUrl);
        if (fileToRemove.optimizedUrl)
          URL.revokeObjectURL(fileToRemove.optimizedUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const optimizeImage = async (file: ImageFile): Promise<Blob> => {
    try {
      const result = await compressImage(file.file, settings);
      return result;
    } catch (err) {
      throw err instanceof ToolError
        ? err
        : new ToolError("Image processing failed", "PROCESSING_ERROR", {
            originalError: err,
          });
    }
  };

  const handleOptimize = async () => {
    if (files.length === 0) {
      setError(t("errors.no-files"));
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const totalFiles = files.length;
      let processedCount = 0;
      let totalOriginalSize = 0;
      let totalOptimizedSize = 0;

      const updatedFiles = [...files];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Update file status to processing
        updatedFiles[i] = { ...file, status: "processing" };
        setFiles([...updatedFiles]);

        try {
          const optimizedBlob = await optimizeImage(file);

          // Revoke old optimized URL if it exists
          if (file.optimizedUrl) {
            URL.revokeObjectURL(file.optimizedUrl);
          }

          const optimizedUrl = URL.createObjectURL(optimizedBlob);

          updatedFiles[i] = {
            ...file,
            optimizedBlob,
            optimizedUrl,
            optimizedSize: optimizedBlob.size,
            status: "optimized",
          };

          totalOriginalSize += file.originalSize;
          totalOptimizedSize += optimizedBlob.size;
          processedCount++;

          // Update progress
          setProgress(Math.round((processedCount / totalFiles) * 100));
        } catch (err) {
          const errorMessage =
            err instanceof ToolError
              ? err.message
              : t("errors.optimization-failed");
          updatedFiles[i] = {
            ...file,
            status: "error",
            error: errorMessage,
          };
        }
      }

      setFiles(updatedFiles);

      // Calculate results
      if (totalOriginalSize > 0) {
        const savingsPercentage = Math.round(
          ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100,
        );
        setResults({
          originalSize: totalOriginalSize,
          optimizedSize: totalOptimizedSize,
          savingsPercentage,
        });
      }
    } catch (err) {
      setError(
        err instanceof ToolError
          ? err.message
          : t("errors.optimization-failed"),
      );
    } finally {
      setIsProcessing(false);
      incrementToolUsage("advanced_image_optimization");
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownloadAll = async () => {
    if (files.some((f) => f.status !== "optimized")) {
      setError(t("errors.download-not-ready"));
      return;
    }

    try {
      const zip = new JSZip();
      const folderName = "optimized-images";
      const zipFolder = zip.folder(folderName)!;

      files.forEach((file, index) => {
        if (file.optimizedBlob) {
          const extension = settings.format;
          const filename = `${file.file.name.split(".")[0]}_optimized.${extension}`;
          zipFolder.file(filename, file.optimizedBlob);
        }
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "optimized-images.zip");
    } catch (err) {
      setError(
        err instanceof ToolError ? err.message : t("errors.download-failed"),
      );
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Settings Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("settings.title")}</CardTitle>
          <CardDescription>{t("settings.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quality Setting */}
            <div className="space-y-2">
              <Label htmlFor="quality">
                {t("settings.quality.label")} ({settings.quality}%)
              </Label>
              <Slider
                id="quality"
                min={1}
                max={100}
                step={1}
                value={[settings.quality]}
                onValueChange={(value) =>
                  setSettings({ ...settings, quality: value[0] })
                }
                disabled={isProcessing}
              />
              <p className="text-sm text-muted-foreground">
                {t("settings.quality.description")}
              </p>
            </div>

            {/* Format Setting */}
            <div className="space-y-2">
              <Label htmlFor="format">{t("settings.format.label")}</Label>
              <Select
                value={settings.format}
                onValueChange={(value: "jpeg" | "png" | "webp") =>
                  setSettings({ ...settings, format: value })
                }
                disabled={isProcessing}
              >
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {t("settings.format.description")}
              </p>
            </div>

            {/* Max Width Setting */}
            <div className="space-y-2">
              <Label htmlFor="max-width">{t("settings.max-width.label")}</Label>
              <Input
                id="max-width"
                type="number"
                placeholder={t("settings.max-width.placeholder")}
                value={settings.maxWidth || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxWidth: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                disabled={isProcessing}
              />
              <p className="text-sm text-muted-foreground">
                {t("settings.max-width.description")}
              </p>
            </div>

            {/* Max Height Setting */}
            <div className="space-y-2">
              <Label htmlFor="max-height">
                {t("settings.max-height.label")}
              </Label>
              <Input
                id="max-height"
                type="number"
                placeholder={t("settings.max-height.placeholder")}
                value={settings.maxHeight || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxHeight: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                disabled={isProcessing}
              />
              <p className="text-sm text-muted-foreground">
                {t("settings.max-height.description")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("upload.title")}</CardTitle>
          <CardDescription>{t("upload.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isProcessing}
            />
            <div className="space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <p className="font-medium">{t("upload.drop-label")}</p>
              <p className="text-sm text-muted-foreground">
                {t("upload.click-to-upload")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress and Results */}
      {isProcessing && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("progress.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {t("progress.status", {
                  processed: files.filter(
                    (f) => f.status === "optimized" || f.status === "error",
                  ).length,
                  total: files.length,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("results.title")}</CardTitle>
            <CardDescription>{t("results.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {t("results.total-original")}
                </p>
                <p className="text-xl font-semibold">
                  {formatFileSize(results.originalSize)}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {t("results.total-optimized")}
                </p>
                <p className="text-xl font-semibold">
                  {formatFileSize(results.optimizedSize)}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {t("results.savings")}
                </p>
                <p className="text-xl font-semibold text-green-600">
                  -{results.savingsPercentage}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <Card className="mb-6 border-red-500">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("files.title")}</CardTitle>
            <CardDescription>{t("files.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={file.previewUrl}
                      alt={file.file.name}
                      className="w-20 h-20 object-contain bg-muted rounded"
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="truncate">
                        <p className="font-medium truncate">{file.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.originalSize)}
                          {file.optimizedSize !== undefined &&
                            ` → ${formatFileSize(file.optimizedSize)}`}
                        </p>
                      </div>

                      <Badge
                        variant={
                          file.status === "optimized"
                            ? "default"
                            : file.status === "processing"
                              ? "secondary"
                              : file.status === "error"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {t(`status.${file.status}`)}
                      </Badge>
                    </div>

                    {file.status === "error" && file.error && (
                      <p className="text-sm text-red-600 mt-1">{file.error}</p>
                    )}

                    {file.optimizedUrl && (
                      <div className="mt-2 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = file.optimizedUrl!;
                            link.download = `${file.file.name.split(".")[0]}_optimized.${settings.format}`;
                            link.click();
                          }}
                        >
                          {t("actions.download-single")}
                        </Button>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    disabled={isProcessing}
                  >
                    {t("actions.remove")}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Button
              onClick={handleOptimize}
              disabled={
                isProcessing || files.some((f) => f.status === "processing")
              }
            >
              {isProcessing
                ? t("actions.optimizing")
                : t("actions.optimize-all")}
            </Button>

            <Button
              variant="outline"
              onClick={handleDownloadAll}
              disabled={
                files.length === 0 ||
                files.some((f) => f.status !== "optimized")
              }
            >
              {t("actions.download-all")}
            </Button>

            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isProcessing}
            >
              {t("actions.reset")}
            </Button>
          </CardFooter>
        </Card>
      )}

      {!files.length && !isProcessing && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {t("empty-state.message")}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
