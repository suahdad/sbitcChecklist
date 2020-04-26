import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EqComponent } from '../shared/models/component';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  private componentsUrl = `${environment.apiURL}/api/components`
  constructor(private http: HttpClient) { }

  getComponent() :Observable<EqComponent[]>{
    return this.http.get<EqComponent[]>(this.componentsUrl)
  }
}
