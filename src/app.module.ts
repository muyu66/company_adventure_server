import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { BattleModule } from './battle/battle.module';
import { MapModule } from './map/map.module';

@Module({
  imports: [PlayerModule, BattleModule, MapModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
