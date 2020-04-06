import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(public http: HttpClient) { }

  findByCategoria(categoria_id: string) {
    return this.http.get(`${environment.API_CONFIG}/produtos/?categorias=${categoria_id}`)
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    let url = `${environment.bucketAmazonS3}/prod${id}-small.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }
}
