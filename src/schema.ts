import { z } from 'zod';

export const StringIdSchema = z.object({
  id: z.string(),
});
export type StringIdReq = z.infer<typeof StringIdSchema>;

export const NumberIdSchema = z.object({
  id: z.number(),
});
export type NumberIdReq = z.infer<typeof NumberIdSchema>;
