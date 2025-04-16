import {Injectable} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {BaseConfigTableService} from '@services/ag-table-services/base-config-table.service';
import {
  CustomSetFilterComponent
} from "@components/ag-grid/custom-filters/custom-set-filter/custom-set-filter.component";
import {ParagraphCellComponent} from "@components/ag-grid/custom-cells/paragraph-cell/paragraph-cell.component";
import {LogCategoryCellComponent} from "@components/ag-grid/custom-cells/log-category-cell/log-category-cell.component";

@Injectable({
  providedIn: 'root'
})
export class LoggerCacheTableConfigService extends BaseConfigTableService {
  override getColumns(hiddenFields: string[]): ColDef[] {
    return [
      {
        field: "categoryName",
        headerName: "Category",
        filter: CustomSetFilterComponent,
        cellRenderer: LogCategoryCellComponent
      },
      {
        field: "levelName",
        headerName: "Level"
      },
      {
        field: "timestamp",
        headerName: "Time"
      },
      {
        field: "message",
        flex: 1
      },
      {
        field: "params",
        headerName: "Params",
        flex: 1,
        cellRenderer: ParagraphCellComponent,
        autoHeight: true,
      }
    ];
  }
}
