import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../service/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminProtectedGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
    private router: Router
  ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('call');
      if (!this.adminService.isLoggedIn()) {
        this.router.navigate(['', 'admin', 'auth','login']);
        return false;
      }
      return true;
  }
  
}
