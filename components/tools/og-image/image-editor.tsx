import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDebounceEffect } from "@/hooks/use-debounce-effect";
import { Move, Trash2, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvas-preview";

interface ImageEditorProps {
  image: File & { preview: string };
  onSave: (editedImage: Blob) => void;
  onCancel: () => void;
  onRemove: () => void;
}

const OG_ASPECT = 1200 / 630; // 1.91:1
const PREVIEW_WIDTH = 1200;
const PREVIEW_HEIGHT = 630;

export function ImageEditor({
  image,
  onSave,
  onCancel,
  onRemove,
}: ImageEditorProps) {
  const t = useTranslations("seo.og-image");
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);

  const setInitialCrop = () => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    // Reset scale when setting initial crop
    setScale(1);

    // Get the actual displayed dimensions
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    // Calculate crop dimensions maintaining OG aspect ratio
    let cropWidth, cropHeight;

    const imageAspect = displayWidth / displayHeight;
    if (imageAspect > OG_ASPECT) {
      // Image is wider than OG ratio
      cropHeight = Math.min(displayHeight, PREVIEW_HEIGHT);
      cropWidth = cropHeight * OG_ASPECT;
    } else {
      // Image is taller than OG ratio
      cropWidth = Math.min(displayWidth, PREVIEW_WIDTH);
      cropHeight = cropWidth / OG_ASPECT;
    }

    // Center the crop
    const x = (displayWidth - cropWidth) / 2;
    const y = (displayHeight - cropHeight) / 2;

    // Ensure crop doesn't exceed image bounds
    const finalCrop = {
      unit: "px" as const,
      x: Math.max(0, x),
      y: Math.max(0, y),
      width: Math.min(cropWidth, displayWidth),
      height: Math.min(cropHeight, displayHeight),
    };

    setCrop(finalCrop);
    setCompletedCrop(finalCrop);
  };

  // Update crop when scale changes
  useEffect(() => {
    if (!imgRef.current || !completedCrop) return;

    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    // Adjust crop dimensions based on scale
    const scaledCrop = {
      ...completedCrop,
      x: completedCrop.x / scale,
      y: completedCrop.y / scale,
      width: completedCrop.width / scale,
      height: completedCrop.height / scale,
    };

    // Ensure crop stays within bounds
    const boundedCrop = {
      ...scaledCrop,
      x: Math.max(0, Math.min(rect.width - scaledCrop.width, scaledCrop.x)),
      y: Math.max(0, Math.min(rect.height - scaledCrop.height, scaledCrop.y)),
    };

    setCrop(boundedCrop);
  }, [scale, completedCrop]);

  // Handle orientation change
  useEffect(() => {
    const handleResize = () => {
      // Add a small delay to ensure new dimensions are calculated correctly
      setTimeout(setInitialCrop, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const handleImageLoad = () => {
    setInitialCrop();
  };

  // Update preview with proper scaling
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        try {
          const scaledCrop = {
            ...completedCrop,
            x: completedCrop.x * scale,
            y: completedCrop.y * scale,
            width: completedCrop.width * scale,
            height: completedCrop.height * scale,
          };

          await canvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            scaledCrop,
          );
        } catch (e) {
          console.error("Preview error:", e);
        }
      }
    },
    100,
    [completedCrop, scale],
  );

  const handleSave = async () => {
    if (!previewCanvasRef.current) return;

    // Convert the canvas to a blob
    const blob = await new Promise<Blob>((resolve) => {
      previewCanvasRef.current?.toBlob((blob) => {
        if (blob) resolve(blob);
      }, "image/png");
    });

    onSave(blob);
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Move className="h-4 w-4" />
          <span>{t("instructions.drag")}</span>
        </div>
        <div className="flex items-center gap-2">
          <ZoomIn className="h-4 w-4" />
          <span>{t("instructions.zoom")}</span>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative w-full bg-muted rounded-lg overflow-hidden">
        <div className="relative aspect-[1200/630] max-w-[1200px] mx-auto">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={OG_ASPECT}
            className="max-h-[630px] mx-auto w-auto touch-none"
            minWidth={100} // Add minimum crop size
            minHeight={100 / OG_ASPECT}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              alt="Crop me"
              src={image.preview}
              className="max-h-[630px] w-auto mx-auto"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center",
                touchAction: "none",
              }}
              onLoad={handleImageLoad}
              draggable={false}
            />
          </ReactCrop>
        </div>

        {/* Dimensions Indicator */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md cursor-help">
                {PREVIEW_WIDTH} x {PREVIEW_HEIGHT}px
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("info.dimensions")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>{t("editor.zoom")}</Label>
            <span className="text-sm text-muted-foreground">
              {Math.round(scale * 100)}%
            </span>
          </div>
          <Slider
            value={[scale]}
            min={0.5}
            max={2}
            step={0.1}
            onValueChange={([value]) => setScale(value)}
          />
          <p className="text-xs text-muted-foreground">
            {t("editor.zoom-description")}
          </p>
        </div>

        <div className="flex justify-between gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={onRemove}
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
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              {t("cancel")}
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleSave}>{t("save")}</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t("editor.save-description", {
                      width: PREVIEW_WIDTH,
                      height: PREVIEW_HEIGHT,
                    })}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Hidden canvas for preview */}
      <canvas
        ref={previewCanvasRef}
        className="hidden"
        width={PREVIEW_WIDTH}
        height={PREVIEW_HEIGHT}
      />
    </div>
  );
}
