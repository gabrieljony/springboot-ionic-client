import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderConfirmationPageRoutingModule } from './order-confirmation-routing.module';

import { OrderConfirmationPage } from './order-confirmation.page';
import { PedidoService } from 'src/services/domain/pedido.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderConfirmationPageRoutingModule
  ],
  declarations: [OrderConfirmationPage],
  providers: [
    PedidoService
  ]
})
export class OrderConfirmationPageModule {}
