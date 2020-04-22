import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemarksService {
  private dataSource = new BehaviorSubject('');
  remarks = this.dataSource.asObservable();

  constructor() {    }
  
  setRemarks(remarksList) {
    this.dataSource.next(remarksList)
  }
  
  getBreakdowns() {
    return this.remarks
  }
}
