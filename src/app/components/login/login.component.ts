import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

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
      password: ['']
    })
    
  }
  
  get f() { return this.loginform.controls;}

  onSubmit(){
    this.submitted = true;

    if (this.loginform.invalid) {
      return;
    }
    

    this.loading = true;
    this.authService.login(this.f.username.value,this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(this.returnUrl)
          this.router.navigate(['equipment']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
    }

}
