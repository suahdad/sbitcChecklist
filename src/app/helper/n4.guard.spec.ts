import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockMediaQueryList } from '@angular/flex-layout/core/typings/match-media';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/authentication/auth.service';
import { ChecklistService } from '../services/checklist.service';
import { VoucherService } from '../voucher.service';

import { N4Guard } from './n4.guard';

describe('N4Guard', () => {
  let mockChecklistService;
  let mockVoucherService;
  let mockAuthService;
  beforeEach(() => {
    mockAuthService = {
      currentUserValue: {
        id: ''
      },
      currentEquipmentValue: {
        id: ''
      },
      logout: () => {}
    }
    mockVoucherService = {
      currentVoucher: {
        id: ''
      },
      validateVoucher:() => {}
    }
    mockChecklistService = {
      isSubmitSuccess: true
    }
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [N4Guard,
      {provide: VoucherService, useValue: mockVoucherService},
      {provide: ChecklistService, useValue: mockChecklistService},
      {provide: AuthService, useValue: mockAuthService}]
    }).compileComponents();
  });

  it('should allow guard on submit success and valid voucher', inject([N4Guard], (guard: N4Guard) => {
    spyOn(mockVoucherService, 'validateVoucher').and.returnValue((a,b,c) => {return true})

    guard.canActivate(null,null);
    expect(guard).toBeTruthy();
  }));
  
  it('should kick access on null user or null equipment', inject([N4Guard], (guard: N4Guard) => {
    mockAuthService.currentUserValue = null;
    mockAuthService.currentEquipmentValue = null;
    var _kickAccessSpy = spyOn<any>(guard,'kickAccess')
    
    guard.canActivate(null,null);
    expect(_kickAccessSpy).toHaveBeenCalled();
    
  }));});
