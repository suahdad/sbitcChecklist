import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { Equipment } from 'src/app/shared/models/equipment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentEquipmentSubject: BehaviorSubject<Equipment>;
  public currentUser: Observable<User>;
  public currentEquipment: Observable<Equipment>;
  
  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentuser')));
    this.currentEquipmentSubject = new BehaviorSubject<Equipment>(JSON.parse(localStorage.getItem('currentequip')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentEquipment = this.currentEquipmentSubject.asObservable();
   }

   public get currentUserValue(): User {
     return this.currentUserSubject.value;
   }

   public get currentEquipmentValue(): Equipment {
    return this.currentEquipmentSubject.value;
  }

   login(username: string, password: string)
   {
    var data : User = {
      id: username,
      password: password,
      firstName: "test",
      middleName: "test",
      lastName: "test",
      isActive: true
      
    }

      localStorage.setItem('currentuser', JSON.stringify(data))
      this.currentUserSubject.next(data)
      return this.currentUser;
    }
   

   loginEquipment(equip: Equipment)
   {
      localStorage.setItem('currentequip', JSON.stringify(equip))
      this.currentEquipmentSubject.next(equip)
      return this.currentEquipment
   }

   logout()
   {
     localStorage.removeItem('currentuser');
     localStorage.removeItem('currentequip');
     this.currentUserSubject.next(null)
     this.currentEquipmentSubject.next(null)
   }
}
