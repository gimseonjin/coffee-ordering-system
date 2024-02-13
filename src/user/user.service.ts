import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

export class NotFoundUserError extends Error {}

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async chargePoints({ userId, point }: { userId: string; point: number }) {
    const user = await this.userRepo.findBy({ userId });

    if (!user) throw new NotFoundUserError(`Not found user: ${userId}`);

    return await this.userRepo.increasePoints({ userId, point });
  }
}
