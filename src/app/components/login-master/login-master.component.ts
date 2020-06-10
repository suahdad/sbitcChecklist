import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/mock/fake-authentication.service';
import { slider } from '../../route-animations'

@Component({
  selector: 'app-login-master',
  templateUrl: './login-master.component.html',
  styleUrls: ['./login-master.component.css'],
  animations: [slider]
})
export class LoginMasterComponent implements OnInit {

  user: any;
  equipment: any;

  constructor(private auth:AuthService) { 
    this.auth.currentUser.subscribe(data => this.user = data)
    this.auth.currentEquipment.subscribe(data => this.equipment = data)
  }

  ngOnInit() {

  }

}
