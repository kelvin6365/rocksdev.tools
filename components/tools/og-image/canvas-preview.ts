import { PixelCrop } from "react-image-crop";

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Set canvas background to white
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Scale factor for high DPI displays
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Device pixel ratio adjustment
  canvas.width = Math.floor(canvas.width * pixelRatio);
  canvas.height = Math.floor(canvas.height * pixelRatio);
  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  // Calculate scaled crop dimensions
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const cropWidth = crop.width * scaleX;
  const cropHeight = crop.height * scaleY;

  // Calculate scaling to fit OG dimensions while maintaining aspect ratio
  const aspectRatio = canvas.width / canvas.height;
  let drawWidth = canvas.width;
  let drawHeight = canvas.height;

  if (cropWidth / cropHeight > aspectRatio) {
    drawHeight = drawWidth / (cropWidth / cropHeight);
  } else {
    drawWidth = drawHeight * (cropWidth / cropHeight);
  }

  // Center the image
  const x = (canvas.width - drawWidth) / 2;
  const y = (canvas.height - drawHeight) / 2;

  // Draw the cropped image
  ctx.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    x,
    y,
    drawWidth,
    drawHeight,
  );

  // Reset canvas scale
  canvas.style.width = `${canvas.width / pixelRatio}px`;
  canvas.style.height = `${canvas.height / pixelRatio}px`;
}
