import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NavExtrasService } from '../nav-extras-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exfiltration',
  templateUrl: './exfiltration.page.html',
  styleUrls: ['./exfiltration.page.scss'],
})
export class ExfiltrationPage implements OnInit {

  exfiltratedData = [];

  constructor(
    private api: ApiService,
    public navExtrasService: NavExtrasService,
    public router: Router
  ) { }

  ngOnInit() {
    this.exfiltratedData = this.api.retrieveExfiltratedData();
  }

  delete(uri: string) {
    this.api.deleteExfiltratedPayload(uri);
    this.router.navigateByUrl('/home')
  }

  view(uri: string) {
    this.api.displayExfiltratedData(uri).then(res => {
      let tmpData = res.data.split('\n');
      // delete last element (</pre>)
      tmpData.pop();
      // delete first two lines which are useless
      tmpData.shift();
      tmpData.shift();
      this.navExtrasService.setExfiltratedData({
        'file': uri,
        'data': tmpData.join('\n')
      });
      this.router.navigateByUrl('/exfiltrated-data');    
    })
  }
}
