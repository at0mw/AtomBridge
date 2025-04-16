import {animate, style, transition, trigger} from "@angular/animations";

export const delayEntryInstantLeaveAnimation = trigger('delayEntryInstantLeaveAnimation', [
  transition(':enter', [
    style({opacity: 0, display: 'none'}),
    animate('500ms 300ms ease-out', style({opacity: 1, display: 'block'})),
  ]),
  // transition(':leave', [
  //   animate('300ms ease-out', style({ width: 0 })),
  // ]),
]);
