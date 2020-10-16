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

    this.http.post<Checklist>(this.apiUrl,data).subscribe(data => console.log(data));
    console.log(JSON.stringify(data))

    this.submitSuccess = true;

    document.location.href =`${environment.ecN4Url}`;
    this.authService.logout();
  }

  public getChecklist() : Observable<Checklist[]>{
    return this.http.get<any>(this.apiUrl)
  }
}
