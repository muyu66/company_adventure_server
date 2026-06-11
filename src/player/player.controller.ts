import { Controller, Get } from '@nestjs/common';
import { AttrService } from './attr.service';
import { PlayerService } from './player.service';
import type { PlayerInfoRes } from './schema/player.schema';

@Controller('players')
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
}
