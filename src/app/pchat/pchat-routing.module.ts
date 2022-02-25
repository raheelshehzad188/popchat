import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PchatPage } from './pchat.page';

const routes: Routes = [
  {
    path: '',
    component: PchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PchatPageRoutingModule {}
