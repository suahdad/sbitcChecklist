import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatListModule, MatToolbarModule, MatStepperModule, MatSelectModule, MatGridListModule, MatExpansionModule} from '@angular/material';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatStepperModule,
    MatSelectModule,
    MatGridListModule,
    NgxMaterialTimepickerModule,
    MatExpansionModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatStepperModule,
    MatSelectModule,
    MatGridListModule,
    NgxMaterialTimepickerModule,
    MatExpansionModule
  ]
})

export class AngularMaterialModule { }
