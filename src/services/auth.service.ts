import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { LocalUser } from 'src/models/local_user';

@Injectable()
export class AuthService {

  constructor(public http: HttpClient
    , public storage: StorageService){

  }

  authenticate(creds: CredenciaisDTO){
    return this.http.post(`${environment.API_CONFIG}/login`, 
    creds,
    {
      observe: 'response',
      responseType: 'text'
    })
  }

  successFullLogin(authorizationValue: string){
    let token = authorizationValue.substring(7);
    let user: LocalUser = {
      token: token
    };
    this.storage.setLocalUser(user);
  }

  logout(){
    this.storage.setLocalUser(null);
  }
}