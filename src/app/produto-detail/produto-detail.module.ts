import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutoDetailPageRoutingModule } from './produto-detail-routing.module';

import { ProdutoDetailPage } from './produto-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutoDetailPageRoutingModule
  ],
  declarations: [ProdutoDetailPage]
})
export class ProdutoDetailPageModule {}
