import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickAddressPage } from './pick-address.page';

const routes: Routes = [
  {
    path: '',
    component: PickAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickAddressPageRoutingModule {}
