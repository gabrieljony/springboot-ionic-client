import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor() { }

  ngOnInit() {
    this.item = {
      id: "1",
      nome: "Mouse",
      preco: 80.59
    }
  }

}
