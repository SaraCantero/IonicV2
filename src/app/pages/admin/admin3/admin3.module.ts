import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Admin3PageRoutingModule } from './admin3-routing.module';

import { Admin3Page } from './admin3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Admin3PageRoutingModule
  ],
  declarations: [Admin3Page]
})
export class Admin3PageModule {}
