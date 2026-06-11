import { Injectable } from '@nestjs/common';
import { sum } from 'es-toolkit';
import { Player } from 'src/generated/prisma/client';
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
import { Job } from './player.const';
import { PlayerService } from './player.service';
import {
  PlayerAddAttrReq,
  PlayerAddAttrRes,
  PlayerAddAttrResSchema,
  UnitDataRes,
} from './schema/player.schema';

@Injectable()
export class AttrService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly playerService: PlayerService,
  ) {}

  /**
   * 获取属性点预览
   * 给我属性点，我给你计算后的属性
   * @param req
   * @returns
   */
  getPreviewAttr(job: Job, req: PlayerAddAttrReq): UnitDataRes {
    const playerMock = {
      ...req,
      job,
    } as Player;
    return {
      hp: getHp(playerMock),
      mp: getMp(playerMock),
      atk: getAtk(playerMock),
      def: getDef(playerMock),
      aggro: getAggro(playerMock),
      crit: getCrit(playerMock),
      critDmg: getCritDmg(playerMock),
      atkSpeed: getAtkSpeed(playerMock),
      critRes: getCritRes(playerMock),
      critDmgRes: getCritDmgRes(playerMock),
      speed: getSpeed(playerMock),
      atkRange: getAttackRange(playerMock),
    };
  }

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
}
