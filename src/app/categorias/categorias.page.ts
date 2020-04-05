import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[]
  bucketUrl: string = environment.bucketAmazonS3

  constructor(public categoriaService: CategoriaService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response
      }, error => { })
  }

  showProdutos(){
    this.navCtrl.navigateForward('/produtos');
  }


}
