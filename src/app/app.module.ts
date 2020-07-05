import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EquipmentComponent } from './components/login-equipment/equipment.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainformComponent } from './components/mainform/mainform.component';
import { DatePipe } from '@angular/common';
import { LoginMasterComponent } from './components/login-master/login-master.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmptyHandlerComponent } from './components/forms/empty-handler/empty-handler.component';
import { ReachStackerComponent } from './components/forms/reach-stacker/reach-stacker.component';
import { TractorComponent } from './components/forms/tractor/tractor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EquipmentComponent,
    MenuComponent,
    MainformComponent,
    LoginMasterComponent,
    EmptyHandlerComponent,
    ReachStackerComponent,
    TractorComponent,
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
  providers: [DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: 'externalUrlRedirectResolver', useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
    {
        window.location.href = (route.data as any).externalUrl;
    }
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
