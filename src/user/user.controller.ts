import { Controller, Patch } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Patch('/charge/point')
    chargePoints() {
      return {
        userId: 'user',
        point: 1000,
      };
    }
}
