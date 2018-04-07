import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthAdminService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { admin: false }; // current user or false if not connected
    if (currentUser.admin) {
      // logged with administration role so return true
      return true;
    }

    // not logged in so redirect to home page with the return url
    this.router.navigate(['/faq'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
