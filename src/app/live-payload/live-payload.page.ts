import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController, } from '@ionic/angular';
import { NavExtrasService } from '../nav-extras-service.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-live-payload',
  templateUrl: './live-payload.page.html',
  styleUrls: ['./live-payload.page.scss'],
})
export class LivePayloadPage implements OnInit {
  public livePayloadPlaceholder = "Press: 131+32\nCustomDelay: 1000\nPrint: calculator\nCustomDelay: 1000\nPress: 176";
  public livePayload = "";
  public title = null;
  public platform = null;

  constructor(public api: ApiService, public alertController: AlertController, navExtrasService: NavExtrasService, public toast: ToastService) {
    var payload = navExtrasService.getPayload();
    var title = null;

    if (payload && payload.hasOwnProperty('note')) {
      this.livePayload = payload['note'];
      this.title = payload['title'];
      this.platform = payload['platform'];
      if (this.platform === "Remote") {
        this.toast.showToastMessage("Fetching payload from remote WHID...");
        this.api.getRemotePayload(this.title)
        .then(data => {
          this.livePayload = data.data.split("-----")[1];
          // tricky tricky to remove </pre>          
          this.livePayload = this.livePayload.split("</pre>")[0];
          this.livePayload = this.livePayload.substring(1, this.livePayload.length);
        });
      }
    }
  }

  add(operand) {
    if (this.livePayload.length > 0) {
      operand = "\n" + operand;
    }
    this.livePayload += (operand);
  }

  // async presentUploadAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Uploading',
  //     message: 'This action might not be Opsec-safe, are you sure you want to continue?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Yes',
  //         handler: (data) => {
  //           console.log('Confirm Okay');
  //           this.uploadPayload();
  //           this.toast.showToastMessage("Uploading payload...");
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // uploadPayload() {
  //   this.api.uploadPayload(this.title, this.livePayload);
  // }

  send() {
    this.api.runLivePayload(this.livePayload);
  }

  async savePayload() {      
    const alert = await this.alertController.create({
      header: 'Save scriptlet',
      // subHeader: 'Subtitle',
      message: 'How do you want to call your scriplet?',
      inputs: [
        {
          name: 'Filename',
          placeholder: 'bindshell_4444_mac_osx'
        },
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
          text: 'Yes!',
          handler: (data) => {
            console.log('Confirm Okay');
            this.api.addPayload(data['Filename'], this.livePayload)
            .then(() => {
              this.api.getPayload(data['Filename']).then((res) => {
                console.log('res = ' + res);
                this.toast.showToastMessage("Successfully " + data['Filename'] + " scriptlet!");
              })
            })
          }
        }
      ]
    });
    // console.log(this.title);
    if (this.title !== null && this.platform !== "Remote") {
      this.api.addPayload(this.title, this.livePayload)
      .then(() => {
          this.toast.showToastMessage("Successfully " + this.title + " scriptlet!");
        })
    } else {
      await alert.present();
    }    
  }

  newPayload() {
    this.title = null;
  }

  ngOnInit() {
  }

}
