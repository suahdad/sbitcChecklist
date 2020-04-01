import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EquipmentComponent } from './components/login-equipment/equipment.component';
import { MainformComponent } from './components/mainform/mainform.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'equipment', component: EquipmentComponent},
  {path: 'form', component: MainformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
