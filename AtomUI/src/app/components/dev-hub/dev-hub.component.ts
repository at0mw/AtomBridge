import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {environment} from "@environments/environment";
import {
  LoggingFilterDevToolComponent
} from "@components/dev-hub/dev-tools/logging-filter-dev-tool/logging-filter-dev-tool.component";
import {InputOtp} from "primeng/inputotp";
import {FormsModule} from "@angular/forms";
import {LogCategory} from "@enums/logging/log-category.enum";
import {fadeInAndOut} from '@angular-animations/fade-in-out.animation';
import {LoggingService} from '@services/logging/logging.service';
import {DevHubService} from '@services/developer/dev-hub.service';

@Component({
  selector: 'atom-dev-hub',
  templateUrl: './dev-hub.component.html',
  imports: [
    LoggingFilterDevToolComponent,
    InputOtp,
    FormsModule
  ],
  styleUrl: './dev-hub.component.scss',
  animations: [fadeInAndOut]
})
export class DevHubComponent {
  private readonly logger = inject(LoggingService);
  private readonly devHubService = inject(DevHubService);
  @ViewChild('otpInput') otpInput!: InputOtp;

  showDevTools = this.devHubService.showDevTools;
  isDrawerOpen = false;
  buildVersion: string = "";
  unlockPin: string = "";

  constructor() {
    this.buildVersion = environment.buildVersion;
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  setDrawer(open: boolean) {
    this.isDrawerOpen = false;
  }

  clearPin() {
    this.unlockPin = "";
    const element = this.otpInput?.el.nativeElement.querySelector('.p-inputotp-input');
    if(element) {
     element.focus();
    }
    console.log("Pin cleared", element);
  }

  onPinInput() {
    if(this.unlockPin === 'void') {
      this.logger.debug("Pin entered", LogCategory.Core, this.unlockPin);
      this.unlockPin = "";
      this.devHubService.toggleDevMode();
    }
  }
}
