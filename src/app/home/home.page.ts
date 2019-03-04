import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastService } from '../toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public whidIP = '';
  public command = '';
  public selectedPlatform = 'Windows';

  constructor(public api: ApiService, public toast: ToastService, public router: Router) {
    this.whidIP = api.getWHIDIP();
  }

  async sendCommand(command) {
    this.api.runLivePayload(command);
  }
    
  async sendText() {
    var newCommand = "Print:" + this.command;
    this.sendCommand(newCommand);
  }

  async sendTextAndEnter() {
    var newCommand = "PrintLine:" + this.command;
    this.sendCommand(newCommand);
  }

  async redirect(url: string) {
    this.router.navigateByUrl(url);
  }
}
