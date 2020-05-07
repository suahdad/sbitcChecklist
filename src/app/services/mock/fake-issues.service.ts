import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Issues } from '../../shared/models/issues';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor() { 
   }

  getIssues(): Observable<Issues[]>{
    var issues : Issues[] = [
      {id:'test'},
      {id:'test1'},
      {id:'test2'},
      {id:'test3'},
    ]

    return of(issues)

  }

}
