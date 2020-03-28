import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavExtrasService {
  
  payload: string;
  exfiltratedData: any;

  constructor() { }

  public setPayload(data) {
    this.payload = data;
  }

  public getPayload() {
    return this.payload;
  }

  public setExfiltratedData(data) {
    this.exfiltratedData = data;
  }

  public getExfiltratedData() {
    return this.exfiltratedData;
  }
}
