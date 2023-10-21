import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entites/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const findMovie = this.movies.find((movie) => movie.id === id);
    if (!findMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return findMovie;
  }

  deleteOne(id: number) {
    // this.movies.filter((movie) => movie.id !== parseInt(id)); // 일치하지 않는 요소만 모아서 새로운 배열을 만든다.
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    return this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData) {
    const findMovie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...findMovie, ...updateData });
  }
}
