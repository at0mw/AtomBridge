import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy, OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {AgGridAngular} from "ag-grid-angular";
import {
  CellClickedEvent,
  CellKeyDownEvent,
  ColDef,
  Column,
  FilterChangedEvent,
  FilterModel,
  FirstDataRenderedEvent,
  FullWidthCellKeyDownEvent,
  GridOptions,
  GridReadyEvent,
  RowClickedEvent,
  RowDataUpdatedEvent,
  Theme
} from "ag-grid-community";
import {TableMenuComponent} from "./column-menu/table-menu.component";
import {ColumnTableService} from "@services/ag-table-services/column-table.service";
import {AsyncPipe} from "@angular/common";
import {FilterTableService} from "@services/ag-table-services/filter-table.service";
import {ExportTableService} from "@services/ag-table-services/export-table.service";
import {LoggingService} from "@services/logging/logging.service";
import {Subject, takeUntil} from "rxjs";
import {AG_GRID_THEME} from "./ag-grid-theme.const";
import {ColumnState} from "@interfaces/ag-grid/column-state.interface";
import {CurrentTableConfig} from "@interfaces/ag-grid/current-table-config.interface";
import {LogCategory} from "@enums/logging/log-category.enum";
import {
  CustomLoadingOverlayComponent
} from "@components/ag-grid/custom-cells/custom-loading-overlay/custom-loading-overlay.component";

@Component({
  selector: 'proAV-data-list',
  imports: [
    AgGridAngular,
    TableMenuComponent,
    AsyncPipe
  ],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.scss',
  providers: [ColumnTableService, FilterTableService, ExportTableService]
})
export class DataListComponent implements OnInit, OnChanges, OnDestroy {
  private readonly logger: LoggingService = inject(LoggingService);

  private readonly columnService: ColumnTableService = inject(ColumnTableService);
  private readonly filterService: FilterTableService = inject(FilterTableService);
  private readonly exportService: ExportTableService = inject(ExportTableService);
  // TODO - Config Service?

  @ViewChild('theGrid') grid!: AgGridAngular;
  @ViewChild('gridContainer') gridContainer!: ElementRef;
  @Input() hide!: boolean;
  @Input() columnMenu: boolean = false;
  @Input() staticHeight: boolean = false;
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() colDefs: ColDef[] = [];
  @Input() noRowsTemplate = '<span class="no-rows">No data available to display</span>';
  @Input() activeColumnGroup: string = "";
  @Input() enableColumnMenu: boolean = true;
  @Input() enableFiltersMenu: boolean = false;
  @Input() activeColumnLimit: number = 14;

  @Output() gridReady: EventEmitter<GridReadyEvent> = new EventEmitter<GridReadyEvent>();
  @Output() firstDataRendered: EventEmitter<FirstDataRenderedEvent> = new EventEmitter<FirstDataRenderedEvent>();
  @Output() rowSelect: EventEmitter<RowClickedEvent> = new EventEmitter<RowClickedEvent>();
  @Output() cellSelect: EventEmitter<CellClickedEvent> = new EventEmitter<CellClickedEvent>();
  @Output() filterChanged: EventEmitter<FilterChangedEvent> = new EventEmitter<FilterChangedEvent>();
  @Output() columnVisibilityChanged: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateRowData: EventEmitter<RowDataUpdatedEvent> = new EventEmitter<RowDataUpdatedEvent>();
  @Output() cellKeyDown: EventEmitter<CellKeyDownEvent | FullWidthCellKeyDownEvent> = new EventEmitter<CellKeyDownEvent | FullWidthCellKeyDownEvent>();

  @Output() filtersActive: EventEmitter<any> = new EventEmitter<any>();
  @Output() removedColumnGroup: EventEmitter<any> = new EventEmitter<any>();

  columnStates$ = this.columnService.columnStates$;

