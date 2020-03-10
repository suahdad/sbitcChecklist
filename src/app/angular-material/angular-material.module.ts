import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatListModule, MatToolbarModule, MatStepperModule, MatSelectModule, MatGridListModule} from '@angular/material';


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
    MatGridListModule
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
    MatGridListModule
  ]
})

export class AngularMaterialModule { }
