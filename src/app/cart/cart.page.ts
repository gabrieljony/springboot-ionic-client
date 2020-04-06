import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartItem } from 'src/models/cart-item';
import { ProdutoService } from 'src/services/domain/produto.service';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/services/domain/cart.service';
import { ProdutoDTO } from 'src/models/produto.dto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(public cartService: CartService,
    public produtoService: ProdutoService,
    public router: Router) { }

  ngOnInit() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageurls();
  }

  loadImageurls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${environment.bucketAmazonS3}/prod${item.produto.id}-small.jpg`;
        }, error => { });
    }
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  descreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total(): number {
    return this.cartService.total();
  }

  /**
   * Método de continuar comprando
   */
  goOn() {
    this.router.navigate(['/categorias']);
  }

}
