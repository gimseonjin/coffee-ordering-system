import { Body, Controller, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ChargePointDto } from './dtos/charge-point.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userSvc: UserService) {}

  @Patch('/charge/point')
  async chargePoints(@Body() { userId, point }: ChargePointDto) {
    return await this.userSvc.chargePoints({
      userId,
      point,
    });
  }
}
