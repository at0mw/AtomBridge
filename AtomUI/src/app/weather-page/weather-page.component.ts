import {Component, inject} from '@angular/core';
import {rxResource} from "@angular/core/rxjs-interop";
import {Button} from "primeng/button";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";

@Component({
    selector: 'app-weather-page',
    imports: [
        Button
    ],
    templateUrl: './weather-page.component.html',
    styleUrl: './weather-page.component.scss'
})
export class WeatherPageComponent {
    private http = inject(HttpClient);
    weatherResource = rxResource({
        request: () => this.http.get(`${environment.restApi.url}/weather-forecast`),
        loader: () => this.http.get(`/weather-forecast`),
    });

    onRequestResource() {

    }
}
