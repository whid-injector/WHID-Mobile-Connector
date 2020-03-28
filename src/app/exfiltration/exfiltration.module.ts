import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExfiltrationPage } from './exfiltration.page';

const routes: Routes = [
  {
    path: '',
    component: ExfiltrationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExfiltrationPage]
})
export class ExfiltrationPageModule {}
