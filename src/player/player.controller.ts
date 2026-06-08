import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayerService } from './player.service';
import { type PlayerAddAttrReq, PlayerDetailRes } from './schema/player.schema';
import { AttrService } from './attr.service';

@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly attrService: AttrService,
  ) {}

  @Get('team')
  async getTeam(): Promise<PlayerDetailRes[]> {
    const players = await this.playerService.getTeam(1n);
    return this.playerService.getPlayersDetails(players);
  }

  @Get('my')
  async getMy(): Promise<PlayerDetailRes> {
    const player = await this.playerService.getPlayer(1n);
    return this.playerService.getPlayersDetails([player])[0];
  }

  @Post('update_attr')
  async updateAttr(@Body() body: PlayerAddAttrReq): Promise<void> {
    await this.attrService.updateAttr(1n, body);
  }
}
