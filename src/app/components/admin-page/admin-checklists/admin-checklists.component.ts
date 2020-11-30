import { Component, ViewChild, AfterViewInit, Input, ViewChildren, QueryList } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ChecklistService } from '../../../services/checklist.service';
import { Checklist } from '../../../shared/models/checklist';
import { MatPaginator } from '@angular/material/paginator';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { date } from '@rxweb/reactive-form-validators';
import { DatePipe } from '@angular/common';
import { format } from 'url';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  
  range : FormGroup
  searchString : FormGroup

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'checklistTable'
  }

  @Input() MaxResults: number;
  @Input() RecentFirst: boolean;
  @Input() ShowFeatures: boolean = true; //default value 

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChildren(MatPaginator) paginators: QueryList<MatPaginator> //viewchild doesn't work with ngIf

  constructor(private checklistService: ChecklistService,
    private exportAsService: ExportAsService,
    private datepipe: DatePipe,
    private fb: FormBuilder){

      
      this.range = this.fb.group({
        start: [''],
        end: [''],
      })
      
      this.searchString = this.fb.group({
        string: ['']
      })
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
    this.dataSource.filterPredicate = this.getFilterPredicate()

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

  exportTableAsXlsx(){
    const _datetime = this.datepipe.transform(new Date(),format('yyMMddHHmmssSS'))
    this.exportAsService.save(this.exportAsConfig,`${_datetime}`).subscribe(data => {
      //just needed, nothing to put here
    })
  }

  
  applyFilter() {
    const _startDate = this.range.controls["start"].value || ''
    const _endDate = this.range.controls["end"].value || ''
    const _searchedStr:string = this.searchString.controls["string"].value

    const _filterValue = `${_startDate}$${_endDate}$${_searchedStr.toLowerCase()}`
    this.dataSource.filter = _filterValue
  }

  getFilterPredicate(){
    return (row:Checklist, filters:string ) => {
      const filterArray= filters.split('$')
      const startDate = filterArray[0]
      const endDate = filterArray[1]
      const someString = filterArray[2]

      const matchFilter = []

      const colDateCreated = row.date_Created
      const colChecklistID = row.id
      const colEqpID = row.equipmentID
      const colUser = row.userID
      //cf = customFilter
      const _start = new Date(this.range.controls["start"].value)
      const _end = new Date(this.range.controls["end"].value)
      const _searchedStr = someString

      const _dateCreated = new Date(colDateCreated)

      const cfDateCreated = _start <= _dateCreated &&
                            _dateCreated <= _end
      const cfChecklistID = colChecklistID.toString().includes(_searchedStr)
      const cfEqpID = colEqpID.toLowerCase().includes(_searchedStr)
      const cfUser = colUser.toLowerCase().includes(_searchedStr)
      
      if(startDate != '' && endDate != '') matchFilter.push(cfDateCreated)
      matchFilter.push(cfChecklistID 
      || cfEqpID 
      || cfUser)

      return matchFilter.every(Boolean)


    }
  }


}


