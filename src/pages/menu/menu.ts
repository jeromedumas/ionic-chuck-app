import { UserService } from './../../providers/api/user.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  @ViewChild(Nav)
  public nav: Nav;

  public rootPage = "HomePage";

  public pages = [
    {
      component: "HomePage",
      icon: 'home',
      title: 'Accueil',
    },
    {
      component: "FriendsTabsPage",
      icon: 'people',
      title: 'Communauté',
    },
  ];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userSvc: UserService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  public openPage(page) {
    this.nav.setRoot(page.component);
  }

  public onLogout() {
    this.userSvc.logout();
  }
}
