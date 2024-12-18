"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Upload, Download, Info, Loader2 } from "lucide-react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import JSZip from "jszip";
import { useTranslations } from "next-intl";
import { useTool } from "@/contexts/tool-context";

interface IconSpec {
  size: number;
  idiom: string;
  scale: number;
  folder?: string;
}

interface Platform {
  id: string;
  sizes: IconSpec[];
}

const ICON_SPECS: Record<string, Platform> = {
  iphone: {
    id: "iphone",
    sizes: [
      { size: 40, idiom: "iphone", scale: 2 }, // 80x80
      { size: 40, idiom: "iphone", scale: 3 }, // 120x120
      { size: 60, idiom: "iphone", scale: 2 }, // 120x120
      { size: 60, idiom: "iphone", scale: 3 }, // 180x180
      { size: 29, idiom: "iphone", scale: 2 }, // 58x58
      { size: 29, idiom: "iphone", scale: 3 }, // 87x87
      { size: 20, idiom: "iphone", scale: 2 }, // 40x40
      { size: 20, idiom: "iphone", scale: 3 }, // 60x60
      { size: 1024, idiom: "ios-marketing", scale: 1 }, // App Store
    ],
  },
  ipad: {
    id: "ipad",
    sizes: [
      { size: 40, idiom: "ipad", scale: 1 }, // 40x40
      { size: 40, idiom: "ipad", scale: 2 }, // 80x80
      { size: 76, idiom: "ipad", scale: 1 }, // 76x76
      { size: 76, idiom: "ipad", scale: 2 }, // 152x152
      { size: 83.5, idiom: "ipad", scale: 2 }, // 167x167
      { size: 29, idiom: "ipad", scale: 1 }, // 29x29
      { size: 29, idiom: "ipad", scale: 2 }, // 58x58
      { size: 20, idiom: "ipad", scale: 1 }, // 20x20
      { size: 20, idiom: "ipad", scale: 2 }, // 40x40
    ],
  },
  android: {
    id: "android",
    sizes: [
      { size: 48, idiom: "mdpi", scale: 1, folder: "mipmap-mdpi" },
      { size: 72, idiom: "hdpi", scale: 1, folder: "mipmap-hdpi" },
      { size: 96, idiom: "xhdpi", scale: 1, folder: "mipmap-xhdpi" },
      { size: 144, idiom: "xxhdpi", scale: 1, folder: "mipmap-xxhdpi" },
      { size: 192, idiom: "xxxhdpi", scale: 1, folder: "mipmap-xxxhdpi" },
      { size: 512, idiom: "playstore", scale: 1 }, // No folder needed as it goes to root
    ],
  },
};

