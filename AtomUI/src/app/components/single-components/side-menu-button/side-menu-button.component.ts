import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {MenuOption} from '@interfaces/core/menu-option.interface';

@Component({
  selector: 'atom-side-menu-button',
  imports: [
    NgClass
  ],
  templateUrl: './side-menu-button.component.html',
  styleUrl: './side-menu-button.component.scss'
})
export class SideMenuButtonComponent {
  @Input() menuOption!: MenuOption;
  @Input() expanded: boolean = false;
  @Input() menuOptionSelected: boolean = false;
  @Input() routerDestination: string = '';
  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  onMenuOptionSelected() {
    this.action.emit();
  }
}
