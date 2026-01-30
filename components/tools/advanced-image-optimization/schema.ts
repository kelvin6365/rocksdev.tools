import { z } from "zod";

export const optimizationSettingsSchema = z.object({
  quality: z.number().min(1).max(100).default(80),
  format: z.enum(["jpeg", "png", "webp"]).default("jpeg"),
  maxWidth: z.number().nullable().default(null),
  maxHeight: z.number().nullable().default(null),
});

export type OptimizationSettingsSchema = z.infer<
  typeof optimizationSettingsSchema
>;

// Schema for file validation
export const imageFileSchema = z.object({
  file: z.instanceof(File),
  maxSize: z
    .number()
    .optional()
    .default(10 * 1024 * 1024), // 10MB default
  allowedTypes: z
    .array(z.string())
    .optional()
    .default(["image/jpeg", "image/png", "image/webp", "image/gif"]),
});

export type ImageFileSchema = z.infer<typeof imageFileSchema>;
