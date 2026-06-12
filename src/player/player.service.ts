import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  getAggro,
  getAtk,
  getAtkSpeed,
  getAttackRange,
  getCrit,
  getCritDmg,
  getCritDmgRes,
  getCritRes,
  getDef,
  getHp,
  getMp,
  getSpeed,
} from 'src/game.tool';
import { Player } from '../generated/prisma/client';
import { UnitType } from './player.const';
import { PlayerInfoRes, PlayerInfoSchema } from './schema/player.schema';
import { SubMapRes, SubMapSchema } from 'src/map/schema/map.schema';
import { SkillEffectsSchema } from './schema/skill.schema';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  async getPlayer(playerId: bigint): Promise<Player> {
    return this.prisma.player.findUniqueOrThrow({
      where: {
        id: playerId,
      },
    });
  }

  /**
   * 获取我当前的子地图
   * @param playerId
   * @returns
   */
  async getMySubMap(playerId: bigint): Promise<SubMapRes> {
    const player = await this.getPlayer(playerId);
    const subMap = await this.prisma.subMap.findUniqueOrThrow({
      where: {
        id: player.currSubMapId,
      },
    });
    return SubMapSchema.parse(subMap);
  }

  async getTeam(playerId: bigint): Promise<Player[]> {
    return [await this.getPlayer(playerId)];
  }

  /**
   * 更新玩家当前所在的子地图ID
   * @param playerId
   * @param subMapId
   * @returns
   */
  async updatePlayerSubMap(
    playerId: bigint,
    subMapId: bigint,
  ): Promise<boolean> {
    // 校验
    const player = await this.getPlayer(playerId);
    // 不改变，则不切换地图
    if (player.currSubMapId === subMapId) {
      return false;
    }
    const subMap = await this.prisma.subMap.findUniqueOrThrow({
      where: {
        id: subMapId,
      },
    });
    if (subMap.unlockLevel > player.level) {
      throw new Error('当前地图未解锁');
    }

    await this.prisma.player.update({
      where: {
        id: playerId,
      },
      data: {
        currSubMapId: subMapId,
      },
    });
    return true;
  }

  /**
   * 装载被动技能, 会对 player 属性做出修改
   * @param players
   * @returns
   */
  async loadPassiveSkills(players: Player[]): Promise<Player[]> {
    if (players.length === 0) return players;

    // 批量查询所有玩家的被动技能（一次 DB 查询替代 N 次）
    const playerIds = players.map((p) => p.id);
    const passiveSkills = await this.prisma.playerSkill.findMany({
      where: {
        playerId: { in: playerIds },
        skillType: 'passive',
      },
      include: {
        skill: true,
      },
    });

    for (const player of players) {
      const playerPassiveSkills = passiveSkills.filter(
        (skill) => skill.playerId === player.id,
      );
      playerPassiveSkills.forEach((skill) => {
        const passiveSkill = skill.skill;
        if (passiveSkill) {
          const effects = SkillEffectsSchema.parse(passiveSkill.effects);
          const expr = effects[0].expr[skill.level - 1];
          const targetKey = effects[0].targetKey;
          const targetValue = parseInt(expr);
          switch (targetKey) {
            case 'physical':
              player.attrPhysical += targetValue;
              break;
          }
        }
      });
    }
    return players;
  }

  async getPlayersInfo(players: Player[]): Promise<PlayerInfoRes[]> {
    const res: PlayerInfoRes[] = [];

    // 装载被动技能, 会对 player 属性做出修改
    players = await this.loadPassiveSkills(players);

    for (const player of players) {
      const playerInfo = PlayerInfoSchema.parse({
        ...player,
        id: 'p1',
        team: 1,
        type: UnitType.PLAYER,
        spriteFrames: player.job,
        hp: getHp(player),
        mp: getMp(player),
        atk: getAtk(player),
        def: getDef(player),
        aggro: getAggro(player),
        crit: getCrit(player),
        critDmg: getCritDmg(player),
        atkSpeed: getAtkSpeed(player),
        critRes: getCritRes(player),
        critDmgRes: getCritDmgRes(player),
        speed: getSpeed(player),
        atkRange: getAttackRange(player),
      });
      res.push(playerInfo);
    }
    return res;
  }
}
