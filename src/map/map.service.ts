import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MapSchema } from './schema/map.schema';

@Injectable()
export class MapService {
  constructor(private readonly prisma: PrismaService) {}

  async getMaps() {
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
