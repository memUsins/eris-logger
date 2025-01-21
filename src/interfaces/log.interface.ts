export enum LogLevel {
  Debug = 'Debug',
  Info = 'Info',
  Alert = 'Alert',
  Warn = 'Warn',
  Error = 'Error',
  Fatal = 'Fatal',
  Unselected = 'Unselected',
}

export const logToInt = (level: LogLevel): number => {
  switch (level) {
    case LogLevel.Debug:
      return 0;
    case LogLevel.Info:
      return 1;
    case LogLevel.Alert:
      return 2;
    case LogLevel.Warn:
      return 3;
    case LogLevel.Error:
      return 4;
    case LogLevel.Fatal:
      return 5;
    default:
      return -1;
  }
};

export type LogField = { [key: string]: any };

export interface LogData {
  fields?: LogField;
  error?: Error;
  name?: string;
  withName?: boolean;
}

export class Log {
  level: LogLevel;
  message: string;
  data?: LogData;

  constructor(level: LogLevel, message: string, data?: LogData) {
    this.level = level;
    this.message = message;
    this.data = data;
  }

  isEnabled(level: LogLevel): boolean {
    return logToInt(level) <= logToInt(this.level);
  }
}

export const newDefaultLog = (level: LogLevel, ...message: string[]): Log => {
  return new Log(level, message.join(' '));
};
