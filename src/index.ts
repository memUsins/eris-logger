import { GlobalLoggerConfig, LoggerProps, LogLevel } from './types';

import { TerminalLogger, TerminalLoggerConfig } from './terminalLogger';
import { FileLogger, FileLoggerConfig } from './fileLogger';

export interface LoggerConfig {
  file?: FileLoggerConfig;
  terminal?: TerminalLoggerConfig;
  options?: GlobalLoggerConfig;
}

export class ErisLogger {
  public defaultParams: object;

  private levels = ['info', 'alert', 'debug', 'warning', 'error', 'fatal'];
  private dateformat: false | Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  private terminal: TerminalLogger | undefined;
  private file: FileLogger | undefined;

  constructor(config: LoggerConfig, defaultParams?: object) {
    this.defaultParams = defaultParams || {};

    if (config.options?.dateformat) this.dateformat = config?.options?.dateformat;
    if (config.terminal?.use) this.terminal = new TerminalLogger({ ...config?.terminal, dateFormat: this.dateformat });
    if (config.file?.use) this.file = new FileLogger(config?.file);

    if (config.options?.levels) this.levels = config.options.levels;
  }

  public setDefaultParams(params: object) {
    return (this.defaultParams = Object.assign(this.defaultParams, params));
  }

  public info(props: Pick<LoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void {
    const logLevel: LogLevel = 'info';
    if (!this.levels.includes(logLevel)) return;

    props.params = this.setDefaultParams(props.params);

    this.terminal?.print(logLevel, props);
    this.file?.print(logLevel, props);
  }

  public alert(props: Pick<LoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void {
    const logLevel: LogLevel = 'alert';
    if (!this.levels.includes(logLevel)) return;

    props.params = this.setDefaultParams(props.params);

    this.terminal?.print(logLevel, props);
    this.file?.print(logLevel, props);
  }

  public debug(props: Pick<LoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void {
    const logLevel: LogLevel = 'debug';
    if (!this.levels.includes(logLevel)) return;

    props.params = this.setDefaultParams(props.params);

    this.terminal?.print(logLevel, props);
    this.file?.print(logLevel, props);
  }

  public warning(props: Pick<LoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void {
    const logLevel: LogLevel = 'warning';
    if (!this.levels.includes(logLevel)) return;

    this.terminal?.print(logLevel, props);
    this.file?.print(logLevel, props);
  }

  public error(props: Pick<LoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void {
    const logLevel: LogLevel = 'error';
    if (!this.levels.includes(logLevel)) return;

    this.terminal?.print(logLevel, props);
    this.file?.print(logLevel, props);
  }

  public fatal(props: Pick<LoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void {
    const logLevel: LogLevel = 'fatal';
    if (!this.levels.includes(logLevel)) return;

    this.terminal?.print(logLevel, props);
    this.file?.print(logLevel, props);
  }
}
