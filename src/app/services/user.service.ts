import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './authentication/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private authservice: AuthService) { }

  changePassword(user){
    return this.http.put(`${environment.apiURL}/api/users/${this.authservice.currentUserValue.id}`,user)
    .pipe(map(data => {
      return data;
    }))
  }

  getUsers() : Observable<User[]>{
    return this.http.get<any>(`${environment.apiURL}/api/users`)
    .pipe(map(data => {
      return data
    }))
  }
}
