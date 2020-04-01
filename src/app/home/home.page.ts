import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController
    , public menu: MenuController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  login() {
    console.log(this.creds)
    this.navCtrl.navigateRoot('/categorias');
  }

}
