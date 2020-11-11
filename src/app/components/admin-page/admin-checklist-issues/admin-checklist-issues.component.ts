import { Component, ViewChild, AfterViewInit, Input, ViewChildren, QueryList } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ChecklistService } from '../../../services/checklist.service';
import { Checklist } from '../../../shared/models/checklist';
import { MatPaginator } from '@angular/material/paginator';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { DatePipe } from '@angular/common';
import { format } from 'url';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin-checklist-issues',
  templateUrl: './admin-checklist-issues.component.html',
  styleUrls: ['./admin-checklist-issues.component.scss']
})
export class AdminChecklistIssuesComponent implements AfterViewInit {
  
  checklists: Checklist[] = new Array<Checklist>()
  sortedData: Checklist[] = new Array<Checklist>()
  displayedColumns: string[] = ['id', 'equipmentid', 'date_created', 'userid'];
  dataSource = new MatTableDataSource(this.checklists);

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'checklistTable'
  }

  @ViewChild(MatSort, {static: true}) 
    sort: MatSort;
  @ViewChildren(MatPaginator) 
    paginators: QueryList<MatPaginator> //viewchild doesn't work with ngIf

  constructor(private checklistService: ChecklistService,
    private exportAsService: ExportAsService,
    private datepipe: DatePipe){
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
    //add sorting
    this.dataSource.sort = this.sort;

    //add paginator
    //as commented, viewchild doesn't work with ngIF
    this.dataSource.paginator = this.paginators.first;

  }

  refreshData(){
    this.checklistService.getChecklist().subscribe( data => {
      this.checklists = data;

      this.checklists.sort((a,b) => {
        return b.id-a.id
      })
      this.dataSource.data = this.checklists
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  exportTableAsXlsx(){
    const _datetime = this.datepipe.transform(new Date(),format('yyMMddHHmmssSS'))
    this.exportAsService.save(this.exportAsConfig,`${_datetime}`).subscribe(data => {
      //just needed, nothing to put here
    })
  }

}
