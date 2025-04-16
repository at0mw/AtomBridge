import {Injectable, signal} from '@angular/core';
import {LogLevel} from "@enums/logging/log-level.enum";
import {LogCategory} from "@enums/logging/log-category.enum";
import {LogEntry} from "@interfaces/logging/log-entry.interface";

@Injectable({
  providedIn: 'root'
})
export class LoggerCacheService {
  private logs = signal<LogEntry[]>([]);
  private readonly MAX_LOGS = 500; // Set a limit on stored logs

  /** Add a log entry with log capping */
  addLog(entry: LogEntry) {
    const currentLogs = this.logs();
    if (currentLogs.length >= this.MAX_LOGS) {
      currentLogs.shift(); // Remove oldest log (FIFO)
    }
    this.logs.set([...currentLogs, entry]);
  }

  /** Get logs */
  getLogs() {
    return this.logs;
  }

  /** Filter logs by category */
  filterByCategory(category: LogCategory) {
    return this.logs().filter(log => log.category === category);
  }

  /** Filter logs by level */
  filterByLevel(level: LogLevel) {
    return this.logs().filter(log => log.level === level);
  }

  /** Clear all logs */
  clearLogs() {
    this.logs.set([]);
  }
}
