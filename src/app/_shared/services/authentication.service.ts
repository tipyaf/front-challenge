import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './data/users.service';

import 'rxjs/add/operator/map';

// import {JwtHelperService} from '@auth0/angular-jwt'; // needed with real REST API


@Injectable()
export class AuthenticationService {
  // real back-end that return jwt token we need this
  // helper = new JwtHelperService();


  constructor(private http: HttpClient,
              private userService: UserService
  ) {
  }

  login(username: string, password: string) {
    return this.http.post<any>('/api/authenticate', {username: username, password: password})
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          let decodedUser = user; // with real back-end we need decode jwt token like this:   this.helper.decodeToken(token).user;
          this.userService.setCurrentUser(decodedUser); // set the current user in local storage
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  resetPassword(email) {
    // send to back end to reset password and send email (in real case we need to create a register page)
    return this.http.post<any>('/api/reset-password', {email: email})
      .map(res => res);
  }

  getIsConnected() {
    return !!localStorage.getItem('currentUser');
  }
}
