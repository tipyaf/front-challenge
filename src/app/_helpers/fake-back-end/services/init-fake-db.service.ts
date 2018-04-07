import { Injectable } from '@angular/core';
import {FaqDB, UsersDB} from '../_db';

@Injectable()
export class InitFakeDbService {

  constructor() { }

  storeFakeDB() {
    if (!sessionStorage.getItem('users')) {
      sessionStorage.setItem('users', JSON.stringify(UsersDB));

    }

    if (!sessionStorage.getItem('faq')) {
      sessionStorage.setItem('faq', JSON.stringify(FaqDB));
    }
  }

}
