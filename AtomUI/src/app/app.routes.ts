import { Routes } from '@angular/router';
import {WeatherPageComponent} from './weather-page/weather-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  {path: 'weather', component: WeatherPageComponent}
];
