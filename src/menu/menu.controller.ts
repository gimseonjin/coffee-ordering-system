import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { PaginationQueryDto } from '../common/dtos/pagination-query.dto';

@Controller('menu')
export class MenuController {
  constructor(private menuSvc: MenuService) {}

  @Get()
  getCoffeMenu(@Query() paginationQuery: PaginationQueryDto) {
    return this.menuSvc.getCoffeMenu(paginationQuery);
  }

  @Get('/popular')
  getPopularMenus() {
    return this.menuSvc.getPopularMenus();
  }
}
