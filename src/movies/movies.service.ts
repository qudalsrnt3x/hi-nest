import { Injectable } from '@nestjs/common';
import { Movie } from './entites/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find((movie) => movie.id === parseInt(id));
  }

  deleteOne(id: string): boolean {
    this.movies.filter((movie) => movie.id !== parseInt(id)); // 일치하지 않는 요소만 모아서 새로운 배열을 만든다.
    return true;
  }

  create(movieData) {
    return this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
}
