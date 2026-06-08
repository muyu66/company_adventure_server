import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [PlayerController],
  providers: [PlayerService, PrismaService],
})
export class PlayerModule {}
