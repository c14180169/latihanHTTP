import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HalDuaPage } from './hal-dua.page';

const routes: Routes = [
  {
    path: '',
    component: HalDuaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HalDuaPageRoutingModule {}
