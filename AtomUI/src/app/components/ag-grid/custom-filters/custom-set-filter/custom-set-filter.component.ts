import {Component, inject, OnDestroy} from '@angular/core';
import {IFilterAngularComp} from "ag-grid-angular";
import {IFilterParams} from "ag-grid-community";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LogCategory} from "@enums/logging/log-category.enum";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {Button} from "primeng/button";
import {Chip} from "primeng/chip";
import {LoggingService} from "@services/logging/logging.service";
import {Checkbox} from "primeng/checkbox";

@Component({
  selector: 'proActiV-custom-set-filter',
  imports: [
    FormsModule,
    FloatLabel,
    ReactiveFormsModule,
    Button,
    InputText,
    Chip,
    Checkbox
  ],
  templateUrl: './custom-set-filter.component.html',
  styleUrl: './custom-set-filter.component.scss'
})
export class CustomSetFilterComponent implements IFilterAngularComp, OnDestroy {
  private logger = inject(LoggingService);

  public categories: string[] = []; // All distinct categories
  public filteredCategories: string[] = [];
  private params: IFilterParams | undefined;
  private columnFieldId: string = '';
  public filterTerm: string = '';

  public selectedCategories: Set<string> = new Set();
  public customFilters: Set<string> = new Set();
  customFilter: string = "";

  agInit(params: IFilterParams): void {
    this.params = params;
    this.columnFieldId = this.params.column.getColId();
    this.extractCategories();
    this.filteredCategories = [...this.categories];

    this.params.api.addEventListener('rowDataUpdated', this.refreshCategories.bind(this));
    this.params.api.addEventListener('cellValueChanged', this.refreshCategories.bind(this));
  }

  ngOnDestroy() {
    this.params?.api.removeEventListener('rowDataUpdated', this.refreshCategories.bind(this));
    this.params?.api.removeEventListener('cellValueChanged', this.refreshCategories.bind(this));
  }

  extractCategories(): void {
    const rowModel = this.params?.rowModel;
    if (this.params?.api) {
      this.categories = [];
      rowModel?.forEachNode(rowNode => {
        const value = rowNode?.data[this.columnFieldId];
        if (value && !this.categories.includes(value)) {
          this.categories.push(value);
        }
      });
      this.categories.sort();
    }
  }

  refreshCategories(): void {
    this.extractCategories();
    this.filteredCategories = [...this.categories];
    this.params?.filterChangedCallback();
  }

  isFilterActive(): boolean {
    return this.selectedCategories.size > 0 || this.customFilters.size > 0;
  }

  doesFilterPass(params: any): boolean {
    const rowCategory = params.data[this.columnFieldId];
    // console.log("Does Filter Pass: ", rowCategory);
    return (this.selectedCategories.size === 0 && this.customFilters.size === 0) || this.selectedCategories.has(rowCategory) || this.customFilters.has(rowCategory);
  }

  getModel(): any {
    return Array.from(this.selectedCategories);
  }

  setModel(model: any): void {
    this.logger.info("Setting model", LogCategory.Table, model);
    if (!model) {
      this.filterTerm = "";
      this.onSearchChange();
      this.selectedCategories = new Set(model || []);
      this.customFilters = new Set([]);
    } else {
      this.logger.info("Setting model", LogCategory.Table, model);
      const filterTerm = model.filter;
      if (filterTerm) {
        this.handleAddFilter(filterTerm);
      }
    }
    this.params?.filterChangedCallback();
  }

  doesFilterExist(filter: string): boolean {
    return this.categories.includes(filter);
  }

  onFilterChanged(category: string) {
    console.log("PRESSSING")
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
    this.params?.filterChangedCallback();
  }

  onSearchChange() {
    const searchLower = this.filterTerm.toLowerCase();
    this.filteredCategories = this.categories.filter(category =>
      category.toLowerCase().includes(searchLower)
    );
  }

  private addFilterCategory(filter: string) {
    this.filteredCategories.push(filter);
    this.categories.push(filter);
  }

  onAddCustomFilter() {
    if (!this.customFilter) return;
    this.activateCustomFilter(this.customFilter);
    this.customFilter = "";
  }

  activateCustomFilter(filter: string) {
    this.logger.info("Adding custom filter", LogCategory.Table, filter);
    this.customFilters.add(filter);
    this.params?.filterChangedCallback();
  }

  private handleAddFilter(filterTerm: any) {
    this.logger.info("Adding filter", LogCategory.Table, filterTerm);
    if (this.filteredCategories.includes(filterTerm)) {
      this.selectedCategories.add(filterTerm);
    } else {
      this.activateCustomFilter(filterTerm);
    }
  }

  onRemoveCustomFilter(customFilter: string) {
    this.logger.info("Removing custom filter", LogCategory.Table, this.customFilter);
    this.customFilters.delete(customFilter);
    this.params?.filterChangedCallback();
    this.logger.info("Current Custom Filters", LogCategory.Table, this.customFilters);
  }
}
