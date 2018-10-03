import { ChuckFact } from './../../models/chuck.model';
import { ChuckService } from './../../providers/api/chuck.service';
import { UserService } from './../../providers/api/user.service';
import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, Loading, ToastController, Refresher } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private loading: Loading;
  public chuckFact: ChuckFact;

  constructor(
    public navCtrl: NavController,
    public userSvc: UserService,
    private loadingCtrl: LoadingController,
    private chuckService: ChuckService,
    private toastCtrl: ToastController,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.loadData();
  }

  public loadData() {
    this.presentLoading();

    this.chuckService.getRandomFact()
      .subscribe(
        (chuckFact: ChuckFact) => {
          console.log(chuckFact);
          this.loading.dismiss();
          this.chuckFact = chuckFact;
        },
        error => {
          this.loading.dismiss();
          this.presentToastError("Echec de chargement des données.");
        });
  }

  public onRefresh(refresher: Refresher) {

    this.chuckService.getRandomFact()
      .subscribe(
        (chuckFact: ChuckFact) => {
          console.log(chuckFact);
          this.loading.dismiss();
          this.chuckFact = chuckFact;
        },
        error => {
          this.loading.dismiss();
          this.presentToastError("Echec de chargement des données.");
        },
        () => refresher.complete()
      );
  }

  presentToastError(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });

    toast.present();
  }

  private presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Chargement...'
    });

    this.loading.present();
  }

}
