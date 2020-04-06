import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];
  categoriaId: string;

  constructor(public produtoService: ProdutoService,
    private route: ActivatedRoute,
    public navCtrl: NavController) { }

  ngOnInit() {
    //Pegar o paramentro que passa pela navegação, extraindo parâmetros de url
    this.route.queryParams.subscribe((queryParams: any) => {
      this.categoriaId = queryParams['categoria_id'];
    });
    this.produtoService.findByCategoria(this.categoriaId)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageurls();
      }, error => { })
  }

  loadImageurls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${environment.bucketAmazonS3}/prod${item.id}-small.jpg`;
      }, error => { });
    }
  }

  showDetail() {
    this.navCtrl.navigateForward('/produto-detail');
  }

}
