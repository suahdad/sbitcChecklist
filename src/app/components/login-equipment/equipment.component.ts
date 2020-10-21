import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
// import { AuthService } from '../../services/mock/fake-authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { slider } from 'src/app/route-animations';
import { ChecklistService } from 'src/app/services/checklist.service';
import { environment } from 'src/environments/environment';

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
  invalidEquip = false;

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private checklistService: ChecklistService
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

        if(data.equipment_TypeID == 'RTG') {
            this.checklistService.submitSuccess = true;
          document.location.href = `${environment.ecN4Url}`;//direct to N4 if RTG
          this.authService.logout(); 
          return} //don't execute anymore

        this.router.navigate(['']);
        //added because sometimes after submission it doesn't go into the main form
        location.reload();
      },
      error => {
        if(error['status'] == 400) this.invalidEquip = true;
        this.error = error;
        this.loading = false;
      });
  }

}
