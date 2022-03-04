import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreqPage } from './freq.page';

const routes: Routes = [
  {
    path: '',
    component: FreqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreqPageRoutingModule {}
