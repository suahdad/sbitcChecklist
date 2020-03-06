import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Weather } from './weather';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherUrl= 'https://localhost:5001/weatherforecast'
  constructor(private http:HttpClient) { }

  getWeather(): Observable<Weather[]>{
    return this.http.get<Weather[]>(this.weatherUrl)

  }
}
