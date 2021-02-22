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
    const _userid = this.authService.currentUserValue.id;
    const _equipid = this.authService.currentEquipmentValue.id;
    const _isVoucherValid = this.voucherService.validateVoucher(_userid,_equipid)
  
    
    if(this.checklistService.isSubmitSuccess || _isVoucherValid) {
      return true;
    } 
    this.router.navigate(['']);
    return false;
  }
  
}
