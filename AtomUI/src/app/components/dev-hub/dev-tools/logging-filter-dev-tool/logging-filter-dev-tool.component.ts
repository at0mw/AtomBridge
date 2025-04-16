import {Component, computed, inject, signal} from '@angular/core';
import {LoggingService} from "@services/logging/logging.service";
import {LogCategory, LogCategoryNames} from "@enums/logging/log-category.enum";
import {Checkbox} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {Button} from "primeng/button";

@Component({
  selector: 'atom-logging-filter-dev-tool',
  imports: [
    Checkbox,
    FormsModule,
    Button
  ],
  templateUrl: './logging-filter-dev-tool.component.html',
  styleUrl: './logging-filter-dev-tool.component.scss'
})
export class LoggingFilterDevToolComponent {
  private readonly logger = inject(LoggingService);
  logCategories = computed(() =>
    LogCategoryNames.map((key) => ({
      name: key,
      value: LogCategory[key as keyof typeof LogCategory],
      selected: this.logger.enabledCategories().includes(
        LogCategory[key as keyof typeof LogCategory]
      ),
    }))
  );

  toggleSelection(category: any) {
    const current = this.logger.enabledCategories();
    console.log("Current Categories", {current, category});
    if(current.includes(category.value)) {
      this.disableCategory(category.value);
    } else {
      this.enableCategory(category.value);
    }
  }

  private enableCategory(logCategory: LogCategory) {
    this.logger.enableCategory(logCategory);
  }

  private disableCategory(logCategory: LogCategory) {
    this.logger.disableCategory(logCategory);
  }

  selectAll() {
    this.logCategories().forEach(category => this.enableCategory(category.value));
  }

  deselectAll() {
    this.clearCategories();
  }

  private clearCategories() {
    this.logger.clearCategories();
  }
}
