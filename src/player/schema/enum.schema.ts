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
