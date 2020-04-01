import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BreakdownService } from '../../helper/breakdown/breakdown.service';
import { Observable } from 'rxjs';
import { MatAccordion } from '@angular/material';

@Component({
  selector: 'app-breakdowns',
  templateUrl: './breakdowns.component.html',
  styleUrls: ['./breakdowns.component.css']
})
export class BreakdownsComponent implements OnInit {

  @ViewChild('accordion',{static:true}) accordion: MatAccordion
  breakdownList: FormGroup;
  breakdownInfo: FormGroup;

  constructor(private fb: FormBuilder,
    private dp: DatePipe,
    private bservice: BreakdownService) { 
    }

  ngOnInit() {
    this.breakdownList = this.fb.group({      
      breakdowns : this.fb.array([
      ])
    })

    this.breakdownForms.valueChanges.subscribe(val =>
      this.bservice.setBreakdowns(this.breakdownForms))
  }

  public get breakdownForms() {
    return this.breakdownList.get('breakdowns') as FormArray
  }

  addBreakdown() {
    const dtFormat = 'MM/dd/yyyy HH:mm'
    const breakdown = this.fb.group({
      title:[],
      timeRange: [],
      subTitle:[],
      description: []
    })
    
    this.breakdownForms.push(breakdown);
  }

  removeBreakdown(i) {
    this.breakdownForms.removeAt(i)
  }


}
