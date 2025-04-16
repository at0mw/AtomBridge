import {Component, inject} from '@angular/core';
import {LoggingService} from "@services/logging/logging.service";
import {LoggerCacheService} from "@services/logging/logger-cache.service";
import {LoggerCacheTableConfigService} from "@services/logging/logger-cache-table-config.service";
import {ColDef} from "ag-grid-community";
import {DataListComponent} from "@components/ag-grid/data-list/data-list.component";


@Component({
  selector: 'atom-logs-dev-tools',
  imports: [
    DataListComponent
  ],
  templateUrl: './logs-dev-tools.component.html',
  styleUrl: './logs-dev-tools.component.scss'
})
export class LogsDevToolsComponent {
  private readonly logger = inject(LoggingService);
  private readonly loggerCache = inject(LoggerCacheService);
  private readonly logTableConfig = inject(LoggerCacheTableConfigService);
  colDefs: ColDef[] = this.logTableConfig.getColumns([]);
  logs = this.loggerCache.getLogs();


}
