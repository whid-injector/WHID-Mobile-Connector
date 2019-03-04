import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {


  private whidIP = '';

  constructor(public api: ApiService, public alertController: AlertController, public toast: ToastService) {
    this.whidIP = api.getWHIDIP();
   }

  ngOnInit() {
  }

  async presentChangeIPAlert() {
    const alert = await this.alertController.create({
      header: 'Configuration',
      message: 'Are you sure you want to edit the WHID IP configuration?',
      inputs: [
        {
          name: 'IP',
          placeholder: this.whidIP
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (data) => {
            console.log('Confirm Okay');
            this.api.setWHIDIP(data['IP']);
            this.toast.showToastMessage("Changing WHID IP to: " + data['IP']);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentRebootAlert() {
    const alert = await this.alertController.create({
      header: 'Reboot',
      message: 'Are you sure you want to reboot the WHID?',
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
            this.api.reboot();
            this.toast.showToastMessage("Rebooting the device...");
          }
        }
      ]
    });
    await alert.present();
  }

  async presentFormatAlert() {
    const alert = await this.alertController.create({
      header: 'Format',
      message: 'Are you sure you want to format the WHID?',
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
            this.api.format();
            this.toast.showToastMessage("Formatting the device...");
          }
        }
      ]
    });
    await alert.present();
  }

  async presentUpgradeAlert() {
    const alert = await this.alertController.create({
      header: 'Upgrade',
      message: 'Are you sure you want to upgrade the WHID?',
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
            this.api.upgrade();
            this.toast.showToastMessage("Upgrading the device...");
          }
        }
      ]
    });
    await alert.present();
  }

}