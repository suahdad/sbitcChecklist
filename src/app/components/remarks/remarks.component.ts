import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
// import { IssuesService } from '../../services/issues/issues.service';
import { IssuesService } from '../../services/mock/fake-issues.service';
import { Issues } from '../../shared/models/issues';
import { RemarksService } from '../../services/remarks/remarks.service';
// import { ComponentService } from 'src/app/services/component.service';
import { ComponentService } from '../../../app/services/mock/fake-component.service';
import { EqComponent } from '../../../app/shared/models/component';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.css']
})
export class RemarksComponent implements OnInit {

  public formGroup: FormGroup
  public controlGroup : FormGroup
  public issuesList: Issues[]
  public compList: EqComponent[]

  constructor(private issuesService: IssuesService,
    private compService: ComponentService,
    private fb: FormBuilder,
    private remarksService: RemarksService) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      remarksList: this.fb.array([])
    })

    this.compService.getComponent() //load issues for options
    .subscribe(val => this.compList = val)

    this.issuesService.getIssues() //load issues for options
    .subscribe(val => this.issuesList = val)

    this.remarksForms.valueChanges.subscribe(val => //subscribe changes to remarksForms
      this.remarksService.setRemarks(this.remarksForms))
  }

  get remarksForms()
  {
    return this.formGroup.get('remarksList') as FormArray
  }

  addRemarks() {
    const controlGroup = this.fb.group({
      component: [''],
      issue: ['']
    })

    this.remarksForms.push(controlGroup)
  }

  deleteRemark(index) {
    this.remarksForms.removeAt(index)
  }

}
