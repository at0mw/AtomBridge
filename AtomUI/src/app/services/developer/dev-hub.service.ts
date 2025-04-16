import {computed, Injectable, signal} from '@angular/core';
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DevHubService {
  // I added this to encapsulate setting signal within the service
  // New to using signals so not certain is needed
  private _showDevTools = signal<boolean>(false);
  showDevTools = computed(() => this._showDevTools());

  constructor() {
    this.setDevMode(environment.developer.enabled);
  }

  setDevMode(mode: boolean) {
    this._showDevTools.set(mode);
  }

  toggleDevMode() {
    this.setDevMode(!this.showDevTools());
  }
}
