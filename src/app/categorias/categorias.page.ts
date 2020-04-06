import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[]
  bucketUrl: string = environment.bucketAmazonS3

  constructor(public categoriaService: CategoriaService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response
      }, error => { })
  }

  showProdutos(categoria_id: string) {
    this.router.navigate(['/produtos'], { queryParams: {'categoria_id': categoria_id }});
  }


}
