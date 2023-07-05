import pino, { Logger } from 'pino';
import * as clc from 'chalk';

import { TLogLevel, TColor, ILoggerProps, ILoggerConfig, TDefaultObject } from './types';

export class ErisLogger {
  public config: ILoggerConfig = {
    terminal: {
      use: true,
      colors: {
        info: 'greenBright',
        alert: 'blueBright',
        debug: 'blackBright',
        warning: 'yellow',
        error: 'redBright',
        critical: 'bgRed',
      },
      levels: ['info', 'alert', 'debug', 'warning', 'error', 'critical'],
    },
    file: {
      use: true,
      dir: '/logs/log.log',
      colorize: true,
      levels: ['info', 'alert', 'debug', 'warning', 'error', 'critical'],
    },
    options: {
      dateformat: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      },
      levels: ['info', 'alert', 'debug', 'warning', 'error', 'critical'],
    },
  };

  public pinoInstance: Logger | undefined;
  public defaultParams: TDefaultObject;

  constructor(config: ILoggerConfig, defaultParams?: TDefaultObject) {
    this.defaultParams = defaultParams || {};

    if (config.options) {
      config.options.dateformat && this.config.options ? (this.config.options = { dateformat: config.options.dateformat }) : false;
      config.options.levels && this.config.options ? (this.config.options = { levels: config.options.levels }) : false;
    }

    if (config.terminal && config.terminal.use) {
      config.terminal.colors && this.config.terminal
        ? (this.config.terminal = {
            ...this.config.terminal,
            colors: config.terminal.colors,
          })
        : false;
      config.terminal.levels && this.config.terminal
        ? (this.config.terminal = {
            ...this.config.terminal,
            levels: config.terminal.levels,
          })
        : false;
    }

    if (config.file && config.file.use) {
      const pinoConfig = {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: config.file.colorize === undefined ? this.config.file?.colorize : config.file.colorize,
            destination: config.file.dir,
            translateTime: true,
            messageFormat: true,
          },
        },
      };

      this.config.file = config.file;
      this.pinoInstance = pino(pinoConfig);
    }
  }

  private formatDate(timestamp?: number): string {
    const date = new Date(timestamp || new Date().getTime());

    if (this.config.options && typeof this.config.options.dateformat !== 'boolean') {
      return date.toLocaleDateString('ru-RU', this.config.options.dateformat);
    } else return date.getTime().toString();
  }

  private formatString({ title, message, params, error, timestamp }: ILoggerProps): string {
    const header = `[TIME]: ${this.formatDate(timestamp)}`;
    const bodyTitle = `[TITLE]: ${title}`;
    const bodyMessage = `[MESSAGE]: ${message}`;
    const bodyParams = `[PARAMS]: ${JSON.stringify(params || null)}`;
    const bodyError = `[ERROR]: ${JSON.stringify(error) || null}`;

    return [' ', header, title ? bodyTitle : '', bodyMessage, bodyParams, bodyError].filter((item) => !!item).join('\n');
  }

  public setDefaultParams(params: TDefaultObject) {
    return (this.defaultParams = Object.assign(this.defaultParams, params));
  }

  private isTerminalLogger(logLevel: TLogLevel, callback: (color: TColor) => void) {
    if (this.config.terminal && this.config.terminal.use && this.config.terminal?.levels?.indexOf(logLevel) !== -1) {
      let color: TColor = 'white';

      if (this.config.terminal.colors && this.config.terminal.colors[logLevel]) {
        color = this.config.terminal.colors[logLevel] || 'white';
      }

      callback(color);
    }
  }

  private isFileLogger(logLevel: TLogLevel, callback: () => void) {
    if (this.config.file && this.config.file.use && this.pinoInstance && this.config.file?.levels?.indexOf(logLevel) !== -1) return callback();
  }

  public info(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void {
    const logLevel: TLogLevel = 'info';

    if (this.config.options?.levels?.indexOf(logLevel) === -1) return;

    props.params = props.params ? props.params : this.defaultParams;

    this.isTerminalLogger(logLevel, (color) => console.info(clc[color](this.formatString(props))));
    this.isFileLogger(logLevel, () => this.pinoInstance?.info(props));
  }

  public alert(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void {
    const logLevel: TLogLevel = 'alert';

    if (this.config.options?.levels?.indexOf(logLevel) === -1) return;

    props.params = props.params ? props.params : this.defaultParams;

    this.isTerminalLogger(logLevel, (color) => console.log(clc[color](this.formatString(props))));
    this.isFileLogger(logLevel, () => this.pinoInstance?.info(props));
  }

  public debug(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void {
    const logLevel: TLogLevel = 'debug';

    if (this.config.options?.levels?.indexOf(logLevel) === -1) return;

    props.params = props.params ? props.params : this.defaultParams;

    this.isTerminalLogger(logLevel, (color) => console.debug(clc[color](this.formatString(props))));
    this.isFileLogger(logLevel, () => this.pinoInstance?.debug(props));
  }

  public warning(props: ILoggerProps): void {
    const logLevel: TLogLevel = 'warning';

    if (this.config.options?.levels?.indexOf(logLevel) === -1) return;

    props.params = props.params ? props.params : this.defaultParams;

    this.isTerminalLogger(logLevel, (color) => console.warn(clc[color](this.formatString({ ...props }))));
    this.isFileLogger(logLevel, () => this.pinoInstance?.warn({ ...props, params: this.defaultParams }));
  }

  public error(props: ILoggerProps): void {
    const logLevel: TLogLevel = 'error';

    if (this.config.options?.levels?.indexOf(logLevel) === -1) return;

    props.params = props.params ? props.params : this.defaultParams;

    this.isTerminalLogger(logLevel, (color) => console.error(clc[color](this.formatString({ ...props }))));
    this.isFileLogger(logLevel, () => this.pinoInstance?.error({ ...props, params: this.defaultParams }));
  }

  public critical(props: ILoggerProps): void {
    const logLevel: TLogLevel = 'critical';

    if (this.config.options?.levels?.indexOf(logLevel) === -1) return;

    this.isTerminalLogger(logLevel, (color) => console.error(clc[color](this.formatString({ ...props }))));
    this.isFileLogger(logLevel, () => this.pinoInstance?.fatal({ ...props, params: this.defaultParams }));
  }
}
