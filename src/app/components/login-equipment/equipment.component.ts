import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
// import { AuthService } from '../../services/mock/fake-authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { slider } from 'src/app/route-animations';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
  animations: [slider]
})
export class EquipmentComponent implements OnInit {
  @ViewChild('loginBtn') loginButton : ElementRef

  equipmentForm: FormGroup;
  direction: any;
  invalidEquip = false;
  truckIcon = faTruck;

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    if(this.authService.currentEquipmentValue) {
      this.router.navigate(['']);
    }
   }

  ngOnInit() {
    this.equipmentForm = this._fb.group({
      equipment: ['']
    })

    this.direction = 'isRight'
  }

  get f(){
    return this.equipmentForm.controls;
  }

  onSubmit(){
    this.authService.loginEquipment(this.f.equipment.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['']);
        //added because sometimes after submission it doesn't go into the main form
        location.reload();
      },
      error => {
        if(error['status'] >= 400 && error['status'] < 500) this.invalidEquip = true;
        console.log(error)
      });


  }
  logout(){
    this.authService.logout();
  }

  disableLoginButton(value : boolean) {
    this.loginButton.nativeElement.disabled = value
  }

}
