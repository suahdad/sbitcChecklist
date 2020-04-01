import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { IssuesService } from '../../helper/issues/issues.service';
import { Issues } from 'src/app/shared/models/issues/issues';
import { validateBasis } from '@angular/flex-layout';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.css']
})
export class RemarksComponent implements OnInit {

  private remarksGroup: FormGroup
  private issuesList: Issues[]

  constructor(private issuesService: IssuesService,
    private fb: FormBuilder) {
    this.remarksGroup = this.fb.group({
      remarksList: this.fb.array([])
    })
  }

  ngOnInit() {
    this.issuesService.getIssues()
    .subscribe(val => this.issuesList = val)
  }

  get remarksForms()
  {
    return this.remarksGroup.get('remarksList') as FormArray
  }

  addRemarks() {
    const remarks = this.fb.group({
      eqComponent:[''],
      issue:['']
    })

    this.remarksForms.push(remarks)
    console.log(this.remarksGroup)
  }

  deleteRemark(index) {
    this.remarksForms.removeAt(index)
  }

}
