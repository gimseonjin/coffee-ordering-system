import { Injectable } from '@nestjs/common';
import { MenuRepository } from './menu.repository.ts';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepo: MenuRepository) {}

  getPopularMenus() {
    return this.menuRepo.getPopularCoffeMenus();
  }

  getCoffeMenu() {
    return this.menuRepo.getCoffeMenu();
  }
}
