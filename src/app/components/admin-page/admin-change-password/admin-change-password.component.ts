import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { group } from 'console';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {

  private fg: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService) {
    this.fg = this.fb.group({
      currentPass: ['', Validators.required],
      newPass: ['', [
        Validators.required,
        Validators.minLength(8),
        this.ValidCurrentPass]],
      verify: ['', [
        Validators.required,
        this.ValidNewPassword]]
    })
   }

  ngOnInit() {
  }

  ValidCurrentPass(input:FormControl){
    const _currentPass = input.value as string;
    const _userPass = this.authService.currentUserValue.password as string
    
    return _currentPass == _userPass;

  }

  ValidNewPassword(input:FormControl){
    const _group = input.parent as FormGroup
    const _verifyPass = input.value as string
    const _newPass = _group.get('newPass').value as string

    return _verifyPass == _newPass;

  }

  changePassword(){
    console.log(this.fg)
    if(this.fg.valid){
      let tempUser = this.authService.currentUserValue;
      tempUser.password = this.fg.get('newPass').value;

      this.userService.changePassword(tempUser).subscribe();
    }
  }

}
