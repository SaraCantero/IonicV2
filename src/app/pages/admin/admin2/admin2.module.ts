import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Admin2PageRoutingModule } from './admin2-routing.module';

import { Admin2Page } from './admin2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Admin2PageRoutingModule
  ],
  declarations: [Admin2Page]
})
export class Admin2PageModule {}
