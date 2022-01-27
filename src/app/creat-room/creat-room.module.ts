import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatRoomPageRoutingModule } from './creat-room-routing.module';

import { CreatRoomPage } from './creat-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatRoomPageRoutingModule
  ],
  declarations: [CreatRoomPage]
})
export class CreatRoomPageModule {}
