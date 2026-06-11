import { z } from 'zod';

export const SkillInfoSchema = z.object({
  id: z.bigint().transform((v) => v.toString()),
  name: z.string(),
  desc: z.string(),
  rarity: z.number(),
  cooldown: z.string(),
  costMp: z.string(),
  icon: z.string(),
  sort: z.number(),
  effectsDesc: z.string(),
  level: z.number(),
  installed: z.boolean(),
});
export type SkillInfoRes = z.infer<typeof SkillInfoSchema>;
