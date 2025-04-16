import {animate, style, transition, trigger} from "@angular/animations";

export const sideMenuEnterLeaveAnimation = trigger('sideMenuEnterLeaveAnimation', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(100%)'}),
    animate('400ms ease-out', style({opacity: 1, transform: 'translateX(0)'})),
  ]),
  transition(':leave', [
    animate('400ms ease-in', style({opacity: 0, transform: 'translateX(100%)'})),
  ]),
]);
