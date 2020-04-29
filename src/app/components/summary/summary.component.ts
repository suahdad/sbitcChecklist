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

  createbreakdowns(rtgKey : number) : Breakdown[]{
    var data : Breakdown[]
    this.breakdownForms.controls.map( x=> {
      data.push(new Breakdown{
        rtgformid = rtgKey,
        timestart = x.get('')[0]
      })
    })
    return data
  }

  submitForm(){
    var rtgForm = this.createRTGForm()
    var key = this.rtgService.saveRTGForm(rtgForm)
    this.bservices.saveBreakdown()
    //this.authService.logout()
    //this.router.navigate(['/login'])
  }
}
