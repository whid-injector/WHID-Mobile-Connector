import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-payload-bios',
  templateUrl: './payload-bios.page.html',
  styleUrls: ['./payload-bios.page.scss'],
})
export class PayloadBiosPage implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  async sendCommand(command: string) {
    this.api.runLivePayload(command);
  }

}
