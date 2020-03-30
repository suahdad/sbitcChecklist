import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BreakdownService {
  breakdowns:FormArray;
  constructor() { }
  
  setBreakdowns(breakdownList:FormArray) {
    this.breakdowns = breakdownList
  }
  
}
