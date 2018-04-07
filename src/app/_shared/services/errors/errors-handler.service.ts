import {Injectable, Injector} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable()
export class ErrorsHandlerService {
  constructor(// Because the ErrorHandler is created before the providers, we’ll have to use the Injector to get them.
              private injector: Injector) {}

  catch(error: any) {
    const toastr = this.injector.get(ToastrService);
    const router = this.injector.get(Router);

    switch (error.status) { // switch used to add all errors with real back end
      case 401:
        // unauthorized (deconnected)
        toastr.info('Deconnecté.'); // message info
        router.navigate(['/login']); // back to login page
        break;
      case 404:
        toastr.error('Non trouvée'); // not found
        break;
      case 403:
        toastr.error('Accès refusé'); // not found
        break;
      default:
        toastr.error(error.body.message); // all of other 500, ...
        break;
    }
  }
}
