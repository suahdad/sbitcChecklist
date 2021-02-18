import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { compilePipeFromMetadata } from '@angular/compiler';
import { basename } from '@angular/compiler-cli/src/ngtsc/file_system';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { VoucherService } from 'src/app/voucher.service';
import { EquipmentComponent } from '../login-equipment/equipment.component';
import { LoginComponent } from '../login/login.component';
import { LoginMasterComponent } from './login-master.component';

describe('LoginMasterComponent', () => {
  let component: LoginMasterComponent;
  let fixture: ComponentFixture<LoginMasterComponent>;
  let loginComp: DebugElement;
  let equipComp : DebugElement;
  let loginInstance : LoginComponent;
  let mockVoucherService;
  beforeEach((() => {
  mockVoucherService = jasmine.createSpyObj(['postVoucher'])
    TestBed.configureTestingModule({
      declarations: [ LoginMasterComponent ,
        EquipmentComponent ,
        LoginComponent ],
      imports: [ HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FontAwesomeModule,
        BrowserAnimationsModule],
      providers: [{
        provide: VoucherService, useValue: mockVoucherService
      }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loginComp = fixture.debugElement.query(By.css('#login-component'));
    loginInstance = loginComp.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should have background', () => {
  //   console.log(fixture.debugElement.query(By.css('body')))
  //   expect(component).toBeTruthy();
  // }); //untestable, cannot find css styles.
  it('should initially show login-component only', () => {
    expect(loginComp).toBeTruthy();
  });
  it('should initially have equip-component unloaded', () => {
    expect(equipComp).toBeFalsy();
  });
  it('should hide login-component after successful login', () => {
    spyOn(loginInstance,'onSubmit').and.callFake( () => {
      component.user = true;
    })

    let loginBtn = loginComp.query(By.css('#form-login')).nativeElement;
    loginBtn.click();
    fixture.detectChanges();

    let newLoginComp = fixture.debugElement.query(By.css('#login-component')); //added to check again
    expect(newLoginComp).toBeFalsy();
  });
  it('should show equip-component after successful login', () => {
    spyOn(loginInstance,'onSubmit').and.callFake( () => {
      component.user = true;
    })

    let loginBtn = loginComp.query(By.css('#form-login')).nativeElement;
    loginBtn.click();
    fixture.detectChanges();

    let equipComp = fixture.debugElement.query(By.css('#equip-component'));

    expect(equipComp).toBeTruthy();
  });

  it('should run voucher saving on equipmentComponent login event',() => {
    component.user = true;
    fixture.detectChanges();

    let equipComp = fixture.debugElement.query(By.css('#equip-component'));
    component.equip = true;

    equipComp.nativeElement.dispatchEvent(new Event('loginEvent'))
    expect(mockVoucherService.postVoucher).toHaveBeenCalled();
  })
});
