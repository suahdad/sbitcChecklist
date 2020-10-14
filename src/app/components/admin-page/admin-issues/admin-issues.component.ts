import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ChecklistService } from 'src/app/services/checklist.service';
import { Checklist } from 'src/app/shared/models/checklist';
import { ChecklistItem } from 'src/app/shared/models/checklist-item';

@Component({
  selector: 'app-admin-issues',
  templateUrl: './admin-issues.component.html',
  styleUrls: ['./admin-issues.component.css']
})
export class AdminIssuesComponent implements OnInit {

  private issueItems : ChecklistItem[]
  private configuration : Config
  private columns: Columns[]

  constructor(private checklistService:ChecklistService) { }

  ngOnInit() {
    this.checklistService.getChecklistWithIssues().subscribe(data => {
      data.map(x => {
        var _issues = x.checklist_items.filter(y => y.conditionid != "OK");
        this.issueItems = [...this.issueItems,..._issues]
      })
    })

    this.configuration = {...DefaultConfig}
    // this.columns = [
    //   {key: ''}
    // ]
  }

}
