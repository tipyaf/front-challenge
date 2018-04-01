import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
  isLogged = false;

  // real back-end that return jwt token we need this
  // helper = new JwtHelperService();


  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<any>('/api/authenticate', {username: username, password: password})
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          this.isLogged = true;
          const decodedUser = user; // with real back-end we need decode jwt token like this:   this.helper.decodeToken(token).user;
          this.setCurrentUser(decodedUser);
        }

        return this.isLogged;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  setCurrentUser(user) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
