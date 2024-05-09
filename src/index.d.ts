import { Logger } from 'pino';
import { ILoggerProps, ILoggerConfig } from './types';

export class ErisLogger {
  public config: ILoggerConfig;
  public pinoInstance: Logger | undefined;
  public defaultParams: object;
  constructor(config: ILoggerConfig, defaultParams?: object);
  public getFileLoggerInstance(): Logger | undefined;
  public setDefaultParams(params: object): object;
  public info(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
  public alert(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
  public debug(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
  public warning(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
  public error(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
  public critical(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
}
