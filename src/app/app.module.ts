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
import { EquipmentFormComponent } from './components/equipment-form/equipment-form.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminSidenavComponent } from './components/admin-page/admin-sidenav/admin-sidenav.component';
import { AdminMenuComponent } from './components/admin-page/admin-menu/admin-menu.component';
import { AdminHomeComponent } from './components/admin-page/admin-home/admin-home.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminChangePasswordComponent } from './components/admin-page/admin-change-password/admin-change-password.component';
import { AdminUserManagementComponent } from './components/admin-page/admin-user-management/admin-user-management.component';
import { AdminChecklistsComponent } from './components/admin-page/admin-checklists/admin-checklists.component'
import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { ExportAsModule } from 'ngx-export-as';
import { AdminIssuesComponent } from './components/admin-page/admin-issues/admin-issues.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EquipmentComponent,
    MenuComponent,
    MainformComponent,
    LoginMasterComponent,
    EquipmentFormComponent,
    AdminPageComponent,
    AdminSidenavComponent,
    AdminMenuComponent,
    AdminHomeComponent,
    AdminChangePasswordComponent,
    AdminUserManagementComponent,
    AdminChecklistsComponent,
    AdminIssuesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ExportAsModule
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
