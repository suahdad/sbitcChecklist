import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../../shared/models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiUrl = `${environment.apiURL}/api/Questions`

  questions: Question[] = new Array()


  constructor(private http: HttpClient) {}

  getQuestions(eqType: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/${eqType}`);
  }
}
