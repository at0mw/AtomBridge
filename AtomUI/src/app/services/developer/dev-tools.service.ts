import {computed, Injectable, signal} from '@angular/core';
import {environment} from "@environments/environment";
import {DevToolsPage} from "@types-custom/dev-tools-page.type";
import {LogsDevToolsComponent} from "@components/dev-hub/dev-tools/logs-dev-tools/logs-dev-tools.component";
import {SettingsDevToolsComponent} from "@components/dev-hub/dev-tools/settings-dev-tools/settings-dev-tools.component";
import {SleepDisplayComponent} from '@components/dev-hub/dev-tools/sleep-display/sleep-display.component';

@Injectable({
  providedIn: 'root'
})
export class DevToolsService {
  // I added this to encapsulate setting signal within the service
  // New to using signals so not certain is needed
  private _showDevTools = signal<boolean>(false);
  showDevTools = computed(() => this._showDevTools());

  constructor() {
    this.setDevMode(environment.developer.enabled)
  }

  setDevMode(mode: boolean) {
    this._showDevTools.set(mode);
  }

  private _devToolComponents: Record<DevToolsPage, any> = {
    'logs': LogsDevToolsComponent,
    'settings': SettingsDevToolsComponent,
    'sleep': SleepDisplayComponent
  };

  getDevToolComponent(name: DevToolsPage) {
    return this._devToolComponents[name];
  }
}
