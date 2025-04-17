import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {
  NavHamburgerButtonComponent
} from '@components/single-components/nav-hamburger-button/nav-hamburger-button.component';
import {UiBaseService} from '@services/core/ui-base.service';
import {UiThemeService} from '@services/core/ui-theme.service';
import {CurrentRouteService} from '@services/core/current-route.service';

@Component({
  selector: 'atom-header-bar',
  imports: [
    NavHamburgerButtonComponent
  ],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss'
})
export class HeaderBarComponent {
  private readonly uiBaseService = inject(UiBaseService);
  private readonly uiThemeService = inject(UiThemeService);
  private readonly currentRouteService = inject(CurrentRouteService);

  showMenu = this.uiBaseService.sideMenuExpanded;
  themeMode = this.uiThemeService.themeMode;
  currentRoute = this.currentRouteService.currentRoute;

  themeModeToggled: boolean = false;
  themeTogglePressedTimeout: any;

  onHamburgerAction() {
    this.uiBaseService.toggleSideMenuState();
  }

  onLightDarkModeToggle() {
    this.themeModeToggled = true;
    clearTimeout(this.themeTogglePressedTimeout);
    this.themeTogglePressedTimeout = setTimeout(() => {
      this.themeModeToggled = false;
    }, 1000);
    this.uiThemeService.themeModeToggle();
  }
}
