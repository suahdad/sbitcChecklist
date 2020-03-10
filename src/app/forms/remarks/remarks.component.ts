import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormControlName } from '@angular/forms'

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.css']
})
export class RemarksComponent implements OnInit {

  private remarksGroup
  private remarksList
  constructor() {
    this.remarksList = new FormArray([])
    this.remarksGroup = new FormGroup({
      remarks: this.remarksList
    });

  }

  ngOnInit() {
  }

  addRemarks() {
    this.remarksGroup.controls.remarks.push(new FormControl(null));
  }

  deleteRemark(index) {
    this.remarksGroup.controls.remarks.removeAt(index);
  }

}
