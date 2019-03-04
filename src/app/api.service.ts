import { Injectable } from '@angular/core';
import { Observable,  } from "rxjs/internal/Observable";
import { HTTP } from '@ionic-native/http/ngx';
import { ToastService } from './toast.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
// import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private whidIP = '192.168.1.1';

  constructor(public http: HTTP, public toast: ToastService, public storage: Storage) { }

  isAlive(): Observable<boolean> {
    var tmpUrl = "http://" + this.whidIP + "/";
    this.http.setRequestTimeout(5);
    console.log('Doing the HTTP request...');
    return new Observable((observer) => {
      this.http.get(tmpUrl, {}, {})
      .then(data => {
        if (data.data.includes("ESPloit")) {
          console.log(new Observable((observer) => observer.next(true)));
          console.log(true);
          return observer.next(true);
        } else {
          console.log(new Observable((observer) => observer.next(false)));
          return observer.next(false);
        }
      })
      .catch(error => {
        console.log(error);
        console.log(new Observable((observer) => observer.next(false)));
      });
    })
  }

  reboot() {
    var tmpUrl = "http://" + this.whidIP + "/reboot";
    this.http.get(tmpUrl, {}, {}).then(() => {
      this.toast.showToastMessage("Rebooting the device (still)...");
    });
  }

  format() {
    var tmpUrl = "http://" + this.whidIP + "/format/yes";
    this.http.get(tmpUrl, {}, {}).then(() => {
      this.toast.showToastMessage("Formatting the device (still)...");
    });
  }

  // uploadPayload(title:string, payload:string) {
  //   var tmpUrl = "http://" + this.whidIP + "/upload";
  //   this.http.setDataSerializer('urlencoded');
  //   let headers = {
  //     'Content-type': 'application/x-www-form-urlencoded'
  //   }
    // let blob = new Blob([payload], {type: 'text/plain'});
    // let formData = new FormData();
    // formData.append('upload', payload, title);
    // let data = {"upload": payload}
    // this.http.uploadFile(tmpUrl, )
  //   let formData = {
  //     'upload': payload
  //   }
  //   this.http.post(tmpUrl, formData, headers).then(val => {
  //     alert(val);
  //   }).catch(error => {
  //     alert(error);
  //   })
  // }

  changeSettings(options) {
    var tmpUrl = "http://" + this.whidIP + "/settings"
    this.http.post(tmpUrl, options, {}).then(() => {
      this.toast.showToastMessage("Changing parameters...");
    })
  }

  upgrade() {
    var tmpUrl = "http://" + this.whidIP + "/upgrade";
    this.http.get(tmpUrl, {}, {}).then(() => {
      this.toast.showToastMessage("Upgrading the device (still)...");
    });
  }

  async runLivePayload(command) {
    var tmpUrl = "http://" + this.whidIP + "/runlivepayload";
    this.toast.showToastMessage("Trying to send the command...");
    this.http.post(tmpUrl, {"livepayloadpresent": 1, "livepayload": command}, {})
    .then(data => {
      this.toast.showToastMessage('Command sent successfully!');
    }).catch(error => {
      this.toast.showToastMessage('Something weird happened. Are you connected?');
    });
  }

  async getRemotePayloads() {
    var tmpUrl = "http://" + this.whidIP + "/listpayloads";
    return this.http.get(tmpUrl, {}, {});
  }

  async deleteRemotePayload(filepath: string) {
    var tmpUrl = "http://" + this.whidIP + "/deletepayload/yes?payload=" + filepath;
    this.http.get(tmpUrl, {}, {})
    .then(data => {
      this.toast.showToastMessage("Deleted " + filepath + " payload");
    });
  }

  async getRemotePayload(filepath: string) {
    var tmpUrl = "http://" + this.whidIP + "/showpayload?payload=" + filepath;
    // alert(tmpUrl);
    return this.http.get(tmpUrl, {}, {});
  }

  showPayload(options) {
    var tmpUrl = "http://" + this.whidIP + "/showpayload?payload=";
    if (options.type === "EXFIL") {
      tmpUrl += "/SerialEXFIL.txt";
    } else {
      tmpUrl += "/esportal-log.txt";
    }
  }

  getExfiltratedData() {
    var tmpUrl = "http://" + this.whidIP + "/exfiltrate/list";
  }

  setWHIDIP(newIP: string) {
    this.whidIP = newIP;
  }

  getWHIDIP() {
    return this.whidIP;
  }

  async addPayload(filename: string, payload: string) {
    this.getPayloads().then(payloads => {
      if (payloads === null || payloads == undefined) {
        payloads = {};
      }
      payloads[filename] = payload;
      return this.storage.set('payloads', payloads);
    });
  }

  async removePayload(filename: string) {
    this.storage.get('payloads').then(payloads => {
      delete payloads[filename];
      return this.storage.set('payloads', payloads);
    });
  }

  async getPayloads() {
    return this.storage.get('payloads');
  }

  async getPayload(key: string) {
    this.storage.get('payloads').then(payloads => {
      return payloads.get(key);
    })
  }

  async flushPayloads() {
    return this.storage.remove('payloads');
  }
}
