import { ErrorInterceptor } from './error.interceptor';
import { AuthService } from '../services/authentication/auth.service';
import { AuthGuard } from './auth.guard';
import { inject } from '@angular/core/testing';

describe('ErrorInterceptor', () => {
  xit('should create an instance', inject([AuthService], (auth: AuthService) => { 
    expect(new ErrorInterceptor(auth)).toBeTruthy();
  }));
});
