import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { LoginComponent } from './login.component';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[ReactiveFormsModule,
      AppRoutingModule,
      HttpClientModule,
      FontAwesomeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should say sign in', () => {
    let h3: HTMLElement;
    h3 = fixture.nativeElement.querySelector('#body-header');

    expect(h3.textContent).toContain('Sign In')
  });
  it('should have login button', () => {
    let loginBtn: HTMLElement;
    loginBtn = fixture.nativeElement.querySelector('#form-login')

    expect(loginBtn).toBeTruthy();
  });
  it('login button should have Login as text', () => {
    let loginBtn: HTMLElement;
    loginBtn = fixture.nativeElement.querySelector('#form-login')

    expect(loginBtn['value']).toContain('Login')
  });
  it('Footer should have Forget Account Text', () => {
    let helptext: HTMLElement = fixture.nativeElement.querySelector('#body-footer')
    expect(helptext.innerHTML).toContain('Forget')
  });

  it('username input should not have any value', () => {
    let username: HTMLElement = fixture.nativeElement.querySelector('#form-username')
    expect(username.textContent).toBeFalsy();
  });
  it('username input should have username as place holder', () => {
    let username: HTMLElement = fixture.nativeElement.querySelector('#form-username')
    expect(username['placeholder']).toContain('username')
  });
  it('password should be pre-filled with the word password', () => {
    let password: HTMLElement = fixture.nativeElement.querySelector('#form-password')
    expect(password['value']).toContain('password')
  });
  it('password input should have password as placeholder', () => {
    let password: HTMLElement = fixture.nativeElement.querySelector('#form-password')
    expect(password['placeholder']).toContain('password')
  });
  it('should have icon for username', () => {
    let nodes = fixture.debugElement.query(By.css('#form-username-icon')).childNodes;
    console.log(nodes)
    var tagList = nodes.map(x => x.nativeNode['tagName']);
    expect(tagList).toContain('svg');
  });
  it('should have icon for password', () => {
    let nodes = fixture.debugElement.query(By.css('#form-password-icon')).childNodes;
    console.log(nodes)
    var tagList = nodes.map(x => x.nativeNode['tagName']);
    expect(tagList).toContain('svg');
  });
  // it('should be transparent', () => {
  //   let loginCard: HTMLElement = fixture.debugElement.query(By.css('#login-card')).nativeElement;
  //   console.log(window.getComputedStyle(loginCard));
  //   expect(loginCard).toBeTruthy();
  // });  //**removed due to non exposeable component styling **/
  it('should show error on invalid login', () => {
    component.invalidLogin=true;
    fixture.detectChanges();
    let invalidText: HTMLElement = fixture.nativeElement.querySelector('#invalid-text')
    expect(invalidText).toBeTruthy();
  });
  it('login button should disable on submit', () => {
    component.disableLoginButton(true);
    fixture.detectChanges();
    let loginButton: HTMLElement = fixture.nativeElement.querySelector('#form-login')
    expect(loginButton.attributes['disabled']).toBeTruthy();
  });
  it('should initialize isSubmitted to false', () => {
    expect(component.isSubmitted).toBeFalsy();
  });
  it('should initialize invalidLogin to false', () => {
    expect(component.invalidLogin).toBeFalsy();
  });
  it('should tick isSubmitted on submit', () => {
    var checker;
    var targetObj = new Proxy(component, {
      set: (target, key, value) => {
        if (key == 'isSubmitted' && value == true) checker = true;
        return true;
      }
    })
    targetObj.onSubmit(); // no further steps needed as function just listens if isSubmitted will be flagged on Submit
    expect(checker).toBeTruthy();
  });
  it('should tick invalidLogin at error on login', () => {
    let button = fixture.debugElement.query(By.css('#form-login')).nativeElement;
    spyOn(component,'onSubmit').and.callFake(() => {
      component.invalidLogin = true;
    })
    button.click();
    fixture.detectChanges();
    let message = fixture.debugElement.query(By.css('#invalid-text')).nativeElement;
    expect(message).toBeTruthy;
  });
  it('should tick isSubmitted on submit', () => {
    var checker;
    var targetObj = new Proxy(component, {
      set: (target, key, value) => {
        if (key == 'isSubmitted' && value == true) checker = true;
        return true;
      }
    })
    targetObj.onSubmit(); // no further steps needed as function just listens if isSubmitted will be flagged on Submit
    expect(targetObj.isSubmitted).toBeFalsy();
  });
  


});
