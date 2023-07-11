import { Logger } from 'pino';
import { ILoggerConfig, TDefaultObject } from './types';
export declare class ErisLogger {
    config: ILoggerConfig;
    pinoInstance: Logger | undefined;
    defaultParams: TDefaultObject;
    constructor(config: ILoggerConfig, defaultParams?: TDefaultObject);
    private formatDate;
    private formatString;
    setDefaultParams(params: TDefaultObject): TDefaultObject;
    private isTerminalLogger;
    private isFileLogger;
    info(message: string, params?: object, timestamp?: number): void;
    alert(message: string, params?: object, timestamp?: number): void;
    debug(message: string, params?: object, timestamp?: number): void;
    warning(message: string, params?: object, timestamp?: number): void;
    error(message: string, error: any, params?: object, timestamp?: number): void;
    critical(message: string, error: any, params?: object, timestamp?: number): void;
}
