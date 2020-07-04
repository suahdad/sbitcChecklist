import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
// import { AuthService } from '../../services/mock/fake-authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { slider } from 'src/app/route-animations';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
  animations: [slider]
})
export class EquipmentComponent implements OnInit {

  equipmentForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  direction: any;

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if(this.authService.currentEquipmentValue) {
      console.log(this.authService.currentEquipmentValue)
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
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

}
