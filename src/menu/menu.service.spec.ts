import { TestBed } from '@automock/jest';
import { MenuService } from './menu.service';
import { MenuRepository } from './menu.repository';

describe('MenuService', () => {
  let service: MenuService;
  let repository: jest.Mocked<MenuRepository>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(MenuService).compile();

    service = unit;
    repository = unitRef.get(MenuRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
