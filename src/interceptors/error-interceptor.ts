import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log("Passou no interceptor")
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse, caught) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }
          if (error.error) {
            error = error.error
          }

          console.log(errorMessage);
          console.log(`Erro detectado pelo interceptor: `);
          console.log(error)
          return throwError(error);
        })
      )
  }

}

export const ErrorInterceptProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorIntercept,
  multi: true
}