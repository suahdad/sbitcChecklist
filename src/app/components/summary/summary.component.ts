import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BreakdownService } from '../../helper/breakdown/breakdown.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  private breakdowns

  constructor(private bservices: BreakdownService) {
  }
  ngOnInit() { 
    this.bservices.breakdowns.subscribe(val =>
      this.breakdowns = val )
  }

  get breakdownForms() {
    return this.breakdowns as FormArray
  }
}
