import { Injectable } from '@angular/core';
import {ColDef} from "ag-grid-community";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseConfigTableService {
  protected formatDate(date: string, format: string, locale: string): string {
    if (date === '0001-01-01T00:00:00') {
      return 'N/A';
    }
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(date));
  }

  /**
   * Extract column headers (field and headerName) from column definitions.
   */
  getColumnHeaders(columns: ColDef[]): { field: string | undefined; headerName: string | undefined }[] {
    return columns.map(({ field, headerName }) => ({ field, headerName }));
  }

  /**
   * Abstract method for fetching column definitions in derived services.
   * @param hiddenFields - An optional array of field names to hide.
   * @returns {ColDef[]} The list of visible columns.
   */
  abstract getColumns(hiddenFields: string[]): ColDef[];

  /** Function to safely stringify objects with circular references */
  safeStringify(obj: any, space = 2) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return "[Circular]"; // Replace circular references
        seen.add(value);
      }
      return value;
    }, space);
  }
}
