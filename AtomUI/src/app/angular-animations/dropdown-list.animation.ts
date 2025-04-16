import {animate, style, transition, trigger} from "@angular/animations";

export const dropdownListAnimation = trigger('dropdownListAnimation', [
  transition(':enter', [
    style({opacity: 0, transform: 'scaleY(0.9)'}),
    animate('200ms ease-out', style({opacity: 1, transform: 'scaleY(1)'})),
  ]),
  // transition(':leave', [
  //   animate('300ms ease-out', style({ width: 0 })),
  // ]),
]);
