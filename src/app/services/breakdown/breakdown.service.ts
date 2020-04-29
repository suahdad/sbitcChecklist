import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Breakdown } from 'src/app/shared/models/breakdown';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RTGForm } from 'src/app/shared/models/rtgform';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreakdownService {
  private breakApi = `${environment.apiURL}/api/breakdowns`
  private dataSource = new BehaviorSubject('');
  breakdowns = this.dataSource.asObservable();
  http: HttpClient;
  currentKey: any;

  constructor() {    }
  
  setBreakdowns(breakdownList) {
    this.dataSource.next(breakdownList)
  }
  
  getBreakdowns() {
    return this.breakdowns
  }

  saveBreakdown(data: Breakdown[]){
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    var x = this.http.post<any>(this.breakApi,data,{headers: headers})
  }
  
}
