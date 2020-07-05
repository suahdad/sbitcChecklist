import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/authentication/auth.service'
import { AuthService } from '../../services/mock/fake-authentication.service'

@Component({
  selector: 'app-mainform',
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.css']
})
export class MainformComponent implements OnInit {

  eqType: any;

  constructor(auth : AuthService) { 
    auth.currentEquipment.subscribe( data => this.eqType = data)
  }

  ngOnInit() {
  }

}
