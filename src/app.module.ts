import { Module } from '@nestjs/common';
import { MenuController } from './menu/menu.controller';

@Module({
  imports: [],
  controllers: [MenuController],
  providers: [],
})
export class AppModule {}
