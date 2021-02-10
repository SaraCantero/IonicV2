import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Admin3Page } from './admin3.page';

const routes: Routes = [
  {
    path: '',
    component: Admin3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Admin3PageRoutingModule {}
