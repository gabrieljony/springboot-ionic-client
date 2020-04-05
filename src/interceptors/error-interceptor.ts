import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
import { StorageService } from 'src/services/storage.service';
import { FieldMessage } from 'src/models/fieldmessage';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {

  constructor(public storage: StorageService,
    public alertController: AlertController
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
          console.log(error)
          console.log(errorMessage);
          // console.log(`Erro detectado pelo interceptor: `);
          const errorObj = JSON.parse(`${error}`);
          console.log(errorObj, "error")

          switch (errorObj.status) {
            case 401:
              this.handle401();
              break;

            case 403:
              this.handle403();
              break;

            case 422:
              this.handle422(errorObj);
              break;

            default:
              console.log(error)
              this.handleDefaultError(error);

          }
          return throwError(error);
        })
      )
  }

  handle403() {
    //Error 403, que um possivel localUser está inválido, logo será removido esse obj caso exista
    this.storage.setLocalUser(null);
  }

  async handle401() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      subHeader: 'Erro 401: falha de autenticação.',
      message: 'E-mail ou senha incorretos.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });

    await alert.present();
  }

  async handle422(errorObj) {
    const alert = await this.alertController.create({
      header: 'Erro de validação!',
      subHeader: '',
      message: this.listErrors(errorObj.errors),
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });

    await alert.present();
  }

  private listErrors(messages: FieldMessage[]): string{
    let s: string = '';
    for(var i=0; i<messages.length; i++){
      s = s + messages[i].fieldName + ' ' + messages[i].message
    }
    return s;
  }

  async handleDefaultError(errorObj) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      subHeader: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });

    await alert.present();
  }

}

export const ErrorInterceptProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorIntercept,
  multi: true
}