import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async showToastMessage(message) {
    const toast = await this.toastController.create({
      'message': message,
      'duration': 2000
    });
    toast.present();
  }
}
