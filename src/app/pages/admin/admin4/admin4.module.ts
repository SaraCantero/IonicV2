import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../components/components.module';
import { Admin4PageRoutingModule } from './admin4-routing.module';

import { Admin4Page } from './admin4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Admin4PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Admin4Page]
})
export class Admin4PageModule {}
