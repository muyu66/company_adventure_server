import { z } from 'zod';

export const JobSchema = z.enum([
  // 程序员
  'coder',
  // 偶像
  'superstar',
  // 总统
  'president',
  // 临时工
  'temp_worker',
  // 宅男
  'otaku',
]);

export type Job = z.infer<typeof JobSchema>;

export const SkillTypeSchema = z.enum([
  // 主动
  'active',
  // 被动
  'passive',
]);

export type SkillType = z.infer<typeof SkillTypeSchema>;

export const SkillEffectTypeSchema = z.enum([
  // 伤害
  'damage',
  // 治愈
  'heal',
  // 增益减益
  'modify_stat',
  // 召唤
  'summon',
  // 持续伤害
  'dot',
  // 眩晕
  'stun',
]);

export type SkillEffectType = z.infer<typeof SkillEffectTypeSchema>;

export const SkillEffectTargetSchema = z.enum([
  // 自身
  'self',
  // 敌人
  'enemy',
  // 全部敌人
  'all_enemy',
]);

export type SkillEffectTarget = z.infer<typeof SkillEffectTargetSchema>;
