import { TestBed } from '@angular/core/testing';
import { AuthService } from './fake-authentication.service';
import { User } from 'src/app/shared/models/user';
import { Equipment } from 'src/app/shared/models/equipment';

describe('FakeAuthService', () => {
  let service: AuthService

  let user: User = new User()
  user.id = "test"
  user.password = "test"

  let equip:Equipment = new Equipment()
  equip.id="test"

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    
    service = TestBed.get(AuthService);
  });
//fake-auth unused

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  // it('should return user when user logs in',() => {
  //   service.login(user).subscribe(subUser =>
  //     expect(subUser).toBe(user))
  // });

  // it('should return equip when user logs in equipment', () => {
  //   service.loginEquipment(equip).subscribe(subEquip =>
  //     expect(subEquip).toBe(equip))
  // })

  // it('should delete storage tokens currentEquipment on logout', () => {

  //   service.login(user)
  //   service.loginEquipment(equip)
  //   service.logout()
    
  //   expect(service.currentEquipmentValue).toEqual(null)

  // })

  // it('should delete storage tokens currentUser on logout', () => {

  //   service.login(user)
  //   service.loginEquipment(equip)
  //   service.logout()
    
  //   expect(service.currentUserValue).toEqual(null)

  // })
  
});
