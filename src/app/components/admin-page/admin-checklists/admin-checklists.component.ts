import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ChecklistService } from '../../../services/checklist.service';
import { Checklist } from '../../../shared/models/checklist';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-admin-checklists',
  templateUrl: './admin-checklists.component.html',
  styleUrls: ['./admin-checklists.component.scss']
})
export class AdminChecklistsComponent implements AfterViewInit {

  checklists: Checklist[] = new Array<Checklist>()
  sortedData: Checklist[] = new Array<Checklist>()
  displayedColumns: string[] = ['id', 'equipmentid', 'date_created', 'userid'];
  dataSource = new MatTableDataSource(this.checklists);


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private checklistService: ChecklistService){

  }

  ngAfterViewInit() {
    this.refreshData();
    //configure Sorting Functions
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'equipmentid': return item.equipmentID;
        case 'date_created': return item.date_Created;
        case 'userid': return item.userID;
        default: return item[property];
      }
    }
    this.dataSource.sort = this.sort;


  }

  refreshData(){
    this.checklistService.getChecklist().subscribe( data => {
      this.dataSource.data = data;

    })
  }

}


