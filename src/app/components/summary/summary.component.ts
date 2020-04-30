import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BreakdownService } from '../../services/breakdown/breakdown.service';
import { FormArray } from '@angular/forms';
import { RemarksService } from '../../services/remarks/remarks.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';
import { RTGForm } from 'src/app/shared/models/rtgform';
import { RtgformService } from 'src/app/services/rtgform.service';
import { map } from 'rxjs/operators';
import { Breakdown } from 'src/app/shared/models/breakdown';
import { timer } from 'rxjs';
import { Remark } from 'src/app/shared/models/remark';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  private breakdowns
  private remarks

  constructor(private bservices: BreakdownService,
    private rservices:RemarksService,
    private authService: AuthService,
    private router: Router,
    private rtgService: RtgformService) {
  }
  ngOnInit() { 
    this.bservices.breakdowns.subscribe(val =>
      this.breakdowns = val )

    this.rservices.remarks.subscribe(val =>
      this.remarks = val )
  }

  get breakdownForms() {
    return this.breakdowns as FormArray
  }

  get remarksForms() {
    return this.remarks as FormArray
  }

  createRTGForm(): RTGForm {
    var data = new RTGForm
    var currentDateTime = new Date

    data.datecreated = currentDateTime
    data.datemodified = currentDateTime
    data.equipmentId = this.authService.currentEquipmentValue.id
    data.createdbyid = this.authService.currentUserValue.id
    data.modifiedbyid = null

    return data
  }

  createbreakdowns(): Breakdown[]{
    var data: Breakdown[] = new Array()
    this.breakdownForms.controls.forEach( x => {
      var tempData: Breakdown = new Breakdown
      var timeRange: Date[] = x.get('timeRange').value

      tempData.timestart = timeRange[0]
      tempData.timeend = timeRange[1]
      tempData.description = x.get('description').value
      data.push(tempData)
    });
    console.log(data)
    return data
  }

  createRemarks(): Remark[]{
    var data: Remark[] = new Array()
    this.remarksForms.controls.forEach( x => {
      var tempData: Remark = new Remark

      tempData.componentid = x.get('component').value
      tempData.issueid = x.get('issue').value
      data.push(tempData)
    });
    console.log(data)
    return data
  }

  submitForm(){
    var rtgForm = this.createRTGForm()
    var breakdowns = this.createbreakdowns()
    var remarks = this.createRemarks()

    rtgForm.breakdowns = breakdowns
    rtgForm.remarks = remarks

    this.rtgService.saveRTGForm(rtgForm)
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
