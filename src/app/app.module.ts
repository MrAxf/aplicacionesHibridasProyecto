import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MoviesProvider } from '../providers/movies/movies';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';
import { MovieDetailPage } from '../pages/movie-detail/movie-detail';
import { TabsPage } from '../pages/tabs/tabs';
import { ToWatchPage } from '../pages/to-watch/to-watch';
import { WatchedPage } from '../pages/watched/watched';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MovieDetailPage,
    TabsPage,
    ToWatchPage,
    WatchedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ComponentsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDMF5Mb-xLoedXesIWc3dEc5IF_aasMBcw",
      authDomain: "towatchlist-ff43a.firebaseapp.com",
      databaseURL: "https://towatchlist-ff43a.firebaseio.com",
      projectId: "towatchlist-ff43a",
      storageBucket: "",
      messagingSenderId: "455817670694"
    }),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MovieDetailPage,
    TabsPage,
    ToWatchPage,
    WatchedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpClient,
    MoviesProvider
  ]
})
export class AppModule { }
