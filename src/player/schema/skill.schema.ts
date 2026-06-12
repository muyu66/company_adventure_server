import { z } from 'zod';
import {
  SkillEffectTargetSchema,
  SkillEffectTypeSchema,
  SkillTypeSchema,
} from './enum.schema';

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

/** Prisma JSON 原始效果结构 — expr 存的是逗号分隔的多级数值字符串 */
const SkillEffectSchema = z.object({
  type: z.string(),
  target: z.string(),
  targetKey: z.string(),
  tick: z.number().optional(),
  expr: z.array(z.string()),
  duration: z.array(z.number()).optional(),
  summonInherit: z.array(z.number()).optional(),
  summonUnitSpriteFrames: z.string().optional(),
});

export const SkillEffectsSchema = z.array(SkillEffectSchema);
export type SkillEffects = z.infer<typeof SkillEffectsSchema>;

/** 输出效果结构 — expr 已按技能等级拆分为单个值 */
export const SkillEffectResSchema = z.object({
  type: SkillEffectTypeSchema,
  target: SkillEffectTargetSchema,
  targetKey: z.string(),
  tick: z.int().nullable(),
  expr: z.string(),
  duration: z.float32(),
  summonInherit: z.float32(),
  summonUnitSpriteFrames: z.string().optional(),
});
export type SkillEffectRes = z.infer<typeof SkillEffectResSchema>;

export const SkillDataSchema = z.object({
  id: z.bigint().transform((v) => v.toString()),
  name: z.string(),
  type: SkillTypeSchema,
  skillRange: z.int(),
  skillRadius: z.int(),
  cooldown: z.float32(),
  costMp: z.int(),
  icon: z.string(),
  effects: z.array(SkillEffectResSchema),
  slot: z.number().nullable(),
  level: z.number(),
});
export type SkillData = z.infer<typeof SkillDataSchema>;
