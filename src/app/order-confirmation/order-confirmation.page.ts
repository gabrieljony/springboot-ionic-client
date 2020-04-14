import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartItem } from 'src/models/cart-item';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { Router } from '@angular/router';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  pedido: PedidoDTO
  cartItems: CartItem[]
  cliente: ClienteDTO
  endereco: EnderecoDTO

  constructor(public cartService: CartService,
    public clienteService: ClienteService,
    private router: Router,
    public pedidoService: PedidoService) {
    //Pegar o paramentro que passa pela navegação, extraindo parâmetros de url
    const nav = this.router.getCurrentNavigation();
    this.pedido = nav.extras.queryParams.pedido;
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id).subscribe(response => {
      this.cliente = response as ClienteDTO
      this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos'])
    }, error => {

    })
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  checkout() {
    console.log(this.pedido)
    this.pedidoService.insert(this.pedido).subscribe(response => {
      this.cartService.createOrClearCart()
      console.log(response.headers.get('location'))
    }, error => {
      if (error.status == 403)
        this.router.navigate(['/'])
    })
  }

  back() {
    this.router.navigate(['/cart'])
  }

}
