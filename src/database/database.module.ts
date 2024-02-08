import { Global, Module } from '@nestjs/common';
import { DbClient } from './db.client';

@Global()
@Module({
  providers: [DbClient],
  exports: [DbClient],
})
export class DatabaseModule {}
