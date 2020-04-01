import { Injectable } from '@angular/core';
import { LocalUser } from 'src/models/local_user';
import { STORAGE_KEYS } from 'src/config/storage_keys.config';

@Injectable()
export class StorageService {

  /*
  *Irá retornar o usuário logado.
  */
  getLocalUser(): LocalUser {
    let user = localStorage.getItem(STORAGE_KEYS.localUser);
    if (user == null){
      return null;
    } else {
      return JSON.parse(user)
    }
  }

  /*
  *Armazena o usuário logado.
  */
  setLocalUser(obj: LocalUser){
    if(obj == null){
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

}