import * as clc from 'chalk';

import { LoggerProps, LogLevel } from './types';

export type TerminalColors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
export type TerminalBgColors = 'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite';

export type TerminalBgBrightColors =
  | 'bgBlackBright'
  | 'bgRedBright'
  | 'bgGreenBright'
  | 'bgYellowBright'
  | 'bgBlueBright'
  | 'bgMagentaBright'
  | 'bgCyanBright'
  | 'bgWhiteBright';

export type TerminalBrightColors = 'blackBright' | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright';

export type Color = TerminalColors | TerminalBrightColors | TerminalBgColors | TerminalBgBrightColors;

export interface TerminalColorsOptions {
  info?: Color;
  alert?: Color;
  debug?: Color;
  warning?: Color;
  error?: Color;
  fatal?: Color;
}

export interface TerminalLoggerConfig {
  use: boolean;
  options: {
    colors?: TerminalColorsOptions;
    levels?: LogLevel[];
  };
  dateFormat?: false | Intl.DateTimeFormatOptions;
}

export class TerminalLogger {
  private use = false;

  private colors: TerminalColorsOptions = {
    info: 'greenBright',
    alert: 'blueBright',
    debug: 'blackBright',
    warning: 'yellow',
    error: 'redBright',
    fatal: 'bgRed',
  };

  private dateformat: boolean | Intl.DateTimeFormatOptions = false;

  private levels: LogLevel[] = ['info', 'alert', 'debug', 'warning', 'error', 'fatal'];

  constructor(config: TerminalLoggerConfig) {
    this.use = config?.use;

    if (config?.options?.colors) this.colors = config?.options?.colors;
    if (config?.options?.levels) this.levels = config?.options?.levels;
    if (config?.dateFormat) this.dateformat = config?.dateFormat;
  }

  private formatDate(timestamp?: number): string {
    const date = new Date(timestamp || new Date().getTime());

    if (typeof this.dateformat !== 'boolean') {
      return date.toLocaleDateString('ru-RU', this.dateformat);
    } else return date.getTime().toString();
  }

  private formatString({ title, message, params, error, timestamp }: LoggerProps): string {
    const header = `[TIME]: ${this.formatDate(timestamp)}`;
    const bodyTitle = `[TITLE]: ${title}`;
    const bodyMessage = `[MESSAGE]: ${message}`;
    const bodyParams = `[PARAMS]: ${JSON.stringify(params || null)}`;
    const bodyError = `[ERROR]: ${error || null}`;

    return ['', header, bodyTitle, bodyMessage, bodyParams, bodyError].join('\n');
  }

  print(logLevel: LogLevel, props: LoggerProps) {
    if (!logLevel) return;
    if (!this.use) return;
    if (!this.levels.includes(logLevel)) return;

    const color = this.colors[logLevel];
    if (!color) return;

    switch (logLevel) {
      case 'info':
      case 'alert':
        console.info(clc[color](this.formatString(props)));
        break;
      case 'debug':
        console.debug(clc[color](this.formatString(props)));
        break;
      case 'warning':
        console.warn(clc[color](this.formatString(props)));
        break;
      case 'error':
      case 'fatal':
        console.error(clc[color](this.formatString(props)));
        break;
    }
  }
}
