import {animate, style, transition, trigger} from "@angular/animations";

export const overlayTransitionAnimation = trigger('overlayTransitionAnimation', [
  transition(':enter', [
    style({opacity: 0}),
    animate('100ms', style({opacity: 1})),
  ]),
  transition(':leave', [
    animate('100ms', style({opacity: 0})),
  ]),
]);
