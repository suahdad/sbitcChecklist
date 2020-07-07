import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  checklistItem = this.fb.group({
    checkbox: [''],
    remarks: ['']
  })

  constructor(private http: HttpClient,
    private checklistService: ChecklistService,
    private fb: FormBuilder,
    private router: Router) { }

  public submitChecklist() {
    this.router.navigate(['test'])
  }
}
