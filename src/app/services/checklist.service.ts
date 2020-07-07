import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  checklistItem = this.fb.group({
    checkbox: [''],
    remarks: ['']
  })

  constructor(private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  public submitChecklist() {
    this.authService.logout();
    this.router.navigate(['test']);
  }
}
