import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HalDuaPageRoutingModule } from './hal-dua-routing.module';

import { HalDuaPage } from './hal-dua.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HalDuaPageRoutingModule
  ],
  declarations: [HalDuaPage]
})
export class HalDuaPageModule {}