  defaultColDef: ColDef = {
    lockPinned: true,
    cellStyle: {'display': 'flex', 'align-items': 'center', 'cursor': 'pointer', 'flex': '1'},
    minWidth: 100
  };
  rowHeight: number = 60;
  public loadingOverlayComponent: any = CustomLoadingOverlayComponent;
  public loadingOverlayComponentParams: any = {
    loadingMessage: "Loading...",
  };
  gridOptions: GridOptions = {
    loadingOverlayComponent: this.loadingOverlayComponent,
    loadingOverlayComponentParams: this.loadingOverlayComponentParams,
  };
  headerHeight = 50;
  totalHeight: string = "100%";
  tooltipShowDelay: number = 250;
  tooltipHideDelay: number = 2000;
  theme: Theme = AG_GRID_THEME;

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.filterService.filtersActive$.pipe(takeUntil(this.destroy$)).subscribe(filtersActive => this.filtersActive.emit(filtersActive));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.hide) {
      this.totalHeight = "0";
    } else if (this.staticHeight) {
      this.getGridHeight();
    } else {
      this.totalHeight = "100%";
    }


    if (changes['activeColumnGroup'] && !changes['activeColumnGroup'].firstChange) {
      const newGroup = changes['activeColumnGroup'].currentValue;
      if (typeof newGroup === 'string' && newGroup.trim() !== '') {
        this.applyColumnGroupFilter(newGroup);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  onGridReady(params: GridReadyEvent) {
    this.logger.verbose("[][] On Grid Ready", LogCategory.Core, params);
    this.columnService.initialiseGrid(params.api);
    this.filterService.initialiseGrid(params.api);
    this.exportService.initialiseGrid(params.api);

    if (this.activeColumnGroup) {
      this.applyColumnGroupFilter(this.activeColumnGroup);
    }
    this.onUpdateColumns();
    this.gridReady.emit(params);
  }

  private applyColumnGroupFilter(groupFilter: string) {
    this.columnService.updateColumnsVisibility(this.getColumnIdsByGroup(groupFilter, true), true);
    this.columnService.updateColumnsVisibility(this.getColumnIdsByGroup(groupFilter, false), false);
  }



  applyFilterModel(filterModel: FilterModel) {
    this.filterService.applyFilterModel(filterModel);
  }

  private getColumnIdsByGroup(groupFilter: string, isMatching: boolean): string[] {
    return this.colDefs
      .filter(colDef => (isMatching ? colDef.context?.filterGroups?.includes(groupFilter) : !colDef.context?.filterGroups?.includes(groupFilter)))
      .map(colDef => colDef.field || colDef.colId)
      .filter((colId): colId is string => !!colId);
  }

  applyAColumnFilter(columnId: string, filterValue: string, filterType: string = 'text', clearPreviousColumnFilters: boolean = true) {
    this.filterService.applyAColumnFilter(columnId, filterValue, filterType, clearPreviousColumnFilters);
  }

  getGridHeight() {
    const rowCount = this.data.length || 0;
    const totalHeight = (rowCount * this.rowHeight) + this.headerHeight + 1;
    this.totalHeight = `${totalHeight}px`;
  }

  onCellClicked($event: any) {
    this.cellSelect.emit($event);
  }

  onRowClicked($event: RowClickedEvent) {
    this.rowSelect.emit($event);
  }

  onClearFilters() {
    this.grid.api.setFilterModel(null);
    this.checkIfFiltersAreActive();
  }

  onFilterChanged($event: FilterChangedEvent) {
    this.checkIfFiltersAreActive();
    this.filterChanged.emit($event);
  }

  checkIfFiltersAreActive() {
    const filterModel = this.grid.api.getFilterModel();
    const isAnyFilterActive = Object.keys(filterModel).length > 0;
    this.filtersActive.emit(isAnyFilterActive);
  }


  onUpdateColumns() {
    this.columnService.updateColumns();
    this.columnVisibilityChanged.emit()
  }

  getColumns(): (Column[] | null | undefined) {
    return this.columnService.getColumns();
  }

  exportAsCsv(name: string) {
    // this.exportService.exportAsCsv(name);
  }

  onFirstDataRendered($event: FirstDataRenderedEvent) {
    this.firstDataRendered.emit($event);
  }

  requestCurrentTableConfig(): CurrentTableConfig {
    return {
      filters: this.grid.api.getFilterModel(),
      hiddenColumns: this.columnService.getCurrentHiddenColumnIds() ?? []
    };
  }

  changeColumnVisibility(columnId: string, visible: boolean) {
    this.columnService.updateColumnVisibility(columnId, visible);
  }

  onRowDataUpdated($event: RowDataUpdatedEvent) {
    this.updateRowData.emit($event);
  }


  //#region Template Event Handlers

  // Handlers For Side Menu
  onCellKeyDown($event: CellKeyDownEvent | FullWidthCellKeyDownEvent) {
    this.cellKeyDown.emit($event);
  }

  onUpdateColumnVisibility($event: ColumnState) {
    this.changeColumnVisibility($event.id, !$event.visible);
  }
  //#endregion
}
