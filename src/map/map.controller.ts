import { Controller, Get } from '@nestjs/common';
import { MapService } from './map.service';
import { MapRes } from './schema/map.schema';

@Controller('maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  async getMaps(): Promise<MapRes[]> {
    return this.mapService.getMaps();
  }
}
