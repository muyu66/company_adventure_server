import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';

@Module({
  imports: [],
  controllers: [BattleController],
  providers: [PrismaService, BattleService],
})
export class BattleModule {}
