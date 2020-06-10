import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginMasterComponent } from './components/login-master/login-master.component';
import { EquipmentComponent } from './components/login-equipment/equipment.component';
import { MainformComponent } from './components/mainform/mainform.component';
import { AuthGuard } from './helper/auth.guard';
import { animation } from '@angular/animations';

const routes: Routes = [
  {path: 'login', component: LoginMasterComponent },
  {path: '', component: MainformComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
