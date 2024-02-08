import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { PointModule } from './point/point.module';

@Module({
  imports: [MenuModule, OrderModule, PointModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
