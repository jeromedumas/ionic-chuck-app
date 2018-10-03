import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendsMapPage } from './friends-map';

@NgModule({
  declarations: [
    FriendsMapPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendsMapPage),
  ],
})
export class FriendsMapPageModule {}
