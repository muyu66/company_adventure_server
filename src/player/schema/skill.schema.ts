import { z } from 'zod';
import { SkillTypeSchema } from './enum.schema';

export const SkillInfoSchema = z.object({
  id: z.bigint().transform((v) => v.toString()),
  name: z.string(),
  type: SkillTypeSchema,
  desc: z.string(),
  rarity: z.number(),
  cooldown: z.string(),
  costMp: z.string(),
  icon: z.string(),
  sort: z.number(),
  effectsDesc: z.json(),
  slot: z.number().nullable(),
  level: z.number(),
  installed: z.boolean(),
});
export type SkillInfoRes = z.infer<typeof SkillInfoSchema>;
