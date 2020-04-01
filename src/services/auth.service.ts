import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  constructor(public http: HttpClient){

  }

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(`${environment.API_CONFIG}/login`, 
    creds,
    {
      observe: 'response',
      responseType: 'text'
    })
  }
}