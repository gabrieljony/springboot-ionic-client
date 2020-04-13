import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ClienteDTO } from 'src/models/cliente.dto';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = environment.API_CONFIG;
  private readonly bucketAmazonS3 = environment.bucketAmazonS3;

  constructor(public http: HttpClient,
    public storage: StorageService) { }

  findByEmail(email: string): Observable<ClienteDTO> {
    return this.http.get<ClienteDTO>(`${this.API}/clientes/email?value=${email}`);
  }

  /**
   * Método GET para buscar a imagem no bucket no AMAZON S3
   */
  getImageFromBucket(id: string, date: number): Observable<any> {
    let url = `${this.bucketAmazonS3}/${date}_cp${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }

  insert(obj: ClienteDTO){
    return this.http.post(
      `${this.API}/clientes`, 
      obj, 
      {
        observe: 'response', 
        responseType: 'text'
      }
      );

  }


  findByEmailAll(email: string) {
    return this.http.get(`${this.API}/clientes/email?value=${email}`);
  }


}
