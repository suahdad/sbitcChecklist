import { Injectable, ɵConsole } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import {AuthService} from '../services/authentication/auth.service';
import {AuthService} from '../services/mock/fake-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    const currentEquipment = this.authService.currentEquipmentValue;
    if (currentUser && currentEquipment)
    {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }


  
}
