import { Module } from '@nestjs/common';
import { MenuController } from './menu/menu.controller';
import { PointController } from './point/point.controller';

@Module({
  imports: [],
  controllers: [MenuController, PointController],
  providers: [],
})
export class AppModule {}
