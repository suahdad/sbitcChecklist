import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service'
import { User } from 'src/app/shared/models/user';
import { take } from 'rxjs/operators';
// import { AuthService } from '../../services/mock/fake-authentication.service'

@Component({
  selector: 'app-mainform',
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.css']
})
export class MainformComponent implements OnInit {

  eqType: any;
  user: User;

  constructor(private auth : AuthService) { 
    // auth.currentEquipment.subscribe( data => this.eqType = data.equipment_TypeID) //better to start at ngOninit 
    //so there will be no more 'work' done on instantiation 
  }

  ngOnInit() {
    // this.auth.currentEquipment.pipe(take(1)).subscribe(x => this.eqType = x.equipment_TypeID)
    this.user = this.auth.currentUserValue
    this.eqType = this.auth.currentEquipmentValue.equipment_TypeID;
  }

}
