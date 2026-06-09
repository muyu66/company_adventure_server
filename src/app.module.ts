import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { BattleModule } from './battle/battle.module';

@Module({
  imports: [PlayerModule, BattleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
