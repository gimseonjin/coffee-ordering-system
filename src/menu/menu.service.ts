import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {

  getPopularMenus() {
    return [
      { menuId: 1, totalQuantity: 500 },
      { menuId: 2, totalQuantity: 100 },
      { menuId: 3, totalQuantity: 20 },
    ];
  }
  
  getCoffeMenu() {
    return [
      { menuId: 1, name: 'latte', price: 1000 },
      { menuId: 2, name: 'americano', price: 2000 },
    ];
  }
}
