import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Job } from './player.const';
import {
  PlayerAddAttrReq,
  PlayerAddAttrRes,
  PlayerAddAttrResSchema,
} from './schema/player.schema';
import { PlayerService } from './player.service';
import { sum } from 'es-toolkit';

@Injectable()
export class AttrService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly playerService: PlayerService,
  ) {}

  /**
   * 更新属性点
   * @param playerId
   * @param attrReq
   */
  async updateAttr(
    playerId: bigint,
    attrReq: PlayerAddAttrReq,
  ): Promise<PlayerAddAttrRes> {
    // 校验
    const addPointCount = sum([
      attrReq.attrTalent,
      attrReq.attrPhysical,
      attrReq.attrLogic,
      attrReq.attrImagination,
      attrReq.attrBoldness,
      attrReq.attrCharm,
    ]);
    const player = await this.playerService.getPlayer(playerId);
    if (player.attrPoint - addPointCount < 0) {
      throw new Error('属性点不足');
    }

    // 更新数据
    const res = await this.prisma.player.update({
      where: {
        id: playerId,
      },
      data: {
        attrTalent: {
          increment: attrReq.attrTalent,
        },
        attrPhysical: {
          increment: attrReq.attrPhysical,
        },
        attrLogic: {
          increment: attrReq.attrLogic,
        },
        attrImagination: {
          increment: attrReq.attrImagination,
        },
        attrBoldness: {
          increment: attrReq.attrBoldness,
        },
        attrCharm: {
          increment: attrReq.attrCharm,
        },
        attrPoint: {
          decrement: addPointCount,
        },
      },
    });
    return PlayerAddAttrResSchema.parse(res);
  }

  /**
   * 获取角色属性规则，为了给前端在加点时提供属性增加方向预览
   * 比如点1点口才，就知道攻击力是可以上升的
   * @param job
   * @returns
   */
  getRule(job: Job) {
    switch (job) {
      case Job.CODER:
        return {
          attrTalent: {
            hp: 0,
            mp: 0,
            atk: 0,
            def: 0,
            aggro: 0,
            crit: 1,
            critDmg: 1,
            atkSpeed: 0,
            critRes: 0,
            critDmgRes: 0,
            speed: 0,
          },
          attrPhysical: {
            hp: 1,
            mp: 1,
            atk: 0,
            def: 0,
            aggro: 0,
            crit: 0,
            critDmg: 0,
            atkSpeed: 0,
            critRes: 0,
            critDmgRes: 0,
            speed: 1,
          },
          attrLogic: {
            hp: 0,
            mp: 0,
            atk: 1,
            def: 0,
            aggro: 0,
            crit: 0,
            critDmg: 0,
            atkSpeed: 1,
            critRes: 0,
            critDmgRes: 0,
            speed: 0,
          },
          attrImagination: {
            hp: 0,
            mp: 0,
            atk: 0,
            def: 1,
            aggro: 0,
            crit: 0,
            critDmg: 0,
            atkSpeed: 0,
            critRes: 0,
            critDmgRes: 0,
            speed: 0,
          },
          attrBoldness: {
            hp: 0,
            mp: 0,
            atk: 0,
            def: 0,
            aggro: 0,
            crit: 0,
            critDmg: 0,
            atkSpeed: 0,
            critRes: 1,
            critDmgRes: 1,
            speed: 0,
            attackRange: 0,
          },
          attrCharm: {
            hp: 0,
            mp: 0,
            atk: 0,
            def: 0,
            aggro: 1,
            crit: 0,
            critDmg: 0,
            atkSpeed: 0,
            critRes: 0,
            critDmgRes: 0,
            speed: 0,
          },
        };
    }
  }
}
