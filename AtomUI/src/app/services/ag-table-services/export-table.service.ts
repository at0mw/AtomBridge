import {inject, Injectable} from '@angular/core';
import {GridApi} from "ag-grid-community";
import {LogCategory} from "@enums/logging/log-category.enum";
import {LoggingService} from "@services/logging/logging.service";

@Injectable()
export class ExportTableService {
  private readonly logger = inject(LoggingService);
  // private readonly pdfExportService = inject(ReportConvertPdfService)
  gridApi: GridApi<any> | null = null;

  initialiseGrid(gridApi: GridApi<any>) {
    this.gridApi = gridApi;
  }

  exportAsCsv(name: string) {
    const columns = this.gridApi?.getColumns();
    if (!columns) {
      this.logger.error("No columns to export", LogCategory.Table);
      return;
    }

    const visibleColumns = columns.filter(column => column.isVisible());
    const visibleColumnKeys = visibleColumns?.map(column => column.getColId());

    this.gridApi?.exportDataAsCsv({
      columnKeys: visibleColumnKeys,
      fileName: name,
      onlySelected: false
    });
  }

  exportAsExcel(name: string) {
    const columns = this.gridApi?.getColumns();
    if (!columns) {
      this.logger.error("No columns to export", LogCategory.Table);
      return;
    }


    const visibleColumns = columns.filter(column => column.isVisible());
    const visibleColumnKeys = visibleColumns?.map(column => column.getColId());

    this.gridApi?.exportDataAsExcel({
      columnKeys: visibleColumnKeys,
      fileName: name,
      onlySelected: false
    });
  }

  // exportAsPdf(name: string, orientation: PDFFormats) {
  //   const columns = this.gridApi?.getColumns();
  //   if (!columns) {
  //     this.logger.error("No columns to export", LogCategory.Table);
  //     return;
  //   }
  //
  //
  //   const visibleColumns = columns.filter(column => column.isVisible());
  //   const visibleColumnKeys = visibleColumns?.map(column => column.getColId());
  //
  //   const rowData: any[] = [];
  //   this.gridApi?.forEachNode((node) => {
  //     if (node.data) {
  //       const row = visibleColumnKeys.map(key => node.data[key]); // Extract only visible columns
  //       rowData.push(row);
  //     }
  //   });
  //
  //   const headers = visibleColumns.map(col => col.getColDef().headerName ?? 'Unnamed Column');
  //   this.logger.verbose("Exporting as PDF: Data returned", LogCategory.Table, {headers, rowData});
  //   this.pdfExportService.exportTableToPdf(headers, rowData, name, orientation);
  // }
  //
  // returnReportPdf(): Promise<Uint8Array> {
  //   const columns = this.gridApi?.getColumns();
  //   if (!columns) {
  //     this.logger.error("No columns to export", LogCategory.Table);
  //     return Promise.resolve(new Uint8Array());
  //   }
  //
  //
  //   const visibleColumns = columns.filter(column => column.isVisible());
  //   const visibleColumnKeys = visibleColumns?.map(column => column.getColId());
  //
  //   const rowData: any[] = [];
  //   this.gridApi?.forEachNode((node) => {
  //     if (node.data) {
  //       const row = visibleColumnKeys.map(key => node.data[key]); // Extract only visible columns
  //       rowData.push(row);
  //     }
  //   });
  //
  //   const headers = visibleColumns.map(col => col.getColDef().headerName ?? 'Unnamed Column');
  //   this.logger.verbose("Exporting as PDF: Data returned", LogCategory.Table, {headers, rowData});
  //
  //   return this.pdfExportService.returnTableToPdf(headers, rowData);
  // }
}
