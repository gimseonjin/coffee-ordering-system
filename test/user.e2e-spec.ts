import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/charge/point (PATCH)', () => {
    const chargePointReq = {
      userId: 'user',
      point: 500,
    };

    const expectResult = {
      userId: 'user',
      point: 1000,
    };

    return request(app.getHttpServer())
      .patch('/user/charge/point')
      .send(chargePointReq)
      .expect(200)
      .expect(expectResult);
  });
});
