import { difference, range } from 'es-toolkit';
import { customAlphabet } from 'nanoid';

const generateRandomId = customAlphabet('1234567890qwertyuiopasdfghjklzxcvbnm');

/**
 * 生成随机ID
 * @returns
 */
export function makeId(size: number) {
  return generateRandomId(size);
}

/**
 * 查找范围内第一个缺失数字
 * @param arr
 * @param min
 * @param max
 * @returns
 */
export function findFirstMissing(
  arr: number[],
  min: number,
  max: number,
): number | false {
  const missing = difference(range(min, max + 1), arr);
  return missing.length > 0 ? missing[0] : false;
}
