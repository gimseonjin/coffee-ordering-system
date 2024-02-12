import { Injectable } from '@nestjs/common';
import { MenuRepository } from './menu.repository';

type GetCoffeMenuParams = {
  cursor?: number;
  limit?: number;
};

@Injectable()
export class MenuService {
  constructor(private readonly menuRepo: MenuRepository) {}

  getPopularMenus() {
    return this.menuRepo.getPopularCoffeMenus();
  }

  getCoffeMenu({ cursor, limit = 10 }: GetCoffeMenuParams) {
    return this.menuRepo.getCoffeMenu({ cursor, limit });
  }
}
