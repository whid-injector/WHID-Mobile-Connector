import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  rootPage: any = "IntroPage";
  public version = "0.0.5";
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Live Payload',
      url: '/live-payload',
      icon: 'navigate'
    },
    {
      title: 'My Payloads',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Exfiltrated Data',
      url: '/exfiltration',
      icon: 'nuclear'
    },
    // {
    //   title: 'Windows',
    //   url: '/payload-windows',
    //   icon: 'bonfire'
    // },
    // {
    //   title: 'Linux',
    //   url: '/payload-linux',
    //   icon: 'bug'
    // },
    // {
    //   title: 'Mac',
    //   url: '/payload-mac',
    //   icon: 'flame'
    // },
    // {
    //   title: 'Bios',
    //   url: '/payload-bios',
    //   icon: 'nuclear'
    // },
    {
      title: 'Advanced Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'Maintenance',
      url: '/actions',
      icon: 'hammer'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'help'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private api: ApiService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const toggle = document.querySelector('#themeToggle');
      console.log(toggle);

      toggle.addEventListener('ionChange', (ev) => {
        console.log(ev);
        // ev.detail.checked
        document.body.classList.toggle('dark', (<any>ev).detail.checked);
      });
    });
  }
}
