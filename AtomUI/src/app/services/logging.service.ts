import {Injectable} from '@angular/core';
import {LogLevel, logLevelColour} from '@enums/logging/log-level.enum';
import {environment} from "@environments/environment";
import {LogEntry} from "@interfaces/core/log-entry.interface";
import {LogCategory, logCategoryColour} from '@enums/logging/log-category.enum';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  // Set these from config
  private debugMode: boolean = true;
  private enabledCategories: Set<LogCategory> = new Set(environment.production ? [] : [LogCategory.All]); // Enable all categories by default
  private maxLogLevel: LogLevel = LogLevel.Debug;

  constructor() {
  }

  // Enable logging for a specific category
  enableCategory(category: LogCategory): void {
    this.enabledCategories.add(category);
  }

  // Disable logging for a specific category
  disableCategory(category: LogCategory): void {
    this.enabledCategories.delete(category);
  }

  // Main logging method

  private createLogEntry(message: string, level: LogLevel, category: LogCategory, params: any | null = null): LogEntry {
    const levelName = LogLevel[level];
    const colour = logLevelColour(level);
    const categoryColour = logCategoryColour(category);
    const categoryName = LogCategory[category];
    const callerInfo = this.debugMode ? `[${this.getCallerInfo()}]` : "";
    const currentTime = new Date();
    return {
      message,
      level,
      levelName,
      category,
      categoryName,
      colour,
      categoryColour,
      callerInfo,
      timestamp: currentTime,
      params,
    }
  }

  private log(message: string, level: LogLevel, category: LogCategory, params: any | null = null) {
    const logEntry = this.createLogEntry(message, level, category, params);
    if ((this.enabledCategories.has(LogCategory.All) || this.enabledCategories.has(category)) && this.maxLogLevel >= level) {
      switch (level) {
        case LogLevel.Error:
          console.error(`%c[${logEntry.categoryName}] ${logEntry.callerInfo} ---// proAV ${logEntry.levelName.toUpperCase()} :: ${message}`, `color: ${logEntry.colour};`, params ?? "");
          break;
        case LogLevel.Warn:
          console.warn(`%c[${logEntry.categoryName}] ${logEntry.callerInfo} ---// proAV ${logEntry.levelName.toUpperCase()} :: ${message}`, `color: ${logEntry.colour};`, params ?? "");
          break;
        default:
          console.log(`%c[${logEntry.categoryName}] ${logEntry.callerInfo} ---// proAV ${logEntry.levelName.toUpperCase()} :: ${message}`, `color: ${logEntry.categoryColour};`, params ?? "");
          break;
      }
    }
  }

  // Info level logging with category
  info(message: string, category: LogCategory = LogCategory.Core, params: any | null = null) {
    this.log(message, LogLevel.Info, category, params);
  }

  // Verbose level logging with category
  verbose(message: string, category: LogCategory = LogCategory.Core, params: any | null = null) {
    this.log(message, LogLevel.Verbose, category, params);
  }

  // Debug level logging with category
  debug(message: string, category: LogCategory = LogCategory.Core, params: any | null = null) {
    this.log(message, LogLevel.Debug, category, params);
  }

  // Warn level logging with category
  warn(message: string, category: LogCategory = LogCategory.Core, params: any | null = null) {
    this.log(message, LogLevel.Warn, category, params);
  }

  // Error level logging with category
  error(message: string, category: LogCategory = LogCategory.Core, params: any | null = null) {
    this.log(message, LogLevel.Error, category, params);
  }

  private getCallerInfo(): string {
    try {
      const stack = new Error().stack?.split("\n");
      // console.log("Stack: ", stack);
      if (stack && stack.length > 3) {
        const callerLine = stack[4].trim();
        return this.extractMethodName(callerLine);
      }
    } catch (e) {
    }
    return "UnknownOrigin";
  }

  private extractMethodName(stackLine: string): string {
    const match = stackLine.match(/at (\S+)/); // Extracts method name after "at "
    return match ? match[1] : "UnknownMethod";
  }
}
