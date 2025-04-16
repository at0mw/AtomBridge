import { Routes } from '@angular/router';
import {WeatherPageComponent} from '@components/pages/weather-page/weather-page.component';
import {
  WeatherNonSignalPageComponent
} from '@components/pages/weather-non-signal-page/weather-non-signal-page.component';

export const routes: Routes = [
  {path: 'weather', component: WeatherPageComponent},
  {path: 'weather-non-signal', component: WeatherNonSignalPageComponent}
];
