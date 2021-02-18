import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { slider } from 'src/app/route-animations';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from 'events';
import { emit } from 'process';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
  animations: [slider]
})
export class EquipmentComponent implements OnInit {
  @ViewChild('loginBtn') loginButton : ElementRef
  @Output('login') loginEvent: EventEmitter;

  
  equipmentForm: FormGroup;
  isSubmitted = false;
  direction: any;
  invalidEquip = false;
  truckIcon = faTruck;

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginEvent = new EventEmitter();
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

  set submit(value) {
    this.isSubmitted = value;
    this.disableLoginButton(value);
  }

  onSubmit(){
    this.submit = true;
    this.invalidEquip = false;

    this.authService.loginEquipment(this.f.equipment.value)
    .pipe(first())
    .subscribe(
      data => {
        this.loginEvent.emit(null);
      },
      error => {
        if(error['status'] >= 400 && error['status'] < 500) this.invalidEquip = true;
        console.log(error)
      }).add(x => {
        this.submit = false;
      });


  }
  logout(){
    this.authService.logout();
  }

  disableLoginButton(value : boolean) {
    this.loginButton.nativeElement.disabled = value
  }

}
