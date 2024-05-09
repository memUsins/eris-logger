export type LogLevel = 'info' | 'alert' | 'debug' | 'warning' | 'error' | 'fatal';
export interface GlobalLoggerConfig {
    dateformat?: false | Intl.DateTimeFormatOptions;
    levels?: LogLevel[];
}
export interface LoggerProps {
    title: string;
    message: string;
    params?: any;
    error?: any;
    timestamp?: number;
}
