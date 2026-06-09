import { Controller, Get } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  async getMaps() {
    return this.mapService.getMaps();
  }
}
