import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  imports: [],
  controllers: [MapController],
  providers: [PrismaService, MapService],
})
export class MapModule {}
