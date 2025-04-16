import {inject, Injectable, Input} from '@angular/core';
import {Column, GridApi} from "ag-grid-community";
import {LogCategory} from "@enums/logging/log-category.enum";
import {BehaviorSubject} from "rxjs";
import { ColumnState } from '@interfaces/ag-grid/column-state.interface';
import {LoggingService} from "@services/logging/logging.service";

@Injectable()
export class ColumnTableService {
  private readonly logger = inject(LoggingService);

  columnStatesSubject = new BehaviorSubject<ColumnState[]>([]);
  columnStates$ = this.columnStatesSubject.asObservable();

  gridApi: GridApi<any> | null = null;

  initialiseGrid(gridApi: GridApi<any>) {
    this.gridApi = gridApi;
  }

  updateColumnStates(columns: Column<any> []) {
    const columnStates = columns.map((column) => ({
      id: column.getColId(),
      name: column.getColDef()?.headerName || 'Unnamed Column',
      visible: column.isVisible(),
    }));

    this.columnStatesSubject.next(columnStates);
  }


  updateColumnVisibility(columnId: string, visible: boolean) {
    this.logger.verbose("Updating Column Visibility", LogCategory.Table, {columnId: columnId, visible: visible, gridApi: this.gridApi});
    this.gridApi?.setColumnsVisible([columnId], visible);
  }

  updateColumnsVisibility(columnIds: string[], visible: boolean) {
    this.gridApi?.setColumnsVisible(columnIds, visible);
  }

  updateColumns() {
    const columns = this.gridApi?.getColumns() ?? [];
    this.updateColumnStates(columns);
  }

  getColumns(): (Column[] | null | undefined) {
    return this.gridApi?.getColumns();
  }

  getCurrentHiddenColumnIds(): string[] {
    const columnModel = this.getColumns();
    if (columnModel) {
      return columnModel
        .filter(column => !column.isVisible())
        .map(column => column.getColId())
    }
    return []; }
}
