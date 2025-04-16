import { Routes } from '@angular/router';
import {WeatherPageComponent} from '@components/pages/weather-page/weather-page.component';
import {
  WeatherNonSignalPageComponent
} from '@components/pages/weather-non-signal-page/weather-non-signal-page.component';
import {ConnectionPageComponent} from '@components/pages/connection-page/connection-page.component';
import {HomePageComponent} from '@components/pages/home-page/home-page.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'weather', component: WeatherPageComponent},
  {path: 'weather-non-signal', component: WeatherNonSignalPageComponent},
  {path: 'connection', component: ConnectionPageComponent}
];
