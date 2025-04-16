import {LogLevel} from "@enums/logging/log-level.enum";
import {LogCategory} from "@enums/logging/log-category.enum";

export interface LogEntry {
  message: string;
  level: LogLevel;
  levelName: string;
  category: LogCategory;
  categoryName: string;
  colour: string;
  categoryColour: string;
  timestamp: Date;
  callerInfo: string;
  params?: any;
}
