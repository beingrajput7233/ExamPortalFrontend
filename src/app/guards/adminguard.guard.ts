import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class adminguardGuard implements CanActivate {

  constructor(private loginService: LoginService,private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.loginService.isLoggedIn()&& this.loginService.getUserRole()=='Admin') {
      // User is authenticated, allow access
      return true;
    } 
    this.router.navigate(['login'])
    return false;
  }
}
