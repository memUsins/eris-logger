import { Log, LogData, LogField, LogLevel, newDefaultLog } from './interfaces/log.interface';

import { ErisLogger } from './logger';

export class Entry {
  constructor(private readonly logger: ErisLogger, private data: LogData) {}

  log(log: Log) {
    log.data = this.data;
    this.logger.log(log);

    this.data.error = undefined;
    this.data.fields = undefined;
  }

  withFields(fields: LogField): Entry {
    this.data.fields = fields;
    return this;
  }

  withName(name: string): Entry {
    this.data.name = name;
    this.data.withName = true;
    return this;
  }

  withError(error: Error): Entry {
    this.data.error = error;
    return this;
  }

  debug(...messages: string[]) {
    this.log(newDefaultLog(LogLevel.Debug, ...messages));
  }

  info(...messages: string[]) {
    this.log(newDefaultLog(LogLevel.Info, ...messages));
  }

  alert(...messages: string[]) {
    this.log(newDefaultLog(LogLevel.Alert, ...messages));
  }

  warn(...messages: string[]) {
    this.log(newDefaultLog(LogLevel.Warn, ...messages));
  }

  error(...messages: string[]) {
    this.log(newDefaultLog(LogLevel.Error, ...messages));
  }

  fatal(...messages: string[]) {
    this.log(newDefaultLog(LogLevel.Fatal, ...messages));
  }
}
