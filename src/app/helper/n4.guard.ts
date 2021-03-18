import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication/auth.service';
import { ChecklistService } from '../services/checklist.service';
import { VoucherService } from '../voucher.service';

@Injectable({
  providedIn: 'root'
})
export class N4Guard implements CanActivate {

  constructor (private checklistService: ChecklistService,
    private router: Router,
    private voucherService: VoucherService,
    private authService: AuthService) {

    }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;
    const currentEquipment = this.authService.currentEquipmentValue;

    //initial check if user and equipment is available
    if(!currentUser || !currentEquipment){ return this.kickAccess();} 
    
    const _voucher = this.voucherService.CurrentVoucher;
    const _isVoucherValid = this.voucherService.validateVoucher(_voucher,
                                                                currentUser.id,
                                                                currentEquipment.id);

    if(this.checklistService.isSubmitSuccess || _isVoucherValid) {
      this.authService.logout(); //clear data
      return true;
    } 
    this.router.navigate(['']);
    return false;
  }

  private kickAccess() {
    this.authService.logout(); //clear login
    this.router.navigate(['login'])
    return false;
  }
  
}
