import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {

  _pwFg: FormGroup;
  _currentUser: User;

  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private _authService: AuthService) {
      this._currentUser = _authService.currentUserValue;

   }

  ngOnInit() {
    this._pwFg = this.fb.group({
      currentPass: ['', Validators.required],
      newPass: ['', [
        Validators.required,
        Validators.minLength(8)]],
      verify: ['', [
        Validators.required,
        this.ValidNewPassword]]
    })
}

  ValidNewPassword(input:FormControl){
    const _group = input.parent as FormGroup
    const _verifyPass = input.value as string
    const _newPass = _group? _group.controls['newPass'].value as string : ''

    return _verifyPass == _newPass;

  }

  changePassword(){
    if(this._pwFg.valid){
      let tempUser = this._authService.currentUserValue;
      tempUser.password = this._pwFg.controls['newPass'].value;

      this._userService.changePassword(tempUser).subscribe();
    }
  }

}
