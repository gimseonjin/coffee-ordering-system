import { Injectable } from '@nestjs/common';
import { MenuRepository } from './menu.repository.ts';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepo: MenuRepository) {}

  getPopularMenus() {
    return this.menuRepo.getPopularCoffeMenus();
  }

  getCoffeMenu({ cursor, limit = 10 }: { cursor?: number; limit?: number }) {
    return this.menuRepo.getCoffeMenu({ cursor, limit });
  }
}
