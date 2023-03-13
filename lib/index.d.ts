import { graylog } from 'graylog2';
import { Logger } from 'pino';
export interface ILoggerConfig {
    terminal?: boolean;
    file?: {
        dir: string;
    };
    graylog?: {
        hostName: string;
        servers: [{
            host: string;
            port: number;
        }];
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
export declare class MyLogger {
    config: ILoggerConfig;
    graylogInstance: graylog | undefined;
    pinoInstance: Logger | undefined;
    defaultParams: {};
    constructor(config: ILoggerConfig, defaultParams?: {});
    private formatDate;
    private formatString;
    setDefaultParams(params: {}): void;
    info({ title, message, params, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
    alert({ title, message, params, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
    debug({ title, message, params, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
    warning({ title, message, error, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
    error({ title, message, error, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
    critical({ title, message, error, timestamp }: Pick<ILoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
}
