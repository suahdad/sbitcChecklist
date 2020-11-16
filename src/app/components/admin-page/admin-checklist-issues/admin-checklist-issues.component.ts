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
import { ChecklistItem } from 'src/app/shared/models/checklist-item';

@Component({
  selector: 'app-admin-checklist-issues',
  templateUrl: './admin-checklist-issues.component.html',
  styleUrls: ['./admin-checklist-issues.component.scss']
})
export class AdminChecklistIssuesComponent implements AfterViewInit {
  
  checklistItems: ChecklistItem[] = new Array<ChecklistItem>()
  sortedData: Checklist[] = new Array<Checklist>()
  displayedColumns: string[] = 
  ['id',
  'equipment_TypeiD', 
  'equipmentID',
  'componentShortname',
  'remarks', 
  'date_Created', 
  'userID'];
  dataSource = new MatTableDataSource(this.checklistItems);

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
        case 'id': return item.checklist.id;
        case 'equipment_TypeiD': return item.equipment_typeid
        case 'equipmentID': return item.checklist.equipmentID;
        case 'componentShortname' : return item.component.shortname
        case 'date_Created': return item.checklist.date_Created;
        case 'userID': return item.checklist.user.firstName;
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
    this.checklistService.getChecklistItemsWithIssues().subscribe( data => {
      this.checklistItems = data;

      this.checklistItems.sort((a,b) => {
        return b.checklistid-a.checklistid
      })
      this.dataSource.data = this.checklistItems
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
