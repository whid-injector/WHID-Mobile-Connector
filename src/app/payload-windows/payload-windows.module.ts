import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PayloadWindowsPage } from './payload-windows.page';

const routes: Routes = [
  {
    path: '',
    component: PayloadWindowsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PayloadWindowsPage]
})
export class PayloadWindowsPageModule {}
