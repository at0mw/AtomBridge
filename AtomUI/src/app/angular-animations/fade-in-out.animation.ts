import {animate, state, style, transition, trigger} from "@angular/animations";

export const fadeInAndOut = trigger('fadeInAndOut', [
  state('void', style({opacity: 0})),
  transition(':enter, :leave', animate('0.3s ease')),
]);
