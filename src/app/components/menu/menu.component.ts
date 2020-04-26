import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private currentUser;
  private currentEquipment;
  constructor() { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentuser'))
    this.currentEquipment = JSON.parse(localStorage.getItem('currentequip'))
  }

  get user(){
    return this.currentUser.firstName 
  }

  get equip(){
    return this.currentEquipment.id
  }

}
