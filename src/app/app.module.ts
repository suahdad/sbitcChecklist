import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EquipmentComponent } from './equipment/equipment.component';
import { MenuComponent } from './forms/menu/menu.component';
import { MainformComponent } from './forms/mainform/mainform.component';
import { StepperComponent } from './forms/RTGForm/stepper/stepper.component';
import { RemarksComponent } from './forms/RTGForm/remarks/remarks.component';
import { BreakdownsComponent } from './forms/RTGForm/breakdowns/breakdowns.component';
import { SummaryComponent } from './forms/RTGForm/summary/summary.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EquipmentComponent,
    MenuComponent,
    MainformComponent,
    StepperComponent,
    RemarksComponent,
    BreakdownsComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
