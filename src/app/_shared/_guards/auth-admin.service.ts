import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthAdminService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.admin) {
      // logged with admin role so return true
      return true;
    }

    // not logged in so redirect to home page with the return url
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
