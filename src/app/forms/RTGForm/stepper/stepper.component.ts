import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { format } from 'url';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  isLinear = false;

  remarksGroup: FormGroup;
  breakdownsGroup: FormGroup;
  summaryGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.breakdownsGroup = this._formBuilder.group({
      breakdowns: this._formBuilder.array([])
    })
    this.summaryGroup = this._formBuilder.group({
      summary: this._formBuilder.array([])
    })
  }

  ngOnInit() {
  }
}
