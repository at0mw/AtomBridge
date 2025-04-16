import {inject, Injectable, signal} from '@angular/core';
import {isThemeMode, THEME_MODE_TYPE, ThemeMode} from '@types-custom/theme-mode.type';
import {LoggingService} from '@services/logging/logging.service';
import {LogCategory} from '@enums/logging/log-category.enum';

@Injectable({
  providedIn: 'root'
})
export class UiThemeService {
  //#region Variables
  private readonly logger = inject(LoggingService);

  themeMode = signal<ThemeMode>('light');
  //#endregion

  constructor() {
    this.retrieveStoredMode();
  }

  retrieveStoredMode() {
    const themeMode = localStorage.getItem('themeMode');
    if (isThemeMode(themeMode)) {
      this.themeMode.set(themeMode);
      document.documentElement.setAttribute('data-theme-mode', themeMode);
    } else {
      this.setThemeMode(THEME_MODE_TYPE.LIGHT);
    }
  }

  setThemeMode(mode: string) {
    if(!isThemeMode(mode)) return;
    this.themeMode.set(mode);
    document.documentElement.setAttribute('data-theme-mode', mode);
    localStorage.setItem('themeMode', mode);
  }

  themeModeToggle() {
    const currentMode = this.themeMode();
    let nextMode = this.themeMode();
    currentMode === THEME_MODE_TYPE.LIGHT ? nextMode = THEME_MODE_TYPE.DARK : nextMode = THEME_MODE_TYPE.LIGHT;
    this.logger.debug('Theme Mode Toggle', LogCategory.Core, {currentMode, nextMode});
    this.setThemeMode(nextMode);
  }
}
