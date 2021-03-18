import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/authentication/auth.service';
import { VoucherService } from '../voucher.service';

describe('AuthGuard', () => {
  let _authService: AuthService;
  let _voucherService: VoucherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        AuthGuard,
        AuthService,
        VoucherService
      ]
    });

    _authService = TestBed.inject(AuthService);
    _voucherService = TestBed.inject(VoucherService);

  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should allow access on valid user or valid equip and invalid voucher', inject([AuthGuard], (guard: AuthGuard) => {
    spyOnProperty(_authService,'currentUserValue').and.returnValue(true);
    spyOnProperty(_authService,'currentEquipmentValue').and.returnValue(true);
    spyOn(_voucherService,'validateVoucher').and.returnValue(false);

    expect(guard.canActivate(null,null)).toBeTrue();
  }));

  it('should kick access on null user or null equip', inject([AuthGuard], (guard: AuthGuard) => {
    spyOnProperty(_authService,'currentUserValue').and.returnValue(null);
    spyOnProperty(_authService,'currentEquipmentValue').and.returnValue(null);
    var _kickAccessSpy = spyOn<any>(guard,'kickAccess')

    guard.canActivate(null,null)
    expect(_kickAccessSpy).toHaveBeenCalled();
  }));
});
