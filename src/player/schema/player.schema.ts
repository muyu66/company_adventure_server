import { z } from 'zod';
import { Job } from '../player.const';

export const PlayerSchema = z.object({
  id: z.bigint().transform((v) => v.toString()),
  nickname: z.string(),
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
export type PlayerRes = z.output<typeof PlayerSchema>;
export type PlayerReq = z.input<typeof PlayerSchema>;

export const PlayerDetailSchema = PlayerSchema.extend({
  team: z.number(),
  type: z.string(),
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
export type PlayerDetailRes = z.output<typeof PlayerDetailSchema>;
export type PlayerDetailReq = z.input<typeof PlayerDetailSchema>;

export const PlayerAddAttrSchema = z.object({
  attrTalent: z.number(),
  attrPhysical: z.number(),
  attrLogic: z.number(),
  attrImagination: z.number(),
  attrBoldness: z.number(),
  attrCharm: z.number(),
});
export type PlayerAddAttrRes = z.output<typeof PlayerAddAttrSchema>;
export type PlayerAddAttrReq = z.input<typeof PlayerAddAttrSchema>;
