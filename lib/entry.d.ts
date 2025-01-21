import { Log, LogData, LogField } from './interfaces/log.interface';
import { ErisLogger } from './logger';
export declare class Entry {
    private readonly logger;
    private data;
    constructor(logger: ErisLogger, data: LogData);
    log(log: Log): void;
    withFields(fields: LogField): Entry;
    withName(name: string): Entry;
    withError(error: Error): Entry;
    debug(...messages: string[]): void;
    info(...messages: string[]): void;
    alert(...messages: string[]): void;
    warn(...messages: string[]): void;
    error(...messages: string[]): void;
    fatal(...messages: string[]): void;
}
