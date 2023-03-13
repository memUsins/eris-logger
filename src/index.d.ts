import { graylog } from 'graylog2';
import { Logger } from 'pino';

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
  constructor(config: ILoggerConfig, defaultParams?: {})
  public setDefaultParams(params: {}): void;
  public info(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
  public alert(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
  public debug(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
  public warning(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
  public error(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
  public critical(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
}
