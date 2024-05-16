import { LoggerProps, LogLevel } from './types';
export interface WSLoggerConfig {
    use: boolean;
    options: {
        hostname: string;
        port?: number;
        protocol?: string;
        auth: {
            projectId: string;
            secret: string;
        };
        levels?: LogLevel[];
    };
}
export declare class WSLogger {
    private use;
    private logger;
    private ws;
    private wsOpen;
    private buffer;
    private hostname;
    private port;
    private protocol;
    private projectId;
    private secret;
    private levels;
    constructor(config: WSLoggerConfig);
    private connect;
    private send;
    private newSendObject;
    print(logLevel: LogLevel, props: LoggerProps): false | undefined;
}
