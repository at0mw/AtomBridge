import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {
  NavHamburgerButtonComponent
} from '@components/single-components/nav-hamburger-button/nav-hamburger-button.component';
import {UiBaseService} from '@services/core/ui-base.service';

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
  showMenu = this.uiBaseService.sideMenuExpanded;

  onHamburgerAction() {
    this.uiBaseService.toggleSideMenuState();
  }

  onLightDarkModeToggle(state: boolean) {

  }
}
