import { Component, OnInit } from '@angular/core';
import { interval } from "rxjs/internal/observable/interval";
import { startWith, switchMap } from "rxjs/operators";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-whid-check',
  templateUrl: './whid-check.component.html',
  styleUrls: ['./whid-check.component.scss']
})
export class WhidCheckComponent implements OnInit {

  public alive: boolean;

  constructor(public api: ApiService) { }

  ngOnInit() {
    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.api.isAlive())
      ).subscribe(res => {
        console.log(res);
        this.alive = res;
      });
    }
}
