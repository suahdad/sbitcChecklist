import { JwtInterceptor } from './jwt.interceptor';
import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from '../services/authentication/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('JwtInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  })
  it('should create an instance', inject([AuthService],(auth:AuthService) => {
    expect(new JwtInterceptor(auth)).toBeTruthy();
  }));
});
