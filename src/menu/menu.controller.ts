import { Controller, Get } from '@nestjs/common';

@Controller('menu')
export class MenuController {
  @Get()
  getCoffeMenu() {
    return [
      { menuId: 1, name: 'latte', price: 1000 },
      { menuId: 2, name: 'americano', price: 2000 },
    ];
  }
}
