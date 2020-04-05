import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoDTO } from 'src/models/estado.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(public http: HttpClient) { }

  findAll(): Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(`${environment.API_CONFIG}/estados`)
  }
}
