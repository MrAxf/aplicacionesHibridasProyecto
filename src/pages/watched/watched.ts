import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import MovieInList from '../../models/movieInList';
import { MovieDetailPage } from '../movie-detail/movie-detail';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the WatchedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-watched',
  templateUrl: 'watched.html',
})
export class WatchedPage {

  movies: MovieInList[] = [];
  loadingMovies: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, private db: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.afAuth.authState
      .subscribe(auth => {
        if (auth) {
          this.db.collection<MovieInList>("movieList", ref => ref.where("userId", "==", this.afAuth.auth.currentUser.uid).where("watched", "==", true))
            .snapshotChanges().map(data => data.map(val => {
              const doc = val.payload.doc.data() as MovieInList;
              doc.id = val.payload.doc.id;
              return doc;
            }))
            .subscribe(data => {
              this.movies = data;
              this.loadingMovies = false;
            });
        } else {
          this.loadingMovies = true;
          this.movies = [];
        }
      });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.movies = [];
  }

  navigateToMovie(e: any, movie_id: number) {
    this.navCtrl.push(MovieDetailPage, { id: movie_id });
  }

  delete(movie: MovieInList) {
    this.db.doc(`movieList/${movie.id}`).delete();
  }

  unwatched(movie: MovieInList) {
    this.db.doc(`movieList/${movie.id}`).update({ watched: false });
  }

}
