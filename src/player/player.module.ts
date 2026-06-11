import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PrismaService } from 'src/prisma.service';
import { AttrService } from './attr.service';
import { PlayerMyController } from './my.controller';
import { SkillService } from './skill.service';

@Module({
  imports: [],
  controllers: [PlayerController, PlayerMyController],
  providers: [PrismaService, PlayerService, AttrService, SkillService],
})
export class PlayerModule {}
