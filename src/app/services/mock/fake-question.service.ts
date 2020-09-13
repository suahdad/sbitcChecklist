import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Question } from '../../shared/models/question';
import { relative } from 'path';
import { sample } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiUrl = `${environment.apiURL}/api/Questions`

   test : Question[] = new Array(1,2,3).map(x => {
        var samp : Question  = {
          componentID: x.toString(),
          equipment_TypeID: '',
          question_Text: x.toString(),
          rank: x
        }
        return samp
      })

  constructor(private http: HttpClient) {}

  getQuestions(eqType: string): Observable<Question[]> {
    return of(this.test);
  }
}
