import { Injectable } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor() { }

  public getCountByKey(property: string,
    keys: Array<string>,
    propcriteria: string,
    criteria: string,
    data:Array<any>):any {
      var countSet : Array<number> = new Array<number>()

      keys.forEach(s => {
        var count = data.filter(x => 
          x[property] == s && 
          x[propcriteria] == criteria).length
        countSet.push(count)
      })

      return countSet
    }

  
}
