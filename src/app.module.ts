import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { PointModule } from './point/point.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MenuModule, OrderModule, PointModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
