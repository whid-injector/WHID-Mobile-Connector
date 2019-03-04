import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavExtrasService {
  
  payload: string;

  constructor() { }

  public setPayload(data) {
    this.payload = data;
  }

  public getPayload() {
    return this.payload;
  }
}
