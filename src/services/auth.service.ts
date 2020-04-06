import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { LocalUser } from 'src/models/local_user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CartService } from './domain/cart.service';

@Injectable()
export class AuthService {

  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(public http: HttpClient
    , public storage: StorageService,
    public cartService: CartService) {

  }

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(`${environment.API_CONFIG}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      })
  }

  refreshToken() {
    return this.http.post(`${environment.API_CONFIG}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      })
  }

  successFullLogin(authorizationValue: string) {
    let token = authorizationValue.substring(7);
    let user: LocalUser = {
      token: token,
      email: this.jwtHelperService.decodeToken(token).sub
    };
    this.storage.setLocalUser(user);
    this.cartService.createOrClearCart();
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}