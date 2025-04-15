import {LogCategory} from "@enums/logging/log-category.enum";
import {LogLevel} from "@enums/logging/log-level.enum";

export interface LogConfig {
  debugMode: boolean;
  enabledCategories: LogCategory[];
  logLevel: LogLevel;
}
