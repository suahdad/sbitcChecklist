import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakdownService {
  private dataSource = new BehaviorSubject('');
  breakdowns = this.dataSource.asObservable();

  constructor() {    }
  
  setBreakdowns(breakdownList) {
    this.dataSource.next(breakdownList)
  }
  
  getBreakdowns() {
    return this.breakdowns
  }
  
}
