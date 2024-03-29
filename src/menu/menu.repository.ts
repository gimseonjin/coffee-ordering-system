import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { PopularMenu } from './entities/popular-menu.entity';
import { DbClient } from '../database/db.client';

@Injectable()
export class MenuRepository {
  constructor(private readonly dbClient: DbClient) {}

  /*
    TODO: 나중에 주문 기능 구현 후 진행
  */
  getPopularCoffeMenus() {
    return [
      new PopularMenu(1, 500),
      new PopularMenu(2, 100),
      new PopularMenu(3, 20),
    ];
  }

  async getCoffeMenu({ cursor, limit }: { cursor?: number; limit: number }) {
    const queryOptions = {
      take: limit,
      cursor: cursor ? { menuId: cursor } : undefined,
      skip: cursor ? 1 : undefined,
    };

    const menus = await this.dbClient.menu.findMany(queryOptions);

    return menus.map((menu) => new Menu(menu.menuId, menu.name, menu.price));
  }
}
