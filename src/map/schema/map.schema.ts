import { z } from 'zod';
import { MapType } from '../map.const';

export const SubMapSchema = z.object({
  id: z.bigint().transform((v) => v.toString()),
  background: z.string(),
  unlockLevel: z.number(),
  sort: z.number(),
});
export type SubMapRes = z.infer<typeof SubMapSchema>;

export const MapSchema = z.object({
  name: z.string(),
  type: z.enum(MapType),
  limited: z.boolean(),
  sort: z.number(),
  subMaps: z.array(SubMapSchema),
});
export type MapRes = z.infer<typeof MapSchema>;
