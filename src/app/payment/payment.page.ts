import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5]

  formGroup: FormGroup

  constructor(public formBuilder: FormBuilder,
    private router: Router) {

    //Pegar o paramentro que passa pela navegação, extraindo parâmetros de url
    const nav = this.router.getCurrentNavigation();
    this.pedido = nav.extras.queryParams.pedido;

    this.formGroup = formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    })

  }

  ngOnInit() {
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value
    console.log(this.pedido)
  }

}
