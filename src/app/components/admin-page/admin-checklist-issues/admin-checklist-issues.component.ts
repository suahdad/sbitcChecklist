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
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { date } from '@rxweb/reactive-form-validators';

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
  'equipment_TypeID', 
  'equipmentID',
  'questionText',
  'remarks', 
  'date_Created', 
  'userID'];
  dataSource = new MatTableDataSource(this.checklistItems);

  range : FormGroup
  searchString : FormGroup

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
    private datepipe: DatePipe,
    private fb: FormBuilder
    ){

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
        case 'id': return item.checklist.id;
        case 'equipment_TypeID': return item.equipment_TypeID
        case 'equipmentID': return item.checklist.equipmentID;
        case 'questionText' : return item.question.question_Text
        case 'remarks' : return item.remarks
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
    this.dataSource.filterPredicate = this.getFilterPredicate()

  }

  refreshData(){
    this.checklistService.getChecklistItemsWithIssues().subscribe( data => {
      this.checklistItems = data;

      this.checklistItems.sort((a,b) => {
        return b.checklistID-a.checklistID
      })
      this.dataSource.data = this.checklistItems
    })
  }

  applyFilter() {
    const _startDate = this.range.controls["start"].value
    const _endDate = this.range.controls["end"].value
    const _searchedStr:string = this.searchString.controls["string"].value

    const _filterValue = `${_startDate}$${_endDate}$${_searchedStr.toLowerCase()}`
    this.dataSource.filter = _filterValue
  }

  exportTableAsXlsx(){
    const _datetime = this.datepipe.transform(new Date(),format('yyMMddHHmmssSS'))
    this.exportAsService.save(this.exportAsConfig,`${_datetime}`).subscribe(data => {
      //just needed, nothing to put here
    })
  }

  getFilterPredicate(){
    return (row:ChecklistItem, filters:string ) => {
      const filterArray= filters.split('$')
      const startDate = filterArray[0]
      const endDate = filterArray[1]
      const someString = filterArray[2]

      const matchFilter = []

      const colDateCreated = row.checklist.date_Created
      const colChecklistID = row.checklistID
      const colEqpTypeID = row.equipment_TypeID
      const colEqpID = row.checklist.equipmentID
      const colQuestion = row.question.question_Text
      const colRemarks = row.remarks
      const colUser = row.checklist.user.firstName

      //cf = customFilter
      const _start = new Date(this.range.controls["start"].value)
      const _end = new Date(this.range.controls["end"].value)
      const _searchedStr = someString

      const _dateCreated = new Date(colDateCreated)

      const cfDateCreated = _start <= _dateCreated &&
                            _dateCreated <= _end
      const cfChecklistID = colChecklistID.toString().includes(_searchedStr)
      const cfEqpTypeID = colEqpTypeID.toLowerCase().includes(_searchedStr)
      const cfEqpID = colEqpID.toLowerCase().includes(_searchedStr)
      const cfQuestion = colQuestion.toLowerCase().includes(_searchedStr)
      const cfRemarks = colRemarks.toLowerCase().includes(_searchedStr)
      const cfUser = colUser.toLowerCase().includes(_searchedStr)
      
      if(startDate != '' && endDate != '') matchFilter.push(cfDateCreated)
      matchFilter.push(cfChecklistID 
      || cfEqpTypeID 
      || cfEqpID 
      || cfQuestion 
      || cfRemarks 
      || cfUser)

      return matchFilter.every(Boolean)


    }
  }

}
