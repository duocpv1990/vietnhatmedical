import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      const token = localStorage.getItem('access_token');
      const access_user = JSON.parse(localStorage.getItem('access_user'));
      if (!token) {
        this.router.navigate(['login']);
        return false;
      }
      if (new Date().getTime() >=
        new Date(access_user['.expires']).getTime()
      ) {
        alert('phiên đăng nhập đã hết hạn');
        localStorage.clear();
        this.router.navigate(['login']);
        return false;
      }

      return true;
    } catch (ex) {
      this.router.navigate(['login']);
      return false;
    }
  }
}
