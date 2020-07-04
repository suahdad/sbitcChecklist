import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginMasterComponent } from './components/login-master/login-master.component';
import { MainformComponent } from './components/mainform/mainform.component';
import { AuthGuard } from './helper/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginMasterComponent },
  {path: '', component: MainformComponent,canActivate:[AuthGuard]},
  {
    path: 'test',
    component: LoginComponent, //just any random component
    resolve: {
        url: 'externalUrlRedirectResolver'
    },
    data: {
        externalUrl: 'http://10.122.8.114:8280/ecn4web/servlet/xmlrdt'
    }
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
