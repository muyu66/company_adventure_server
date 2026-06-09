import { Injectable } from '@nestjs/common';
import { randomInt, sample } from 'es-toolkit';
import { times } from 'es-toolkit/compat';
import { Monster } from 'src/generated/prisma/client';
import { UnitType } from 'src/player/player.const';
import { UnitInfoRes, UnitInfoSchema } from 'src/player/schema/player.schema';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BattleService {
  constructor(private readonly prisma: PrismaService) {}

  async generateNextWave(playerId: bigint): Promise<UnitInfoRes[]> {
    const player = await this.prisma.player.findUniqueOrThrow({
      where: {
        id: playerId,
      },
    });
    const subMap = await this.prisma.subMap.findUniqueOrThrow({
      where: {
        id: player.currSubMapId,
      },
    });
    if (player.level < subMap.unlockLevel) {
      throw new Error('等级不足');
    }

    const monsters = await this.prisma.monster.findMany({
      where: {
        subMapId: player.currSubMapId,
        id: {
          in: subMap.monsterIds as number[],
        },
      },
    });

    // 随机生成怪物数量
    const randomCount = randomInt(2, 5);
    const randomMonsters: Monster[] = times(randomCount, () =>
      sample(monsters),
    );

    return randomMonsters.map((monster) => {
      const unit = UnitInfoSchema.parse(monster);
      unit.team = 2;
      unit.type = UnitType.MONSTER;
      return unit;
    });
  }
}
