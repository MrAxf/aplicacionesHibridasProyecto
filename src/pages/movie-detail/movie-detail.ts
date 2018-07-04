import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Movie from '../../models/movie';
import { MoviesProvider } from '../../providers/movies/movies';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {

  movie: Movie;
  starType: Object = {
    "0": "star-outline",
    "0.5": "star-half",
    "1": "star"
  };
  inMyList: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private moviePrv: MoviesProvider, public afAuth: AngularFireAuth, private db: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.moviePrv.getMovieById(this.navParams.get("id"))
      .subscribe(movie => this.movie = movie);
      
    this.afAuth.authState
      .subscribe(auth => {
        if (auth) {
          this.db.collection("movieList", ref => ref.where("movieId", "==", this.navParams.get("id")).where("userId", "==", this.afAuth.auth.currentUser.uid).limit(1))
            .valueChanges().subscribe(data => this.inMyList = data.length > 0 ? true : false);
        }
      });
  }

  stars(): number[] {
    const stars: number[] = [];
    const average: number = Math.round(this.movie.vote_average);
    for (let i = 0; i < Math.floor(average / 2); i++)
      stars.push(1);
    if (average % 2 != 0)
      stars.push(0.5);
    for (let i = stars.length; i < 5; i++)
      stars.push(0);
    return stars;
  }

  addToWatchList() {
    this.db.collection("movieList").add({
      movieId: this.navParams.get("id"),
      movieName: this.movie.title,
      userId: this.afAuth.auth.currentUser.uid,
      watched: false
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

}
