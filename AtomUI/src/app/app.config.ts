import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {providePrimeNG} from 'primeng/config';
import {primeNgToTokens} from '@styling/prime-ng/prime-ng-to-tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
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
  ]
};
