import * as clc from 'chalk';

import { Log, LogLevel } from '../interfaces';
import { BaseAdapter } from './base.adapter';

export type Color =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'grey'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright';

export type ConsoleAdapterLevelColorConfig = { [key in LogLevel]: Color };

export interface ConsoleAdapterColorConfig {
  dateColor: Color;
  messageColor: Color;

  levelColors: ConsoleAdapterLevelColorConfig;
}

export interface ConsoleAdapterConfig {
  enable?: boolean;
  level: LogLevel;

  colors?: ConsoleAdapterColorConfig;
}

export class ConsoleAdapter implements BaseAdapter {
  config: ConsoleAdapterConfig = {
    enable: true,
    level: LogLevel.Info,
  };

  constructor(config?: ConsoleAdapterConfig) {
    this.config = { ...this.config, ...config, colors: this.setDefaultColorsConfig(config?.colors) };
  }

  Log(log: Log) {
    if (!this.config.enable || !log.isEnabled(this.config.level)) return;

    console.info(this.Format(log));
  }

  Format(log: Log): string {
    if (!this.config.colors) return '';

    const levelColor = this.config?.colors?.levelColors[log.level];
    const level = clc[levelColor](log.level.toUpperCase() || 'UNSELECTED');

    const date = clc[this.config.colors?.dateColor](new Date().toISOString());
    const message = clc[this.config.colors?.messageColor](log.message);

    let name = '';
    if (log.data?.name && log.data?.withName) {
      name = clc[levelColor](`[${log.data?.name}]:`);
    }

    let error = '';
    if (log.data?.error) error = clc[levelColor](`err=${log.data?.error.message}`);

    const fieldsArray: string[] = [];
    let fields = '';
    if (log.data?.fields) {
      for (const key of Object.keys(log.data?.fields)) {
        fieldsArray.push(`${key}=${log.data?.fields?.[key]}`);
      }

      fields = clc[levelColor](fieldsArray.join(' '));
    }

    return [date, level, name, message, error, fields].filter(Boolean).join(' ');
  }

  private setDefaultColorsConfig(config?: ConsoleAdapterColorConfig): ConsoleAdapterColorConfig {
    if (!config) {
      return {
        dateColor: 'blackBright',
        messageColor: 'white',
        levelColors: this.setDefaultLevelsColorConfig(),
      };
    }

    return {
      dateColor: config?.dateColor ?? 'blackBright',
      messageColor: config?.messageColor ?? 'white',
      levelColors: this.setDefaultLevelsColorConfig(config?.levelColors),
    };
  }

  private setDefaultLevelsColorConfig(config?: ConsoleAdapterLevelColorConfig): ConsoleAdapterLevelColorConfig {
    const defaultColors: ConsoleAdapterLevelColorConfig = {
      [LogLevel.Debug]: 'gray',
      [LogLevel.Info]: 'cyan',
      [LogLevel.Alert]: 'cyanBright',
      [LogLevel.Warn]: 'yellowBright',
      [LogLevel.Error]: 'red',
      [LogLevel.Fatal]: 'redBright',
      [LogLevel.Unselected]: 'black',
    };

    return { ...defaultColors, ...config };
  }
}
