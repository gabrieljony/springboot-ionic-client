import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public menu: MenuController) { }

  ngOnInit() {
  }

  //lifecycle ionic v5

  //Disparado quando o componente que está sendo roteado está prestes a animar.
  ionViewWillEnter() {
    this.menu.enable(false);
  }

  //Disparado quando o componente que está sendo roteado foi animado.
  ionViewDidLeave() {
    this.menu.enable(false);
  }

  signupUser() {
    console.log("ok");
  }

}
