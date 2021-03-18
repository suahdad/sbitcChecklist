import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {AuthService} from '../services/authentication/auth.service';
import { VoucherService } from '../voucher.service';
// import {AuthService} from '../services/mock/fake-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private voucherService: VoucherService
  ){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    const currentEquipment = this.authService.currentEquipmentValue;

    //initial check if user and equipment is available
    if(!currentUser || !currentEquipment){ return this.kickAccess();} 

    const _voucher = this.voucherService.CurrentVoucher;
    const isVoucherValid = this.voucherService.validateVoucher(_voucher,
                                                                currentUser.id,
                                                                currentEquipment.id)

    //check if there is userlogged in && equipment logged in && invalid voucher
    if (currentUser && currentEquipment && !isVoucherValid) {return true};

    //kick access on failure
    return this.kickAccess();
  }

  private kickAccess() {
    this.authService.logout(); //clear login
    this.router.navigate(['login'])
    return false;
  }
}
