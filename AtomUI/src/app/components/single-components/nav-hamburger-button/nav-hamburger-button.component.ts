import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'atom-nav-hamburger-button',
  imports: [
    NgClass
  ],
  templateUrl: './nav-hamburger-button.component.html',
  styleUrl: './nav-hamburger-button.component.scss'
})
export class NavHamburgerButtonComponent {
  @Input() showMenu: boolean = false;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  onClick(event: MouseEvent) {
    this.action.emit(event);
    // this.showMenu = !this.showMenu;
  }
}
