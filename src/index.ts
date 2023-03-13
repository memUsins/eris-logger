import { graylog } from 'graylog2';
// @ts-ignore
import pino, { Logger } from 'pino';
import { white, blackBright, yellowBright, red, bgRed } from 'cli-color';

export interface ILoggerConfig {
  terminal?: boolean;
  file?: { dir: string };
  graylog?: {
    hostName: string;
    servers: [{ host: string; port: number }];
    addressName: string;
  };
  dateformat?: false | Intl.DateTimeFormatOptions;
}

export interface ILoggerProps {
  title: string;
  message: string;
  params?: any;
  error?: any;
  timestamp?: number;
}

export class MyLogger {
  public config: ILoggerConfig;
  public graylogInstance: graylog | undefined;
  public pinoInstance: Logger | undefined;
  public defaultParams: {};

  constructor(config: ILoggerConfig, defaultParams?: {}) {
    this.config = config;
    this.defaultParams = defaultParams || {};
    if (config.graylog) this.graylogInstance = new graylog(config.graylog);
    if (config.file) {
      const pinoConfig = {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: false,
            destination: config.file.dir,
            translateTime: true,
            messageFormat: true,
          },
        },
      };

      this.pinoInstance = pino(pinoConfig);
    }
  }

  private formatDate(timestamp?: number): string {
    const date = new Date(timestamp || new Date().getTime());

    return date.toLocaleDateString(
      'ru-RU',
      this.config.dateformat || {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }
    );
  }

  private formatString({ title, message, params, error, timestamp }: ILoggerProps): string {
    const header = `[TIME   ]: ${this.formatDate(timestamp)}`;
    const bodyTitle = `[TITLE  ]: ${title}`;
    const bodyMessage = `[MESSAGE]: ${message}`;
    const bodyParams = `[PARAMS ]: ${JSON.stringify(params || null)}`;
    const bodyError = `[ERROR  ]: ${error || null}`;

    return ['', header, bodyTitle, bodyMessage, bodyParams, bodyError].join('\n');
  }

  public setDefaultParams(params: {}) {
    this.defaultParams = params;
  }

  public info({ title, message, params, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void {
    params = { ...this.defaultParams, ...params };

    if (this.pinoInstance) this.pinoInstance.info({ title, message, params, timestamp });
    if (this.graylogInstance) this.graylogInstance.info({ title, message, params, timestamp });
    if (this.config.terminal) console.info(white(this.formatString({ title, message, params, timestamp })));
  }

  public alert({ title, message, params, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void {
    params = { ...this.defaultParams, ...params };

    if (this.pinoInstance) this.pinoInstance.info({ title, message, params, timestamp });
    if (this.graylogInstance) this.graylogInstance.alert({ title, message, params, timestamp });
    if (this.config.terminal) console.log(white(this.formatString({ title, message, params, timestamp })));
  }

  public debug({ title, message, params, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void {
    params = { ...this.defaultParams, ...params };

    if (this.pinoInstance) this.pinoInstance.debug({ title, message, params, timestamp });
    if (this.graylogInstance) this.graylogInstance.debug({ title, message, params, timestamp });
    if (this.config.terminal) console.debug(blackBright(this.formatString({ title, message, params, timestamp })));
  }

  public warning({ title, message, error, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void {
    if (this.pinoInstance) this.pinoInstance.warn({ title, message, error, timestamp });
    if (this.graylogInstance) this.graylogInstance.warning({ title, message, error, timestamp });
    if (this.config.terminal) console.warn(yellowBright(this.formatString({ title, message, error, timestamp })));
  }

  public error({ title, message, error, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void {
    if (this.pinoInstance) this.pinoInstance.error({ title, message, error, timestamp });
    if (this.graylogInstance) this.graylogInstance.error({ title, message, error, timestamp });
    if (this.config.terminal) console.error(red(this.formatString({ title, message, error, timestamp })));
  }

  public critical({ title, message, error, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void {
    if (this.pinoInstance) this.pinoInstance.fatal({ title, message, error, timestamp });
    if (this.graylogInstance) this.graylogInstance.critical({ title, message, error, timestamp });
    if (this.config.terminal) console.error(bgRed(this.formatString({ title, message, error, timestamp })));
  }
}
