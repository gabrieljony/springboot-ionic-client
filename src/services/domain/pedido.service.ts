import { Injectable } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(public http: HttpClient) { }

  insert(obj: PedidoDTO) {
    return this.http.post(`${environment.API_CONFIG}/pedidos`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      });
  }
}
