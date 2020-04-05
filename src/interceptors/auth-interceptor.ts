import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {
    
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log("Passou no interceptor")
    let localUser = this.storage.getLocalUser();

    let N = environment.API_CONFIG.length;
    let requestToAPI = request.url.substring(0, N) == environment.API_CONFIG;
    //verifica se existe o token na requisição e se for uma requisição para a API
    if(localUser && requestToAPI){
      const authReq = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localUser.token)})
      return next.handle(authReq)
    } else {
      return next.handle(request)
    }   
  }

}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}