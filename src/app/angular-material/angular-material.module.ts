import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatListModule, MatToolbarModule, MatStepperModule, MatSelectModule, MatGridListModule, MatExpansionModule} from '@angular/material';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

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
    MatExpansionModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
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
    MatExpansionModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ]
})

export class AngularMaterialModule { }
