import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By, disableDebugTools } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { EquipmentComponent } from './equipment.component';

describe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentComponent ],
      imports: [ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      FontAwesomeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should say Equipment for form-header', () => {
    var h3 = fixture.debugElement.query(By.css('#form-header')).nativeElement;
    expect(h3.innerText).toEqual('Equipment')
  });
  it('should have icon for input equip-icon', () => {
    var inputIcon = fixture.debugElement.query(By.css('#equip-icon')).childNodes;
    var tagList = inputIcon.map(x => x.nativeNode['tagName']);
    expect(tagList).toContain('svg');
  });
  it('should contain \'Ex.\' placeholder for input-equip', () => {
    var inputEquip = fixture.debugElement.query(By.css('#input-equip')).nativeElement;
    expect(inputEquip.placeholder).toContain('Ex.');
  });
  it('should say \'Proceed\' in form-button', () => {
    var button = fixture.debugElement.query(By.css('#form-button')).nativeElement;
    expect(button.value).toContain('Proceed');
  });
  it('should contain \'Forget\' in helper-text', () => {
    var helper = fixture.debugElement.query(By.css('#helper-text')).nativeElement;
    expect(helper.innerText).toContain('Forget');
  });
  it('should have logout link', () => {
    var logout = fixture.debugElement.query(By.css('#logout-link')).nativeElement;
    expect(logout).toBeTruthy();
  }) 
  it('should call logout when logout is pressed', () => {
    var logout = fixture.debugElement.query(By.css('#logout-link')).nativeElement;
    spyOn(component,'logout')
    logout.click();
    expect(component.logout).toHaveBeenCalled();
    //check if logout will be called if
  }) 
  it('should initialize isSubmitted to false', () => {
    expect(component.isSubmitted).toBeFalsy();
  }); 
  it('should initialize invalidEquip to false', () => {
    expect(component.invalidEquip).toBeFalsy();
  });
  // it('should show error message on error submit', () => {
  //   component.invalidEquip = true;
  //   fixture.detectChanges();
  //   var message = fixture.debugElement.query(By.css('#error-message'))
  //   console.log(component)
  //   expect(message).toBeTruthy();
  // });
  it('should disable button on submit', () => {
    const button = fixture.debugElement.query(By.css('#form-button'));
    var checker = false;
    spyOn(component,'disableLoginButton').withArgs(true).and.callFake(x => {
      checker = true;
    })
    button.nativeElement.click()
    fixture.detectChanges();
    expect(checker).toBeTrue(); //checker should evaluate to true of disableloginbutton was properly called during submit
  });
});
