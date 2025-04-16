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


  constructor() {
    this.fullScreen.set(document.fullscreenElement !== null);
    document.addEventListener('fullscreenchange', () => {
      let fullScreen = document.fullscreenElement !== null;
      this.fullScreen.set(fullScreen);
    });
  }

  toggleSideMenuState() {
    const currentState = this.sideMenuExpanded();
    this.sideMenuExpanded.set(!currentState);
  }

  toggleFullScreenState() {
    let currentState = this.fullScreen();
    // TODO - Make this feedback accurate
    if (!currentState) {
      this.goFullScreen();
    } else {
      this.revertFullScreen();
    }
  }

  private goFullScreen() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => {
        this.fullScreen.set(true);
      }).catch((error) => {
        this.logger.error("Error trying to go full screen", LogCategory.Core, error);
      });
    }
  }

  private revertFullScreen() {
    document.exitFullscreen().then(() => {
      this.fullScreen.set(false);
    }).catch((error) => {
      this.logger.error("Error trying to leave full screen", LogCategory.Core, error);
    });
  }

}
