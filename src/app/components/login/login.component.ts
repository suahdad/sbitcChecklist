import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
// import { AuthService} from '../../services/mock/fake-authentication.service'
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
      username: ['user'],
      password: ['password']
    })
    
  }
  
  get f() { return this.loginform.controls;}

  onSubmit(){
    this.submitted = true;

    if (this.loginform.invalid) {
      return;
    }
    

    this.loading = true;

    let user: User = new User()
    user.id = this.f.username.value
    user.password = this.f.password.value

    this.authService.login(user.id, user.password)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(this.returnUrl)
          // this.router.navigate(['equipment']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
    }

}
