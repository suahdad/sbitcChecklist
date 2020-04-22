import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { IssuesService } from '../../services/issues/issues.service';
import { Issues } from '../../shared/models/issues';
import { RemarksService } from '../../services/remarks/remarks.service';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.css']
})
export class RemarksComponent implements OnInit {

  private remarksGroup: FormGroup
  private issuesList: Issues[]
  displayedColumns: string[] = ['eqComponent', 'issue'];

  constructor(private issuesService: IssuesService,
    private fb: FormBuilder,
    private remarksService: RemarksService) {
  }

  ngOnInit() {
    this.remarksGroup = this.fb.group({
      remarksList: this.fb.array([])
    })

    this.issuesService.getIssues()
    .subscribe(val => this.issuesList = val)

    this.remarksForms.valueChanges.subscribe(val =>
      this.remarksService.setRemarks(this.remarksForms))
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
  }

  deleteRemark(index) {
    this.remarksForms.removeAt(index)
  }

}
