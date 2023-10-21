import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트 전  실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // 개별 테스트
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test movie',
        director: 'Test director',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual('Test movie');
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie with ID 999 not found`);
        // expect(error.code).toEqual(404);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test movie',
        director: 'Test director',
        genres: ['test'],
        year: 2000,
      });

      //   console.log(service.getAll());
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      const createdMovieId = service.create({
        title: 'Test movie',
        director: 'Test director',
        year: 2000,
        genres: ['Test'],
      });
      const afterCreate = service.getAll().length;

      expect(createdMovieId).toEqual(1);
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test movie',
        director: 'Test director',
        year: 2000,
        genres: ['Test'],
      });

      service.update(1, { title: 'update Test' });
      const findMovie = service.getOne(1);

      expect(findMovie.title).toEqual('update Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
