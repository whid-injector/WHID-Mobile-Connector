import { Component, OnInit } from '@angular/core';
import { NavExtrasService } from '../nav-extras-service.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-exfiltrated-data',
  templateUrl: './exfiltrated-data.page.html',
  styleUrls: ['./exfiltrated-data.page.scss'],
})
export class ExfiltratedDataPage implements OnInit {

  exfiltratedData: any;
  data: string;

  constructor(
    public navExtrasService: NavExtrasService,
    private api: ApiService) { }

  ngOnInit() {
    this.exfiltratedData = this.navExtrasService.getExfiltratedData()
    // this.data = this.api.displayExfiltratedData(this.exfiltratedData.file);
  }

}
