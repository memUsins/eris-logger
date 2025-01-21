import { Log, LogField, LogLevel, newDefaultLog } from './interfaces';
import { BaseAdapter, ConsoleAdapter } from './adapters';
import { Entry } from './entry';

export class ErisLogger {
  private adapters: BaseAdapter[] = [];

  constructor(adapters?: BaseAdapter[]) {
    if (!Array.isArray(adapters)) adapters = [];
    if (!adapters.length) adapters.push(new ConsoleAdapter());

    this.adapters = adapters;
  }

  log(log: Log) {
    this.adapters.forEach((adapter) => adapter.Log(log));
  }

  debug(...message: string[]) {
    this.log(newDefaultLog(LogLevel.Debug, ...message));
  }

  info(...message: string[]) {
    this.log(newDefaultLog(LogLevel.Info, ...message));
  }

  alert(...message: string[]) {
    this.log(newDefaultLog(LogLevel.Alert, ...message));
  }

  warn(...message: string[]) {
    this.log(newDefaultLog(LogLevel.Warn, ...message));
  }

  error(...message: string[]) {
    this.log(newDefaultLog(LogLevel.Error, ...message));
  }

  fatal(...message: string[]) {
    this.log(newDefaultLog(LogLevel.Fatal, ...message));
  }

  withFields(fields: LogField): Entry {
    return new Entry(this, { fields: fields });
  }

  withName(name: string): Entry {
    return new Entry(this, { name, withName: true });
  }

  withError(error: Error): Entry {
    return new Entry(this, { error });
  }
}
