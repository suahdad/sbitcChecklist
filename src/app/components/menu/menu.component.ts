import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private currentUser;
  private currentEquipment;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue
    this.currentEquipment = this.authService.currentEquipmentValue
  }

  get user(){
    return this.currentUser.firstName 
  }

  get equip(){
    return this.currentEquipment.id
  }

}
