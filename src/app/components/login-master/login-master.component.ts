import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { slider } from '../../route-animations'
import { VoucherService } from 'src/app/voucher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-master',
  templateUrl: './login-master.component.html',
  styleUrls: ['./login-master.component.css'],
  animations: [slider]
})
export class LoginMasterComponent implements OnInit {

  user: any;
  equip: any;

  constructor(private auth:AuthService,
    private voucherService: VoucherService,
    private router: Router) { 
    this.auth.currentUser.subscribe(data => this.user = data)
    this.auth.currentEquipment.subscribe(data => this.equip = data)
  }

  ngOnInit() {

  }

  voucherSave(){
    console.log(this.user, this.equip)
  // voucherSave(){
  //   if(this.user && this.equip){
  //      this.voucherService.postVoucher(this.user.id,this.equip.id).subscribe(data => {
  //       this.router.navigate(['']);
  //       //added because sometimes after submission it doesn't go into the main form
  //       location.reload();
  //     },(e) =>{
  //       console.log(e,'Voucher Saving');
  //     })
  //   }
  // }
    if(this.user && this.equip){
       this.voucherService.postVoucher(this.user.id,this.equip.id).subscribe(data => {
        this.router.navigate(['']);
        //added because sometimes after submission it doesn't go into the main form
        location.reload();
      },(e) =>{
        console.log(e,'Voucher Saving');
      })
    }
  }

}
