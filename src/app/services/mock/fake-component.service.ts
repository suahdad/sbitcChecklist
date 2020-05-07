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
      {id: 'test'},
      {id: 'test2'},
      {id: 'test3'},
      {id: 'test4'},
      {id: 'test5'},
    ]

    return of(comps)
  }
}
