import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { findFirstMissing } from 'src/tool';
import { SkillInfoRes, SkillInfoSchema } from './schema/skill.schema';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 获取我的技能列表
   * @param playerId
   * @returns
   */
  async getMySkills(playerId: bigint): Promise<SkillInfoRes[]> {
    const playerSkills = await this.prisma.playerSkill.findMany({
      where: { playerId },
    });
    const playerSkillIds = playerSkills.map(
      (playerSkill) => playerSkill.skillId,
    );
    const skills = await this.prisma.skill.findMany({
      where: {
        id: {
          in: playerSkillIds,
        },
      },
    });

    const res: SkillInfoRes[] = [];
    for (const playerSkill of playerSkills) {
      const skill = skills.find((skill) => skill.id === playerSkill.skillId);
      if (skill == null) continue;

      res.push(
        SkillInfoSchema.parse({
          ...skill,
          level: playerSkill.level,
          installed: playerSkill.slot != null,
        }),
      );
    }
    return res;
  }

  /**
   * 安装技能到任意未满的插槽
   * @param playerId
   * @param skillId
   * @returns
   */
  async installSkill(playerId: bigint, skillId: bigint): Promise<boolean> {
    const playerSkillsPart = await this.prisma.playerSkill.findMany({
      where: { playerId },
      select: {
        slot: true,
      },
    });
    const slots = playerSkillsPart.map((v) => v.slot).filter((v) => v != null);
    const slot = findFirstMissing(slots, 0, 5);
    // 插槽已满
    if (slot === false) {
      return false;
    }
    // 将该技能安装到未满的插槽
    await this.prisma.playerSkill.update({
      where: {
        playerId_skillId: {
          playerId,
          skillId,
        },
      },
      data: {
        slot,
      },
    });
    return true;
  }

  /**
   * 卸载该插槽上的技能
   * @param playerId
   * @param slot
   * @returns
   */
  async uninstallSkill(playerId: bigint, slot: number): Promise<boolean> {
    const playerSkill = await this.prisma.playerSkill.findFirst({
      where: { playerId, slot },
    });
    if (playerSkill == null) return false;
    // 将该技能安装到未满的插槽
    await this.prisma.playerSkill.update({
      where: {
        playerId_slot: {
          playerId,
          slot,
        },
      },
      data: {
        slot: null,
      },
    });
    return true;
  }
}
