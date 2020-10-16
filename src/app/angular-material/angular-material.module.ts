import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})

export class AngularMaterialModule { }
