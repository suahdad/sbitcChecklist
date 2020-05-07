import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Equipment } from 'src/app/shared/models/equipment';
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentEquipmentSubject: BehaviorSubject<Equipment>;
  public currentUser: Observable<User>;
  public currentEquipment: Observable<Equipment>;
  
  constructor(private http: HttpClient) {
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
     var user = new User()
     user.id = username
     user.isActive = true
     user.firstName = 'test'
     user.lastName = 'test'
     user.password = password

      localStorage.setItem('currentuser', JSON.stringify(user))
      this.currentUserSubject.next(user)
      return this.currentUser;
    }
   

   loginEquipment(id: string)
   {
     var equip = new Equipment()
     equip.id = id

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
