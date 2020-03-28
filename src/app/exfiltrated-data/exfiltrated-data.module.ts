import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExfiltratedDataPage } from './exfiltrated-data.page';

const routes: Routes = [
  {
    path: '',
    component: ExfiltratedDataPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExfiltratedDataPage]
})
export class ExfiltratedDataPageModule {}
