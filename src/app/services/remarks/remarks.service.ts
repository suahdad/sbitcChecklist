import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemarksService {
  private remarksURL = `${environment.apiURL}/api/remarks`
  private dataSource = new BehaviorSubject('');
  remarks = this.dataSource.asObservable();

  constructor() {    }
  
  get r() {
    return this.remarks
  }
  setRemarks(remarksList) {
    this.dataSource.next(remarksList)
  }
  
  getBreakdowns() {
    return this.remarks
  }

}
