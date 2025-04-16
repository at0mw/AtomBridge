import {inject, Injectable, signal} from '@angular/core';
import {LogCategory} from "@enums/logging/log-category.enum";
import {LoggingService} from '@services/logging/logging.service';

@Injectable({
  providedIn: 'root'
})
export class UiBaseService {
  private logger = inject(LoggingService);

  sideMenuExpanded = signal(false);
  fullScreen = signal(false);

  toggleSideMenuState() {
    const currentState = this.sideMenuExpanded();
    this.sideMenuExpanded.set(!currentState);
  }
}
