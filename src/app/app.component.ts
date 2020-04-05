import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Categorias',
      url: '/categorias',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'home'
    },
    {
      title: 'Logout',
      url: '/',
      icon: 'home'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

  }

  openPage(page: { title: string, url: string }) {
    console.log(page)
    switch (page.title) {
      case 'Logout':
        this.auth.logout();
        this.navCtrl.navigateRoot(page.url);
        break;

      default:
        this.navCtrl.navigateRoot(page.url);
    }

  }
}
