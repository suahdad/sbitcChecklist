import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ChecklistService } from '../../../services/checklist.service';
import { Checklist } from '../../../shared/models/checklist';
import { MatPaginator } from '@angular/material';

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

  @Input() MaxResults: number;
  @Input() RecentFirst: boolean;
  @Input() ShowFeatures: boolean = true; //default value 

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator

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

    this.dataSource.paginator = this.paginator;

  }

  refreshData(){
    this.checklistService.getChecklist().subscribe( data => {
      this.checklists = data;

      //recentfirst option
      if(this.RecentFirst) this.checklists.sort((a,b) => {
        return new Date(b.date_Created).getTime() - new Date(a.date_Created).getTime();
      });

      //maxresults option
      if(this.MaxResults) this.checklists = this.checklists.slice(0,this.MaxResults);

      this.dataSource.data = this.checklists
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}


