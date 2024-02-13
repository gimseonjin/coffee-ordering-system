import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DbClient } from '../src/database/db.client';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let dbClient: DbClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    dbClient = moduleFixture.get<DbClient>(DbClient);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await dbClient.user.deleteMany({});
  });

  it('/user/charge/point (PATCH)', async () => {
    const chargePointReq = {
      userId: 'user',
      point: 500,
    };

    const expectResult = {
      userId: 'user',
      point: 1000,
    };

    await dbClient.user.create({
      data: {
        userId: 'user',
        point: 500,
      },
    });

    return request(app.getHttpServer())
      .patch('/user/charge/point')
      .send(chargePointReq)
      .expect(200)
      .expect(expectResult);
  });
});
