import { z } from 'zod';
import { Job, UnitType } from '../player.const';

export const UnitInfoSchema = z.object({
  name: z.string(),
  team: z.number(),
  type: z.enum(UnitType),
  spriteFrames: z.string(),
  hp: z.number(),
  mp: z.number(),
  atk: z.number(),
  def: z.number(),
  aggro: z.number(),
  crit: z.number(),
  critDmg: z.number(),
  atkSpeed: z.number(),
  critRes: z.number(),
  critDmgRes: z.number(),
  speed: z.number(),
  atkRange: z.number(),
});
export type UnitInfoRes = z.infer<typeof UnitInfoSchema>;

export const PlayerInfoSchema = UnitInfoSchema.extend({
  id: z.bigint().transform((v) => v.toString()),
  job: z.enum(Job),
  level: z.number(),
  attrTalent: z.number(),
  attrPhysical: z.number(),
  attrLogic: z.number(),
  attrImagination: z.number(),
  attrBoldness: z.number(),
  attrCharm: z.number(),
  attrPoint: z.number(),
});
export type PlayerInfoRes = z.infer<typeof PlayerInfoSchema>;

export const PlayerAddAttrSchema = z.object({
  attrTalent: z.number(),
  attrPhysical: z.number(),
  attrLogic: z.number(),
  attrImagination: z.number(),
  attrBoldness: z.number(),
  attrCharm: z.number(),
});
export type PlayerAddAttrReq = z.infer<typeof PlayerAddAttrSchema>;

export const PlayerAddAttrResSchema = PlayerAddAttrSchema.extend({
  attrPoint: z.number(),
});
export type PlayerAddAttrRes = z.infer<typeof PlayerAddAttrResSchema>;
