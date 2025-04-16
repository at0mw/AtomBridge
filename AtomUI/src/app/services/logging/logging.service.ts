import {effect, inject, Injectable, signal} from '@angular/core';
import {LogLevel, logLevelColour} from '@enums/logging/log-level.enum';
import {LogCategory, logCategoryColour} from '@enums/logging/log-category.enum';
import {DevHubService} from '@services/developer/dev-hub.service';
import {LoggingConfigService} from '@services/logging/logging-config.service';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private loggingConfigService = inject(LoggingConfigService);

  // Set these from config
  private debugMode: boolean = true;
  private enabledCategoriesSet: Set<LogCategory> = new Set([LogCategory.All]);
  private maxLogLevel: LogLevel = LogLevel.Debug;
  enabledCategories = signal([...this.enabledCategoriesSet]);
  private readonly devHubService = inject(DevHubService);
  devMode = this.devHubService.showDevTools;


  constructor() {
    this.retrieveStoredSelectedCategories();
    this.loggingConfigService.logConfig$.subscribe((config) => {
      if (!config || this.devMode()) return;

      this.debugMode = config.debugMode;
      this.enabledCategoriesSet = new Set(config.enabledCategories);
      this.enabledCategories.set([...this.enabledCategoriesSet]);
      this.maxLogLevel = config.logLevel;
    });

    effect(() => {
      this.debug("Storing Enabled Categories", LogCategory.Core);
      localStorage.setItem('enabledCategories', JSON.stringify(this.enabledCategories()));
    });
  }

  // Enable logging for a specific category
  enableCategory(category: LogCategory): void {
    this.enabledCategoriesSet.add(category);
    this.enabledCategories.set([...this.enabledCategoriesSet]);
  }

  // Disable logging for a specific category
  disableCategory(category: LogCategory): void {
    this.enabledCategoriesSet.delete(category);
    this.enabledCategories.set([...this.enabledCategoriesSet]);
  }

  // Main logging method
  private log(message: string, level: LogLevel, category: LogCategory, params: any | null = null) {
    // console.log("Log Level: ", level, " Max Level: ", this.maxLogLevel);
    // console.log("Level Is Viable: ", this.maxLogLevel >= level);
    if ((this.enabledCategoriesSet.has(LogCategory.All) || this.enabledCategoriesSet.has(category)) && this.maxLogLevel >= level) {
      const levelName = LogLevel[level];
      const colour = logLevelColour(level);
      const categoryColour = logCategoryColour(category);
      const categoryName = LogCategory[category];
      const callerInfo = this.debugMode ? `[${this.getCallerInfo()}]` : "";

      switch (level) {
        case LogLevel.Error:
          console.error(`%c[${categoryName}] ${callerInfo} ---//ProActiV ${levelName.toUpperCase()} :: ${message}`, `color: ${colour};`, params ?? "");
          break;
        case LogLevel.Warn:
          console.warn(`%c[${categoryName}] ${callerInfo} ---//ProActiV ${levelName.toUpperCase()} :: ${message}`, `color: ${colour};`, params ?? "");
          break;
        default:
          console.log(`%c[${categoryName}] ${callerInfo} ---//ProActiV ${levelName.toUpperCase()} :: ${message}`, `color: ${categoryColour};`, params ?? "");
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

  private retrieveStoredSelectedCategories() {
    const enabledCategories = localStorage.getItem('enabledCategories');
    if (enabledCategories) {
      this.enabledCategoriesSet = new Set(JSON.parse(enabledCategories));
      this.enabledCategories.set([...this.enabledCategoriesSet]);
    }
  }

  clearCategories() {
    this.enabledCategoriesSet.clear();
    this.enabledCategories.set([...this.enabledCategoriesSet]);
  }
}
