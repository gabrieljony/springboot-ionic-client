import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua da mouraria",
        numero: "71",
        bairro: "Nazaré",
        complemento: "Rua da frente",
        cep: "40040090",
        cidade: {
          id: "1",
          nome: "Salvador",
          estado: {
            id: "1",
            nome: "Bahia"
          }
        }
      }
    ]
  }

}
