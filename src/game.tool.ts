import { clamp } from 'es-toolkit';
import { Player } from 'src/generated/prisma/client';
import { Job } from './player/player.const';

/**
 * 计算HP
 * @param player
 * @returns
 */
export function getHp(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return 100 + player.attrPhysical * 20;
    default:
      return 100;
  }
}

/**
 * 计算体力
 * @param player
 * @returns
 */
export function getMp(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return 30 + player.attrPhysical * 6;
    default:
      return 30;
  }
}

/**
 * 计算攻击力
 * @param player
 * @returns
 */
export function getAtk(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return 10 + player.attrLogic * 5;
    default:
      return 10;
  }
}

/**
 * 计算防御力
 * @param player
 * @returns
 */
export function getDef(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return player.attrImagination * 2;
    default:
      return 0;
  }
}

/**
 * 计算嘲讽
 * @param player
 * @returns
 */
export function getAggro(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return 100 + player.attrCharm * 1;
    default:
      return 100;
  }
}

/**
 * 计算暴击率
 * @param player
 * @returns
 */
export function getCrit(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return player.attrTalent * 1;
    default:
      return 0;
  }
}

/**
 * 计算暴击伤害
 * @param player
 * @returns
 */
export function getCritDmg(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return 150 + player.attrTalent * 2;
    default:
      return 150;
  }
}

/**
 * 计算暴击减免
 * @param player
 * @returns
 */
export function getCritRes(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return player.attrBoldness * 1;
    default:
      return 0;
  }
}

/**
 * 计算暴击伤害减免
 * @param player
 * @returns
 */
export function getCritDmgRes(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return player.attrBoldness * 2;
    default:
      return 0;
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
export function getAtkSpeed(player: Player): number {
  switch (player.job) {
    case Job.CODER.toString():
      return clamp(100 + player.attrLogic * 2, 1, 400);
    default:
      return 100;
  }
}
