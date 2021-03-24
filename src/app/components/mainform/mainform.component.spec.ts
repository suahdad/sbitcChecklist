import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/authentication/auth.service';

import { MainformComponent } from './mainform.component';

describe('MainformComponent', () => {
  let component: MainformComponent;
  let fixture: ComponentFixture<MainformComponent>;
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
      imports: [HttpClientModule],
      declarations: [ MainformComponent ],
      providers: [{
        provide: AuthService, useValue: mockauthService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
