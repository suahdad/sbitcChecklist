import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Issues } from '../../shared/models/issues';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private issuesUrl = `${environment.apiURL}/api/issues`
  constructor(private http: HttpClient) {  }

  getIssues(): Observable<Issues[]> {
    return this.http.get<Issues[]>(this.issuesUrl);
  }

  getissues(key: string): Observable<Issues[]> {
    return this.http.get<Issues[]>(`${this.issuesUrl}/${key}`);
  }

}
