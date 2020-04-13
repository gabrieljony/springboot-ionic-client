import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { StorageService } from 'src/services/storage.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { NavController } from '@ionic/angular';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartService } from 'src/services/domain/cart.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(public storage: StorageService,
    public clienteService: ClienteService,
    public navCtrl: NavController,
    public cartService: CartService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmailAll(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: {
              id: response['id']
            },
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => { 
              return { 
                quantidade: x.quantidade, 
                produto: { id: x.produto.id } 
              }
            })[0]
          }
        },
          error => {
            if (error.status == 403) {
              this.navCtrl.navigateRoot('/');
            }
          })
    } else {
      this.navCtrl.navigateRoot('/');
    }
  }

  nextPage(value: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = { id: value.id };
    console.log(this.pedido)
  }

}
