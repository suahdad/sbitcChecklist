import { Component, OnInit } from '@angular/core';
import { Weather } from '../model/weather';
import { WeatherService } from '../model/weather.service'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [WeatherService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  weather: Weather[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
  }

  getWeather(): void {
    this.weatherService.getWeather()
    .subscribe(weather => (this.weather = weather))

    window.alert("test")

  }

}
