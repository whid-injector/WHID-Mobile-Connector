import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public accesspointmode = 1;
  public hidden: 0
  public ssid = "Exploit";
  public password = "DotAgency";
  public channel = 6;
  public local_IPstr = "192.168.1.1"
  public gatewaystr = "192.168.1.1";
  public subnetstr = "255.255.255.0";
  public update_username = "admin";
  public update_password = "hacktheplanet";
  public DelayLength = 2000;
  public LivePayloadDelay = 3000;
  public autopwn = 0;
  public autopayload = "/payloads/payload.txt";
  public SETTINGS = 1;

  public autopwnStatus = false;
  public channels = [1,2,3,4,5,6,7,8,9,10,11];
  public remotePayloads = [];

  constructor(public api: ApiService, public alertController: AlertController, public toast: ToastService) {
    this.api.getRemotePayloads().then((content) => {
      var regexp = /showpayload\?payload=(\S+)"/gm;
      var results = null;
      do {
        results = regexp.exec(content.data);
        if (results !== null) {
          this.remotePayloads.push(results[1]);          
        }
      } while (results);
    });


  }

  async changeSettings() {
    var options = {
      'accesspointmode' : this.accesspointmode,
      'hidden': this.hidden,
      'ssid': this.ssid,
      'password': this.password,
      'channel': this.channel,
      'local_IPstr': this.local_IPstr,
      'gatewaystr': this.gatewaystr,
      'subnetstr': this.subnetstr,
      'update_username': this.update_username,
      'update_password': this.update_password,
      'DelayLength': this.DelayLength,
      'LivePayloadDelay': this.LivePayloadDelay,
      'autopwn': this.autopwn,
      'autopayload': this.autopayload,
      'SETTINGS': this.SETTINGS
    }
    this.api.changeSettings(options);
  }

  async presentSaveSettingsAlert() {
    this.autopwn = this.autopwnStatus? 1: 0;
    console.log(this.autopwn);
    const alert = await this.alertController.create({
      header: 'Changing options',
      message: 'Are you sure you want to change the WHID settings?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: (data) => {
            console.log('Confirm Okay');
            this.changeSettings();
            this.toast.showToastMessage("Changing the device options...");
            this.presentMightReconnectToWhidAlert();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentMightReconnectToWhidAlert() {
    const alert = await this.alertController.create({
      header: 'Reconnecting to the WH',
      message: 'You may have to reconnect (and/or reinitialize your Wi-Fi connection) to the WHID',
      buttons: [
        {
          text: 'Ok, got it.',
          handler: (data) => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }


  ngOnInit() {
  }

}
