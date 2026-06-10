import { z } from 'zod';

export const StringIdSchema = z.object({
  id: z.string(),
});
export type StringIdReq = z.infer<typeof StringIdSchema>;
