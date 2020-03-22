import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-breakdowns',
  templateUrl: './breakdowns.component.html',
  styleUrls: ['./breakdowns.component.css']
})
export class BreakdownsComponent implements OnInit {

  breakdownList: FormGroup

  constructor(private fb: FormBuilder,
    private dp: DatePipe) {  }

  ngOnInit() {
    this.breakdownList = this.fb.group({
      breakdowns: this.fb.array([])
    })

  }

  get breakdownForms() {
    return this.breakdownList.get('breakdowns') as FormArray
  }

  addBreakdown() {
    const breakdown = this.fb.group({
      title:[],
      timeRange: [],
      description: []
    })
    breakdown.get('timeRange').valueChanges.subscribe(val =>
      console.log(this.dp.transform(val,"yyyy-MM-dd")))
    this.breakdownForms.push(breakdown)
  }

  removeBreakdown(i) {
    this.breakdownForms.removeAt(i)
  }

}
