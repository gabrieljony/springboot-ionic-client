import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/services/domain/cart.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;
  produtoId: string;

  constructor(public produtoService: ProdutoService,
    private route: ActivatedRoute,
    public router: Router,
    public cartService: CartService) { }

  ngOnInit() {
    //Pegar o paramentro que passa pela navegação, extraindo parâmetros de url
    this.route.queryParams.subscribe((queryParams: any) => {
      this.produtoId = queryParams['produto_id'];
    });
    this.produtoService.findById(this.produtoId)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      }, error => { })
  }

  /**
   * Método para testar se a imagem exite
   */
  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${environment.bucketAmazonS3}/prod${this.item.id}.jpg`;
      },
        error => { })
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.router.navigate(['/cart']);
  }

}
