import { Body, Controller, Get, Post } from '@nestjs/common';
import type { StringIdReq } from 'src/schema';
import { AttrService } from './attr.service';
import { Job } from './player.const';
import { PlayerService } from './player.service';
import type {
  PlayerAddAttrReq,
  PlayerAddAttrRes,
  PlayerInfoRes,
  UnitDataRes,
} from './schema/player.schema';

@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly attrService: AttrService,
  ) {}

  @Get('team')
  async getTeam(): Promise<PlayerInfoRes[]> {
    const players = await this.playerService.getTeam(1n);
    return this.playerService.getPlayersInfo(players);
  }

  @Get('my')
  async getMy(): Promise<PlayerInfoRes> {
    const player = await this.playerService.getPlayer(1n);
    return this.playerService.getPlayersInfo([player])[0];
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
}
