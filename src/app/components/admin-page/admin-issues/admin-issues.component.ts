import { Component, OnInit } from '@angular/core';
import { ChecklistService } from 'src/app/services/checklist.service';

@Component({
  selector: 'app-admin-issues',
  templateUrl: './admin-issues.component.html',
  styleUrls: ['./admin-issues.component.css']
})
export class AdminIssuesComponent implements OnInit {

  constructor(private checklistService:ChecklistService) { }

  ngOnInit() {
    this.checklistService.getChecklistWithIssues().subscribe(data => {
      console.log(data) 
    })
  }

}
