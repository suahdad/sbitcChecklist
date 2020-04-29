import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RTGForm } from '../shared/models/rtgform';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RtgformService {

  private rtgapi = `${environment.apiURL}/api/RTGForms`
  private currentKey
  http: HttpClient
  constructor(http: HttpClient) { 
    this.http = http
  }

  saveRTGForm(data: RTGForm) : number{
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    var x = this.http.post<RTGForm>(this.rtgapi,data,{headers: headers})
    .pipe(map(forms =>
      {return forms.id}
    ))
      x.subscribe(y => this.currentKey=y)
      return this.currentKey
    }
}
