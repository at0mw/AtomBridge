import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ColumnState} from "@interfaces/ag-grid/column-state.interface";

export enum SideMenuType {
  Columns,
  Filters,
  None
}

@Component({
  selector: 'proActiV-table-side-menu',
  imports: [],
  templateUrl: './table-menu.component.html',
  styleUrl: './table-menu.component.scss'
})
export class TableMenuComponent implements OnChanges {
  @Input() enableColumnMenu: boolean = true;
  @Input() enableFiltersMenu: boolean = false;
  @Input() columnStates: ColumnState[] = [];
  @Input() activeColumnLimit: number = 14;

  @Output() triggerClearFilters: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateColumnsRequest: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateColumnVisibility: EventEmitter<any> = new EventEmitter<any>();
  maxActiveColumns: boolean = false;
  menuActive: SideMenuType = SideMenuType.None;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columnStates']) {
      this.checkActiveColumnCount();
    }
  }

  private checkActiveColumnCount() {
    this.maxActiveColumns = this.columnStates.filter(columnState => columnState.visible).length >= this.activeColumnLimit;
  }

  openColumnMenu() {
    if (this.menuActive !== SideMenuType.Columns) {
      this.menuActive = SideMenuType.Columns;
    } else {
      this.menuActive = SideMenuType.None;
    }
  }

  onColumnVisibilityChange(column: ColumnState) {
    this.updateColumnVisibility.emit(column);
  }

  openFiltersMenu() {
    if (this.menuActive !== SideMenuType.Filters) {
      this.menuActive = SideMenuType.Filters;
    } else {
      this.menuActive = SideMenuType.None;
    }
  }

  clearFilters() {
    this.triggerClearFilters.emit();
  }

  protected readonly SideMenuType = SideMenuType;
}
