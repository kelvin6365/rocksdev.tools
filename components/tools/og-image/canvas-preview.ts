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

  // Get the actual displayed dimensions of the image
  const displayWidth = image.width;
  const displayHeight = image.height;

  // Calculate the scale between natural and display size
  const scaleX = image.naturalWidth / displayWidth;
  const scaleY = image.naturalHeight / displayHeight;

  // Set canvas size to desired output size
  canvas.width = 1200; // OG width
  canvas.height = 630; // OG height

  // Clear the canvas and set white background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Calculate the actual crop coordinates in the original image
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const cropWidth = crop.width * scaleX;
  const cropHeight = crop.height * scaleY;

  // Ensure high-quality rendering
  ctx.imageSmoothingQuality = "high";
  ctx.imageSmoothingEnabled = true;

  // Draw the cropped image to fill the canvas while maintaining aspect ratio
  ctx.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  // For mobile devices, ensure the canvas display size matches the actual size
  const displayPixelRatio = window.devicePixelRatio || 1;
  canvas.style.width = `${canvas.width / displayPixelRatio}px`;
  canvas.style.height = `${canvas.height / displayPixelRatio}px`;
}
