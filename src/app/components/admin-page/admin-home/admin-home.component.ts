import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChecklistService } from 'src/app/services/checklist.service';
import { FormatterService } from 'src/app/services/formatter.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  public isChartReady;
  public chartType: ChartType = "bar"
  public chartLegends = true
  public chartDataSet = []
  public chartLabels: Label[] = []
  public chartPlugins = []
  public chartOptions: ChartOptions = {
    responsive: true
  }

  private components = ['AIRLK',
    'ATTCH',
    'CLEAN',
    'COLNT',
    'DSPLY',
    'ENGIN',
    'FREXT',
    'HYOIL',
    'LIGHT',
    'OILLK',
    'SDMRR',
    'SPRDR',
    'TIRES',
    'TWIST',
    'WIPER',
    'WSHLD']

  private cmpDescription = ['Air Leaks',
    'Attachment Functions',
    'Cleanliness',
    'Coolant',
    'Display',
    'Engine',
    'Fire Extinguisher',
    'Hydraulic Oil',
    'Lights',
    'Oil Leaks',
    'Side Mirror',
    'Spreader',
    'Tyres',
    'Twist Lock',
    'Wiper',
    'Windshield']

  

  constructor(private router: Router,
    private chkService: ChecklistService,
    private frmService: FormatterService) {
      this.chkService.getChecklistItemsWithIssues().subscribe(x => {
        this.chartLabels = this.cmpDescription
        this.chartDataSet = this.frmService.getCountByKey("componentID",
        this.components,
        "conditionID",
        "OTHER",
        x)
        this.isChartReady = true;
      })

     }

  ngOnInit() {

  }

  alertUnavailable(){
    window.alert("This Feature is not yet available.");
  }

  GoToChecklists(){
    this.router.navigateByUrl('/admin/(sub:management/checklists)')
  }

}
