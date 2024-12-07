"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import JSZip from "jszip";
import { Download, Edit2, ImagePlus, Info, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTool } from "../../../contexts/tool-context";
import { ImageEditor } from "./image-editor";
import { useTranslations } from "next-intl";

interface ImageFile extends File {
  preview: string;
  edited?: boolean;
}

export function OGImageGenerator() {
  const t = useTranslations("seo.og-image");
  const { incrementToolUsage } = useTool();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      setImages((prev) => [...prev, ...newFiles]);
    },
  });

  const handleEdit = (image: ImageFile) => {
    setSelectedImage(image);
    setIsEditorOpen(true);
  };

  const handleRemove = (imageToRemove: ImageFile) => {
    setImages((prev) => prev.filter((img) => img !== imageToRemove));
    URL.revokeObjectURL(imageToRemove.preview);
  };

  const handleSaveEdit = async (editedImageBlob: Blob) => {
    if (!selectedImage) return;

    const editedFile = new File([editedImageBlob], selectedImage.name, {
      type: editedImageBlob.type,
    }) as ImageFile;

    editedFile.preview = URL.createObjectURL(editedImageBlob);
    editedFile.edited = true;

    setImages((prev) =>
      prev.map((img) => (img === selectedImage ? editedFile : img)),
    );

    setIsEditorOpen(false);
    setSelectedImage(null);
  };

  const handleBatchDownload = async () => {
    const zip = new JSZip();

    // Create a folder in the zip for the images
    const imgFolder = zip.folder("og-images");
    if (!imgFolder) return;

    // Add each image to the zip
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const response = await fetch(image.preview);
      const blob = await response.blob();
      imgFolder.file(`og-image-${i + 1}.${image.name.split(".").pop()}`, blob);
    }

    // Generate and download the zip file
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "og-images.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    incrementToolUsage("og_image");
  };

  return (
    <div className="space-y-6">
      {/* Info Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>{t("info.description")}</AlertDescription>
      </Alert>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25",
        )}
      >
        <input {...getInputProps()} />
        <ImagePlus className="mx-auto h-8 w-8 mb-4 text-muted-foreground" />
        <div className="space-y-2">
          <p className="text-sm font-medium">{t("upload.description")}</p>
          <p className="text-xs text-muted-foreground">{t("upload.formats")}</p>
        </div>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">
              {t("images.count", { count: images.length })}
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleBatchDownload} className="gap-2">
                    <Download className="h-4 w-4" />
                    {t("download.all.title")}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("download.all.tooltip")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group border rounded-lg overflow-hidden aspect-[1200/630]"
              >
                <Image
                  src={image.preview}
                  alt={t("images.alt", { index: index + 1 })}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(image)}
                          className="gap-2"
                        >
                          <Edit2 className="h-4 w-4" />
                          {t("edit.title")}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("edit.tooltip")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemove(image)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          {t("remove.title")}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("remove.tooltip")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {image.edited && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    {t("edited")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor Modal */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t("edit.title")}</DialogTitle>
            <DialogDescription>{t("edit.description")}</DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <ImageEditor
              image={selectedImage}
              onSave={handleSaveEdit}
              onCancel={() => setIsEditorOpen(false)}
              onRemove={() => {
                handleRemove(selectedImage);
                setIsEditorOpen(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
