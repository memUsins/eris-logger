import { LoggerProps, LogLevel } from './types';
export interface FileLoggerConfig {
    use: boolean;
    options: {
        dir: string;
        colorize?: boolean;
        levels?: LogLevel[];
    };
}
export declare class FileLogger {
    private use;
    private pinoInstance;
    private dir;
    private levels;
    private colorize;
    constructor(config: FileLoggerConfig);
    print(logLevel: LogLevel, props: Pick<LoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
}
