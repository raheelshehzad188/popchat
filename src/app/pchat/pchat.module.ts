import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PchatPageRoutingModule } from './pchat-routing.module';

import { PchatPage } from './pchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PchatPageRoutingModule
  ],
  declarations: [PchatPage]
})
export class PchatPageModule {}
