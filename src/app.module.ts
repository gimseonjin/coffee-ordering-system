import { Module } from '@nestjs/common';
import { MenuController } from './menu/menu.controller';
import { PointController } from './point/point.controller';
import { OrderController } from './order/order.controller';

@Module({
  imports: [],
  controllers: [MenuController, PointController, OrderController],
  providers: [],
})
export class AppModule {}
