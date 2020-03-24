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
    console.log(this.breakdownForms.value)
  }

  removeBreakdown(i) {
    this.breakdownForms.removeAt(i)
  }

}
