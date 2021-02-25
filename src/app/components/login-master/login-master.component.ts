import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { slider } from '../../route-animations'
import { VoucherService } from 'src/app/voucher.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-master',
  templateUrl: './login-master.component.html',
  styleUrls: ['./login-master.component.css'],
  animations: [slider]
})
export class LoginMasterComponent implements OnInit {

  user;
  equip;
  constructor(private auth:AuthService,
    private voucherService: VoucherService,
    private router: Router) { 
    this.auth.currentUser.subscribe(data => this.user = data)
    this.auth.currentEquipment.subscribe(data => this.equip = data)
  }

  ngOnInit() {

  }

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

  //  voucherCheck(){
  //   if(this.user && this.equip){
  //     const _userid = this.user.id;
  //     const _equipid = this.equip.id;
  //     if(this.voucherService.validateVoucher(_userid,_equipid)) {
  //       this.router.navigate(['n4'])
  //     }else{
  //       this.router.navigate(['']);
  //     };
  //      //added because sometimes after submission it doesn't go into the main form
  //   }
  //  }

   login(){
    if(this.user && this.equip){
      const _userid = this.user.id;
      const _equipid = this.equip.id;
      this.voucherService.getVoucher(_userid).pipe(first()).subscribe(x => {
        this.voucherService.saveVoucher(x[0]);
        if(this.voucherService.validateVoucher(x[0],_userid,_equipid)){
          this.router.navigate(['n4'])
        }else{
          this.router.navigate(['']);
        };
      })
      // this.voucherService.VoucherStream.subscribe({complete: () => {
      //   if(this.voucherService.validateVoucher())
      // }})
       //added because sometimes after submission it doesn't go into the main form
    }
   }



}
