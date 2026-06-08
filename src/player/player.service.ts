import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Player } from '../generated/prisma/client';
import { PlayerSchema, PlayerDetailRes } from './schema/player.schema';
import { UnitType } from './player.const';
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
} from './tool';

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

  getPlayersDetails(player: Player[]): PlayerDetailRes[] {
    return player.map((player) => {
      const base = PlayerSchema.parse(player);
      const detail: PlayerDetailRes = {
        ...base,
        team: 1,
        type: UnitType.PLAYER,
        spriteFrames: player.job,
        hp: getHp(player),
        mp: getMp(player),
        speed: getSpeed(player),
        atkRange: getAttackRange(player),
        atkSpeed: getAtkSpeed(player),
        atk: getAtk(player),
        def: getDef(player),
        aggro: getAggro(player),
        crit: getCrit(player),
        critDmg: getCritDmg(player),
        critRes: getCritRes(player),
        critDmgRes: getCritDmgRes(player),
      };
      return detail;
    });
  }
}
