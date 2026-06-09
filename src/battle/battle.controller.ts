import { Controller, Post } from '@nestjs/common';
import { UnitInfoRes } from 'src/player/schema/player.schema';
import { BattleService } from './battle.service';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post('next_wave')
  async nextWave(): Promise<UnitInfoRes[]> {
    return this.battleService.generateNextWave(1n);
  }
}
