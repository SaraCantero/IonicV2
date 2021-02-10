import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Admin4PageRoutingModule } from './admin4-routing.module';

import { Admin4Page } from './admin4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Admin4PageRoutingModule
  ],
  declarations: [Admin4Page]
})
export class Admin4PageModule {}
