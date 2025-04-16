import {Component, inject, ViewChild, ViewContainerRef} from '@angular/core';
import {LoggingService} from "@services/logging/logging.service";
import {environment} from "@environments/environment";
import {Button} from "primeng/button";
import {fadeInAndOut} from "@angular-animations/fade-in-out.animation";
import {DevToolsService} from "@services/developer/dev-tools.service";
import {DevToolsPage} from "@types-custom/dev-tools-page.type";
import {LogCategory} from "@enums/logging/log-category.enum";
import {IconsService} from "@services/core/icons.service";

@Component({
  selector: 'atom-dev-hub',
  templateUrl: './dev-hub.component.html',
  imports: [
    Button
  ],
  styleUrl: './dev-hub.component.scss',
  animations: [fadeInAndOut]
})
export class DevHubComponent {
  private readonly logger = inject(LoggingService);
  private readonly devToolsService = inject(DevToolsService);
  protected readonly iconsService = inject(IconsService);

  @ViewChild('devToolsPage', {read: ViewContainerRef, static: true}) dynamicContent!: ViewContainerRef;

  isDrawerOpen = false;
  buildVersion: string = "";
  devToolsPages = ["settings", "settings"];
  currentDevToolsPage: DevToolsPage | null = null;
  logIcon: string = this.iconsService.get('BOOK');
  settingsIcon: string = this.iconsService.get('SETTINGS');

  constructor() {
    this.buildVersion = environment.buildVersion;
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  setDrawer(open: boolean) {
    this.clearDynamicComponent();
    this.isDrawerOpen = open;
  }

  toggleDevToolsPage(devToolsPage: DevToolsPage) {
    if(this.currentDevToolsPage === devToolsPage) {
      this.currentDevToolsPage = null;
      this.clearDynamicComponent()
      return;
    }
    this.clearDynamicComponent()
    this.loadDynamicComponent(devToolsPage);
    this.currentDevToolsPage = devToolsPage;
  }

  private loadDynamicComponent(devToolsPage: DevToolsPage) {
    const componentType = this.devToolsService.getDevToolComponent(devToolsPage);
    if (this.dynamicContent) {
      this.dynamicContent.createComponent(componentType);
    } else {
      this.logger.error("Dynamic Content is undefined", LogCategory.Core);
    }
  }

  private clearDynamicComponent() {
    this.currentDevToolsPage = null;
    this.dynamicContent?.clear();
  }
}
