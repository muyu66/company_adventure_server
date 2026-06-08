import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Player } from '../generated/prisma/client';
import { PlayerSchema, PlayerDetailRes } from './schema/player.schema';
import { UnitType } from './player.const';
import { getAttackCooldown, getAttackRange, getHp, getSpeed } from './tool';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

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
        speed: getSpeed(player),
        attackRange: getAttackRange(player),
        attackCooldown: getAttackCooldown(player),
      };
      return detail;
    });
  }
}
