import {computed, Injectable, signal} from '@angular/core';
import {SideMenuOptionInterface} from '@interfaces/core/side-menu-option.interface';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  menuOptions = signal<SideMenuOptionInterface[]>(this.getMenuOptions());
  menuOptionsGrouped = computed(() => this.groupMenuOptions());
  selectedOption = signal<null | number>(null);


  setSelected(id: number) {
    this.selectedOption.set(id);
  }

  groupMenuOptions(): {group: string, menuOptions: SideMenuOptionInterface[]}[] {
    const grouped: { [key: string]: SideMenuOptionInterface[] } = {};

    this.menuOptions().forEach(option => {
      const group = option.group || 'main';
      if (!grouped[group]) {
        grouped[group] = [];
      }
      grouped[group].push(option);
    });

    return Object.entries(grouped).map(([group, menuOptions]) => ({
      group,
      menuOptions
    }));
  }

  getMenuOptions(): SideMenuOptionInterface[]  {
    return [
      {
        id: 1,
        label: "home",
        icon: "fa-sharp fa-light fa-house",
        url: ''
      },
      {
        id: 2,
        label: "weather",
        icon: "fa-sharp fa-light fa-sun",
        url: ''
      },
      {
        id: 3,
        label: "Connection",
        icon: "fa-sharp fa-light fa-wifi",
        group: "settings",
        url: 'connection'
      }
    ]
  }
}

