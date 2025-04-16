import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  private readonly icons = {
    VOLUME_UP: 'fa-volume-up',
    VOLUME_DOWN: 'fa-volume-down',
    VOLUME_MUTE: 'fa-volume-mute',
    PLUS: 'fa-plus',
    MINUS: 'fa-minus',
    HOME: 'fa-home',
    LOADING: 'fa-spinner-third fa-spin',
    SUN: 'fa-sun-bright',
    MOON: 'fa-moon',
    CLOSE: 'fa-xmark',
    BOOK: 'fa-book',
    SETTINGS: 'fa-cog',
    EXPAND: 'fa-arrows-maximize',
    CONTRACT: 'fa-arrows-minimize',
    ANGLE_UP: 'fa-angle-up',
    ANGLE_DOWN: 'fa-angle-down',
  };


  get(iconName: keyof typeof this.icons, type: string = 'fa-regular'): string {
    console.log("GETTING ICONS")
    return `${type} ${this.icons[iconName]}`;
  }
}
