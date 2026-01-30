import { OptimizationSettings, ToolError } from "./types";

/**
 * Compresses an image using canvas API
 */
export async function compressImage(
  file: File,
  settings: OptimizationSettings,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // Enable CORS for cross-origin images
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(
          new ToolError(
            "Could not get canvas context",
            "CANVAS_CONTEXT_ERROR",
            { fileName: file.name },
          ),
        );
        return;
      }

      // Calculate dimensions while maintaining aspect ratio
      let { width, height } = calculateDimensions(
        img.width,
        img.height,
        settings.maxWidth,
        settings.maxHeight,
      );

      canvas.width = width;
      canvas.height = height;

      // Enable high quality scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Set background for formats that don't support transparency
      if (settings.format === "jpeg") {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      try {
        // Draw the image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Determine the mime type based on format
        const mimeType = getMimeType(settings.format);

        // Convert to blob with specified quality
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(
                new ToolError(
                  "Failed to create optimized image",
                  "BLOB_CREATION_ERROR",
                  {
                    fileName: file.name,
                    mimeType,
                    quality: settings.quality,
                  },
                ),
              );
              return;
            }

            resolve(blob);
          },
          mimeType,
          settings.quality / 100, // Quality should be between 0 and 1
        );
      } catch (drawError) {
        reject(
          new ToolError("Failed to draw image on canvas", "CANVAS_DRAW_ERROR", {
            fileName: file.name,
            error:
              drawError instanceof Error
                ? drawError.message
                : String(drawError),
          }),
        );
      }
    };

    img.onerror = () => {
      reject(
        new ToolError("Failed to load image", "IMAGE_LOAD_ERROR", {
          fileName: file.name,
        }),
      );
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * Calculates the new dimensions while maintaining aspect ratio
 */
function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number | null,
  maxHeight: number | null,
): { width: number; height: number } {
  let width = originalWidth;
  let height = originalHeight;

  if (maxWidth !== null && width > maxWidth) {
    const ratio = maxWidth / width;
    width = maxWidth;
    height = height * ratio;
  }

  if (maxHeight !== null && height > maxHeight) {
    const ratio = maxHeight / height;
    height = maxHeight;
    width = width * ratio;
  }

  return { width: Math.floor(width), height: Math.floor(height) };
}

/**
 * Gets the MIME type based on the format
 */
function getMimeType(format: "jpeg" | "png" | "webp"): string {
  switch (format) {
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    default:
      return "image/webp";
  }
}

/**
 * Gets a new file name with the specified format extension
 */
function getNewFileName(
  originalName: string,
  format: "jpeg" | "png" | "webp",
): string {
  const nameWithoutExt = originalName.substring(
    0,
    originalName.lastIndexOf("."),
  );
  return `${nameWithoutExt}_optimized.${format}`;
}
