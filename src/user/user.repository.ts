import { DbClient } from '../database/db.client';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly dbClient: DbClient) {}

  async findBy({ userId }: { userId: any }) {
    const user = await this.dbClient.user.findFirst({ where: { userId } });
    return !user ? null : new User(user.userId, user.point);
  }

  async increasePoints({ userId, point }: { userId: string; point: number }) {
    const user = await this.dbClient.user.update({
      where: { userId },
      data: {
        point: {
          increment: point,
        },
      },
    });

    return new User(user.userId, user.point);
  }
}
