import { graylog } from 'graylog2';
import { Logger } from 'pino';
import { ILoggerProps, ILoggerConfig } from './types';

export class ErisLogger {
  public config: ILoggerConfig;
  public graylogInstance: graylog | undefined;
  public pinoInstance: Logger | undefined;
  public defaultParams: {};
  constructor(config: ILoggerConfig, defaultParams?: {});
  public setDefaultParams(params: {}): {};
  public info(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
  public alert(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
  public debug(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
  public warning(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
  public error(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
  public critical(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
}
