import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiThemeService {
  //#region Variables
  private themeModeSubject: BehaviorSubject<string> = new BehaviorSubject<string>("light");
  themeMode$: Observable<string> = this.themeModeSubject.asObservable();

  private contrastModeSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  contrastMode$: Observable<string> = this.contrastModeSubject.asObservable();

  private themeColourSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  themeColour$: Observable<string> = this.themeColourSubject.asObservable();


  private navBarColourSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  navBarColour$: Observable<string> = this.navBarColourSubject.asObservable();

  //#endregion

  constructor() {
    const themeMode = localStorage.getItem('themeMode');
    if (themeMode) {
      this.themeModeSubject.next(themeMode);
      document.documentElement.setAttribute('data-theme-mode', themeMode);
    }

    const contrastMode = localStorage.getItem('contrastMode');
    if (contrastMode) {
      this.contrastModeSubject.next(contrastMode);
      document.documentElement.setAttribute('data-contrast', contrastMode);
    }

    const themeColour = localStorage.getItem('themeColour');
    if (themeColour) {
      this.themeColourSubject.next(themeColour);
      document.documentElement.setAttribute('data-theme-colour', themeColour);
    }

    const navBarColour = localStorage.getItem('navBarColour');
    if (navBarColour) {
      this.navBarColourSubject.next(navBarColour);
      document.documentElement.setAttribute('data-nav-bar-colour', navBarColour);
    }
  }

  setThemeMode(mode: string) {
    this.themeModeSubject.next(mode);
    document.documentElement.setAttribute('data-theme-mode', mode);
    localStorage.setItem('themeMode', mode);
  }

  themeModeToggle() {
    const currentMode = this.themeModeSubject.value;
    if (currentMode === 'light') {
      this.setThemeMode('dark');
    } else {
      this.setThemeMode('light');
    }
  }


  setContrastMode(contrast: string) {
    this.contrastModeSubject.next(contrast);
    document.documentElement.setAttribute('data-contrast', contrast);
    localStorage.setItem('contrastMode', contrast);
  }

  setThemeColour(themeColour: string) {
    this.themeColourSubject.next(themeColour);
    document.documentElement.setAttribute('data-theme-colour', themeColour);
    localStorage.setItem('themeColour', themeColour);
  }

  setNavBarColour(navBarColour: string) {
    this.navBarColourSubject.next(navBarColour);
    document.documentElement.setAttribute('data-nav-bar-colour', navBarColour);
    localStorage.setItem('navBarColour', navBarColour);
  }

  setPrimeNgTheme(theme: string) {

  }
}
