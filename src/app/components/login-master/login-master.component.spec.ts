import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EquipmentComponent } from '../login-equipment/equipment.component';
import { LoginComponent } from '../login/login.component';
import { LoginMasterComponent } from './login-master.component';

describe('LoginMasterComponent', () => {
  let component: LoginMasterComponent;
  let fixture: ComponentFixture<LoginMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMasterComponent ,
        EquipmentComponent ,
        LoginComponent ],
      imports: [ HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FontAwesomeModule,
        BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should have background', () => {
  //   console.log(fixture.debugElement.query(By.css('body')))
  //   expect(component).toBeTruthy();
  // }); //untestable, cannot find css styles.
  it('should initially show login-component only', () => {
    let loginComp = fixture.debugElement.query(By.css('#login-component'))
    expect(loginComp).toBeTruthy();
  });
  it('should initially have equip-component unloaded', () => {
    let equipComp = fixture.debugElement.query(By.css('#equip-component'))
    expect(equipComp).toBeFalsy();
  });
  it('should hide login-component after successful login', () => {
    let loginComp = fixture.debugElement.query(By.css('#login-component'))
    let loginInstance : LoginComponent = loginComp.componentInstance;
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
    let loginComp = fixture.debugElement.query(By.css('#login-component'))
    let loginInstance : LoginComponent = loginComp.componentInstance;
    spyOn(loginInstance,'onSubmit').and.callFake( () => {
      component.user = true;
    })

    let loginBtn = loginComp.query(By.css('#form-login')).nativeElement;
    loginBtn.click();
    fixture.detectChanges();

    let equipComp = fixture.debugElement.query(By.css('#equip-component'))
    expect(equipComp).toBeTruthy();
  });
});
