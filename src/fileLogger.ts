import { LoggerProps, LogLevel } from './types';
import pino, { Logger } from 'pino';

export interface FileLoggerConfig {
  use: boolean;
  options: {
    dir: string;
    colorize?: boolean;
    levels?: LogLevel[];
  };
}

export class FileLogger {
  private use = false;

  private pinoInstance: Logger | null = null;

  private dir = '/logs/logs.log';
  private levels: LogLevel[] = ['info', 'alert', 'debug', 'warning', 'error', 'fatal'];
  private colorize = true;

  constructor(config: FileLoggerConfig) {
    this.use = config?.use;

    if (config?.options?.dir) this.dir = config?.options?.dir;
    if (config?.options?.levels) this.levels = config?.options?.levels;
    if (config?.options?.colorize) this.colorize = config?.options?.colorize;

    const pinoConfig = {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: this.colorize,
          destination: this.dir,
          translateTime: true,
          messageFormat: true,
        },
      },
    };

    this.pinoInstance = pino(pinoConfig);
  }

  print(logLevel: LogLevel, props: LoggerProps) {
    if (!logLevel) return;
    if (!this.use) return;
    if (!this.pinoInstance) return;
    if (!this.levels.includes(logLevel)) return;

    switch (logLevel) {
      case 'info':
      case 'alert':
        this.pinoInstance.info(props);
        break;
      case 'debug':
        this.pinoInstance.debug(props);
        break;
      case 'warning':
        this.pinoInstance.warn(props);
        break;
      case 'error':
        this.pinoInstance.error(props);
        break;
      case 'fatal':
        this.pinoInstance.fatal(props);
        break;
    }
  }
}
