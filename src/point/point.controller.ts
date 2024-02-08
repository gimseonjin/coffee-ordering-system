import { Controller, Patch } from '@nestjs/common';

@Controller('point')
export class PointController {
  @Patch()
  chargePoints() {
    return {
      userId: 'user',
      point: 1000,
    };
  }
}
