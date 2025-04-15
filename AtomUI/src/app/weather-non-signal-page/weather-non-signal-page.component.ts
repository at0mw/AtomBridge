import {Component, effect, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {HttpClient} from '@angular/common/http';
import {rxResource} from '@angular/core/rxjs-interop';
import {WeatherForecast} from '@interfaces/data-model/weather-forecast.interface';
import {environment} from '@environments/environment';

@Component({
  selector: 'app-weather-non-signal-page',
  imports: [
    Button
  ],
  templateUrl: './weather-non-signal-page.component.html',
  styleUrl: './weather-non-signal-page.component.scss'
})
export class WeatherNonSignalPageComponent {
  private http = inject(HttpClient);
  weatherForecasts: WeatherForecast[] = [];


  onRequestResource() {
    this.http.get<WeatherForecast[]>(`${environment.restApi.url}/weatherforecast`).subscribe(response => {
      if(!response) return;
      this.weatherForecasts = response;
    });

  }
}
