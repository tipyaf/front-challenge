import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FakeBackendInterceptor} from '../services/fake-back-end.service';

export const FakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
