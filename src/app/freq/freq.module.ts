import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreqPageRoutingModule } from './freq-routing.module';

import { FreqPage } from './freq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreqPageRoutingModule
  ],
  declarations: [FreqPage]
})
export class FreqPageModule {}
