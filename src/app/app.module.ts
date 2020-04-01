import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EquipmentComponent } from './components/login-equipment/equipment.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainformComponent } from './components/mainform/mainform.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { RemarksComponent } from './components/remarks/remarks.component';
import { BreakdownsComponent } from './components/breakdowns/breakdowns.component';
import { SummaryComponent } from './components/summary/summary.component';
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
