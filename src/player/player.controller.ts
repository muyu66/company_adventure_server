import { Controller, Get } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerDetailRes } from './schema/player.schema';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('team')
  async getTeam(): Promise<PlayerDetailRes[]> {
    const players = await this.playerService.getTeam(1n);
    return this.playerService.getPlayersDetails(players);
  }
}
