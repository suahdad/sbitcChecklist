import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnChanges {
  @Input() remarks;
  @Input() breakdowns;

  ngOnChanges() {
  }
  showBreakdowns(){
    console.log(this.breakdowns)
  }
}
