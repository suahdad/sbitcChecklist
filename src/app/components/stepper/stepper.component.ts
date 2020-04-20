import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { format } from 'url';
import { MatStepperModule, MatHorizontalStepper, MatStepper } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {


  @ViewChild('mainStepper', {static: false}) mainStepper: MatStepper;

  remarksGroup: FormGroup;
  breakdownsGroup: FormGroup;
  summaryGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.remarksGroup = this._formBuilder.group({
    })
    this.breakdownsGroup = this._formBuilder.group({
    })
    this.summaryGroup = this._formBuilder.group({
    })

  }

  ngOnInit() {
  }


}
