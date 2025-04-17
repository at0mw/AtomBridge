import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {LoggingService} from '@services/logging/logging.service';
import { SideMenuService } from '@services/core/side-menu.service';
import {SideMenuButtonComponent} from '@components/single-components/side-menu-button/side-menu-button.component';
import {UiBaseService} from '@services/core/ui-base.service';
import {MenuOption} from '@interfaces/core/menu-option.interface';
import {SideMenuOptionInterface} from '@interfaces/core/side-menu-option.interface';
import {CurrentRouteService} from '@services/core/current-route.service';

@Component({
  selector: 'atom-side-menu',
  imports: [
    SideMenuButtonComponent
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  //#region Variables
  private uiBaseService = inject(UiBaseService);
  private sideMenuService = inject(SideMenuService);
  private readonly currentRouteService = inject(CurrentRouteService);
  private logger = inject(LoggingService);
  private router = inject(Router);
  showMenuExpanded = this.uiBaseService.sideMenuExpanded;
  menuOptionsGrouped = this.sideMenuService.menuOptionsGrouped;
  selectedOption = this.sideMenuService.selectedOption;
  currentRoute = this.currentRouteService.currentRoute;

  hoveringExpandMenu: boolean = false;
  activeMenuButtonId: number = 1;
  //#endregionx

  onMenuButtonAction(menuOption: SideMenuOptionInterface) {
    this.sideMenuService.setSelected(menuOption.id);
    this.router.navigate([`/${menuOption.url}`], {skipLocationChange: true});
  }

  goHome() {

  }
}
