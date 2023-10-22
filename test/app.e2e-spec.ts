import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 아무 데코레이터도 없는 어떠한 필드의 object를 거른다.
        forbidNonWhitelisted: true, // 정의되지 않은 필드에 대해서 에러 처리
        transform: true, // 요청으로 받은 값을 자동 형변환 시켜준다.
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welocome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .expect(HttpStatus.CREATED)
        .send({
          title: 'Test',
          director: 'Test director',
          year: 2023,
          genres: ['test'],
        });
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(HttpStatus.OK);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(HttpStatus.NOT_FOUND);
    });
    it.todo('DELETE');
    it.todo('PATCH');
  });
});
