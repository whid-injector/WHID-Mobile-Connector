import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-payload-linux',
  templateUrl: './payload-linux.page.html',
  styleUrls: ['./payload-linux.page.scss'],
})
export class PayloadLinuxPage implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  async sendCommand(command: string) {
    this.api.runLivePayload(command);
  }

}
