import { Routes } from '@angular/router';
import {WeatherPageComponent} from '@components/pages/weather-page/weather-page.component';
import {ConnectionPageComponent} from '@components/pages/connection-page/connection-page.component';
import {HomePageComponent} from '@components/pages/home-page/home-page.component';

export const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'weather', component: WeatherPageComponent},
  {path: 'connection', component: ConnectionPageComponent}
];
