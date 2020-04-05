import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CidadeDTO } from 'src/models/cidade.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(public http: HttpClient) { }

  findAll(estado_id: string): Observable<CidadeDTO[]> {
    return this.http.get<CidadeDTO[]>(`${environment.API_CONFIG}/estados/${estado_id}/cidades`)
  }
}
