import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[] = [];
  categoriaId: string;
  page: number = 0;


  constructor(public produtoService: ProdutoService,
    private route: ActivatedRoute,
    public router: Router,
    public loadingController: LoadingController) { }

  ngOnInit() {
    //Pegar o paramentro que passa pela navegação, extraindo parâmetros de url
    this.route.queryParams.subscribe((queryParams: any) => {
      this.categoriaId = queryParams['categoria_id'];
    });
    this.presentLoading()
  }

  loadImageurls(start: number, end: number) {
    for (var i = start; i <= end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${environment.bucketAmazonS3}/prod${item.id}-small.jpg`;
      }, error => { });
    }
  }

  showDetail(produto_id: string) {
    this.router.navigate(['/produto-detail'], { queryParams: { 'produto_id': produto_id } });

  }


  // https://ionicframework.com/docs/api/loading
  async presentLoading() {
    let loading: any;
    try {
      loading = await this.loadingController.create({ message: 'Aguarde...' });
      await loading.present();

      this.produtoService.findByCategoria(this.categoriaId, this.page, 10)
        .subscribe(response => {
          let start = this.items.length
          this.items = this.items.concat(response['content'])
          let end = this.items.length - 1
          if (loading) {
            loading.dismiss();
          }
          console.log(this.page)
          console.log(this.items)
          this.loadImageurls(start, end);
        }, error => {
          if (loading) {
            loading.dismiss();
          }
          console.log('Failed FirebasePage: ' + JSON.stringify(error, ['message', 'arguments', 'type', 'name']));
        })
    } catch (err) {
      if (loading) {
        loading.dismiss();
      }
      console.log('Failed FirebasePage: ' + JSON.stringify(err, ['message', 'arguments', 'type', 'name']));
    }
  }

  doRefresh(event) {
    this.page = 0
    this.items = []
    this.presentLoading()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  loadData(event) {
    this.page++;
    this.presentLoading()
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }


}
