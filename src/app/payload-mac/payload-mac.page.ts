import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-payload-mac',
  templateUrl: './payload-mac.page.html',
  styleUrls: ['./payload-mac.page.scss'],
})
export class PayloadMacPage implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  async sendCommand(command: string) {
    this.api.runLivePayload(command);
  }
}
