import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BreakdownService } from '../../services/breakdown/breakdown.service';
import { FormArray } from '@angular/forms';
import { RemarksService } from '../../services/remarks/remarks.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';

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
    private router: Router) {
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

  submitForm(){
    console.log(this.breakdownForms.value)
    console.log(this.remarksForms.value)
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
