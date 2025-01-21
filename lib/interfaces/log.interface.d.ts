export declare enum LogLevel {
    Debug = "Debug",
    Info = "Info",
    Alert = "Alert",
    Warn = "Warn",
    Error = "Error",
    Fatal = "Fatal",
    Unselected = "Unselected"
}
export declare const logToInt: (level: LogLevel) => number;
export type LogField = {
    [key: string]: any;
};
export interface LogData {
    fields?: LogField;
    error?: Error;
    name?: string;
    withName?: boolean;
}
export declare class Log {
    level: LogLevel;
    message: string;
    data?: LogData;
    constructor(level: LogLevel, message: string, data?: LogData);
    isEnabled(level: LogLevel): boolean;
}
export declare const newDefaultLog: (level: LogLevel, ...message: string[]) => Log;
