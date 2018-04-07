import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  setCurrentUser(user) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
