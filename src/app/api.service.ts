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

  async displayExfiltratedData(uri: string) {
    var tmpUrl = "http://" + this.whidIP + "/showpayload?payload=" + uri;
    return this.http.get(tmpUrl, {}, {});
  }

  deleteExfiltratedPayload(uri: string) {
    var tmpUrl = "http://" + this.whidIP + "/deletepayload/yes?payload=" + uri;
    this.http.get(tmpUrl, {}, {});
  }

  retrieveExfiltratedData() {
    // let str = '<a href="/esploit"><- BACK TO INDEX</a><br><br>To exfiltrate data using the serial method find the com port device is connected to<br>then be sure to set the baud rate to 38400 on the victim machine<br>and send the text "SerialEXFIL:" followed by the data to exfiltrate.<br>To exfiltrate data using the WiFi methods be sure ESPloit and Target machine are on the same network.<br>Either set ESPloit to join the Target\'s network or set the Target to join ESPloit\'s AP.<br><small>Current Network Configuration: ESPloit\'s IP= <b>192.168.1.1</b> SSID = <b>Exploit</b> PASSWORD = <b>DotAgency</b><br>Windows: netsh wlan set hostednetwork mode=allow ssid="<b>Exploit</b>" key="<b>DotAgency</b>"<br>Linux: nmcli dev wifi connect <b>Exploit</b> password <b>DotAgency</b></small><br>For HTTP exfiltration method point the target machine to the url listed below:<br><small>http://<b>192.168.1.1</b>/exfiltrate?file=<b>FILENAME.TXT</b>&data=<b>EXFILTRATED-DATA-HERE</b></small><br>For FTP exfiltration method use the credentials listed below:<br><small>Server: <b>192.168.1.1</b> Username: <b>ftp-admin</b> Password: <b>hacktheplanet</b></small><br>See the example payloads for more in depth examples.<br><br>File System Info Calculated in Bytes<br><b>Total:</b> 2949250 <b>Free:</b> 2947744  <b>Used:</b> 1506<br><br><table border=\'1\'><tr><td><b>Display File Contents</b></td><td><b>Size in Bytes</b></td><td><b>Download File</b></td><td><b>Delete File</b></td></tr>  <tr><td><a href="/showpayload?payload=/SerialEXFIL.txt">/SerialEXFIL.txt</a></td><td>18</td><td><a href="/SerialEXFIL.txt"><button>Download File</button></td><td><a href="/deletepayload?payload=/SerialEXFIL.txt"><button>Delete File</button></td></tr></table>';
    // const regexp = /href="\/showpayload\?payload\=(\/[a-zA-Z0-9\.]+)"/g;
    // while ((matches = regexp.exec(str)) !== null) {
    //   console.log(matches)
    //   console.log(`${matches[0]} trouvé. Prochaine recherche à partir de ${regexp.lastIndex}.`);
    //   exfiltratedPayloads.push(matches[1]);
    // }
    // console.log(exfiltratedPayloads);

    // return exfiltratedPayloads;

    var tmpUrl = "http://" + this.whidIP + "/exfiltrate/list";
    return this.http.get(tmpUrl, {}, {});
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
