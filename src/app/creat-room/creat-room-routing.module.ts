import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatRoomPage } from './creat-room.page';

const routes: Routes = [
  {
    path: '',
    component: CreatRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatRoomPageRoutingModule {}
