import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import MovieCall from '../../models/movieCall';
import Movie from '../../models/movie';

/*
  Generated class for the MoviesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoviesProvider {

  private api_key: string = "?api_key=055d4d71ff3d1c95d767b1b17bc73806";
  private base_uri: string = "https://api.themoviedb.org/3/";

  constructor(public http: HttpClient) {

  }

  getMoviesByTitle(title: string, page: number = 1): Observable<MovieCall>{
    return this.http.get<MovieCall>(`${this.base_uri}search/movie${this.api_key}&query=${title}&page=${page}`);
  }

  getMovieById(id: number): Observable<Movie>{
    return this.http.get<Movie>(`${this.base_uri}movie/${id}${this.api_key}&external_source=imdb_id`);
  }

}
