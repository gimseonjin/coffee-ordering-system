import { Module, ValidationPipe } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { PointModule } from './point/point.module';
import { DatabaseModule } from './database/database.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [MenuModule, OrderModule, PointModule, DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
