import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private api: ApiService, private router: Router) {
    // this.api.storage.get('hasSeenTutorial')
    // .then(hasSeenTutorial => {
    //   if (hasSeenTutorial) {
    //     this.router.navigateByUrl('/home');
    //   }
    // })
  }

  ngOnInit() {
  }

  goToHome() {
    this.api.storage.set('hasSeenTutorial', true);
    this.router.navigateByUrl('/home');
  }
}
