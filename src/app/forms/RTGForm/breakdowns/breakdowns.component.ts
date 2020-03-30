import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BreakdownService } from './breakdown.service';
import { Breakdown } from './breakdown';

@Component({
  selector: 'app-breakdowns',
  templateUrl: './breakdowns.component.html',
  styleUrls: ['./breakdowns.component.css'],
  providers: [BreakdownService]
})
export class BreakdownsComponent implements OnInit {

  breakdownList: FormGroup;

  constructor(private fb: FormBuilder,
    private dp: DatePipe,
    private bservice: BreakdownService) { }

  ngOnInit() {
    this.breakdownList = this.fb.group({
      breakdowns: this.fb.array([
        title: this.fb.control(''),
        timeRange: this.fb.control(''),
        subTitle: this.fb.control(''),
        description: this.fb.control('')
      ])
    })
    this.breakdownForms.valueChanges.subscribe(val =>
      this.bservice.breakdowns = this.breakdownForms)
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
    this.breakdownForms.push(breakdown)
  }

  removeBreakdown(i) {
    this.breakdownForms.removeAt(i)
  }

}
