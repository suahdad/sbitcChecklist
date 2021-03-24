import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Equipment } from 'src/app/shared/models/equipment';
import { User } from 'src/app/shared/models/user';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService

  let user: User = new User()
  user.id = "test"
  user.password = "test"

  let equip:Equipment = new Equipment()
  equip.id="test"

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService]
    });
    
    service = TestBed.get(AuthService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user when user logs in',() => {
    let _userid = user.id
    let _userpass = user.password
    service.login(_userid,_userpass).subscribe(subUser =>
      expect(subUser).toBe(user))
  });

  it('should return equip when user logs in equipment', () => {
    let _equipid = equip.id
    service.loginEquipment(_equipid).subscribe(subEquip =>
      expect(subEquip).toBe(equip))
  })

  it('should delete storage tokens currentEquipment on logout', () => {
    let _userid = user.id
    let _userpass = user.password
    let _equipid = equip.id
    service.login(_userid,_userpass)
    service.loginEquipment(_equipid)
    service.logout()
    
    expect(service.currentEquipmentValue).toEqual(null)

  })

  it('should delete storage tokens currentUser on logout', () => {
    let _userid = user.id
    let _userpass = user.password
    let _equipid = equip.id
    service.login(_userid,_userpass)
    service.loginEquipment(_equipid)
    service.logout()
    
    expect(service.currentUserValue).toEqual(null)

  })
});
