import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';

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
    , public menu: MenuController
    , public auth: AuthService
  ) { }

  ngOnInit() {
  }

  //lifecycle ionic v5

  //Disparado quando o componente que está sendo roteado está prestes a animar.
  ionViewWillEnter() {
    this.menu.enable(false);
  }

  //Disparado quando o componente que está sendo roteado foi animado.
  ionViewDidLeave() {
    this.menu.enable(true);
  }

  //Disparado quando o componente para o qual o roteamento está animado.
  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successFullLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('/categorias');
      }, error => { })
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successFullLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('/categorias');
      }, error => { })
  }

  signup() {
    this.navCtrl.navigateForward('/signup');
  }

}
