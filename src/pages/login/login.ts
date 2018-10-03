import { UserService } from './../../providers/api/user.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string;
  public password: string;
  private loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin() {
    if (this.username && this.password) {
      this.presentLoading();
      this.userService.login(this.username, this.password).subscribe(
        result => {
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.presentToastError("Utilisateur ou mot de passe incorrect.");
        }
      )
    } else {
      this.presentToastError("Email et mot de passe requis.");
    }
  }

  onSignup() {
    const modal = this.modalCtrl.create("SignupPage");

    modal.onDidDismiss((data) => {
      // pré-renseigner les champs
      if (data && data.username && data.password) {
        this.username = data.username;
        this.password = data.password;
      }
    });

    modal.present();
  }


  presentToastError(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });

    toast.present();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Chargement...'
    });

    this.loading.present();
  }

}
