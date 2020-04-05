import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup

  constructor(public menu: MenuController,
    public formBuilder: FormBuilder) {
      this.formGroup = formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        tipo: ['', [Validators.required]],
        cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['', [Validators.required]],
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: ['', []],
        bairro: ['', []],
        cep: ['', [Validators.required]],
        telefone1: ['', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]],
      });
     }

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
