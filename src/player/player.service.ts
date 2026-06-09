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
} from 'src/tool';
import { Player } from '../generated/prisma/client';
import { UnitType } from './player.const';
import { PlayerInfoRes, PlayerInfoSchema } from './schema/player.schema';

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

  async getTeam(playerId: bigint): Promise<Player[]> {
    return [await this.getPlayer(playerId)];
  }

  getPlayersInfo(player: Player[]): PlayerInfoRes[] {
    return player.map((player) => {
      return PlayerInfoSchema.parse({
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
    });
  }
}
