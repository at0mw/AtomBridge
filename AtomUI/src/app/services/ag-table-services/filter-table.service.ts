import {inject, Injectable} from '@angular/core';
import {FilterModel, GridApi} from "ag-grid-community";
import {LogCategory} from "@enums/logging/log-category.enum";
import { BehaviorSubject } from 'rxjs';
import {LoggingService} from "@services/logging/logging.service";

@Injectable()
export class FilterTableService {
  private logger: LoggingService = inject(LoggingService);
  filtersActiveSubject = new BehaviorSubject<boolean>(false);
  filtersActive$ = this.filtersActiveSubject.asObservable();

  gridApi: GridApi<any> | null = null;

  initialiseGrid(gridApi: GridApi<any>) {
    this.gridApi = gridApi;
  }
  clearColumnFilter(columnId: string) {
    const currentFilterModel = this.gridApi?.getFilterModel();
    if (currentFilterModel && currentFilterModel[columnId]) {
      // Remove the filter for the specified column
      delete currentFilterModel[columnId];

      // Apply the updated filter model
      this.gridApi?.setFilterModel(currentFilterModel);

      // Optional: Check if filters are still active
      this.checkIfFiltersAreActive();
    }
  }

  checkIfFiltersAreActive() {
    const filterModel = this.gridApi?.getFilterModel();
    if(!filterModel) return;

    const isAnyFilterActive = Object.keys(filterModel).length > 0;
    this.filtersActiveSubject.next(isAnyFilterActive);
    // this.filtersActive.emit(isAnyFilterActive);
  }

  applyAColumnFilter(columnId: string, filterValue: string, filterType: string, clearPreviousColumnFilters: boolean) {
    this.logger.verbose("Applying Filter", LogCategory.Table, {
      columnId,
      filterValue,
      filterType,
      clearPreviousColumnFilters
    });

    if(clearPreviousColumnFilters) {
      this.clearColumnFilter(columnId);
    }

    const currentFilterModel = this.gridApi?.getFilterModel();
    const updatedFilterModel = {
      ...currentFilterModel,
      [columnId]: {
        filterType: filterType,
        type: 'contains',
        filter: filterValue,
      },
    };
    this.gridApi?.setFilterModel(updatedFilterModel);
  }

  applyFilterModel(filterModel: FilterModel) {
    this.gridApi?.setFilterModel(filterModel);
  }
}
