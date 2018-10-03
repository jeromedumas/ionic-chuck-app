import { UserService } from './../../providers/api/user.service';
import { Component } from '@angular/core';
import { IonicPage, ViewController, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm: FormGroup;
  private loading: Loading;

  constructor(
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public userService: UserService,
  ) {

    this.signupForm = this.formBuilder.group({
      username:
        ['',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[a-zA-Z_\-]+$/)
          ])
        ],
      password: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])],
    });
  }

  onSignup() {

    if (this.signupForm.valid) {
      this.presentLoading();
      this.userService.signup(this.signupForm.value.username, this.signupForm.value.password).subscribe(
        result => {
          this.loading.dismiss();
          this.presentToast("Succès d'inscription.");
          this.viewCtrl.dismiss({
            username: this.signupForm.value.username,
            password: this.signupForm.value.password
          });
        },
        error => {
          this.loading.dismiss();
          this.presentToast("Echec d'inscription.");
        }
      )
    } else {
      this.presentToast("Email et mot de passe requis.");
    }
  }


  presentToast(msg) {
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
