import { z } from "zod";

const APIPathSchema = z.object({
  extractFrom: z.string(),
  saveTo: z.optional(z.string()),
});

export const ConfigFileSchema = z.object({
  paths: z.array(APIPathSchema),
  separator: z.optional(z.string()),
});

export const TArgvSchema = z.object({
  _: z.array(z.string()),
  k: z.optional(z.string()),
});

export const TArgvSchemaWithConfig = TArgvSchema.merge(ConfigFileSchema);
