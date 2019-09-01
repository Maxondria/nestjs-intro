import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ProductsService } from '../src/products/products.service';
import { AppModule } from '../dist/app.module';

jest.setTimeout(30000);

let app: INestApplication;
let productsService = {
  addProduct: () => ({
    id: '5d6913a312dd522fc4a49a36',
  }),
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(ProductsService)
    .useValue(productsService)
    .compile();

  app = module.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('Products', () => {
  it(`/ (POST) products/add - Can Add A Product`, () => {
    return request(app.getHttpServer())
      .post('/products/add')
      .send({
        title: 'Watch',
        description: 'Revenge is sweet',
        price: 234.56,
      })
      .expect(201)
      .expect(productsService.addProduct());
  });
});
