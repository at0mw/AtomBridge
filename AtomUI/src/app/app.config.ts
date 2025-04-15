import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withDisabledInitialNavigation, withHashLocation} from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {providePrimeNG} from 'primeng/config';
import {primeNgToTokens} from '@styling/prime-ng/prime-ng-to-tokens';
import {APP_BASE_HREF} from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withDisabledInitialNavigation(), withHashLocation()),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: primeNgToTokens,
        options: {
          ripple: true,
          darkModeSelector: false,
          prefix: 'proav',
        }
      }
    }),
    {provide: APP_BASE_HREF, useValue: './'}
  ]
};
