import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/authentication/auth.service';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let mockauthService;
  beforeEach(async(() => {
    mockauthService = {
      currentUserValue: {
        id: ''
      },
      currentEquipmentValue: {
        id: ''
      }
    }
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [{
        provide: AuthService, useValue: mockauthService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
