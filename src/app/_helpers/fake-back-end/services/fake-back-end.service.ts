import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // array in local storage for registered users
    const users: any[] = JSON.parse(sessionStorage.getItem('users')) || [];
    const questions: any[] = JSON.parse(sessionStorage.getItem('questions')) || [];

    // wrap in delayed observable to simulate server api call
    return Observable.of(null).mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
        // find if any user matches login credentials
        const filteredUsers = users.filter(user => {
          return user.username === request.body.username && user.password === request.body.password;
        });

        if (filteredUsers.length) {
          // if login details are valid return 200 OK with user details and fake jwt token
          const user = filteredUsers[0];
          const body = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            admin: user.admin,
            token: 'fake-jwt-token'
          };


          return Observable.of(new HttpResponse({status: 200, body: body}));
        } else {

          // else return 400 bad request
          return Observable.throw(new HttpResponse({status: 404, body: {message: 'Username or password is incorrect'}}));
        }
      }

      // reset-password
      if (request.url.endsWith('/api/reset-password') && request.method === 'POST') {
        return Observable.of(new HttpResponse({status: 200, body: request.body.email}));
      }

      // get users
      if (request.url.endsWith('/api/users') && request.method === 'GET') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return Observable.of(new HttpResponse({status: 200, body: users}));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw(new HttpResponse({status: 401, body: {message: 'Unauthorised'}}));
        }
      }

      // get user by id
      if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          const urlParts = request.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1], 180);
          const matchedUsers = users.filter(user => user.id === id);
          const user = matchedUsers.length ? matchedUsers[0] : null;

          return Observable.of(new HttpResponse({status: 200, body: user}));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw(new HttpResponse({status: 401, body: {message: 'Unauthorised'}}));
        }
      }

      // create question
      if (request.url.endsWith('api/question') && request.method === 'POST') {
        // get new user object from post body
        const newQuestion = request.body;

        // validation
        const duplicateQuestion = users.filter(question => question.questionLabel === newQuestion.questionLabel).length;
        if (duplicateQuestion) {
          return Observable.throw(new HttpResponse({
            status: 409,
            body: {message: 'Question "' + newQuestion.questionLabel + '" is already taken'}
          }));
        }

        // save new question
        newQuestion.id = users.length + 1;
        users.push(newQuestion);
        sessionStorage.setItem('faq', JSON.stringify(questions));

        // respond 200 OK
        return Observable.of(new HttpResponse({status: 200}));
      }
      // pass through any requests not handled above
      return next.handle(request);

    })

    // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .materialize()
      .delay(500)
      .dematerialize();
  }
}

