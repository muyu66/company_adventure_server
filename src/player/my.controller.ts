import { Body, Controller, Get, Post } from '@nestjs/common';
import type { NumberIdReq, StringIdReq } from 'src/schema';
import { AttrService } from './attr.service';
import { Job } from './player.const';
import { PlayerService } from './player.service';
import type {
  PlayerAddAttrReq,
  PlayerAddAttrRes,
  PlayerInfoRes,
  UnitDataRes,
} from './schema/player.schema';
import { SubMapRes } from 'src/map/schema/map.schema';
import { SkillService } from './skill.service';
import { SkillData, SkillInfoRes } from './schema/skill.schema';

@Controller('players/my')
export class PlayerMyController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly skillService: SkillService,
    private readonly attrService: AttrService,
  ) {}

  @Get()
  async getMy(): Promise<PlayerInfoRes> {
    const player = await this.playerService.getPlayer(1n);
    const players = await this.playerService.getPlayersInfo([player]);
    return players[0];
  }

  @Get('sub_map')
  async getMySubMap(): Promise<SubMapRes> {
    return this.playerService.getMySubMap(1n);
  }

  @Post('update_attr')
  async updateAttr(@Body() body: PlayerAddAttrReq): Promise<PlayerAddAttrRes> {
    return this.attrService.updateAttr(1n, body);
  }

  @Post('preview_attr')
  getAttrPreview(@Body() body: PlayerAddAttrReq): UnitDataRes {
    // Job从token里拿，和playerId一个逻辑，job作为不变项，可行
    return this.attrService.getPreviewAttr(Job.CODER, body);
  }

  @Post('change_sub_map')
  async changeSubMap(@Body() body: StringIdReq): Promise<boolean> {
    return this.playerService.updatePlayerSubMap(1n, BigInt(body.id));
  }

  @Get('skills')
  async getMySkills(): Promise<SkillInfoRes[]> {
    return this.skillService.getMySkills(1n);
  }

  @Post('install_skill_slot')
  async installSkillSlot(@Body() body: StringIdReq): Promise<boolean> {
    return this.skillService.installSkill(1n, BigInt(body.id));
  }

  @Post('uninstall_skill_slot')
  async uninstallSkillSlot(@Body() body: NumberIdReq): Promise<boolean> {
    return this.skillService.uninstallSkill(1n, body.id);
  }

  @Get('skill_data')
  async getMySkillData(): Promise<SkillData[]> {
    return this.skillService.getMySkillData(1n);
  }
}
