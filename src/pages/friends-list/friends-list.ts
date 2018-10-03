import { ChuckService } from './../../providers/api/chuck.service';
import { ChuckFriend, ChuckFact } from './../../models/chuck.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-friends-list',
  templateUrl: 'friends-list.html',
})
export class FriendsListPage {


  public friends: ChuckFriend[];
  private loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private chuckService: ChuckService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsListPage');
    this.loadData();
  }

  public loadData() {
    this.presentLoading();

    this.chuckService.getFriends()
      .subscribe(
        (data: ChuckFriend[]) => {
          console.log(data);
          this.loading.dismiss();
          this.friends = data;
        },
        error => {
          this.loading.dismiss();
          console.error("Echec de chargement des données.");
        });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Chargement de la liste ...'
    });

    this.loading.present();
  }

}
