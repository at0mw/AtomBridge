import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LogCategory} from "@enums/logging/log-category.enum";
import {LogLevel} from "@enums/logging/log-level.enum";
import {LogConfig} from '@interfaces/logging/log-config.interface';

@Injectable({
  providedIn: 'root'
})
export class LoggingConfigService {
  private logConfigSubject = new BehaviorSubject<LogConfig | null>(null);
  logConfig$: Observable<LogConfig | null> = this.logConfigSubject.asObservable();

  setConfig(config: any): void {
    this.logConfigSubject.next(this.parseConfig(config.logging));
  }

  private parseConfig(rawConfig: any): LogConfig {
    return {
      debugMode: rawConfig.debugMode ?? false,
      enabledCategories: this.parseCategories(rawConfig.enabledCategories),
      logLevel: this.parseLogLevel(rawConfig.logLevel),
    };
  }

  private parseCategories(categories: string[] = []): LogCategory[] {
    // console.log("Mapping Categories", categories)
    return categories
      .map((cat) => LogCategory[cat as keyof typeof LogCategory])
      .filter((category): category is LogCategory => category !== undefined);
  }

  private parseLogLevel(level: string): LogLevel {
    return LogLevel[level as keyof typeof LogLevel] ?? LogLevel.Info;
  }
}
