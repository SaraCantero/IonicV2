import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Admin4Page } from './admin4.page';

const routes: Routes = [
  {
    path: '',
    component: Admin4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Admin4PageRoutingModule {}
