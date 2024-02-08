import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { PopularMenu } from './entities/popular-menu.entity';

@Injectable()
export class MenuRepository {
  getPopularCoffeMenus() {
    return [
      new PopularMenu(1, 500),
      new PopularMenu(2, 100),
      new PopularMenu(3, 20),
    ];
  }

  getCoffeMenu() {
    return [new Menu(1, 'latte', 1000), new Menu(2, 'americano', 2000)];
  }
}
