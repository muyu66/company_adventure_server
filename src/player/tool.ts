import { Player } from 'src/generated/prisma/client';
import { Job } from './player.const';

/**
 * 计算HP
 * @param player
 * @returns
 */
export function getHp(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return 100 + player.attrPhysical * 2;
    default:
      return 100;
  }
}

/**
 * 计算移动速度
 * @param player
 * @returns
 */
export function getSpeed(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return 10 + player.attrPhysical * 1;
    default:
      return 10;
  }
}

/**
 * 计算攻击范围
 * @param player
 * @returns
 */
export function getAttackRange(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return 30;
    default:
      return 30;
  }
}

/**
 * 计算攻击速度
 * @param player
 * @returns
 */
export function getAttackCooldown(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return 1;
    default:
      return 1;
  }
}
