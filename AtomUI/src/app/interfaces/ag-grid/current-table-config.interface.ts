import {FilterModel} from "ag-grid-community";

export interface CurrentTableConfig {
  filters: FilterModel;
  hiddenColumns: string[];
}

export function mapToCurrentTableConfig(data: any): CurrentTableConfig {
  return {
    filters: data?.filters ?? {},
    hiddenColumns: data?.hiddenColumns ?? []
  };
}
