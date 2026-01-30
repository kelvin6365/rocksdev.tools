import { z } from "zod";

export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  optimizedBlob?: Blob;
  optimizedUrl?: string;
  originalSize: number;
  optimizedSize?: number;
  status: "pending" | "processing" | "optimized" | "error";
  error?: string;
}

export interface OptimizationSettings {
  quality: number; // 1-100
  format: "jpeg" | "png" | "webp";
  maxWidth: number | null;
  maxHeight: number | null;
}

export interface OptimizationResult {
  originalSize: number;
  optimizedSize: number;
  savingsPercentage: number;
}

export const optimizationSchema = z.object({
  quality: z.number().min(1).max(100),
  format: z.enum(["jpeg", "png", "webp"]),
  maxWidth: z.number().nullable(),
  maxHeight: z.number().nullable(),
});

export type OptimizationFormData = z.infer<typeof optimizationSchema>;

// Standard error class as defined in project rules
export class ToolError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: Record<string, any>,
  ) {
    super(message);
    this.name = "ToolError";
  }
}
