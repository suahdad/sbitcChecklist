import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormControlName } from '@angular/forms';
import { IssuesService } from '../../services/issues/issues.service';
import { Issues } from 'src/app/model/issues/issues';
import { Observable } from 'rxjs';
import { Key } from 'protractor';
@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.css']
})
export class RemarksComponent implements OnInit {

  private remarksGroup
  private remarksList
  private issuesList: Issues[]

  constructor(private issuesService: IssuesService) {
    this.remarksList = new FormArray([])
    this.remarksGroup = new FormGroup({
      remarks: this.remarksList
    });

  }

  ngOnInit() {
    this.issuesService.getissues("I")
    .subscribe(obvIssue => this.issuesList = obvIssue)
  }

  addRemarks() {
    this.remarksGroup.controls.remarks.push(new FormControl(null));
  }

  deleteRemark(index) {
    this.remarksGroup.controls.remarks.removeAt(index);
  }

}
