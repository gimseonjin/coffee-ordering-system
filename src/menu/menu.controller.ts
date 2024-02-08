import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuSvc: MenuService) {}

  @Get()
  getCoffeMenu() {
    return this.menuSvc.getCoffeMenu();
  }

  @Get('/popular')
  getPopularMenus() {
    return this.menuSvc.getPopularMenus();
  }
}
