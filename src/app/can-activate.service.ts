import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate{  

  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticaded()) {
      return true;
    } else {
      this.router.navigate(['/sign-in'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
