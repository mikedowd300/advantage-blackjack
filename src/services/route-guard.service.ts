import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return true;

      // if(state.url === '/doubleup') {
      //   this.router.navigate(['/']);
      //   return false;
      // }
      // else {
      //   return true;
      // }
  }
}