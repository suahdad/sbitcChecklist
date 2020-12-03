import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './authentication/auth.service';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { environment } from 'src/environments/environment';
import { Checklist } from '../shared/models/checklist';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChecklistItem } from '../shared/models/checklist-item';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  apiUrl = `${environment.apiURL}/api/checklists`

  submitSuccess = false;
  
  checklistItem = this.fb.group({
    checkbox: [''],
    remarks: ['']
  })

  constructor(private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  public submitChecklist(data: Checklist) {
     return this.http.post<Checklist>(this.apiUrl,data);
  }

  public getChecklist() : Observable<Checklist[]>{
    return this.http.get<any>(this.apiUrl)
  }

  public getChecklistWithIssues() : Observable<Checklist[]> {
    return this.http.get<any>(`${this.apiUrl}/issues`)
  }
  public getChecklistItems() : Observable<ChecklistItem[]>{
    return this.http.get<any>(`${this.apiUrl}/items`)
  }

  public getChecklistItemsWithIssues() : Observable<ChecklistItem[]> {
    return this.http.get<any>(`${this.apiUrl}/items/issues`)
  }
}
