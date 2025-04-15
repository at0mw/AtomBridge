export enum LogLevel {
  None = 0,
  Warn = 1,
  Error = 2,
  Info = 3, // Important Application lifecycle events, useful in production
  Verbose = 4, // Detailed insight, response time for queries, result of navigation requests etc...
  Debug = 5, // Troubleshooting, logging state changes, deep analysis
}

export function logLevelColour(level: LogLevel): string {
  const colors: Record<LogLevel, string> = {
    [LogLevel.None]: 'black',
    [LogLevel.Info]: '#4fb9af',
    [LogLevel.Verbose]: '#C418DC',
    [LogLevel.Debug]: '#b9ff66',
    [LogLevel.Warn]: 'amber',
    [LogLevel.Error]: 'red',
  };

  return colors[level];
}
