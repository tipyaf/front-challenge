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
    let users: any[] = JSON.parse(sessionStorage.getItem('users')) || [];
    let questions: any[] = JSON.parse(sessionStorage.getItem('faq')) || [];

    // wrap in delayed observable to simulate server api call
    return Observable.of(null).mergeMap(() => {

      // ------------------Authentication ---------------- //

      // authenticate
      if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
        // find if any user matches login credentials
        let filteredUsers = users.filter(user => {
          return user.username === request.body.username && user.password === request.body.password;
        });

        if (filteredUsers.length) {
          // if login details are valid return 200 OK with user details and fake jwt token
          let user = filteredUsers[0];
          let body = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            admin: user.admin,
            token: 'fake-jwt-token'
          };


          return Observable.of(new HttpResponse({status: 200, body: body}));
        } else {

          // else return 403  forbidden (refused)
          return Observable.throw(new HttpResponse({status: 403, body: {message: 'Username or password is incorrect'}}));
        }
      }

      // reset-password
      if (request.url.endsWith('/api/reset-password') && request.method === 'POST') {
        return Observable.of(new HttpResponse({status: 200, body: request.body.email}));
      }

      // ====================== Token needed =============================== //

      // ------------------FAQ---------------------- //

      // create question
      if (request.url.endsWith('api/question') && request.method === 'POST') {
        // get new question object from post body
        let newQuestion = request.body;

        // validation
        let duplicateQuestion = users.filter(question => question.questionLabel === newQuestion.questionLabel).length;
        if (duplicateQuestion) {
          return Observable.throw(new HttpResponse({
            status: 409,
            body: {message: 'Question "' + newQuestion.questionLabel + '" is already taken'}
          }));
        }



        // // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if ((request.headers.get('Authorization') === 'Bearer fake-jwt-token')) {

          // save new question
          newQuestion.id = questions.length + 1;
          questions.push(newQuestion);
          sessionStorage.setItem('faq', JSON.stringify(questions));

          return Observable.of(new HttpResponse({status: 200, body: newQuestion}));
        } else {
          // return 404 not found if there not questions
          return Observable.throw(new HttpResponse({status: 401, body: {message: 'Unauthorised'}}));
        }
      }

      // get all questions
      if (request.url.endsWith('/api/questions') && request.method === 'GET') {
        // don't check token because all question are authorized to everyone
        if (questions.length > 0) {
          return Observable.of(new HttpResponse({status: 200, body: questions}));
        } else {
          // return 404 not found if there not questions
          return Observable.throw(new HttpResponse({status: 404, body: {message: 'Not found'}}));
        }
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

