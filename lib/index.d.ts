import { Logger } from 'pino';
import { ILoggerProps, ILoggerConfig } from './types';
export declare class ErisLogger {
    config: ILoggerConfig;
    pinoInstance: Logger | undefined;
    defaultParams: {};
    constructor(config: ILoggerConfig, defaultParams?: {});
    getFileLoggerInstance(): Logger | undefined;
    private formatDate;
    private formatString;
    setDefaultParams(params: {}): {};
    private isTerminalLogger;
    private isFileLogger;
    info(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
    alert(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
    debug(props: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
    warning(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
    error(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
    critical(props: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
}
