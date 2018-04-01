import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from '../services/jwt.interceptor';


export const JwtInterceptorProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
