import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'app-breakdowns',
  templateUrl: './breakdowns.component.html',
  styleUrls: ['./breakdowns.component.css']
})
export class BreakdownsComponent implements OnInit {

  private breakdownGroup
  private breakdownList

  constructor() {
    this.breakdownList = new FormArray([])
    this.breakdownGroup = new FormGroup({
      breakdowns: this.breakdownList
    })
   }

  ngOnInit() {
  }

  addBreakdown() {
    this.breakdownGroup.controls.breakdowns.push(new FormControl());
  }

  deleteBreakdown(index: Int32Array) {
    this.breakdownGroup.controls.breakdowns.removeAt(index)
  }

}
