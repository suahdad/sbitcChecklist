import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginMasterComponent } from './components/login-master/login-master.component';
import { MainformComponent } from './components/mainform/mainform.component';
import { AuthGuard } from './helper/auth.guard';
import { N4Guard } from './helper/n4.guard';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminHomeComponent } from './components/admin-page/admin-home/admin-home.component';
import { AdminChangePasswordComponent } from './components/admin-page/admin-change-password/admin-change-password.component';
import { AdminUserManagementComponent } from './components/admin-page/admin-user-management/admin-user-management.component';

const routes: Routes = [
  {path: 'login', component: LoginMasterComponent },
  {path: 'admin', component: AdminPageComponent , children: [
    {path: '', redirectTo: '/admin/(sub:dashboard)', pathMatch: 'full'},
    {path: 'dashboard', component: AdminHomeComponent, outlet: 'sub'},
    {path: 'profile', outlet:'sub', children: [
      {path: 'changepass', component: AdminChangePasswordComponent}
    ]},
    {path: 'management', outlet:'sub', children: [
      {path: 'user', component: AdminUserManagementComponent}
    ]},
    {path:'**', redirectTo: '/admin/(sub:dashboard)', pathMatch: 'full'}

  ]},
  {path: '', component: MainformComponent,canActivate:[AuthGuard], pathMatch: 'full'},
  {
    path: 'test',
    component: LoginComponent, //just any random component
    resolve: {
        url: 'externalUrlRedirectResolver'
    },
    data: {
        externalUrl: 'http://10.122.8.114:8280/ecn4web/servlet/xmlrdt'
    },canActivate:[N4Guard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
