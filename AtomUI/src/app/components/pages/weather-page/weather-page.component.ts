import {Component, effect, inject} from '@angular/core';
import {rxResource} from "@angular/core/rxjs-interop";
import {Button} from "primeng/button";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {WeatherForecast} from "@interfaces/data-model/weather-forecast.interface";

@Component({
    selector: 'atom-weather-page',
    imports: [
        Button
    ],
    templateUrl: './weather-page.component.html',
    styleUrl: './weather-page.component.scss'
})
export class WeatherPageComponent {
    private http = inject(HttpClient);
    weatherResource = rxResource({
        loader: () =>  this.http.get<WeatherForecast[]>(`${environment.restApi.url}/weatherforecast`),
    });
    eff = effect(() => {
        console.log("Status: ", this.weatherResource.status());
        console.log("Value: ", this.weatherResource.value());
    })

    onRequestResource() {
        this.weatherResource.reload();
    }
}
