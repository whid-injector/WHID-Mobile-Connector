import { Component, OnInit } from '@angular/core';
import {  ApiService } from '../api.service';

@Component({
  selector: 'app-payload-windows',
  templateUrl: './payload-windows.page.html',
  styleUrls: ['./payload-windows.page.scss'],
})
export class PayloadWindowsPage implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  async sendCommand(command: string) {
    this.api.runLivePayload(command);
  }
}
