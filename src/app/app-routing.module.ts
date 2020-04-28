import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EquipmentComponent } from './components/login-equipment/equipment.component';
import { MainformComponent } from './components/mainform/mainform.component';
import { AuthGuard } from './helper/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'equipment', component: EquipmentComponent},
  {path: '', component: MainformComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
