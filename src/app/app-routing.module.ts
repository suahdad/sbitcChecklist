import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { MainformComponent } from './forms/mainform/mainform.component';

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
