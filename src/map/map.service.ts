import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MapRes, MapSchema } from './schema/map.schema';

@Injectable()
export class MapService {
  constructor(private readonly prisma: PrismaService) {}

  async getMaps(): Promise<MapRes[]> {
    const maps = await this.prisma.map.findMany({
      include: {
        subMaps: true,
      },
    });
    return maps.map((map) => {
      return MapSchema.parse({
        ...map,
        subMaps: map.subMaps,
      });
    });
  }
}