export default function AppIconGenerator() {
  const t = useTranslations("dev.app-icon");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [androidFileName, setAndroidFileName] = useState("ic_launcher.png");
  const [showInstructions, setShowInstructions] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { incrementToolUsage } = useTool();

  const platforms = [
    {
      title: t("instructions.ios"),
      options: [
        {
          id: "iphone",
          label: t("instructions.iphone"),
          description: t("instructions.iphone-description"),
        },
        {
          id: "ipad",
          label: t("instructions.ipad"),
          description: t("instructions.ipad-description"),
        },
        {
          id: "watchos",
          label: t("instructions.watchos"),
          description: t("instructions.watchos-description"),
        },
        {
          id: "macos",
          label: t("instructions.macos"),
          description: t("instructions.macos-description"),
        },
      ],
    },
    {
      title: t("instructions.android"),
      options: [
        {
          id: "android",
          label: t("instructions.android"),
          description: t("instructions.android-description"),
        },
      ],
    },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const resizeImage = async (
    file: File,
    width: number,
    height: number,
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        // Calculate scaling and positioning for cover style
        const scale = Math.max(width / img.width, height / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;

        // Draw image with cover style and smooth scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob"));
            }
          },
          "image/png",
          1.0,
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(file);
    });
  };

  // Add this function to generate iOS Contents.json
  const generateContentsJson = (specs: IconSpec[]): string => {
    const images = specs.map((spec) => ({
      size: `${spec.size}x${spec.size}`,
      idiom: spec.idiom,
      filename: `${spec.size}x${spec.size}@${spec.scale}x.png`,
      scale: `${spec.scale}x`,
    }));

    return JSON.stringify(
      {
        images,
        info: {
          version: 1,
          author: "RocksDev Tools",
        },
      },
      null,
      2,
    );
  };

  // Update the handleGenerate function
  const handleGenerate = async () => {
    if (!uploadedFile) return;

    try {
      setIsGenerating(true);
      const zip = new JSZip();

      // Get selected platforms
      const selectedPlatforms = platforms.flatMap((platform) =>
        platform.options.filter(
          (option) =>
            (document.getElementById(option.id) as HTMLInputElement)?.checked,
        ),
      );

      for (const platform of selectedPlatforms) {
        const specs = ICON_SPECS[platform.id];
        if (!specs) continue;

        for (const spec of specs.sizes) {
          const size = Math.round(spec.size * spec.scale);
          const blob = await resizeImage(uploadedFile, size, size);

          if (platform.id === "android") {
            if (spec.idiom === "playstore") {
              // Place playstore.png in root
              zip.file("playstore.png", blob);
            } else {
              // Place android icons in android/mipmap folders
              const folder = spec.folder;
              if (folder) {
                zip.file(`android/${folder}/${androidFileName}`, blob);
              }
            }

            // Additional appstore.png at root level
            if (spec.size === 512) {
              zip.file("appstore.png", blob);
            }
          } else {
            // iOS icons in Assets.xcassets/AppIcon.appiconset
            const fileName = `${spec.size}x${spec.size}@${spec.scale}x.png`;
            const appIconPath = `Assets.xcassets/AppIcon.appiconset/${fileName}`;
            zip.file(appIconPath, blob);

            // Add Contents.json in the AppIcon.appiconset folder
            if (spec === specs.sizes[0]) {
              // Only add once
              const contentsJson = generateContentsJson(specs.sizes);
              zip.file(
                "Assets.xcassets/AppIcon.appiconset/Contents.json",
                contentsJson,
              );
            }
          }
        }
      }

      // Generate and download zip
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "app-icons.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating icons:", error);
    } finally {
      setIsGenerating(false);
      incrementToolUsage("app-icon");
    }
  };

  const UsageInstructions = () => (
    <div className="mt-6 space-y-4 text-sm">
      <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg">
        <Info className="w-5 h-5 text-blue-500 mt-0.5" />
        <div className="space-y-4">
          <h3 className="font-medium text-blue-900">
            {t("instructions.how-to-use")}
          </h3>

          <div>
            <p className="font-medium text-blue-900">
              {t("instructions.for-ios")}
            </p>
            <ol className="ml-4 space-y-1 text-blue-800">
              <li>{t("instructions.how-to-use-ios-1")}</li>
              <li>{t("instructions.how-to-use-ios-2")}</li>
              <li>
                {t.rich("instructions.how-to-use-ios-3", {
                  code: (chunks) => (
                    <code className="bg-blue-100 px-1 rounded">{chunks}</code>
                  ),
                })}
              </li>
              <li>
                {t.rich("instructions.how-to-use-ios-4", {
                  code: (chunks) => (
                    <code className="bg-blue-100 px-1 rounded">{chunks}</code>
                  ),
                })}
              </li>
              <li>{t("instructions.how-to-use-ios-5")}</li>
            </ol>
          </div>

          <div>
            <p className="font-medium text-blue-900">
              {t("instructions.for-android")}
            </p>
            <ol className="ml-4 space-y-1 text-blue-800">
              <li>{t("instructions.for-android-1")}</li>
              <li>
                {t.rich("instructions.for-android-2", {
                  code: (chunks) => (
                    <code className="bg-blue-100 px-1 rounded">{chunks}</code>
                  ),
                })}
              </li>
              <li>
                {t.rich("instructions.for-android-3", {
                  code: (chunks) => (
                    <code className="bg-blue-100 px-1 rounded">{chunks}</code>
                  ),
                })}
              </li>
              <li>
                {t.rich("instructions.for-android-4", {
                  code: (chunks) => (
                    <code className="bg-blue-100 px-1 rounded">{chunks}</code>
                  ),
                })}
              </li>
              <li>
                {t.rich("instructions.for-android-5", {
                  code: (chunks) => (
                    <code className="bg-blue-100 px-1 rounded">{chunks}</code>
                  ),
                })}
              </li>
            </ol>
          </div>

          <div>
            <p className="font-medium text-blue-900 mb-1">
              {t("instructions.store-submissions")}
            </p>
            <ul className="ml-4 space-y-1 text-blue-800">
              <li>
                {t.rich("instructions.store-submissions-ios", {
                  code: (chunks) => (
                    <code className="bg-blue-100 px-1 rounded">{chunks}</code>
                  ),
                })}
              </li>
              <li>
                {t.rich("instructions.store-submissions-android", {
                  code: (chunks) => (
                    <code className="bg-blue-100 px-1 rounded">{chunks}</code>
                  ),
                })}
              </li>
              <li>
                {t.rich("instructions.store-submissions-both", {
                  code: (chunks) => (
                    <code className="bg-blue-100 px-1 rounded">{chunks}</code>
                  ),
                })}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <CardHeader className="p-0">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("upload-description")}</CardDescription>
      </CardHeader>

      <CardContent className="p-0 space-y-6">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            ${uploadedFile ? "border-green-500 bg-green-50" : ""}
            hover:border-blue-500 cursor-pointer`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) {
              setUploadedFile(file);
            }
          }}
        >
          <div className="flex flex-col items-center gap-2">
            {uploadedFile ? (
              <>
                <div className="w-24 h-24 rounded-xl border-2 border-green-500 flex items-center justify-center mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(uploadedFile)}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
                <p className="text-green-600 font-medium">
                  {uploadedFile.name}
                </p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400" />
                <p className="text-lg font-medium">{t("upload-placeholder")}</p>
                <p className="text-sm text-gray-500">
                  {t("upload-placeholder-description")}
                </p>
              </>
            )}
            <input
              type="file"
              id="icon-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => document.getElementById("icon-upload")?.click()}
            >
              {uploadedFile ? t("upload-button-change") : t("upload-button")}
            </Button>
          </div>
        </div>

        {/* Platform Selection */}
        {platforms.map((platform, index) => (
          <div key={index} className="space-y-3">
            <div className="text-base font-medium">{platform.title}</div>
            <div className="grid grid-cols-2 gap-3">
              {platform.options.map((option) => (
                <div key={option.id} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id={option.id}
                    className="h-4 w-4 rounded border-gray-300 text-blue-500 mt-1"
                    defaultChecked={
                      option.id === "iphone" || option.id === "android"
                    }
                  />
                  <label htmlFor={option.id} className="flex flex-col">
                    <span className="text-sm font-medium">{option.label}</span>
                    <span className="text-xs text-gray-500">
                      {option.description}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            {index < platforms.length - 1 && <Separator className="my-4" />}
          </div>
        ))}

        {/* Android File Name Input */}
        <div className="space-y-2">
          <label className="text-xs">{t("file-name")}</label>
          <Input
            value={androidFileName}
            onChange={(e) => setAndroidFileName(e.target.value)}
            className="max-w-xs text-sm"
          />
          <p className="text-xs text-gray-500">{t("file-name-description")}</p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 p-0">
        <div className="w-full flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setUploadedFile(null);
            }}
            disabled={!uploadedFile || isGenerating}
          >
            {t("reset")}
          </Button>
          <Button
            className="flex items-center gap-2 min-w-[140px]"
            disabled={!uploadedFile || isGenerating}
            onClick={handleGenerate}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("generating")}
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                {t("upload-button-generate")}
              </>
            )}
          </Button>
        </div>

        <Collapsible
          open={showInstructions}
          onOpenChange={setShowInstructions}
          className="w-full"
        >
          <CollapsibleContent>
            <UsageInstructions />
          </CollapsibleContent>
        </Collapsible>
      </CardFooter>
    </div>
  );
}
