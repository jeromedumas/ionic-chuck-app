import { UserService } from './../providers/api/user.service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    private userService: UserService,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.configureRoutePage();
    });
  }

  private configureRoutePage() {
    this.userService.isAuthenticated.subscribe((value: boolean) => {
      console.log("isAuthenticated? " + value);

      if (value) {
        this.rootPage = "MenuPage";
      } else {
        this.rootPage = "LoginPage";
      }
    });
  }
}

