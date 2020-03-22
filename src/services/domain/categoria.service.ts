import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly API = environment.API_CONFIG

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<CategoriaDTO[]> {
    return this.httpClient.get<CategoriaDTO[]>(`${this.API}/categorias`)
  }
}
