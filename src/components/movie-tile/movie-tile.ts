import { Component, Input } from '@angular/core';
import Movie from '../../models/movie';

/**
 * Generated class for the MovieTileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'movie-tile',
  templateUrl: 'movie-tile.html'
})
export class MovieTileComponent {

  @Input() movie: Movie;

  constructor() {
  }

}
