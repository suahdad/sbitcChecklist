import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {AuthService} from '../services/authentication/auth.service';
// import {AuthService} from '../services/mock/fake-authentication.service';


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

    //no need for returnURL, new users wont go back to other user's previous equipment form
    this.router.navigate(['login']);
    return false;
  }


  
}
