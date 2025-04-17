import {computed, inject, Injectable, signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentRouteService {
  private readonly _router: Router = inject(Router);
  currentRoute = signal<string>("");

  constructor() {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const url = this._router.url.startsWith('/')
          ? this._router.url.substring(1)
          : this._router.url;

        this.currentRoute.set(url);
      });
  }
}

