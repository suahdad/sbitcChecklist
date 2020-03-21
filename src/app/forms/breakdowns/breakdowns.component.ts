import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material';
import { Time } from '@angular/common';

@Component({
  selector: 'app-breakdowns',
  templateUrl: './breakdowns.component.html',
  styleUrls: ['./breakdowns.component.css']
})
export class BreakdownsComponent implements OnInit {

  public breakdownList: FormArray
  constructor() {
    this.breakdownList = new FormArray([])
  }

  ngOnInit() {

  }

  addBreakdown() {
    const breakGroup = new FormGroup({
      timeStart: new FormControl(''),
      timeEnd: new FormControl(''),
      description: new FormControl('')
    })

    this.breakdownList.push(breakGroup)
  }

  removeBreakdown(i) {
    this.breakdownList.removeAt(i)
  }

}
