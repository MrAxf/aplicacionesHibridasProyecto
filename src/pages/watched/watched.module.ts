import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchedPage } from './watched';

@NgModule({
  declarations: [
    WatchedPage,
  ],
  imports: [
    IonicPageModule.forChild(WatchedPage),
  ],
})
export class WatchedPageModule {}
