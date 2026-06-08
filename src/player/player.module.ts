import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PrismaService } from 'src/prisma.service';
import { AttrService } from './attr.service';

@Module({
  imports: [],
  controllers: [PlayerController],
  providers: [PrismaService, PlayerService, AttrService],
})
export class PlayerModule {}
