import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayerService } from './player.service';
import {
  type PlayerAddAttrReq,
  PlayerAddAttrRes,
  PlayerInfoRes,
} from './schema/player.schema';
import { AttrService } from './attr.service';

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
}
