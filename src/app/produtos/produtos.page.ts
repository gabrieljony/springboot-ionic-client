import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];
  categoriaId: string;

  constructor(public produtoService: ProdutoService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //Pegar o paramentro que passa pela navegação, extraindo parâmetros de url
    this.route.queryParams.subscribe((queryParams: any) => {
      this.categoriaId = queryParams['categoria_id'];
    });
    this.produtoService.findByCategoria(this.categoriaId)
      .subscribe(response => {
        this.items = response['content'];
      }, error => {})
  }

}
