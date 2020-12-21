import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { first } from 'rxjs/operators';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ){
    if(this.authService.currentUserValue) {
      this.router.navigate(['/equipment']);
    }

  }
  ngOnInit() {
    this.loginform = this._fb.group({
      username: [''],
      password: ['password']
    })
    
  }
  
  get f() { return this.loginform.controls;}

  onSubmit(){
    this.submitted = true;

    if (this.loginform.invalid) {
      return;
    }
    

      .pipe(first())
      .subscribe(
        data => {
          this.authService.checkAdmin().subscribe(data => {
            if(this.authService.IsCurrentUserAdmin) this.router.navigate(['admin'])
          });
          
          // console.log(this.returnUrl)
          // this.router.navigate(['equipment']);
        },
        error => {
          if(error['status']== 400) this.invalidLogin = true;
        });
    }

}
