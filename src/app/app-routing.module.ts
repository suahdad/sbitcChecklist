import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginMasterComponent } from './components/login-master/login-master.component';
import { MainformComponent } from './components/mainform/mainform.component';
import { AuthGuard } from './helper/auth.guard';
import { N4Guard } from './helper/n4.guard';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminHomeComponent } from './components/admin-page/admin-home/admin-home.component';
import { AdminGuard } from './helper/admin.guard';
import { AdminChecklistsComponent } from './components/admin-page/admin-checklists/admin-checklists.component';
import { AdminChecklistIssuesComponent } from './components/admin-page/admin-checklist-issues/admin-checklist-issues.component';
import { LoginGuard } from './login.guard';
import { EquipmentComponent } from './components/login-equipment/equipment.component';

const routes: Routes = [
  {path: 'login', component: LoginMasterComponent, canActivate: [LoginGuard] },
  {path: 'dev', component: EquipmentComponent},
  {path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] , children: [
    {path: '', redirectTo: '/admin/(sub:dashboard)', pathMatch: 'full'},
    {path: 'dashboard', component: AdminHomeComponent, outlet: 'sub'},
      {path: 'checklists', outlet:'sub', children: [
      {path: 'all', component: AdminChecklistsComponent},
      {path: 'issues', component: AdminChecklistIssuesComponent}
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
