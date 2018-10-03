import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendsTabsPage } from './friends-tabs';

@NgModule({
  declarations: [
    FriendsTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendsTabsPage),
  ],
})
export class FriendsTabsPageModule {}
