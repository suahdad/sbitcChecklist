import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import { EqComponent } from '../../shared/models/component';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor() { }

  getComponent() :Observable<EqComponent[]>{
    var comps : EqComponent[] = [
      {id: 'test', shortname:'', description: ''},
      {id: 'test2', shortname:'', description: ''},
      {id: 'test3', shortname:'', description: ''},
      {id: 'test4', shortname:'', description: ''},
      {id: 'test5', shortname:'', description: ''},
    ]

    return of(comps)
  }
}
