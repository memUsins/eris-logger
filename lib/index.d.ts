import { GlobalLoggerConfig, LoggerProps } from './types';
import { TerminalLoggerConfig } from './terminalLogger';
import { FileLoggerConfig } from './fileLogger';
import { WSLoggerConfig } from './wsLogger';
export interface LoggerConfig {
    file?: FileLoggerConfig;
    terminal?: TerminalLoggerConfig;
    ws?: WSLoggerConfig;
    options?: GlobalLoggerConfig;
}
export declare class ErisLogger {
    defaultParams: object;
    private levels;
    private dateformat;
    private terminal;
    private file;
    private ws;
    constructor(config: LoggerConfig, defaultParams?: object);
    setDefaultParams(params: object): object;
    info(props: Pick<LoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
    alert(props: Pick<LoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
    debug(props: Pick<LoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
    warning(props: Pick<LoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
    error(props: Pick<LoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
    fatal(props: Pick<LoggerProps, 'title' | 'message' | 'error' | 'timestamp'>): void;
}
