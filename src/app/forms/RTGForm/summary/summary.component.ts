import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BreakdownsComponent } from '../breakdowns/breakdowns.component'
import { BreakdownService } from '../breakdowns/breakdown.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers:[BreakdownService]
})
export class SummaryComponent implements OnInit {

  constructor(private bservices: BreakdownService) {

  }
  ngOnInit() { 

  }
  showBreakdowns(){
    console.log(this.bservices.breakdowns)
  }
}
