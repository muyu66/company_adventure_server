import { Controller, Get } from '@nestjs/common';
import { PlayerService } from './player.service';
import type { PlayerInfoRes } from './schema/player.schema';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('team')
  async getTeam(): Promise<PlayerInfoRes[]> {
    const players = await this.playerService.getTeam(1n);
    return this.playerService.getPlayersInfo(players);
  }
}
