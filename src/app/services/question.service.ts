import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Question } from '../shared/models/question';
import { EqComponent } from '../shared/models/component';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl = `${environment.apiURL}/api/questions`


  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }
}
