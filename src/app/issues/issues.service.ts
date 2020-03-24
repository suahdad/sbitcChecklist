import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Issues } from '../issues/issues';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private issuesUrl = 'https://10.88.140.133:44350/api/issues'
  constructor(private http: HttpClient) {  }

  getIssues(): Observable<Issues[]> {
    return this.http.get<Issues[]>(this.issuesUrl);
  }

  getissues(key: string): Observable<Issues[]> {
    return this.http.get<Issues[]>(`${this.issuesUrl}/${key}`);
  }

}
