import { JwtInterceptor } from './jwt.interceptor';
import { inject } from '@angular/core/testing';
import { AuthService } from '../services/authentication/auth.service';

describe('JwtInterceptor', () => {
  it('should create an instance', inject([AuthService],(auth:AuthService) => {
    expect(new JwtInterceptor(auth)).toBeTruthy();
  }));
});
