import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { Subscription } from 'rxjs/Subscription';
import Movie from '../../models/movie';
import { MovieDetailPage } from '../movie-detail/movie-detail';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  search_title: string = "";
  movies_subscription: Subscription;

  movies: Movie[] = [];

  page: number;
  pages: number;

  constructor(public navCtrl: NavController, private moviePrv: MoviesProvider, public afAuth: AngularFireAuth) {

  }

  onSearch(e: any){
    if(!this.search_title) {
      this.movies = [];
      this.page = null;
      return;
    }
    this.movies_subscription = this.moviePrv.getMoviesByTitle(this.search_title)
      .subscribe(movies => {
        this.movies = movies.results;
        this.page = movies.page;
        this.pages = movies.total_pages;
      });
  }

  onSearchCancel(e: any){
    if(this.movies_subscription && !this.movies_subscription.closed){
      this.movies_subscription.unsubscribe();
    }
    this.movies = [];
  }

  onLoadMore(e: any){
    this.moviePrv.getMoviesByTitle(this.search_title, this.page+1)
      .subscribe(movies => {
        this.movies = [...this.movies, ...movies.results];
        this.page = movies.page;
        this.pages = movies.total_pages;
        e.complete();
      });
  }

  navigateToMovie(e: any, movie_id: number){
    this.navCtrl.push(MovieDetailPage, {id: movie_id});
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
