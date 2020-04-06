import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Cart } from 'src/models/cart';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CartItem } from 'src/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public storage: StorageService) { }

  /**
   * Método para criar ou limpar o carrinho
   */
  createOrClearCart(): Cart {
    let cart: Cart = { items: [] };
    this.storage.setCart(cart);
    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getCart();
    if (cart.items == null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    //verificar se o produto já existe no carrinho.
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position == -1) {
      cart.items.push({ quantidade: 1, produto: produto });
    }
    this.storage.setCart(cart);
    return cart;
  }

}
